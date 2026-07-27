# Domain migration plan — pupoclock.com

**Do not change any DNS until the Netlify deployment has passed full testing on its
`*.netlify.app` URL.** The current Base44/Render deployment stays live untouched
throughout; it is the rollback.

## Current state (verified 2026-07-27, read-only)

- Registrar/DNS: **GoDaddy** (nameservers `ns37/ns38.domaincontrol.com`)
- Canonical host: **apex** — `https://pupoclock.com` (www 301-redirects to apex)
- Web records now: apex `A 216.24.57.1` (Render, Base44's host);
  `www CNAME base44.onrender.com`
- **Email: Google Workspace** — MX `aspmx.l.google.com` (+ alt1–alt4)
- Other records seen: SPF TXT (`v=spf1 include:dc-...._spfm.pupoclock.com ~all`),
  two `google-site-verification` TXTs

## Records that must NOT be touched

Everything except the two web records. In particular:

- All five **MX** records (Google Workspace mail delivery)
- The **SPF** TXT record and its `_spfm` include subdomain record
- Any **DKIM** record (usually `google._domainkey` CNAME/TXT)
- Any **DMARC** record (`_dmarc` TXT)
- Both `google-site-verification` TXT records
- Any other TXT/CNAME verification records present in the zone

Before changing anything: in GoDaddy → DNS → **export the zone file** and save it in a
safe place. That export is the DNS rollback.

## Cutover sequence

1. Netlify site fully tested on `*.netlify.app` (checkout, contact delivery, routes,
   mobile).
2. Netlify → Domain management → **Add domain** `pupoclock.com` → also add
   `www.pupoclock.com`. Set **`pupoclock.com` as the primary domain** (keeps the
   current canonical apex; Netlify then 301s www → apex automatically, matching today's
   behavior).
3. In GoDaddy DNS, change **only** these two records (note current values first):
   - `A @` : `216.24.57.1` → **`75.2.60.5`** (Netlify's load balancer)
   - `CNAME www` : `base44.onrender.com` → **`<your-site>.netlify.app`**
   Lower the TTL to 600s if GoDaddy allows before the change.
4. Wait for propagation (minutes to ~1h with low TTL; up to 48h worst case).
   Netlify's domain panel will show DNS verified, then issue the **Let's Encrypt
   certificate** automatically (needs both records resolving).
5. Verify (see checklist below). Keep the Base44 deployment live for at least a week.

## Post-change verification

- `https://pupoclock.com` loads the new site with a valid certificate
- `https://www.pupoclock.com` 301-redirects to the apex
- Deep links (`/swag`, `/contact`) load directly and on refresh
- Shopify checkout works from the custom domain (stop before payment)
- Contact form delivers to info@pupoclock.com
- **Email still works**: send a test email to and from an `@pupoclock.com` address;
  `dig MX pupoclock.com` unchanged
- No browser console errors; network panel shows no Base44/Render/Webflow requests

## Rollback

Restore the two web records to their noted previous values (`A @ 216.24.57.1`,
`www CNAME base44.onrender.com`). The Base44 deployment is still live, so the old site
returns as DNS propagates. Email is unaffected either way because MX/TXT were never
touched.

## Decommissioning Base44 (last step, after ≥1 week stable)

Only after the checklist has passed and stayed stable: cancel the Base44 subscription.
Nothing else references it — code, assets, and fonts are all local to this repo.
