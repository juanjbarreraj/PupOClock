/**
 * The November relaunch.
 *
 * Box sales are paused while the box is redesigned. Everything about that state
 * lives here so turning sales back on is one change in one file rather than a
 * hunt through components.
 *
 * To reopen sales in November:
 *   1. set `salesPaused` to false
 *   2. restore the Shopify links in src/content/plans.js if they changed
 *   3. re-enable the Offer markup flagged in src/seo/siteMeta.js
 *   4. review the FAQ answers in src/content/faqs.js (prices, shipping, cancelling)
 *
 * `salesPaused` is what the components actually branch on, so the site cannot
 * end up half-paused.
 */

/** Master switch. True = boxes are not for sale, signup replaces checkout. */
export const salesPaused = true;

/** When the redesigned box arrives. Used in copy, so keep it human-readable. */
export const RELAUNCH_WHEN = 'November 2026';

/** The Netlify Forms form name. Must match the hidden form in index.html. */
export const NOTIFY_FORM_NAME = 'notify';

export const RELAUNCH = {
  kicker: 'Big news',
  headline: 'A brand-new box is coming in November',
  body:
    "We have paused subscriptions while we redesign the Pup O'Clock box from the " +
    'ground up. Same mission, bigger ideas: more to learn, more to build, more to ' +
    'do together. The new box arrives in November and we are launching it on Kickstarter.',
  formLabel: 'Be first to know',
  formHint: 'One email when the new box goes live. Nothing else, ever.',
  placeholder: 'you@email.com',
  cta: 'Notify me',
  /** Hero button, replacing "Get On Pup O'Clock Time!" while sales are paused. */
  heroCta: "Get On The List!",
  /** Subscription plan card button, replacing the Shopify checkout link. */
  planCta: 'Notify Me When It Launches',
  ctaSending: 'Signing you up...',
  success: "You are on the list! We will email you the moment the new box launches.",
  error: 'Something went wrong. Please try again, or email info@pupoclock.com.',

  /** Kicker at the top of the subscription page. */
  planKicker: 'Back in November',
  /** First line of the label on each plan card. The Kickstarter logo sits
   *  directly under it, so the two read as one phrase. */
  planBadge: 'Coming soon on',
  /** Intro under the subscription page title while sales are paused. */
  planIntro:
    "Subscriptions are paused while we redesign the box. Here's a look at the plans, " +
    'and you can order again in November!',
  planNote:
    'Pricing shown is what these plans looked like before the redesign and may change. ' +
    'Sign up below and we will send you the new details first.',
};

/** Anchor id for the signup section, so CTAs elsewhere can scroll to it. */
export const SIGNUP_ANCHOR = 'notify';

/**
 * The Kickstarter section on the homepage (src/components/KickstarterSection.jsx),
 * shown while we wait for the campaign link. When the campaign is live, set
 * `url` and the section turns into a "Back us on Kickstarter" link.
 */
export const KICKSTARTER = {
  /** Shown big next to the Kickstarter logo. */
  date: '10/15',
  kicker: 'Coming',
  line: "Our Kickstarter launches soon. Watch Brian share what's inside the new Pup O'Clock box.",
  /** The campaign page, once it exists. Leave empty until then. */
  url: 'https://www.kickstarter.com/projects/pupoclock/pup-oclock-20-the-subscription-box-for-kids-and-dogs',
  cta: 'Support us on Kickstarter',
};
