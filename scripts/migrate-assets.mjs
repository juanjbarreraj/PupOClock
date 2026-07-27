/**
 * One-time asset migration: download every remote image referenced in src/
 * (Base44, Webflow CDN, Unsplash) into public/images/<category>/ and
 * optionally rewrite the source references.
 *
 *   node scripts/migrate-assets.mjs            # scan + download + manifest
 *   node scripts/migrate-assets.mjs --rewrite  # also replace URL literals in src/
 *
 * Font files (.txt-disguised TTF/OTF on Base44) are intentionally excluded —
 * they are handled by the font migration (see docs/base44-migration-audit.md).
 */
import { readFileSync, writeFileSync, mkdirSync, readdirSync, statSync, existsSync } from "node:fs";
import path from "node:path";

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const SRC = path.join(ROOT, "src");
const OUT = path.join(ROOT, "public", "images");
const REWRITE = process.argv.includes("--rewrite");

const URL_RE = /https:\/\/(?:media\.base44\.com|cdn\.prod\.website-files\.com|images\.unsplash\.com)\/[^"'`)\s\\]+/g;

// Category by referencing file (first match wins for shared URLs)
const CATEGORY = [
  [/swag\/products\.js$/, "products"],
  [/TeamCarousel/, "team"],
  [/Subscribe/, "subscription"],
  [/Contact/, "contact"],
  [/Navbar|Footer|PageTransition/, null], // decided per-URL below
  [/About/, "about"],
  [/Hero|WhatsInBox|Testimonials|GiveBack|GetFirstBox|WhoWeAre/, "home"],
  [/FloatingObjects|BrandCloud|CloudField|Characters|ScrollPeekDog|SwagHero/, "decorations"],
  [/Swag\.jsx$|index\.css$/, "backgrounds"],
];

function categorize(file, url) {
  // Logos → branding; the navbar's background texture → backgrounds
  if (/Navbar|Footer|PageTransition/.test(file)) {
    if (/newbackground/i.test(url)) return "backgrounds";
    if (/HeaderLogo|logo|IMG_636[45]/i.test(url)) return "branding";
    return "branding";
  }
  for (const [re, cat] of CATEGORY) if (re.test(file) && cat) return cat;
  return "misc";
}

function localName(url) {
  if (url.includes("images.unsplash.com")) return "tshirt-fallback.jpg";
  let base = decodeURIComponent(url.split("/").pop().split("?")[0]);
  base = base.replace(/^[0-9a-f]{8,12}_/, "").replace(/^[0-9a-f]{24}_/, "");
  base = base.replace(/[^A-Za-z0-9._-]+/g, "-").replace(/-+/g, "-").replace(/^-|-$/g, "");
  return base;
}

function* walk(dir) {
  for (const entry of readdirSync(dir)) {
    const p = path.join(dir, entry);
    if (statSync(p).isDirectory()) yield* walk(p);
    else if (/\.(jsx?|css)$/.test(entry)) yield p;
  }
}

// ── 1. Scan ──
const refs = new Map(); // url -> { files: Set, category, local }
for (const file of walk(SRC)) {
  const text = readFileSync(file, "utf8");
  for (const url of text.match(URL_RE) ?? []) {
    if (/\.txt$/.test(url)) continue; // fonts, handled separately
    if (!refs.has(url)) refs.set(url, { files: new Set(), category: null });
    refs.get(url).files.add(path.relative(ROOT, file));
  }
}

// products.js composes URLs from a prefix constant + file list
const productsFile = path.join(SRC, "components", "swag", "products.js");
const pText = readFileSync(productsFile, "utf8");
const mMatch = pText.match(/const M = "(https:\/\/media\.base44\.com[^"]+)"/);
if (mMatch) {
  for (const m of pText.matchAll(/"([0-9a-f]{8,12}_[^"]+\.(?:jpg|jpeg|png|webp))"/g)) {
    const url = mMatch[1] + m[1];
    if (!refs.has(url)) refs.set(url, { files: new Set(), category: null });
    refs.get(url).files.add("src/components/swag/products.js");
  }
}
// SwagHero composes one URL from a BASE constant
const swagHeroFile = path.join(SRC, "components", "SwagHero.jsx");
const shText = readFileSync(swagHeroFile, "utf8");
const bMatch = shText.match(/const BASE = "(https:\/\/cdn\.prod\.website-files\.com[^"]+)"/);
if (bMatch) {
  for (const m of shText.matchAll(/BASE \+ "([^"]+)"/g)) {
    const url = bMatch[1] + m[1];
    if (!refs.has(url)) refs.set(url, { files: new Set(), category: null });
    refs.get(url).files.add("src/components/SwagHero.jsx");
  }
}

