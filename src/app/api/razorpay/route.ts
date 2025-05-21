import { NextResponse } from "next/server"
import crypto from "crypto"

// This is a server-side route to verify Razorpay payments
// In a real app, you would store your Razorpay key and secret securely
// const RAZORPAY_KEY_ID = process.env.RAZORPAY_KEY_ID || "rzp_test_YOUR_KEY_ID"
const RAZORPAY_KEY_SECRET = "hgY2wImLdqR0TFLoFa7xJYcS"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { orderId, paymentId, signature } = body

    // Verify the payment signature
    const generated_signature = crypto
      .createHmac("sha256", RAZORPAY_KEY_SECRET)
      .update(orderId + "|" + paymentId)
      .digest("hex")

    if (generated_signature === signature) {
      // Payment is successful
      // In a real app, you would update your database here

      return NextResponse.json({
        success: true,
        message: "Payment verified successfully",
      })
    } else {
      // Payment verification failed
      return NextResponse.json({ success: false, message: "Payment verification failed" }, { status: 400 })
    }
  } catch (error) {
    console.error("Error verifying payment:", error)
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 })
  }
}
