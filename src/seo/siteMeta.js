/**
 * Single source of truth for every SEO signal on the site.
 *
 * Consumed by two places, which is the whole point:
 *   1. `src/components/Seo.jsx`  keeps the document head correct during
 *      client-side navigation.
 *   2. `scripts/build-seo.mjs`   bakes the same tags into a real static HTML
 *      file per route at build time, plus generates `sitemap.xml`.
 *
 * Because the route table drives the prerender *and* the sitemap, the two can
 * never disagree about which pages exist. Add a route here and everywhere
 * downstream picks it up.
 *
 * This module is plain ESM with no React and no `@/` alias imports so that a
 * Node build script can import it directly.
 */

import { BRAND_STATEMENT } from '../content/brand.js';
import { FAQS } from '../content/faqs.js';
import { PLANS } from '../content/plans.js';

export { BRAND_STATEMENT };

/** Production origin. The apex is canonical; Netlify 301s www → apex. */
export const SITE_URL = 'https://pupoclock.com';

export const SITE_NAME = "Pup O'Clock";
export const LOCALE = 'en_US';
export const TWITTER_HANDLE = '@PupOclock_';
export const CONTACT_EMAIL = 'info@pupoclock.com';

/** 1200×630 social card. Built from the brand pattern + logo. */
export const OG_IMAGE = '/images/branding/og-pup-o-clock.png';
export const OG_IMAGE_WIDTH = 1200;
export const OG_IMAGE_HEIGHT = 630;

/** Square icon. Google requires a square favicon to show it beside a result. */
export const ICON_SQUARE = '/images/branding/icon-512.png';
export const ICON_APPLE = '/images/branding/apple-touch-icon.png';

/** The brand lockup, used as the Organization logo in structured data. */
export const BRAND_LOGO = '/images/branding/open-graph-2025_Pupoclock-logo-removebg-preview.png';

/** Verified public profiles, mirroring the links in the site footer. */
export const SOCIAL_PROFILES = [
  'https://www.facebook.com/profile.php?id=61559979823020',
  'https://www.instagram.com/pupoclock_/',
  'https://www.tiktok.com/@pupoclock',
  'https://x.com/PupOclock_',
  'https://www.youtube.com/channel/UC7Dxym4-DMp7PxB7aj-yj5A',
];

/**
 * The homepage meta description: the brand-approved statement, trimmed to 148
 * characters so Google prints the whole sentence instead of cutting it off.
 *
 * Google truncates the snippet by pixel width, not character count, at roughly
 * 155 characters on desktop. The approved paragraph runs to 299 and would be cut
 * mid-phrase after "designed to empower the next". This keeps the owner's own
 * words and the four things that have to survive: purpose-driven edutainment,
 * monthly curated subscription box, kids, responsible dog ownership.
 *
 * The full 299-character statement is not lost. It is the visible homepage copy
 * (src/content/brand.js), the Organization description in structured data, and
 * the social share card text, all of which have far more room than a search
 * snippet does.
 */
const HOME_DESCRIPTION =
  'Transform playtime into purpose-driven edutainment. ' +
  "Pup O'Clock is the monthly curated subscription box that teaches kids responsible dog ownership.";

/**
 * Every indexable public route.
 *
 * `path`        the canonical path (no trailing slash except root)
 * `title`       the <title>. Page-distinct word first, so Google has clean
 *                 anchor text if it chooses to render the page as a sitelink.
 * `description` the meta description
 * `image`       optional per-route social image, defaults to OG_IMAGE
 * `type`        Open Graph type
 *
 * @typedef {Object} RouteMeta
 * @property {string} path
 * @property {string} title
 * @property {string} description
 * @property {string} [image]
 * @property {string} [type]
 */

/** @type {RouteMeta[]} */
export const ROUTES = [
  {
    path: '/',
    title: "Pup O'Clock | Educational Dog Subscription Box for Kids",
    description: HOME_DESCRIPTION,
    image: '/images/branding/og-pup-o-clock.png',
    type: 'website',
  },
  {
    path: '/about',
    title: "About Pup O'Clock | Our Mission: Kids, Dogs & Family",
    description:
      "Pup O'Clock was built on one idea: the bond between a child and their dog is worth teaching. " +
      'Meet the team and the mission behind the monthly box that turns pet care into a family adventure.',
  },
  {
    path: '/subscribe',
    title: "Start Your Subscription | Pup O'Clock Monthly Box",
    description:
      'Choose a monthly, 6-month or 12-month plan from $29.75 a box. Every themed box brings kids and ' +
      'dogs vet-approved enrichment, training tools, activities and treats, with free shipping and cancel anytime.',
  },
  {
    path: '/faq',
    title: "FAQ | Pup O'Clock Subscription Box Questions Answered",
    description:
      "What is in the box, who it is for, what it costs, when it ships and how to cancel. The answers to " +
      "the questions families ask most about the Pup O'Clock monthly subscription box.",
  },
  {
    path: '/swag',
    title: "Swag | Official Pup O'Clock Merchandise for Kids & Adults",
    description:
      "Official Pup O'Clock gear for the whole pack: kids' and adults' tees, hoodies, sweatshirts, polos " +
      'and hats. Shop the collection and check out securely.',
  },
  {
    path: '/contact',
    title: "Contact Pup O'Clock | Questions About Your Box",
    description:
      "Questions about a box, an order, a subscription or a partnership? Send the Pup O'Clock team a " +
      'message, or email info@pupoclock.com. We read every one.',
  },
  {
    path: '/privacy',
    title: "Privacy Policy | Pup O'Clock",
    description:
      "How Pup O'Clock collects, uses, stores and protects the information you share with us, and the " +
      'choices you have about it.',
  },
];

