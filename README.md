# Pup O'Clock Website

Marketing and storefront site for [Pup O'Clock](https://pupoclock.com) — monthly dog
subscription boxes and official swag. A fully self-contained React single-page app:
no backend, no external runtime services except Shopify checkout and Netlify Forms.

Repository: [github.com/juanjbarreraj/PupOClock](https://github.com/juanjbarreraj/PupOClock)
(public). Canonical production domain: `https://pupoclock.com` (www redirects to apex).

## Technology

- **React 18 + Vite 6** — SPA with `BrowserRouter` (react-router-dom 6)
- **Tailwind CSS 3** (+ `tailwindcss-animate`), custom self-hosted fonts
- **framer-motion** for animation, **lucide-react** for icons
- **Shopify** cart-permalink checkout (no API keys; see
  [docs/shopify-catalog-maintenance.md](docs/shopify-catalog-maintenance.md))
- **Netlify** hosting + **Netlify Forms** contact delivery (see
  [docs/deployment.md](docs/deployment.md))

## Requirements

Node 20+ (Netlify builds on Node 22). No environment variables are needed —
there is deliberately no `.env`.

## Development

```bash
npm install
npm run dev        # local dev server
npm run build      # production build into dist/
npm run preview    # serve the production build locally
npm run lint       # ESLint (clean)
npm run typecheck  # tsc over jsconfig — has 3 pre-existing loose-JSX warnings
npm run check:catalog   # verify product data against the live Shopify store
npm run test:cart  # cart persistence validation tests
```

## Project layout

```
public/images/**   all site imagery, organized by feature (self-hosted)
public/fonts/**    Poppins & Titan One (OFL) + Play House (licensed, WOFF2)
src/pages/         one component per route (/, /about, /faq, /swag, /subscribe, /contact, /privacy, 404)
src/components/    page sections, navigation, decorations
src/components/swag/  storefront: catalog (products.js + variants.json), cart, modal
scripts/           check-catalog.mjs (Shopify drift check), migrate-assets.mjs (historical)
docs/              deployment, domain, catalog, contact-form, and migration docs
```

## Fonts

Poppins and Titan One are self-hosted under the SIL Open Font License. **Play House** (the
brand display font) is a commercially licensed font authorized for web self-hosting by the
project owner; license purchase documentation is retained privately and is not included in
this public repository. Do not reuse the Play House files outside this project.

## Shopify

Product content is maintained in `src/components/swag/products.js`; per-size variant IDs,
prices, and availability are generated into `variants.json` from the store's public feed.
Checkout opens a Shopify cart permalink — the site never handles payment. After any change
in the Shopify admin, run `npm run check:catalog -- --write` and commit the diff.

The cart persists in versioned localStorage (`pupoclock_cart_v1`), storing only variant
IDs and quantities; prices and display data are rebuilt from the current catalog on every
restore. Validation logic lives in `src/components/swag/cartStorage.js` (`npm run test:cart`).

## Contact form

Delivered by Netlify Forms to info@pupoclock.com (configured in the Netlify dashboard —
see [docs/contact-form-setup.md](docs/contact-form-setup.md)). No keys in the repo.
Submissions only deliver on the deployed site, not `npm run dev`.

## Deployment

Pushing to `main` deploys to production via Netlify's Git integration; every pull request
gets a deploy preview. Build settings live in `netlify.toml`. Custom-domain and DNS
details: [docs/domain-migration.md](docs/domain-migration.md).

## History

This project was migrated from a Base44 export to a fully independent app in July 2026.
What changed and why: [docs/base44-migration-audit.md](docs/base44-migration-audit.md).

## Troubleshooting

- **Fonts or images 404 in dev** — paths are absolute (`/images/...`, `/fonts/...`);
  make sure you're running from the repo root.
- **Contact form errors locally** — expected; Netlify intercepts the POST only in
  production and deploy previews.
- **A size/price looks wrong on /swag** — run `npm run check:catalog`; if it reports
  drift, regenerate with `--write` and redeploy.
- **Rolling back a bad deploy** — Netlify dashboard → Deploys → pick a previous deploy →
  "Publish deploy".
