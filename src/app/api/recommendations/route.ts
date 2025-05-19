import { NextResponse } from "next/server"
import { getRecommendedProducts } from "@/lib/product"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const cartItemsParam = searchParams.get("cartItems") || ""

    // Parse cart item IDs
    const cartItemIds = cartItemsParam ? cartItemsParam.split(",") : []

    // Get recommended products
    const recommendations = getRecommendedProducts(cartItemIds)

    return NextResponse.json(recommendations)
  } catch (error) {
    console.error("Error fetching recommendations:", error)
    return NextResponse.json({ error: "Failed to fetch recommendations" }, { status: 500 })
  }
}
