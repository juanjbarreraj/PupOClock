/**
 * Shopify catalog sync / drift check.
 *
 *   node scripts/check-catalog.mjs           # verify local catalog against the live store
 *   node scripts/check-catalog.mjs --write   # regenerate src/components/swag/variants.json
 *
 * Reads the store's public product feed (no credentials involved) and compares
 * it with the hand-maintained catalog in src/components/swag/products.js.
 * Exits non-zero on drift so it can run in CI. See
 * docs/shopify-catalog-maintenance.md for the workflow.
 */
import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const VARIANTS_PATH = path.join(ROOT, "src", "components", "swag", "variants.json");
const FEED = "https://pupoclockshop.myshopify.com/products.json?limit=250";
const STORE = "https://pupoclockshop.myshopify.com";
const WRITE = process.argv.includes("--write");

// Site display label ← Shopify size option
const SIZE_LABEL = { XS: "XS", SM: "S", MD: "M", LG: "L", XL: "XL", "2X": "2X", "3X": "3X", "4X": "4X", "5X": "5X", OS: "One Size" };

// Site product name → Shopify product title, where they differ
const TITLE_ALIAS = {
  "classic trucker hat - color": "classic trucker hat - red & white",
};

const norm = (s) => s.toLowerCase().replace(/\s+/g, " ").trim();

const { PRODUCTS } = await import("../src/components/swag/products.js");
const feed = (await (await fetch(FEED)).json()).products;
const byTitle = new Map(feed.map((p) => [norm(p.title), p]));

let problems = 0;
const out = {};

for (const product of PRODUCTS) {
  const key = TITLE_ALIAS[norm(product.name)] ?? norm(product.name);
  const shop = byTitle.get(key);
  if (!shop) {
    console.error(`MISSING ON SHOPIFY: ${product.name}`);
    problems++;
    continue;
  }
  const sizes = shop.variants.map((v) => {
    // Variant titles look like "Black / MD" or "Red/White / One Size"
    const size = v.title.split(" / ").pop().trim();
    return {
      label: SIZE_LABEL[size] ?? size,
      variantId: String(v.id),
      price: `$${v.price}`,
      available: Boolean(v.available),
    };
  });
  out[product.name] = {
    handle: shop.handle,
    url: `${STORE}/products/${shop.handle}`,
    sizes,
  };
}

if (WRITE) {
  writeFileSync(VARIANTS_PATH, JSON.stringify(out, null, 2) + "\n");
  console.log(`wrote ${Object.keys(out).length} products to ${path.relative(ROOT, VARIANTS_PATH)}`);
} else {
  const current = JSON.parse(readFileSync(VARIANTS_PATH, "utf8"));
  for (const [name, entry] of Object.entries(out)) {
    const local = current[name];
    if (!local) { console.error(`NOT IN variants.json: ${name}`); problems++; continue; }
    if (JSON.stringify(local) !== JSON.stringify(entry)) {
      console.error(`DRIFT: ${name}`);
      for (const s of entry.sizes) {
        const ls = local.sizes?.find((x) => x.label === s.label);
        if (!ls) console.error(`  + size ${s.label} (${s.price}) exists on Shopify but not locally`);
        else if (ls.variantId !== s.variantId || ls.price !== s.price || ls.available !== s.available)
          console.error(`  ~ ${s.label}: local ${ls.variantId}/${ls.price}/${ls.available} vs live ${s.variantId}/${s.price}/${s.available}`);
      }
      for (const ls of local.sizes ?? [])
        if (!entry.sizes.find((x) => x.label === ls.label))
          console.error(`  - size ${ls.label} no longer on Shopify`);
      problems++;
    }
  }
}

// Validation summary
console.log("\nProduct | sizes | price range | all available");
for (const [name, e] of Object.entries(out)) {
  const prices = [...new Set(e.sizes.map((s) => s.price))];
  console.log(
    `${name} | ${e.sizes.map((s) => s.label).join(",")} | ${prices[0]}${prices.length > 1 ? "–" + prices[prices.length - 1] : ""} | ${e.sizes.every((s) => s.available) ? "yes" : "NO"}`
  );
}

if (problems) { console.error(`\n${problems} problem(s) found`); process.exit(1); }
console.log(`\n${Object.keys(out).length} products OK`);
