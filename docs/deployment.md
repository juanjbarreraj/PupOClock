# Deployment (Netlify)

The site deploys automatically from GitHub to Netlify. All build settings are in
`netlify.toml` — the dashboard needs no build configuration.

## One-time setup

1. Push this repository to GitHub (private is fine).
2. In [app.netlify.com](https://app.netlify.com): **Add new site → Import an existing
   project → GitHub**, pick the repo, branch `main`. Netlify reads `netlify.toml`
   (build `npm run build`, publish `dist/`, Node 22, SPA redirect).
3. First deploy produces a `<something>.netlify.app` URL — use it for full testing
   before touching DNS (see `docs/domain-migration.md`).
4. **Forms**: Site configuration → Forms → verify the `contact` form was detected.
   Then Forms → **Form notifications → Add notification → Email notification** →
   recipient `info@pupoclock.com`. Send a test submission from the deployed site and
   confirm it arrives (check spam the first time).
5. Optional hardening: Site configuration → Build & deploy → **Deploy notifications**
   for failed builds.

## Day-to-day

- **Deploy**: merge/push to `main`. Netlify builds and publishes automatically.
- **Preview**: open a pull request — Netlify attaches a deploy-preview URL.
- **Rollback**: Deploys → select a previous successful deploy → **Publish deploy**
  (instant, no rebuild).

## What to check after a deploy

- Home, /swag (cards, modal, sizes, cart, "Checkout on Shopify" reaches Shopify
  checkout with the right items — stop before paying), /contact submission,
  direct-load and refresh of a deep route, and the 404 page.
- Browser network panel: every request should be same-origin or `pupoclockshop.myshopify.com`.

## Free-tier limits that matter

- Bandwidth 100 GB/month, build minutes 300/month — far above this site's needs.
- Netlify Forms: 100 submissions/month; the dashboard shows usage. If the site ever
  outgrows this, upgrade Forms or switch the form to Web3Forms (host-independent).
