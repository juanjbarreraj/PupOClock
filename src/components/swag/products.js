// ── Pup O'Clock Swag catalog ──
// Names, descriptions, images and size guides are maintained by hand below.
// Sizes, variant IDs, prices and availability come from variants.json, which
// is generated from the live Shopify store: npm run check:catalog -- --write
// (see docs/shopify-catalog-maintenance.md).
import VARIANTS from "./variants.json" with { type: "json" };

const M = "/images/products/";

// ── Size guides / product details (shown in the product modal) ──
const YOUTH_TEE_GUIDE = `Body Length - Measured from the highest part of the shoulder to the finished hem at back.
XS: 18", SM: 20", MD: 22", LG: 24", XL: 26"

Body Width - Measured across the chest one inch below armhole when laid flat.
XS: 14", SM: 15", MD: 17", LG: 18", XL: 20"`;

const YOUTH_FLEECE_GUIDE = `Body Length - Measured from the highest part of the shoulder to the finished hem at back.
XS: 20", SM: 21", MD: 22", LG: 24", XL: 26"

Body Width - Measured across the chest one inch below armhole when laid flat.
XS: 16", SM: 17", MD: 18", LG: 19", XL: 20"`;

const ADULT_TEE_GUIDE = `Body Length - Measured from the highest part of the shoulder to the finished hem at back.
XS: 26", SM: 28", MD: 29", LG: 30", XL: 31", 2X: 32", 3X: 33", 4X: 34", 5X: 35"

Body Width - Measured across the chest one inch below armhole when laid flat.
XS: 16", SM: 18", MD: 20", LG: 22", XL: 24", 2X: 26", 3X: 28", 4X: 30", 5X: 32"`;

const ADULT_FLEECE_GUIDE = `Body Length - Measured from the highest part of the shoulder to the finished hem at back.
XS: 26", SM: 27", MD: 28", LG: 29", XL: 30", 2X: 31", 3X: 32", 4X: 33", 5X: 34"

Body Width - Measured across the chest one inch below armhole when laid flat.
XS: 18", SM: 20", MD: 22", LG: 24", XL: 26", 2X: 28", 3X: 30", 4X: 32", 5X: 34"`;

const ADULT_POLO_GUIDE = `Body Length - Measured from the highest part of the shoulder to the finished hem at back.
SM: 29", MD: 30", LG: 30", XL: 31", 2X: 32", 3X: 33", 4X: 34"

Chest Circumference - Measured around the chest just below the arm hole.
SM: 40", MD: 43", LG: 47", XL: 50", 2X: 54", 3X: 58", 4X: 62"`;

const HAT_DETAILS = `74% Polyester and 26% Cotton
Crown Height: 3.2"
Hat Sizing: 6 5/8" - 7 5/8", adjustable`;

