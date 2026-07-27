# Shopify catalog maintenance

The SWAG storefront does **not** call Shopify at runtime. Product data lives in two files:

| File | Contents | Maintained |
|---|---|---|
| `src/components/swag/products.js` | Names, descriptions, images, size guides, categories | **By hand** |
| `src/components/swag/variants.json` | Per-size Shopify variant IDs, prices, availability, product URLs | **Generated** from the live store |

Checkout builds a Shopify cart permalink
(`https://pupoclockshop.myshopify.com/cart/VARIANT_ID:QTY,...`) from the variant IDs in
`variants.json`, so correctness of that file is what makes the right size and price reach
Shopify.

## Updating variant data (prices, sizes, availability)

Whenever products change in the Shopify admin — price edits, new sizes, items sold out or
restocked, new products:

```bash
npm run check:catalog              # report drift between variants.json and the live store
npm run check:catalog -- --write   # regenerate variants.json from the live store
```

Review the diff, then commit. Pushing to `main` deploys it.

The check reads the store's **public** product feed (`/products.json`) — no credentials
are involved and none must ever be added to this repo.

## Adding a new product

1. Add the product in Shopify.
2. Add its image(s) to `public/images/products/`.
3. Add an entry to `raw` in `products.js` (name must match the Shopify product title,
   or add an alias in `scripts/check-catalog.mjs` `TITLE_ALIAS`).
4. Run `npm run check:catalog -- --write`.
5. `npm run dev` and verify the card, modal, sizes, and prices.

## Removing a product

Remove its `raw` entry. (A product left in `variants.json` but not in `products.js` is
harmless; the next `--write` cleans it up.)

## What can drift, and what it costs

- **Price drift**: the site displays local prices, but Shopify always charges its own —
  drift misleads customers, it never misbills them. The `check:catalog` script catches it.
- **Availability drift**: a sold-out size still marked available sends the customer to a
  checkout that Shopify will refuse to fulfil; run the check after inventory changes.
- **Removed variants**: a deleted variant ID in a cart permalink makes Shopify drop that
  line item silently — the strongest reason to keep `variants.json` fresh.

Consider running `npm run check:catalog` in CI (it exits non-zero on drift) or on a
schedule if catalog edits become frequent. Card prices in the grid show each product's
base price; the modal shows the exact per-size price (larger adult sizes cost more).

## Testing checkout safely

Add items to the cart on the site, click "Checkout on Shopify", and confirm the checkout
page lists the right products, sizes, quantities, and prices. **Stop before payment.**
No test ever needs to complete a purchase.
