import { useEffect } from 'react';
import {
  ROUTE_MAP,
  SITE_NAME,
  LOCALE,
  TWITTER_HANDLE,
  SITE_URL,
  OG_IMAGE,
  OG_IMAGE_WIDTH,
  OG_IMAGE_HEIGHT,
  NOINDEX_ROUTES,
  absolute,
  structuredDataFor,
} from '../seo/siteMeta';

/**
 * Keeps the document head correct across client-side navigation.
 *
 * The authoritative copy of these tags is baked into a static HTML file per
 * route by `scripts/build-seo.mjs`, so crawlers that do not run JavaScript
 * (Bing, and every social-media scraper) still see them. This component exists
 * so that a visitor who navigates in-app, and Googlebot's rendered pass, ends
 * up with a head that matches the page actually on screen, rather than the head
 * of whichever page was loaded first.
 *
 * Every tag it manages carries `data-seo`, so it updates in place instead of
 * accumulating duplicates.
 *
 * Deliberately dependency-free: react-helmet-async would add a runtime
 * dependency to solve a problem the prerender already solves better.
 */

const NOINDEX_PATHS = new Set(NOINDEX_ROUTES.map((r) => r.path));

function upsert(selector, create, attrs) {
  const head = document.head;
  let el = head.querySelector(selector);
  if (!el) {
    el = create();
    el.setAttribute('data-seo', '');
    head.appendChild(el);
  }
  Object.entries(attrs).forEach(([k, v]) => el.setAttribute(k, v));
  return el;
}

function meta(nameOrProperty, content, useProperty = false) {
  const attr = useProperty ? 'property' : 'name';
  upsert(
    `meta[${attr}="${nameOrProperty}"]`,
    () => document.createElement('meta'),
    { [attr]: nameOrProperty, content },
  );
}

export default function Seo({ path }) {
  useEffect(() => {
    const route = ROUTE_MAP[path] || ROUTE_MAP['/'];
    const url = absolute(route.path);
    const image = `${SITE_URL}${route.image || OG_IMAGE}`;
    const noindex = NOINDEX_PATHS.has(route.path);

    document.title = route.title;

    meta('description', route.description);
    meta('robots', noindex ? 'noindex, follow' : 'index, follow');

    // The 404 view answers for arbitrary unmatched paths, so it must not claim
    // a canonical URL. Remove any canonical inherited from a previous route.
    const existingCanonical = document.head.querySelector('link[rel="canonical"]');
    if (noindex) {
      if (existingCanonical) existingCanonical.remove();
    } else {
      upsert('link[rel="canonical"]', () => {
        const el = document.createElement('link');
        el.setAttribute('rel', 'canonical');
        return el;
      }, { href: url });
    }

    meta('og:type', route.type || 'website', true);
    meta('og:site_name', SITE_NAME, true);
    meta('og:locale', LOCALE, true);
    meta('og:title', route.title, true);
    meta('og:description', route.description, true);
    meta('og:url', url, true);
    meta('og:image', image, true);
    meta('og:image:width', String(OG_IMAGE_WIDTH), true);
    meta('og:image:height', String(OG_IMAGE_HEIGHT), true);
    meta('og:image:alt', `${SITE_NAME}: ${route.title}`, true);

    meta('twitter:card', 'summary_large_image');
    meta('twitter:site', TWITTER_HANDLE);
    meta('twitter:title', route.title);
    meta('twitter:description', route.description);
    meta('twitter:image', image);

    const ld = upsert(
      'script[type="application/ld+json"][data-seo]',
      () => {
        const el = document.createElement('script');
        el.setAttribute('type', 'application/ld+json');
        return el;
      },
      {},
    );
    ld.textContent = JSON.stringify(structuredDataFor(route.path));
  }, [path]);

  return null;
}
