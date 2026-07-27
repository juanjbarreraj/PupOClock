// Versioned localStorage persistence for the SWAG cart.
//
// Storage shape (key: pupoclock_cart_v1):
//   { version: 1, updatedAt: "ISO", items: [{ productId, variantId, qty }] }
//
// Only stable identifiers and the user's selections are stored. Everything
// displayable (name, price, image) is rebuilt from the current catalog on
// restore, so a stale price in storage can never be shown or charged, and
// products/variants that no longer exist are silently dropped. Sold-out
// variants are also dropped on restore (checkout would reject them).
// No personal data is ever stored here.

export const CART_KEY = "pupoclock_cart_v1";
export const CART_VERSION = 1;
export const MAX_QTY = 99;

export function serializeCart(items) {
  return {
    version: CART_VERSION,
    updatedAt: new Date().toISOString(),
    items: items.map((i) => ({ productId: i.id, variantId: i.variantId, qty: i.qty })),
  };
}

/**
 * Rebuild cart items from a stored JSON string, validated against the
 * current catalog.
 *
 * @returns {Array|null} validated items; [] when nothing was stored;
 *   null when storage is malformed beyond recovery (caller should clear it).
 */
export function reviveCart(raw, products) {
  if (raw == null || raw === "") return [];
  let data;
  try {
    data = JSON.parse(raw);
  } catch {
    return null;
  }
  if (typeof data !== "object" || data === null || data.version !== CART_VERSION || !Array.isArray(data.items)) {
    return null;
  }

  const out = [];
  for (const entry of data.items) {
    if (typeof entry !== "object" || entry === null) continue;

    const product = products.find((p) => p.id === entry.productId);
    if (!product) continue; // product removed from the catalog

    const variant = product.sizes.find((s) => s.variantId === String(entry.variantId));
    if (!variant || !variant.available) continue; // variant removed or sold out

    const qty = Math.floor(Number(entry.qty));
    if (!Number.isFinite(qty) || qty < 1) continue;

    const hasSizes = product.sizeOptions && product.sizeOptions.length > 0;
    const name = hasSizes ? `${product.name} (${variant.label})` : product.name;

    // Merge duplicates (same product + variant stored twice)
    const existing = out.find((i) => i.name === name);
    if (existing) {
      existing.qty = Math.min(existing.qty + qty, MAX_QTY);
      continue;
    }
    out.push({
      ...product,
      name,
      variantId: variant.variantId,
      price: variant.price, // always current catalog price, never the stored one
      qty: Math.min(qty, MAX_QTY),
    });
  }
  return out;
}
