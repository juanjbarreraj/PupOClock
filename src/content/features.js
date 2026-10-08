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
 * The Who We Help page (src/pages/WhoWeHelp.jsx), currently an
 * under-construction placeholder.
 *
 * false = the /who-we-help route is not registered (it returns the 404 page),
 * the page is not prerendered, its footer link is hidden, and the dropdown
 * under "About" in the header disappears, leaving About as a plain link.
 */
export const WHO_WE_HELP_ENABLED = false;

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

/**
 * The homepage intro (src/components/IntroOverlay.jsx): the box pulls back
 * from its logo, pops open, and the month's contents burst out before the
 * page appears. Plays once per browser tab session, on the homepage only, and
 * never for visitors who ask their device for reduced motion.
 *
 * false = the intro never plays and the hero animates in on load exactly as
 * it did before. The video files in public/intro/ are then never downloaded.
 */
export const INTRO_ENABLED = true;
