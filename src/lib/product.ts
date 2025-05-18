import type { Product } from "./types"

export const products: Product[] = [
  {
    id: "babybubl",
    name: "Babybubl",
    description: "Advanced air purification system for your baby's room",
    price: 49000,
    image: "/backgroundImages/productPage/productLandingPageOverlay.png",
  },
  {
    id: "hepa-filter",
    name: "Hepa Filter",
    description: "Replacement HEPA filter for your Babybubl device",
    price: 4999,
    image: "/backgroundImages/accessories/HepaFilters.png",
  },
  {
    id: "bubl-controller",
    name: "Bubl Controller",
    description: "Bluetooth controller for your Babybubl device",
    price: 5999,
    image: "/backgroundImages/accessories/BublController.png",
  },
]

export function getProduct(id: string): Product | undefined {
  return products.find((product) => product.id === id)
}

export function getRecommendedProducts(excludeIds: string[]): Product[] {
  return products.filter((product) => !excludeIds.includes(product.id))
}
