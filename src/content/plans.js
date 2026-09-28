/**
 * Subscription plans.
 *
 * Single source of truth: rendered by `src/pages/Subscribe.jsx` and re-used by
 * `src/seo/siteMeta.js` to emit Product/Offer structured data.
 *
 * `price` / `per` are the *display* values on the card. `checkoutPrice` is what
 * the customer is actually charged at the linked Shopify URL, which is the value
 * the Offer markup must carry. If a price changes in Shopify, change it here.
 * Both the page and the structured data follow. Stale price markup is a Google
 * policy problem, so this pair must stay honest.
 *
 * While `salesPaused` is true (src/content/relaunch.js) `link` is NOT rendered:
 * the cards show the tiers as a preview and route to the signup instead. The
 * Shopify URLs are kept here, unused, so reopening sales in November is a matter
 * of flipping the switch rather than rebuilding this data.
 */

import { SHOPIFY_ENABLED } from './features.js';

/**
 * @typedef {Object} Plan
 * @property {string} name
 * @property {string} price          Display price on the card
 * @property {string} per            Display unit ("/month", "/box")
 * @property {string} checkoutPrice  Amount actually charged, numeric string (USD)
 * @property {string|null} badge
 * @property {'sm'|'md'|'lg'} size
 * @property {string} link           Shopify product/selling-plan URL. Empty while
 *                                  SHOPIFY_ENABLED is false (src/content/features.js),
 *                                  so the URL is not shipped to the browser at all.
 * @property {string} img
 * @property {string} accent
 * @property {string} accentLight
 * @property {boolean} [featured]
 * @property {{ heading: string|null, text: string }[]} body
 */

/** @type {Plan[]} */
export const PLANS = [
  {
    name: 'Monthly Box',
    price: '$34.99',
    per: '/month',
    checkoutPrice: '34.99',
    badge: null,
    size: 'sm',
    link: SHOPIFY_ENABLED ? 'https://pupoclockshop.myshopify.com/products/pup-oclock-subscription-box-monthly-subscription?selling_plan=3054797057&variant=45368568348929' : '',
    img: '/images/subscription/plan-monthly.webp',
    accent: '#00A9D6',
    accentLight: '#e8f9ff',
    body: [
      {
        heading: null,
        text: "Start with the original Pup O'Clock monthly box, delivered with a fresh theme each month. Each box is made for kids, dogs, and families to learn, play, and bond together.",
      },
      {
        heading: "What's inside:",
        text: 'Each themed box may include stickers, a bandana, training treats, a bone, 2–3 SodaPup items, trading cards, a recipe card, and Pup, Vet, and Enrichment guides.',
      },
      {
        heading: 'Flexibility:',
        text: 'Billed monthly. Cancellable at any time.',
      },
    ],
  },
  {
    name: '6 Month Subscription',
    price: '$31.50',
    per: '/box',
    checkoutPrice: '189.00',
    badge: null,
    size: 'md',
    link: SHOPIFY_ENABLED ? 'https://pupoclockshop.myshopify.com/products/pup-oclock-subscription-box-6-month-subscription?selling_plan=3054829825&variant=45369012748545' : '',
    img: '/images/subscription/plan-6-month.webp',
    accent: '#FF4633',
    accentLight: '#fff0f4',
    body: [
      {
        heading: null,
        text: "Get six months of the Pup O'Clock box experience at a lower price per box. Each month includes a new themed box with activities, treats, trading cards, recipe cards, and dog enrichment content for the whole family.",
      },
      {
        heading: 'Why go 6 months:',
        text: "Same monthly box experience, a new theme every month, and a lower price per box than the monthly plan. Great for families ready for a longer Pup O'Clock routine.",
      },
      {
        heading: 'Billing:',
        text: '$189 billed upfront for 6 months.',
      },
    ],
  },
  {
    name: '12 Month Subscription',
    price: '$29.75',
    per: '/box',
    checkoutPrice: '357.00',
    badge: 'Best Value!',
    size: 'lg',
    link: SHOPIFY_ENABLED ? 'https://pupoclockshop.myshopify.com/products/pup-oclock-subscription-box-12-month-subscription?selling_plan=3054862593&variant=45369029591297' : '',
    featured: true,
    img: '/images/subscription/plan-12-month.webp',
    accent: '#FFCD10',
    accentLight: '#fffce8',
    body: [
      {
        heading: null,
        text: "The best value for families who want the full Pup O'Clock year. Receive a new themed box every month with fresh activities, treats, trading cards, recipe cards, Pup Guide comics, Vet Guide content, and Enrichment Guide activities.",
      },
      {
        heading: 'Why go 12 months:',
        text: "The lowest price per box and a full year of monthly themed boxes. The best way to collect trading cards, build your recipe book, and enjoy the most complete Pup O'Clock experience.",
      },
      {
        heading: 'Billing:',
        text: '$357 billed upfront for 12 months.',
      },
    ],
  },
];
