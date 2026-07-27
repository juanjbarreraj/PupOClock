# Base44 Migration Audit — Pup O'Clock

Date: 2026-07-27 · Auditor: Claude Code · Baseline commit: `50ebd3e` (pristine Base44 export)

This document records what the exported project depended on before migration, what replaced
each dependency, and the approved plan. Historical Base44/Webflow URLs are intentionally
recorded here; active application code must not reference them once migration completes.

## Approved decisions (2026-07-27)

| Decision | Choice |
|---|---|
| Hosting | **Netlify** (auto-deploy from GitHub, deploy previews, rollbacks) |
| Contact form | **Netlify Forms** → info@pupoclock.com |
| Routing | Keep `BrowserRouter`; Netlify SPA rewrite `/* /index.html 200` |
| Authentication | Remove entirely (no routed page used it) |
| Size→variant bug | Fix during migration using real Shopify variant IDs |
| Play House font | Licensed — self-host in repo |
| Product catalog | Stay local/hardcoded; document maintenance; no Storefront API |
| Assets | Download all remote assets to `public/images/**` |

## Baseline results (before any change)

- Node v26.5.0, npm 11.17.0. `npm install`, `npm run build` both succeed.
- No `.env` exists; Base44 env vars (`VITE_BASE44_APP_ID` etc.) are referenced but unset.
- At runtime the app fires `/api/apps/public/prod/public-settings/by-id/undefined`,
  which fails, is caught, and the site renders anyway (spinner flash + console error).
- Bundle: 636 KB JS + 88 KB CSS, single chunk, contains Base44 SDK code and remote URLs.
- Git was **not** initialized; first action was preserving the export at `50ebd3e`.

## What depended on Base44

| Dependency | Location | Type | Replacement |
|---|---|---|---|
| `@base44/sdk` client | `src/api/base44Client.js` | runtime | deleted |
| `AuthProvider` (public-settings request, login redirects, spinner gate) | `src/lib/AuthContext.jsx`, wrapped all of `App` | runtime | removed; all routes are public |
| 404 page auth query (`base44.auth.me()` via React Query) | `src/lib/PageNotFound.jsx` | runtime | standalone branded 404, no network |
| Auth pages (unrouted): Login, Register, ForgotPassword, ResetPassword + AuthLayout, ProtectedRoute, UserNotRegisteredError, GoogleIcon | `src/pages`, `src/components` | dead code | deleted |
| `app-params.js` (token/localStorage juggling, `VITE_BASE44_*`) | `src/lib/app-params.js` | runtime | deleted |
| `@tanstack/react-query` | only consumed by the two auth flows above | runtime | removed with them |
| `@base44/vite-plugin` (HMR notifier, navigation notifier, analytics tracker, visual-edit agent, `@/` alias provider) | `vite.config.js` | build | minimal Vite config with explicit `@` alias |
| 59 unique `media.base44.com` URLs (images + 20 font files served as renamed `.txt`) | `src/index.css` + 14 component/page files | assets | `public/images/**`, `public/fonts/**` |
| Favicon `base44.com/logo_v2.svg`, title "Base44 APP", missing `/manifest.json` | `index.html` | assets/SEO | local favicon, real title/meta, real manifest |
| `base44/` platform folder, Base44 README, `.gitignore` entry | repo root | metadata | deleted/rewritten |

## Other external dependencies found (not Base44)

- **Webflow CDN** (`cdn.prod.website-files.com`) — 10 images including the header/footer
  logo, hero box image, testimonial and give-back photos. Leftover from the old Webflow
  site; localized during migration (would break silently if the Webflow plan lapses).
- **Google Fonts** — Titan One (display-stack fallback). Self-hosted during migration.
- **Unsplash** — 2 fallback image constants (SwagHero, CartDrawer). Localized.
- **Shopify** (`pupoclockshop.myshopify.com`) — cart permalinks + 3 subscription product
  links. Kept (this is the store).
- Social links (Instagram, Facebook, TikTok, X, YouTube) — kept.
- `mailto:info@pupoclock.com` in Privacy — kept; also the contact-form recipient.

## Package audit

Used by app code and kept: `react`, `react-dom`, `react-router-dom`, `framer-motion`,
`lucide-react`, `tailwindcss` (+ `tailwindcss-animate` via tailwind.config), and dev tooling
(Vite, ESLint, TypeScript for `jsconfig` typecheck, PostCSS/Autoprefixer).

Removed: `@base44/sdk`, `@base44/vite-plugin`, `@tanstack/react-query`, and ~45 packages
whose only consumers were the generated `src/components/ui/` shadcn library (28 `@radix-ui/*`
packages, Stripe ×2, `three`, `recharts`, `react-hook-form`, `zod`, `moment`, `lodash`,
`react-quill`, `react-leaflet`, `jspdf`, `html2canvas`, `embla-carousel-react`, `date-fns`,
`cmdk`, `vaul`, `sonner`, `input-otp`, `react-day-picker`, `react-markdown`,
`react-resizable-panels`, `react-hot-toast`, `next-themes`, `canvas-confetti`,
`@hello-pangea/dnd`, `@hookform/resolvers`, `class-variance-authority`, `clsx`,
`tailwind-merge`). App code imported only 6 ui components, all exclusively from the deleted
auth pages, so the entire `ui/` folder went with them.

## Pre-existing production defects found during audit

