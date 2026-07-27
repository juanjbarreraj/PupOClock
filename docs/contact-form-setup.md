# Contact form (Netlify Forms)

The contact form on `/contact` is delivered by **Netlify Forms**. There are no API keys,
no third-party accounts, and nothing secret in the repo.

## How it works

- `index.html` contains a hidden static `<form name="contact" netlify ...>` — Netlify
  scans the deployed HTML at build time and registers the form.
- `src/pages/Contact.jsx` renders the real form and POSTs url-encoded data to `/`
  with `form-name=contact`. Netlify's edge intercepts the POST and stores the submission.
- Spam: a hidden `bot-field` honeypot (submissions that fill it are discarded) plus
  Netlify's built-in Akismet filtering. Client-side: required fields, email type
  validation, length limits (name/email 200, message 5000), and a duplicate-submit guard.
- States: sending (button disabled, "Sending…"), success (confirmation card),
  error (accessible `role="alert"` message with a mailto fallback to info@pupoclock.com).

## Required dashboard configuration (once)

Netlify stores submissions but does **not** email them until a notification is added:

1. Site configuration → Forms → confirm `contact` is listed after the first deploy.
2. Forms → Form notifications → **Add notification → Email notification** →
   `info@pupoclock.com`.
3. Submit a test from the deployed site; confirm delivery (check spam the first time).

Submissions are also always visible under **Forms → contact** in the dashboard, so
nothing is lost if an email notification fails.

## Limits & caveats

- Free tier: 100 submissions/month (dashboard shows usage).
- Delivery only works on deployed sites (production or deploy previews) — on
  `npm run dev` the POST fails and the form shows its error state. That is expected.
- If the form's fields ever change in `Contact.jsx`, mirror the change in the hidden
  form in `index.html`, or Netlify will drop the unknown fields.
