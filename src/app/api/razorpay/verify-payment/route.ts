import { NextResponse } from "next/server"
import crypto from "crypto"

// Razorpay test credentials
const KEY_SECRET = "hgY2wImLdqR0TFLoFa7xJYcS"

interface VerifyPaymentRequest {
  razorpay_payment_id: string
  razorpay_order_id: string
  razorpay_signature: string
}

export async function POST(request: Request) {
  try {
    console.log("Entering verify-payment API route")

    const body: VerifyPaymentRequest = await request.json()
    const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = body

    console.log("Verifying payment:", {
      payment_id: razorpay_payment_id,
      order_id: razorpay_order_id,
      signature: razorpay_signature ? "Present" : "Missing",
    })

    if (!razorpay_payment_id || !razorpay_order_id || !razorpay_signature) {
      return NextResponse.json(
        {
          verified: false,
          error: "Missing required parameters",
        },
        { status: 400 },
      )
    }

    // Verify the payment signature
    const payload = `${razorpay_order_id}|${razorpay_payment_id}`
    const expectedSignature = crypto.createHmac("sha256", KEY_SECRET).update(payload).digest("hex")

    const isValid = expectedSignature === razorpay_signature

    console.log("Signature verification:", isValid ? "Valid" : "Invalid")

    if (!isValid) {
      return NextResponse.json(
        {
          verified: false,
          error: "Invalid signature",
        },
        { status: 400 },
      )
    }

    return NextResponse.json({
      verified: true,
      payment_id: razorpay_payment_id,
      order_id: razorpay_order_id,
    })
  } catch (error) {
    console.error("Error verifying payment:", error)
    return NextResponse.json(
      {
        verified: false,
        error: error instanceof Error ? error.message : "Failed to verify payment",
      },
      { status: 500 },
    )
  }
}