// ── 2. Assign categories + names, detect collisions ──
const taken = new Map(); // localPath -> url
for (const [url, info] of refs) {
  const firstFile = [...info.files][0];
  info.category = categorize(firstFile, url);
  let name = localName(url);
  let localPath = `/images/${info.category}/${name}`;
  let n = 2;
  while (taken.has(localPath) && taken.get(localPath) !== url) {
    const ext = path.extname(name);
    localPath = `/images/${info.category}/${name.slice(0, -ext.length)}-${n++}${ext}`;
  }
  taken.set(localPath, url);
  info.local = localPath;
}

// ── 3. Download ──
let failures = 0;
for (const [url, info] of refs) {
  const dest = path.join(ROOT, "public", info.local.replace(/^\/images\//, "images/"));
  mkdirSync(path.dirname(dest), { recursive: true });
  if (existsSync(dest) && statSync(dest).size > 0) { console.log(`skip (exists) ${info.local}`); continue; }
  try {
    const res = await fetch(url);
    const type = res.headers.get("content-type") ?? "";
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    if (!type.startsWith("image/")) throw new Error(`not an image: ${type}`);
    const buf = Buffer.from(await res.arrayBuffer());
    if (buf.length < 100) throw new Error(`suspiciously small (${buf.length} bytes)`);
    writeFileSync(dest, buf);
    console.log(`ok   ${info.local}  (${(buf.length / 1024).toFixed(0)} KB, ${type})`);
  } catch (err) {
    failures++;
    console.error(`FAIL ${url} → ${err.message}`);
  }
}

// ── 4. Manifest + map ──
const rows = [...refs.entries()].sort((a, b) => a[1].local.localeCompare(b[1].local));
writeFileSync(
  path.join(ROOT, "scripts", "asset-map.json"),
  JSON.stringify(Object.fromEntries(rows.map(([u, i]) => [u, i.local])), null, 2)
);
writeFileSync(
  path.join(ROOT, "docs", "asset-manifest.md"),
  [
    "# Asset migration manifest",
    "",
    "Generated by `scripts/migrate-assets.mjs`. Original remote URLs are recorded",
    "here for historical reference only; source code must use the local paths.",
    "",
    "| Local path | Referenced by | Original URL |",
    "|---|---|---|",
    ...rows.map(([u, i]) => `| \`${i.local}\` | ${[...i.files].join(", ")} | ${u} |`),
    "",
  ].join("\n")
);

// ── 5. Rewrite literal references ──
if (REWRITE) {
  // Longest URL first: bare prefix constants (e.g. products.js `M`) are
  // substrings of full asset URLs and must be replaced last.
  const byLength = [...refs.entries()].sort((a, b) => b[0].length - a[0].length);
  for (const file of walk(SRC)) {
    let text = readFileSync(file, "utf8");
    let changed = false;
    for (const [url, info] of byLength) {
      if (text.includes(url)) { text = text.split(url).join(info.local); changed = true; }
    }
    if (changed) { writeFileSync(file, text); console.log(`rewrote ${path.relative(ROOT, file)}`); }
  }
}

console.log(`\n${refs.size} unique assets, ${failures} failures${REWRITE ? ", references rewritten" : ""}`);
if (failures) process.exit(1);
