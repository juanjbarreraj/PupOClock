/**
 * Public social profiles.
 *
 * Single source of truth for the header, the footer, and the `sameAs` list in
 * the Organization structured data (src/seo/siteMeta.js imports the URLs from
 * here). Deliberately plain data with no icon components so that the Node build
 * script can import it.
 *
 * `icon` names the glyph the UI should render; the mapping lives in the
 * components that draw them.
 */

/**
 * @typedef {Object} SocialProfile
 * @property {string} icon    One of: instagram | facebook | tiktok | youtube | x
 * @property {string} label   Accessible name
 * @property {string} url
 * @property {boolean} inHeader Whether it appears in the header icon row
 */

/** @type {SocialProfile[]} */
export const SOCIALS = [
  {
    icon: 'instagram',
    label: 'Instagram',
    url: 'https://www.instagram.com/pupoclock_/',
    inHeader: true,
  },
  {
    icon: 'facebook',
    label: 'Facebook',
    url: 'https://www.facebook.com/profile.php?id=61559979823020',
    inHeader: true,
  },
  {
    icon: 'tiktok',
    label: 'TikTok',
    url: 'https://www.tiktok.com/@pupoclock',
    inHeader: true,
  },
  {
    icon: 'youtube',
    label: 'YouTube',
    url: 'https://www.youtube.com/channel/UC7Dxym4-DMp7PxB7aj-yj5A',
    inHeader: true,
  },
  {
    icon: 'x',
    label: 'X',
    url: 'https://x.com/PupOclock_',
    inHeader: false,
  },
];

/** Every profile URL, for structured data. */
export const SOCIAL_URLS = SOCIALS.map((s) => s.url);

/** The subset shown as icons in the site header. */
export const HEADER_SOCIALS = SOCIALS.filter((s) => s.inHeader);