/** Routes that must never be indexed. Not in the sitemap; emitted with noindex. */
export const NOINDEX_ROUTES = [
  {
    path: '/404',
    title: "Page Not Found | Pup O'Clock",
    description: 'This page ran off the leash.',
  },
];

/** @type {Record<string, RouteMeta>} */
export const ROUTE_MAP = Object.fromEntries(
  [...ROUTES, ...NOINDEX_ROUTES].map((r) => [r.path, r]),
);

/**
 * Absolute URL for a site-relative path. Root keeps its trailing slash.
 * @param {string} pathname
 * @returns {string}
 */
export function absolute(pathname) {
  if (!pathname || pathname === '/') return `${SITE_URL}/`;
  return `${SITE_URL}${pathname}`;
}

// ── Structured data ──────────────────────────────────────────────────────────
// Only types that are genuinely supported by content visible on the page.
// Deliberately absent: LocalBusiness (no storefront or address is published),
// Review / AggregateRating (testimonials carry no ratings), BreadcrumbList
// (the site shows no visible breadcrumb trail).

const ORG_ID = `${SITE_URL}/#organization`;
const SITE_ID = `${SITE_URL}/#website`;

function organizationNode() {
  return {
    '@type': 'Organization',
    '@id': ORG_ID,
    name: SITE_NAME,
    alternateName: 'Pup O Clock',
    url: `${SITE_URL}/`,
    logo: {
      '@type': 'ImageObject',
      url: `${SITE_URL}${BRAND_LOGO}`,
      width: 690,
      height: 362,
    },
    image: `${SITE_URL}${OG_IMAGE}`,
    description: BRAND_STATEMENT,
    email: CONTACT_EMAIL,
    sameAs: SOCIAL_PROFILES,
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer support',
      email: CONTACT_EMAIL,
      url: `${SITE_URL}/contact`,
      availableLanguage: ['English'],
    },
  };
}

function webSiteNode() {
  return {
    '@type': 'WebSite',
    '@id': SITE_ID,
    url: `${SITE_URL}/`,
    name: SITE_NAME,
    alternateName: 'Pup O Clock',
    description: HOME_DESCRIPTION,
    publisher: { '@id': ORG_ID },
    inLanguage: 'en-US',
  };
}

/** @param {RouteMeta} route */
function webPageNode(route) {
  return {
    '@type': 'WebPage',
    '@id': `${absolute(route.path)}#webpage`,
    url: absolute(route.path),
    name: route.title,
    description: route.description,
    isPartOf: { '@id': SITE_ID },
    about: { '@id': ORG_ID },
    primaryImageOfPage: `${SITE_URL}${route.image || OG_IMAGE}`,
    inLanguage: 'en-US',
  };
}

function faqPageNode() {
  return {
    '@type': 'FAQPage',
    '@id': `${absolute('/faq')}#faq`,
    mainEntity: FAQS.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };
}

function subscriptionProductNode() {
  return {
    '@type': 'Product',
    '@id': `${absolute('/subscribe')}#product`,
    name: "Pup O'Clock Subscription Box",
    description:
      'A monthly curated subscription box for kids and dogs. Each themed box blends education, ' +
      'enrichment and entertainment. Vet-approved training tools, activities, trading cards, guides ' +
      'and treats that teach children responsible dog ownership.',
    image: `${SITE_URL}/images/home/25133_PupOClock-Box-Comp_1200.png`,
    brand: { '@type': 'Brand', name: SITE_NAME },
    category: 'Educational subscription box',
    offers: PLANS.map((plan) => ({
      '@type': 'Offer',
      name: plan.name,
      price: plan.checkoutPrice,
      priceCurrency: 'USD',
      url: plan.link,
      availability: 'https://schema.org/InStock',
      seller: { '@id': ORG_ID },
    })),
  };
}

/**
 * The JSON-LD `@graph` for a route. Organization and WebSite repeat on every
 * page by design. Each page is then self-describing for crawlers that only
 * ever fetch one URL.
 *
 * @param {string} pathname
 * @returns {object}
 */
export function structuredDataFor(pathname) {
  const route = ROUTE_MAP[pathname] || ROUTE_MAP['/'];
  /** @type {Record<string, unknown>[]} */
  const graph = [organizationNode(), webSiteNode(), webPageNode(route)];

  if (route.path === '/faq') graph.push(faqPageNode());
  if (route.path === '/subscribe') graph.push(subscriptionProductNode());

  return { '@context': 'https://schema.org', '@graph': graph };
}