// Ordered: white shirts → white polos → white sweatshirts → white hoodies →
// black shirts → black sweatshirts → black hoodies → black polos → hats (youth before adult)
const raw = [
  // ── 1. White shirts ──
  { name: "Youth T-Shirt - White", variant: "45405077045505", files: ["YouthTShirtWhite.jpg"], category: "APPAREL", type: "shirt", color: "white", price: "$25.00", description: "Youth white t-shirt sporting the Pup O'Clock logo and made with 4.5oz pre-shrunk 100% ring-spun USA cotton.", dims: YOUTH_TEE_GUIDE },
  { name: "Youth Stacked Logo T-Shirt - White", variant: "45405077471489", files: ["YouthTShirtLogoWhite.jpg", "YouthTShirtLogoWhite2.jpg"], category: "APPAREL", type: "shirt", color: "white", price: "$25.00", description: "Youth white t-shirt sporting the stacked Pup O'Clock logo and made with 4.5oz pre-shrunk 100% ring-spun USA cotton.", dims: YOUTH_TEE_GUIDE },
  { name: "Adult Unisex Logo T-Shirt - White", variant: "45405077963009", files: ["AdultTShirtWhite.jpg"], category: "APPAREL", type: "shirt", color: "white", price: "$25.00", description: "Adult unisex white t-shirt sporting the Pup O'Clock logo and made with 4.5oz pre-shrunk 100% ring-spun USA cotton.", dims: ADULT_TEE_GUIDE },
  { name: "Adult Unisex Stacked Logo T-Shirt - White", variant: "45405078651137", files: ["AdultTShirtLogoWhite.jpg"], category: "APPAREL", type: "shirt", color: "white", price: "$25.00", description: "Adult unisex white t-shirt sporting the stacked Pup O'Clock logo and made with 4.5oz pre-shrunk 100% ring-spun USA cotton.", dims: ADULT_TEE_GUIDE },
  // ── 2. White polos ──
  { name: "Adult Unisex Polo Shirt - White", variant: "45563950235905", files: ["AdultPoloWhite.jpg"], category: "APPAREL", type: "polo", color: "white", price: "$55.00", description: "Adult unisex classic polo in white sporting the blue Pup O'Clock icon logo and made by Adidas with a 50% cotton and 50% polyester blend.", dims: ADULT_POLO_GUIDE },
  // ── 3. White sweatshirts ──
  { name: "Youth Sweatshirt - White", variant: "45405079306497", files: ["YouthSweatshirtWhite.jpg"], category: "APPAREL", type: "sweatshirt", color: "white", price: "$40.00", description: "Youth sweatshirt in white sporting the Pup O'Clock logo and made with an 8oz 50% cotton and 50% polyester blend.", dims: YOUTH_FLEECE_GUIDE },
  { name: "Youth Stacked Logo Sweatshirt - White", variant: "45405079961857", files: ["YouthSweatshirtLogoWhite.jpg"], category: "APPAREL", type: "sweatshirt", color: "white", price: "$40.00", description: "Youth sweatshirt in white sporting the stacked Pup O'Clock logo and made with an 8oz 50% cotton and 50% polyester blend.", dims: YOUTH_FLEECE_GUIDE },
  { name: "Adult Unisex Logo Sweatshirt - White", variant: "45405080387841", files: ["AdultSweatShirtWhite.jpg"], category: "APPAREL", type: "sweatshirt", color: "white", price: "$40.00", description: "Adult unisex sweatshirt in white sporting the Pup O'Clock logo and made with an 8oz 50% cotton and 50% polyester blend.", dims: ADULT_FLEECE_GUIDE },
  { name: "Adult Unisex Stacked Logo Sweatshirt - White", variant: "45405081108737", files: ["AdultSweatShirtLogotWhite.jpg"], category: "APPAREL", type: "sweatshirt", color: "white", price: "$40.00", description: "Adult unisex sweatshirt in white sporting the stacked Pup O'Clock logo and made with an 8oz 50% cotton and 50% polyester blend.", dims: ADULT_FLEECE_GUIDE },
  // ── 4. White hoodies ──
  { name: "Youth Logo Hoodie - White", variant: "45405081927937", files: ["YouthHoodieWhite.jpg"], category: "APPAREL", type: "hoodie", color: "white", price: "$45.00", description: "Youth hoodie in white sporting the Pup O'Clock logo and made with an 8oz 50% cotton and 50% polyester blend.", dims: YOUTH_FLEECE_GUIDE },
  { name: "Youth Stacked Logo Hoodie - White", variant: "45405082288385", files: ["YouthHoodieLogoWhite.jpg"], category: "APPAREL", type: "hoodie", color: "white", price: "$45.00", description: "Youth hoodie in white sporting the stacked Pup O'Clock logo and made with an 8oz 50% cotton and 50% polyester blend.", dims: YOUTH_FLEECE_GUIDE },
  { name: "Adult Unisex Logo Hoodie - White", variant: "45405082779905", files: ["AdultHoodieWhite.jpg"], category: "APPAREL", type: "hoodie", color: "white", price: "$45.00", description: "Adult unisex hoodie in white sporting the Pup O'Clock logo and made with an 8oz 50% cotton and 50% polyester blend.", dims: ADULT_FLEECE_GUIDE },
  { name: "Adult Unisex Stacked Logo Hoodie - White", variant: "45405083533569", files: ["AdultHoodieLogoWhite.jpg"], category: "APPAREL", type: "hoodie", color: "white", price: "$45.00", description: "Adult unisex hoodie in white sporting the stacked Pup O'Clock logo and made with an 8oz 50% cotton and 50% polyester blend.", dims: ADULT_FLEECE_GUIDE },
  // ── 5. Black shirts ──
  { name: "Youth T-Shirt - Black", variant: "45405077307649", files: ["YouthTShirtBlack.jpg", "YouthTShirtBlack2.jpg"], category: "APPAREL", type: "shirt", color: "black", price: "$25.00", description: "Youth black t-shirt sporting the Pup O'Clock logo and made with 4.5oz pre-shrunk 100% ring-spun USA cotton.", dims: YOUTH_TEE_GUIDE },
  { name: "Youth Stacked Logo T-Shirt - Black", variant: "45405077766401", files: ["YouthTShirtLogoBlack.jpg", "YouthTShirtLogoBlack2.jpg"], category: "APPAREL", type: "shirt", color: "black", price: "$25.00", description: "Youth black t-shirt sporting the stacked Pup O'Clock logo and made with 4.5oz pre-shrunk 100% ring-spun USA cotton.", dims: YOUTH_TEE_GUIDE },
  { name: "Adult Unisex Logo T-Shirt - Black", variant: "45405078323457", files: ["AdultTShirtBlack.jpg"], category: "APPAREL", type: "shirt", color: "black", price: "$25.00", description: "Adult unisex black t-shirt sporting the Pup O'Clock logo and made with 4.5oz pre-shrunk 100% ring-spun USA cotton.", dims: ADULT_TEE_GUIDE },
  { name: "Adult Unisex Stacked Logo T-Shirt - Black", variant: "45405078978817", files: ["AdultTShirtLogoBlack.jpg", "AdultTShirtLogoBlack2.jpg"], category: "APPAREL", type: "shirt", color: "black", price: "$25.00", description: "Adult unisex black t-shirt sporting the stacked Pup O'Clock logo and made with 4.5oz pre-shrunk 100% ring-spun USA cotton.", dims: ADULT_TEE_GUIDE },
  // ── 6. Black sweatshirts ──
  { name: "Youth Sweatshirt - Black", variant: "45405079503105", files: ["YouthSweatshirtBlack.jpg"], category: "APPAREL", type: "sweatshirt", color: "black", price: "$40.00", description: "Youth sweatshirt in black sporting the Pup O'Clock logo and made with an 8oz 50% cotton and 50% polyester blend.", dims: YOUTH_FLEECE_GUIDE },
  { name: "Youth Stacked Logo Sweatshirt - Black", variant: "45405080158465", files: ["YouthSweatshirtLogoBlack.jpg"], category: "APPAREL", type: "sweatshirt", color: "black", price: "$40.00", description: "Youth black sweatshirt sporting the stacked Pup O'Clock logo and made with an 8oz 50% cotton and 50% polyester blend.", dims: YOUTH_FLEECE_GUIDE },
  { name: "Adult Unisex Logo Sweatshirt - Black", variant: "45405080781057", files: ["AdultSweatShirtBlack.jpg"], category: "APPAREL", type: "sweatshirt", color: "black", price: "$40.00", description: "Adult unisex sweatshirt in black sporting the Pup O'Clock logo and made with an 8oz 50% cotton and 50% polyester blend.", dims: ADULT_FLEECE_GUIDE },
  { name: "Adult Unisex Stacked Logo Sweatshirt - Black", variant: "45405081469185", files: ["AdultSweatShirtLogoBlack.jpg"], category: "APPAREL", type: "sweatshirt", color: "black", price: "$40.00", description: "Adult unisex sweatshirt in black sporting the stacked Pup O'Clock logo and made with an 8oz 50% cotton and 50% polyester blend.", dims: ADULT_FLEECE_GUIDE },
  // ── 7. Black hoodies ──
  { name: "Youth Hoodie - Black", variant: "45405082091777", files: ["YouthHoodieBlack.jpg"], category: "APPAREL", type: "hoodie", color: "black", price: "$45.00", description: "Youth hoodie in black sporting the Pup O'Clock logo and made with an 8oz 50% cotton and 50% polyester blend.", dims: YOUTH_FLEECE_GUIDE },
  { name: "Youth Stacked Logo Hoodie - Black", variant: "45405082517761", files: ["YouthHoodieLogoBlack.jpg"], category: "APPAREL", type: "hoodie", color: "black", price: "$45.00", description: "Youth hoodie in black sporting the stacked Pup O'Clock logo and made with an 8oz 50% cotton and 50% polyester blend.", dims: YOUTH_FLEECE_GUIDE },
  { name: "Adult Unisex Logo Hoodie - Black", variant: "45405083173121", files: ["AdultHoodieBlack.jpg"], category: "APPAREL", type: "hoodie", color: "black", price: "$45.00", description: "Adult unisex hoodie in black sporting the Pup O'Clock logo and made with an 8oz 50% cotton and 50% polyester blend.", dims: ADULT_FLEECE_GUIDE },
  { name: "Adult Unisex Stacked Logo Hoodie - Black", variant: "45405083861249", files: ["AdultHoodieLogoBlack.jpg"], category: "APPAREL", type: "hoodie", color: "black", price: "$45.00", description: "Adult unisex hoodie in black sporting the stacked Pup O'Clock logo and made with an 8oz 50% cotton and 50% polyester blend.", dims: ADULT_FLEECE_GUIDE },
  // ── 8. Black polos ──
  { name: "Adult Unisex Polo Shirt - Black", variant: "45563950498049", files: ["AdultBlackPolo.jpg", "AdultBlackPolo2.jpg"], category: "APPAREL", type: "polo", color: "black", price: "$55.00", description: "Adult unisex classic polo in black sporting the yellow Pup O'Clock icon logo and made by Adidas with a 50% cotton and 50% polyester blend.", dims: ADULT_POLO_GUIDE },
  // ── 9. Hats / accessories ──
  { name: "Classic Trucker Hat - Yellow Icon", variant: "45405085073665", files: ["YellowHat.jpg"], category: "HAT", type: "hat", color: "yellow", price: "$25.00", description: "Black classic trucker hat sporting the Pup O'Clock icon in Pup O'Clock yellow.", dims: HAT_DETAILS },
  { name: "Classic Trucker Hat - White Icon", variant: "45405085008129", files: ["WhiteHat.jpg"], category: "HAT", type: "hat", color: "white", price: "$25.00", description: "Black classic trucker hat sporting the Pup O'Clock icon in white.", dims: HAT_DETAILS },
  { name: "Classic Trucker Hat - Red Icon", variant: "45405084877057", files: ["RedHat.jpg"], category: "HAT", type: "hat", color: "red", price: "$25.00", description: "Black classic trucker hat sporting the Pup O'Clock icon in Pup O'Clock red.", dims: HAT_DETAILS },
  { name: "Classic Trucker Hat - Color", variant: "45405085204737", files: ["ColorHat.jpg"], category: "HAT", type: "hat", color: "multi", price: "$25.00", description: "Red and white classic trucker hat sporting the three-color Pup O'Clock logo.", dims: HAT_DETAILS },
  { name: "Classic Trucker Hat - Blue Icon", variant: "45405084811521", files: ["BlueHat.jpg"], category: "HAT", type: "hat", color: "blue", price: "$25.00", description: "Black classic trucker hat sporting the Pup O'Clock icon in Pup O'Clock blue.", dims: HAT_DETAILS },
];

export const PRODUCTS = raw.map((p, i) => {
  const live = VARIANTS[p.name];
  if (!live) throw new Error(`No Shopify variant data for "${p.name}" — run: npm run check:catalog -- --write`);
  return {
    id: i + 1,
    name: p.name,
    images: p.files.map((f) => M + f),
    image: M + p.files[0],
    img: M + p.files[0], // alias used by cart drawer thumbnails
    category: p.category,
    type: p.type,
    color: p.color,
    price: p.price,
    description: p.description,
    // Real per-size Shopify variants: [{ label, variantId, price, available }]
    sizes: live.sizes,
    sizeOptions: p.category === "APPAREL" ? live.sizes.map((s) => s.label) : [],
    quantity: 1,
    onSale: false,
    dimensionsText: p.dims,
    variantId: live.sizes[0].variantId,
    shopifyUrl: live.url,
  };
});