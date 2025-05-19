import { getAllProducts } from "@/lib/product"
import { NextResponse } from "next/server"


export async function GET() {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 300))

  return NextResponse.json(getAllProducts)
}
