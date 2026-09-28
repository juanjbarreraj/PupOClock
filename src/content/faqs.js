/**
 * Frequently asked questions.
 *
 * Single source of truth: rendered by `src/pages/FAQ.jsx` and re-used by
 * `src/seo/siteMeta.js` to emit FAQPage structured data. Keeping one array
 * means the visible answers and the markup can never drift apart, which is
 * exactly what Google's structured-data guidelines require.
 *
 * These answers are published as machine-readable FAQPage data, so anything
 * out of date here is a claim Google holds on file rather than a typo. The
 * first three were updated when box sales were paused; revisit them alongside
 * `salesPaused` in src/content/relaunch.js when sales reopen.
 */

/** @typedef {{ q: string, a: string }} Faq */

/** @type {Faq[]} */
export const FAQS = [
  {
    q: 'Can I order a box right now?',
    a: "Not at the moment. We have paused subscriptions while we redesign the Pup O'Clock box from the ground up. The new box launches in November and we are launching it on Kickstarter. Sign up on our Subscriptions page and we will email you the moment it goes live.",
  },
  {
    q: "What is Pup O'Clock?",
    a: "Pup O'Clock is a monthly subscription box designed for kids and dogs. Each box is packed with vet-approved enrichment, training tools, games, treats, and fun surprises that help the whole family bond with their dog.",
  },
  {
    q: 'How much does it cost?',
    a: 'Pricing for the redesigned box will be announced in November. Before the pause, our Flagship Box was $34.99 a month, included over $99 in value, and shipping was always free.',
  },
  {
    q: 'When will my box ship?',
    a: "Boxes are not shipping while subscriptions are paused. Once the new box launches in November, boxes ship at the beginning of each month and you'll receive a tracking number once yours is on its way.",
  },
  {
    q: 'Can I cancel anytime?',
    a: "Yes! You can cancel your subscription at any time with no fees or penalties. If you cancel before your next billing date, you won't be charged again.",
  },
  {
    q: 'Is the box safe for my dog?',
    a: "Absolutely. All items in the box are vet-approved and designed with your dog's safety and well-being in mind.",
  },
  {
    q: 'What age is this box for?',
    a: 'The box is designed for children ages 4–12, though the whole family can enjoy it! All activities are kid-friendly and supervised adult participation is encouraged.',
  },
  {
    q: "Does Pup O'Clock support shelters?",
    a: 'Yes! A portion of every box sold is donated to our partner animal shelters to help dogs in need find loving homes.',
  },
  {
    q: "What if I'm not satisfied?",
    a: "We offer a satisfaction guarantee. If you're not happy with your first box, contact us and we'll make it right, no questions asked.",
  },
];
