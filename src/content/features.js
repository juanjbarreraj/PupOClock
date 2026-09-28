/**
 * Feature switches.
 *
 * Things that are built and kept in the codebase but are not live right now.
 * Nothing here is deleted: flip a switch back to `true`, rebuild, and the
 * feature returns exactly as it was.
 *
 * Plain JS with no imports, because scripts/build-seo.mjs reads it in Node.
 */

/**
 * The Swag store (src/pages/Swag.jsx and src/components/swag/).
 *
 * false = the /swag route is not registered (it returns the 404 page), the
 * page is not prerendered or listed in the sitemap, the Swag links in the
 * header and footer are hidden, and the store code is not loaded.
 */
export const SWAG_ENABLED = false;

/**
 * Anything that links out to Shopify.
 *
 * false = no Shopify checkout links are rendered, the Shopify preconnect hint
 * is stripped from the built HTML, and the Shopify cookie-policy link in the
 * privacy policy is hidden. The URLs themselves stay in src/content/plans.js
 * and src/components/swag/ for when this is switched back on.
 *
 * The Swag store checks out through Shopify, so turn this on before (or with)
 * SWAG_ENABLED.
 */
export const SHOPIFY_ENABLED = false;
