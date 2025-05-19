// Add a type-safe implementation for the Razorpay webhook API
import { type NextRequest, NextResponse } from "next/server"
import crypto from "crypto"

import type { CartItem } from "@/lib/types"
import { updatePaymentStatus } from "@/lib/action"

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
    const body = (await request.json()) as RazorpayWebhookPayload

    // Extract payment details from the webhook payload
    const {
      payload: {
        payment: { entity },
      },
    } = body

    const { order_id, id: paymentId, razorpay_signature, amount, email, notes } = entity

    // Extract orderId from Razorpay's order_id (which might have a prefix)
    const orderId = order_id.replace("order_", "")

    // Verify the signature
    const isValid = verifySignature(order_id, paymentId, razorpay_signature)

    if (!isValid) {
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

    // Update payment status in your database
    await updatePaymentStatus(
      orderId,
      paymentId,
      "paid",
      email,
      items,
      amount / 100, // Convert from paise to rupees
    )

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Webhook error:", error instanceof Error ? error.message : String(error))
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

// Verify Razorpay signature
function verifySignature(orderId: string, paymentId: string, signature: string): boolean {
  const secret = process.env.RAZORPAY_KEY_SECRET
  if (!secret) {
    throw new Error("RAZORPAY_KEY_SECRET is not defined in environment variables")
  }
  // Generate a signature using the same algorithm as Razorpay
  const payload = `${orderId}|${paymentId}`
  const expectedSignature = crypto.createHmac("sha256", secret).update(payload).digest("hex")

  return expectedSignature === signature
}