1. **Contact form sent nothing** — submit only set local state and showed fake success.
   Fixed with Netlify Forms delivery.
2. **Size selection never reached Shopify** — the catalog stored one variant ID per
   product; verified against the live storefront feed that apparel products have 5–9 size
   variants and stored IDs pointed at a single (default/XS) variant. Fixed with real
   per-size variant maps.
3. Adult apparel on Shopify sells up to 4X/5X; the site only offered XS–XL.
4. Cart state was volatile: lost on refresh *and* on navigating away from `/swag`
   (CartProvider was mounted inside the Swag page).
5. `index.html` referenced `/manifest.json` which did not exist (no `public/` directory),
   Base44 favicon, title "Base44 APP", no meta description.

## Routes (verified from `App.jsx`)

`/`, `/about`, `/faq`, `/swag`, `/subscribe`, `/contact`, `/privacy`, `*` → 404.
All public; navigation goes through a custom `PageTransition` overlay that calls
`navigate()` mid-animation.

## Implementation checklist

Statuses updated as migration proceeds. Risk: L/M/H. Rollback for every task: revert the
task's commit (each task is one commit on `migration/remove-base44`).

| # | Task | Files | Verification | Risk | Status |
|---|---|---|---|---|---|
| A1 | git init, preserve export, branch | — | `git log` | L | ✅ `50ebd3e` |
| A2 | Audit doc (this file) | `docs/` | review | L | ✅ |
| B1 | Standalone branded 404 (no network, keyboard-accessible, Link home) | `src/lib/PageNotFound.jsx` → `src/pages/NotFound.jsx` | dev server: unknown path | L | ✅ |
| B2 | Remove AuthProvider/QueryClient wrappers from App; drop Toaster (only auth used it) | `src/App.jsx` | build + all routes load | M | ✅ |
| B3 | Delete auth pages/components, base44 client, app-params, query-client, unused utils | `src/pages/{Login,Register,ForgotPassword,ResetPassword}.jsx`, `src/components/{AuthLayout,ProtectedRoute,UserNotRegisteredError,GoogleIcon}.jsx`, `src/api/`, `src/lib/{AuthContext,app-params,query-client}.js*`, `src/utils/index.ts`, `src/lib/utils.js` | `grep -RIn base44 src` clean (except assets); build | M | ✅ |
| B4 | Delete generated `src/components/ui/` + hooks used only by it | `src/components/ui/`, `src/hooks/use-mobile.jsx` | build; grep for imports | M | ✅ |
| C1 | Minimal vite.config: react plugin, `@` alias, `base:'/'` | `vite.config.js` | dev + build | M | ✅ |
| C2 | Clean index.html: title, meta description, local favicon, remove dead manifest link | `index.html` | build; browser tab | L | ✅ |
| C3 | Uninstall Base44 + ~45 unused packages; lockfile regen | `package.json` | `npm install && npm run build` | M | ✅ |
| D1 | Asset download script + manifest (Base44 + Webflow + Unsplash → `public/images/**`) | `scripts/migrate-assets.mjs`, `docs/asset-manifest.md` | script output: all HTTP 200, content-types real | M | ✅ |
| D2 | Rewrite all asset references to local paths | 14 src files + `src/index.css` | `grep media.base44\|website-files\|unsplash` → 0 in src; visual pass every page | H | ✅ |
| E1 | Self-host fonts: Poppins (300/400/400i/500/600/700/800), Titan One, Play House + Slant | `public/fonts/`, `src/index.css` | fonts load locally; headings render Play House | M | ✅ |
| F1 | Netlify Forms contact form: static declaration + React POST, honeypot, states, validation | `index.html`, `src/pages/Contact.jsx` | local: form validates; deploy preview: delivery test | M | ✅ |
| G1 | Fetch live catalog, build size→variant maps, fix add-to-cart/checkout | `src/components/swag/products.js`, `ProductModal.jsx`, `CartContext.jsx` | validation table: every product/size ↔ live variant ID | H | ✅ |
| G2 | Catalog validation table + maintenance doc + drift-check script | `docs/shopify-catalog-maintenance.md`, `scripts/check-catalog.mjs` | script passes against live feed | M | ✅ |
| H1 | Netlify config: `netlify.toml`, SPA redirect, Node version | `netlify.toml`, `public/_redirects` | `npm run build && npm run preview`; deploy preview | M | ✅ |
| H2 | README rewrite + deployment, domain-migration, contact-form docs | `README.md`, `docs/` | review | L | ✅ |
| I1 | Final sweeps: grep, bundle inspection, route/refresh tests, responsive spot-checks | — | checklist in README | M | ✅ |
| J1 | (With user) Create GitHub repo, connect Netlify, enable form notifications | external | production tests | M | ⬜ user + assistant |
| J2 | (With user) DNS cutover per `docs/domain-migration.md`; keep Base44 live until pass | GoDaddy | HTTPS, both hosts, email intact | H | ⬜ user |

## Known limitations after migration

- Cart still volatile across refresh (pre-existing; localStorage persistence is a small,
  recommended follow-up — not done during migration to preserve behavior).
- Netlify Forms free tier: 100 submissions/month.
- Product data (names, prices, images, variants) remains hand-maintained; see
  `docs/shopify-catalog-maintenance.md` for the update workflow and drift checker.
- Display prices are local strings; Shopify charges its own prices at checkout.
