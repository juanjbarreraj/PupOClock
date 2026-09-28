/**
 * Post-build SEO pass.
 *
 *   node scripts/build-seo.mjs      # runs automatically as part of `npm run build`
 *
 * Vite emits a single `dist/index.html` shell. Every route would therefore ship
 * the same <title>, description and social tags, and crawlers that do not
 * execute JavaScript (Bing, and every social-media scraper) would never see
 * anything else.
 *
 * This script takes that shell and stamps out one real static HTML file per
 * route, each with its own title, meta description, canonical, Open Graph,
 * Twitter card and JSON-LD baked into the initial response. React Router still
 * hydrates and takes over exactly as before. The only difference is what a
 * crawler sees before any JavaScript runs.
 *
 * It also emits `dist/sitemap.xml` and `dist/404.html` from the same route
 * table, so the prerendered pages, the sitemap and the 404 handler cannot drift
 * apart.
 *
 * Guard rail: the script cross-checks the route table against the <Route>
 * declarations in `src/App.jsx` and fails the build on any mismatch. Because
 * `netlify.toml` now returns a real 404 for unmatched paths, a route that
 * existed in the app but was missing here would 404 in production. This makes
 * that impossible to ship.
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import {
  ROUTES,
  DISABLED_ROUTES,
  NOINDEX_ROUTES,
  SITE_URL,
  SITE_NAME,
  LOCALE,
  TWITTER_HANDLE,
  OG_IMAGE,
  OG_IMAGE_WIDTH,
  OG_IMAGE_HEIGHT,
  ICON_SQUARE,
  ICON_APPLE,
  absolute,
  structuredDataFor,
} from '../src/seo/siteMeta.js';
import { SHOPIFY_ENABLED } from '../src/content/features.js';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DIST = path.join(ROOT, 'dist');
const SHELL = path.join(DIST, 'index.html');

const fail = (msg) => {
  console.error(`\n  build-seo: ${msg}\n`);
  process.exit(1);
};

// ── HTML escaping ────────────────────────────────────────────────────────────
const ESCAPES = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };
const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ESCAPES[c]);

// ── Guard: the route table must match the router ─────────────────────────────
function assertRoutesMatchRouter() {
  const appSrc = readFileSync(path.join(ROOT, 'src', 'App.jsx'), 'utf8');
  const declared = [...appSrc.matchAll(/<Route\s+path=["']([^"']+)["']/g)].map((m) => m[1]);

  if (declared.length === 0) fail('could not find any <Route path="…"> in src/App.jsx');

  // Routes switched off in src/content/features.js are still declared in
  // App.jsx (behind the switch). They are intentional, and not prerendered.
  const disabled = new Set(DISABLED_ROUTES.map((r) => r.path));
  const routerPaths = declared.filter((p) => p !== '*' && !disabled.has(p));
  const known = new Set(ROUTES.map((r) => r.path));

  const missing = routerPaths.filter((p) => !known.has(p));
  if (missing.length) {
    fail(
      `src/App.jsx declares route(s) ${missing.join(', ')} that are absent from ROUTES in ` +
        'src/seo/siteMeta.js. Unmatched paths return a real 404 in production, so every ' +
        'router route must be listed there (or deliberately added to NOINDEX_ROUTES).',
    );
  }

  const orphaned = [...known].filter((p) => !routerPaths.includes(p));
  if (orphaned.length) {
    fail(
      `ROUTES in src/seo/siteMeta.js lists ${orphaned.join(', ')}, which src/App.jsx does not ` +
        'route. The sitemap would advertise a URL that renders the 404 page.',
    );
  }

  if (!declared.includes('*')) {
    fail('src/App.jsx has no catch-all <Route path="*">. The 404 page would never render.');
  }
}

// ── Head generation ──────────────────────────────────────────────────────────
function headFor(route, { noindex = false } = {}) {
  const url = absolute(route.path);
  const image = `${SITE_URL}${route.image || OG_IMAGE}`;
  const jsonLd = JSON.stringify(structuredDataFor(route.path));

  return [
    `<title>${esc(route.title)}</title>`,
    `<meta data-seo name="description" content="${esc(route.description)}" />`,
    `<meta data-seo name="robots" content="${noindex ? 'noindex, follow' : 'index, follow'}" />`,
    // No canonical on the 404 shell: it is served for arbitrary unmatched paths,
    // so any URL it named would be a claim about a page that does not exist.
    noindex ? null : `<link data-seo rel="canonical" href="${esc(url)}" />`,
    '',
    `<meta data-seo property="og:type" content="${esc(route.type || 'website')}" />`,
    `<meta data-seo property="og:site_name" content="${esc(SITE_NAME)}" />`,
    `<meta data-seo property="og:locale" content="${esc(LOCALE)}" />`,
    `<meta data-seo property="og:title" content="${esc(route.title)}" />`,
    `<meta data-seo property="og:description" content="${esc(route.description)}" />`,
    `<meta data-seo property="og:url" content="${esc(url)}" />`,
    `<meta data-seo property="og:image" content="${esc(image)}" />`,
    `<meta data-seo property="og:image:width" content="${OG_IMAGE_WIDTH}" />`,
    `<meta data-seo property="og:image:height" content="${OG_IMAGE_HEIGHT}" />`,
    `<meta data-seo property="og:image:alt" content="${esc(`${SITE_NAME}: ${route.title}`)}" />`,
    '',
    `<meta data-seo name="twitter:card" content="summary_large_image" />`,
    `<meta data-seo name="twitter:site" content="${esc(TWITTER_HANDLE)}" />`,
    `<meta data-seo name="twitter:title" content="${esc(route.title)}" />`,
    `<meta data-seo name="twitter:description" content="${esc(route.description)}" />`,
    `<meta data-seo name="twitter:image" content="${esc(image)}" />`,
    '',
    `<script type="application/ld+json" data-seo>${jsonLd.replace(/</g, '\\u003c')}</script>`,
  ]
    .filter((line) => line !== null)
    .map((line) => (line ? `    ${line}` : ''))
    .join('\n');
}

/** Strip the shell's placeholder title/description, then inject the real head. */
function renderPage(shell, route, opts) {
  let stripped = shell
    .replace(/[ \t]*<title>[\s\S]*?<\/title>\r?\n?/i, '')
    .replace(/[ \t]*<meta\s+name=["']description["'][\s\S]*?\/?>\r?\n?/i, '');

  // While Shopify is switched off, do not ship the connection hint to it.
  if (!SHOPIFY_ENABLED) {
    stripped = stripped.replace(/[ \t]*<link\s+rel=["']preconnect["'][^>]*myshopify\.com[^>]*>\r?\n?/gi, '');
  }

  if (!/<\/head>/i.test(stripped)) fail('dist/index.html has no </head> to inject into');

  return stripped.replace(/([ \t]*)<\/head>/i, `${headFor(route, opts)}\n$1</head>`);
}

function writePage(relDir, html) {
  const dir = relDir === '/' ? DIST : path.join(DIST, relDir);
  mkdirSync(dir, { recursive: true });
  writeFileSync(path.join(dir, 'index.html'), html, 'utf8');
}

// ── Sitemap ──────────────────────────────────────────────────────────────────
// No <lastmod>: an inaccurate lastmod is worse than none, and stamping build
// time onto every URL every deploy is exactly the inaccuracy Google ignores.
// No <priority>/<changefreq> either. Google stopped using both.
function sitemap() {
  // Routes flagged `noindex` (placeholders) are still prerendered so the URL
  // works, but they are not advertised to search engines.
  const urls = ROUTES.filter((r) => !r.noindex)
    .map((r) => `  <url><loc>${esc(absolute(r.path))}</loc></url>`)
    .join('\n');
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
}

// ── Run ──────────────────────────────────────────────────────────────────────
if (!existsSync(SHELL)) fail('dist/index.html not found. Run `vite build` first');

assertRoutesMatchRouter();

const shell = readFileSync(SHELL, 'utf8');

// Icons live in the shell already, but assert they exist so a rename fails the
// build rather than silently costing the favicon in search results.
for (const icon of [ICON_SQUARE, ICON_APPLE, OG_IMAGE]) {
  if (!existsSync(path.join(DIST, icon.replace(/^\//, '')))) {
    fail(`expected image "${icon}" is missing from dist/. Check public/`);
  }
}

for (const route of ROUTES) {
  writePage(route.path, renderPage(shell, route, { noindex: Boolean(route.noindex) }));
}

// Netlify serves this for any unmatched path (see the 404 redirect in netlify.toml).
const notFound = NOINDEX_ROUTES.find((r) => r.path === '/404');
writeFileSync(path.join(DIST, '404.html'), renderPage(shell, notFound, { noindex: true }), 'utf8');

writeFileSync(path.join(DIST, 'sitemap.xml'), sitemap(), 'utf8');

console.log(
  `  build-seo: ${ROUTES.length} prerendered routes + 404.html + sitemap.xml\n` +
    ROUTES.map((r) => `    ${r.path.padEnd(11)} ${r.title}${r.noindex ? '  (noindex)' : ''}`).join('\n') +
    DISABLED_ROUTES.map((r) => `\n    ${r.path.padEnd(11)} switched off, not built`).join(''),
);
