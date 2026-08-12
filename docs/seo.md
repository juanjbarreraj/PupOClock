# SEO architecture

Everything search engines and social platforms read about this site is generated
from one file: **`src/seo/siteMeta.js`**. If you change a title, a description or
a route, change it there.

## Why it is built this way

This is a Vite single-page app. Vite emits one `dist/index.html`, so without
intervention every route would ship the same `<title>` and meta description, and
the only way to vary them would be client-side JavaScript.

Client-side head management (react-helmet-async and friends) is not enough here.
Googlebot does execute JavaScript, but Bing and **every** social-media scraper —
Facebook, LinkedIn, iMessage, WhatsApp, Slack — do not. Open Graph tags injected
by React are invisible to exactly the crawlers that exist to read Open Graph tags.

So the metadata is generated at build time instead.

## How it works

```
src/content/*.js  ──┐
                    ├──> src/seo/siteMeta.js ──┬──> src/components/Seo.jsx   (client nav)
                    │                          └──> scripts/build-seo.mjs    (build time)
                    │                                    │
                    │                                    ├──> dist/<route>/index.html
                    │                                    ├──> dist/404.html
                    │                                    └──> dist/sitemap.xml
```

`npm run build` is `vite build && node scripts/build-seo.mjs`. The second step
reads the built shell and writes one real static HTML file per route —
`dist/about/index.html`, `dist/faq/index.html`, and so on — each with its own
title, description, canonical, Open Graph, Twitter card and JSON-LD baked into
the initial response. React Router hydrates and takes over exactly as before.

Netlify serves a matching file before it consults any redirect rule, so
`/about` is served by `dist/about/index.html` with no configuration needed.

`src/components/Seo.jsx` then keeps the head correct during *client-side*
navigation. Every tag it manages carries `data-seo` so it updates in place
rather than accumulating duplicates. It is deliberately dependency-free.

## The 404 behaviour

`netlify.toml` returns a **real HTTP 404** (`/*` → `/404.html`) for unmatched
paths. It used to return `200` with the homepage, which made every dead
Base44-era URL look to Google like a live duplicate of the homepage.

This only works because every real route now has its own file. To make that
impossible to get wrong, `scripts/build-seo.mjs` **fails the build** if:

- `src/App.jsx` declares a `<Route>` that is missing from `ROUTES`, or
- `ROUTES` lists a path that `src/App.jsx` does not route, or
- the catch-all `<Route path="*">` has been removed, or
- an icon or the social image is missing from `dist/`.

**So: adding a page means adding it to `ROUTES` in `src/seo/siteMeta.js`.** If
you forget, the build stops and tells you.

## Copy that lives in two places on purpose

| What | Where it lives | Also used as |
| --- | --- | --- |
| Brand positioning statement | `src/content/brand.js` | Visible homepage copy + `Organization.description` |
| FAQ questions and answers | `src/content/faqs.js` | The FAQ page + `FAQPage` structured data |
| Subscription plans and prices | `src/content/plans.js` | The Subscribe page + `Product`/`Offer` structured data |

Structured data must describe content that is actually visible on the page.
Sharing one array is what guarantees it does.

> **Prices:** `checkoutPrice` in `src/content/plans.js` is what the customer is
> actually charged at the linked Shopify URL. If a price changes in Shopify,
> change it here too — stale price markup is a Google policy problem, not just an
> inaccuracy.

## Structured data: what is present and what is deliberately absent

Present: `Organization`, `WebSite`, `WebPage` (every page), `FAQPage` (/faq),
`Product` with three real `Offer`s (/subscribe).

Deliberately absent, and please keep it that way unless the underlying facts
change:

- **`LocalBusiness`** — there is no storefront or published address. It is also
  the single most likely thing to reinforce Google's "Pet store" classification.
- **`Review` / `AggregateRating`** — the testimonials carry no ratings and use
  pseudonymous names. Inventing them risks a manual action.
- **`BreadcrumbList`** — the site shows no visible breadcrumb trail, and Google's
  guidelines ask that markup reflect visible content. Add visible breadcrumbs
  first if you want this.

Google Search Console will report "missing field `aggregateRating`" and
"missing field `review`" on the Product. Those are **non-critical warnings**, not
errors, and they are the correct state for this site.

## Images

| File | Size | Purpose |
| --- | --- | --- |
| `public/images/branding/og-pup-o-clock.png` | 1200×630 | Social sharing card |
| `public/images/branding/icon-512.png` | 512×512 | Favicon — Google needs it square |
| `public/images/branding/apple-touch-icon.png` | 180×180 | iOS home screen |

All three are composites of existing brand assets: the logo lockup
(`open-graph-2025_Pupoclock-logo-removebg-preview.png`) over the brand pattern
(`backgrounds/newbackground.webp`) or a white field. No new artwork was
introduced. Replace them with designed versions any time — keep the dimensions.

## Verifying after a deploy

```bash
curl -s https://pupoclock.com/faq | grep -o '<title>.*</title>'
curl -s https://pupoclock.com/robots.txt
curl -s https://pupoclock.com/sitemap.xml
curl -sI https://pupoclock.com/this-page-does-not-exist | head -1   # expect 404
```

Then Google's [Rich Results Test](https://search.google.com/test/rich-results)
and Facebook's Sharing Debugger for the social card.

## What the website cannot control

The "Pet store" label and the star rating in Google's business panel come from
the **Google Business Profile**, not from this codebase. No markup here can
override that. See the Search Console / Business Profile notes handed over with
this work.
