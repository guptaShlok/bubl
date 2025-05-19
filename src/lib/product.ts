import type { Product } from "./types"

// Sample products data
export const products: Product[] = [
  {
    id: "babybubl-1",
    name: "Baby Bubl Air Purifier",
    description: "Advanced air purification for your baby's room",
    price: 49999,
    image: "/backgroundImages/productPage/productLandingPageOverlay.png",
    category: "air-purifiers",
  },
  {
    id: "hepa-filter-1",
    name: "HEPA Filter Replacement",
    description: "High-efficiency particulate air filter for Bubl purifiers",
    price: 4999,
    image: "/backgroundImages/accessories/HepaFilters.png",
    category: "accessories",
  },
  {
    id: "bubl-controller-1",
    name: "Bubl Controller",
    description: "Control your Bubl devices from anywhere",
    price: 5999,
    image: "/backgroundImages/accessories/BublController.png",
    category: "accessories",
  },
]
export function getAllProducts(): Product[] {
  return products
}

/**
 * Get a product by its ID
 * @param id - The product ID to find
 * @returns The product if found, undefined otherwise
 */
export function getProductById(id: string): Product | undefined {
  return products.find((product) => product.id === id)
}

/**
 * Get products by category
 * @param category - The category to filter by
 * @returns Array of products in the specified category
 */
export function getProductsByCategory(category: string): Product[] {
  return products.filter((product) => product.category === category)
}

/**
 * Get recommended products based on cart items
 * @param cartItemIds - Array of product IDs in the cart
 * @returns Array of recommended products not in the cart
 */
export function getRecommendedProducts(cartItemIds: string[]): Product[] {
  // If cart is empty, return some popular products
  if (cartItemIds.length === 0) {
    return products.slice(0, 2)
  }

  // Get categories of items in cart
  const cartItems = cartItemIds.map((id) => getProductById(id)).filter((item): item is Product => item !== undefined)

  const cartCategories = new Set(cartItems.map((item) => item.category))

  // Find products in the same categories but not in cart
  const recommendations = products.filter(
    (product) => !cartItemIds.includes(product.id) && cartCategories.has(product.category),
  )

  // If we don't have enough recommendations, add some popular products
  if (recommendations.length < 2) {
    const additionalProducts = products.filter(
      (product) => !cartItemIds.includes(product.id) && !recommendations.some((rec) => rec.id === product.id),
    )
    return [...recommendations, ...additionalProducts].slice(0, 2)
  }

  return recommendations.slice(0, 2)
}