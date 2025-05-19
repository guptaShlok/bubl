import { type NextRequest, NextResponse } from "next/server"
import crypto from "crypto"
import type { CartItem } from "@/lib/types"

interface CreateOrderRequest {
  amount: number
  items: CartItem[]
}

interface CreateOrderResponse {
  orderId: string
  success: boolean
}

export async function POST(request: NextRequest): Promise<NextResponse<CreateOrderResponse | { error: string }>> {
  try {
    const body = (await request.json()) as CreateOrderRequest

    if (!body.amount || body.amount <= 0) {
      return NextResponse.json({ error: "Invalid amount" }, { status: 400 })
    }

    // In a real implementation, you would call the Razorpay API to create an order
    // For this example, we'll generate a mock order ID
    const orderId = `rzp_order_${crypto.randomBytes(6).toString("hex").toUpperCase()}`

    return NextResponse.json({
      orderId,
      success: true,
    })
  } catch (error) {
    console.error("Error creating Razorpay order:", error instanceof Error ? error.message : String(error))
    return NextResponse.json({ error: "Failed to create order" }, { status: 500 })
  }
}
