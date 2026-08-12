/**
 * The brand-approved positioning statement, verbatim.
 *
 * Rendered as visible homepage copy (`src/components/WhoWeAre.jsx`) and re-used
 * as the Organization description in structured data (`src/seo/siteMeta.js`).
 *
 * It is deliberately *not* the meta description: at 299 characters Google would
 * cut it around "…designed to empower the ", spending the visible snippet before
 * a reader learns what Pup O'Clock is. The shorter, search-facing wording lives
 * in `HOME_DESCRIPTION` in src/seo/siteMeta.js and says the same thing in 160.
 *
 * Changing this string changes both the page and the markup. That is the point.
 */
export const BRAND_STATEMENT =
  'Get ready to transform playtime into purpose-driven edutainment! ' +
  "Pup O'Clock is the premier, monthly curated subscription box designed to " +
  'empower the next generation of pet parents. We seamlessly blend education, ' +
  'enrichment, and pure entertainment to teach kids the art of responsible dog ownership.';
