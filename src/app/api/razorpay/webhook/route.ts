// Add a type-safe implementation for the Razorpay webhook API
import { type NextRequest, NextResponse } from "next/server"
import crypto from "crypto"

import type { CartItem } from "@/lib/types"
import { updatePaymentStatus } from "@/lib/action"

// Razorpay test credentials
const KEY_SECRET = "hgY2wImLdqR0TFLoFa7xJYcS"

interface RazorpayWebhookPayload {
  payload: {
    payment: {
      entity: {
        order_id: string
        id: string
        razorpay_signature: string
        amount: number
        email: string
        notes: {
          items?: string
        }
      }
    }
  }
}

export async function POST(request: NextRequest): Promise<NextResponse<{ success: boolean } | { error: string }>> {
  try {
    console.log("Entering Razorpay webhook handler")

    const body = (await request.json()) as RazorpayWebhookPayload

    // Extract payment details from the webhook payload
    const {
      payload: {
        payment: { entity },
      },
    } = body

    console.log("Webhook payload:", JSON.stringify(entity, null, 2))

    const { order_id, id: paymentId, razorpay_signature, amount, email, notes } = entity

    // Extract orderId from Razorpay's order_id (which might have a prefix)
    const orderId = order_id.replace("order_", "")

    // Verify the signature
    const isValid = verifySignature(order_id, paymentId, razorpay_signature)

    if (!isValid) {
      console.error("Invalid webhook signature")
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 })
    }

    // Parse items from notes if available
    let items: CartItem[] = []
    if (notes && notes.items) {
      try {
        items = JSON.parse(notes.items) as CartItem[]
      } catch (e) {
        console.error("Failed to parse items from webhook:", e)
        items = []
      }
    }

    console.log("Updating payment status for order:", orderId)

    // Update payment status in your database
    await updatePaymentStatus(
      orderId,
      paymentId,
      "paid",
      email,
      items,
      amount, // Convert from paise to rupees
    )

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Webhook error:", error instanceof Error ? error.message : String(error))
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

// Verify Razorpay signature
function verifySignature(orderId: string, paymentId: string, signature: string): boolean {
  // Generate a signature using the same algorithm as Razorpay
  const payload = `${orderId}|${paymentId}`
  const expectedSignature = crypto.createHmac("sha256", KEY_SECRET).update(payload).digest("hex")

  return expectedSignature === signature
}
