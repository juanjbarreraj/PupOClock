// Validation tests for cartStorage.js against the real product catalog.
import assert from "node:assert";

const ROOT = new URL("..", import.meta.url).pathname;
const { PRODUCTS } = await import(`${ROOT}src/components/swag/products.js`);
const { reviveCart, serializeCart, CART_VERSION, MAX_QTY } =
  await import(`${ROOT}src/components/swag/cartStorage.js`);

const tee = PRODUCTS.find((p) => p.name === "Adult Unisex Logo T-Shirt - White");
const hat = PRODUCTS.find((p) => p.name === "Classic Trucker Hat - Blue Icon");
const mVariant = tee.sizes.find((s) => s.label === "M");
const x2Variant = tee.sizes.find((s) => s.label === "2X");
const soldOutProduct = PRODUCTS.find((p) => p.sizes.some((s) => !s.available));

const wrap = (items) => JSON.stringify({ version: CART_VERSION, updatedAt: "2026-07-27T00:00:00Z", items });
let n = 0;
const t = (name, fn) => { fn(); console.log(`ok ${++n}. ${name}`); };

t("empty storage -> []", () => {
  assert.deepEqual(reviveCart(null, PRODUCTS), []);
  assert.deepEqual(reviveCart("", PRODUCTS), []);
});

t("corrupted JSON -> null (caller clears)", () => {
  assert.equal(reviveCart("{not json!!", PRODUCTS), null);
});

t("wrong schema / old version -> null", () => {
  assert.equal(reviveCart(JSON.stringify({ hello: 1 }), PRODUCTS), null);
  assert.equal(reviveCart(JSON.stringify({ version: 0, items: [] }), PRODUCTS), null);
  assert.equal(reviveCart(JSON.stringify({ version: CART_VERSION, items: "nope" }), PRODUCTS), null);
});

t("valid single item round-trip, name/price rebuilt from catalog", () => {
  const items = reviveCart(wrap([{ productId: tee.id, variantId: mVariant.variantId, qty: 2 }]), PRODUCTS);
  assert.equal(items.length, 1);
  assert.equal(items[0].name, "Adult Unisex Logo T-Shirt - White (M)");
  assert.equal(items[0].qty, 2);
  assert.equal(items[0].variantId, mVariant.variantId);
  assert.equal(items[0].price, mVariant.price);
});

t("higher-priced size uses that size's current price", () => {
  const items = reviveCart(wrap([{ productId: tee.id, variantId: x2Variant.variantId, qty: 1 }]), PRODUCTS);
  assert.equal(items[0].price, "$27.00");
});

t("stored price is ignored (tamper/outdated)", () => {
  const items = reviveCart(
    wrap([{ productId: tee.id, variantId: mVariant.variantId, qty: 1, price: "$0.01" }]), PRODUCTS);
  assert.equal(items[0].price, mVariant.price);
});

t("unknown product dropped", () => {
  assert.deepEqual(reviveCart(wrap([{ productId: 99999, variantId: mVariant.variantId, qty: 1 }]), PRODUCTS), []);
});

t("unknown variant dropped", () => {
  assert.deepEqual(reviveCart(wrap([{ productId: tee.id, variantId: "00000000000000", qty: 1 }]), PRODUCTS), []);
});

t("negative / zero / NaN / non-numeric qty dropped", () => {
  for (const qty of [-3, 0, NaN, "abc", null, Infinity]) {
    assert.deepEqual(reviveCart(wrap([{ productId: tee.id, variantId: mVariant.variantId, qty }]), PRODUCTS), [], `qty=${qty}`);
  }
});

t("fractional qty floored, oversized qty clamped to MAX_QTY", () => {
  let items = reviveCart(wrap([{ productId: tee.id, variantId: mVariant.variantId, qty: 2.9 }]), PRODUCTS);
  assert.equal(items[0].qty, 2);
  items = reviveCart(wrap([{ productId: tee.id, variantId: mVariant.variantId, qty: 5000 }]), PRODUCTS);
  assert.equal(items[0].qty, MAX_QTY);
});

t("sold-out variant dropped on restore", () => {
  const so = soldOutProduct.sizes.find((s) => !s.available);
  assert.ok(so, "catalog currently has a sold-out variant to test with");
  const items = reviveCart(wrap([{ productId: soldOutProduct.id, variantId: so.variantId, qty: 1 }]), PRODUCTS);
  assert.deepEqual(items, []);
});

t("garbage entries mixed with valid ones -> valid ones survive", () => {
  const items = reviveCart(wrap([
    null, 42, "x",
    { productId: tee.id, variantId: mVariant.variantId, qty: 1 },
    { productId: hat.id, variantId: hat.sizes[0].variantId, qty: 3 },
  ]), PRODUCTS);
  assert.equal(items.length, 2);
  assert.equal(items[1].name, "Classic Trucker Hat - Blue Icon"); // no size suffix for hats
});

t("duplicate entries merged with clamped qty", () => {
  const items = reviveCart(wrap([
    { productId: tee.id, variantId: mVariant.variantId, qty: 60 },
    { productId: tee.id, variantId: mVariant.variantId, qty: 60 },
  ]), PRODUCTS);
  assert.equal(items.length, 1);
  assert.equal(items[0].qty, MAX_QTY);
});

t("serialize -> revive round-trip preserves selections", () => {
  const original = reviveCart(wrap([
    { productId: tee.id, variantId: x2Variant.variantId, qty: 2 },
    { productId: hat.id, variantId: hat.sizes[0].variantId, qty: 1 },
  ]), PRODUCTS);
  const revived = reviveCart(JSON.stringify(serializeCart(original)), PRODUCTS);
  assert.deepEqual(
    revived.map((i) => [i.name, i.variantId, i.qty]),
    original.map((i) => [i.name, i.variantId, i.qty])
  );
});

t("checkout URL from a restored cart uses correct variant IDs", () => {
  const items = reviveCart(wrap([
    { productId: tee.id, variantId: x2Variant.variantId, qty: 2 },
    { productId: hat.id, variantId: hat.sizes[0].variantId, qty: 1 },
  ]), PRODUCTS);
  const url = "https://pupoclockshop.myshopify.com/cart/" + items.map((i) => `${i.variantId}:${i.qty}`).join(",");
  assert.equal(url, `https://pupoclockshop.myshopify.com/cart/${x2Variant.variantId}:2,${hat.sizes[0].variantId}:1`);
});

console.log(`\nall ${n} cart-persistence tests passed`);
