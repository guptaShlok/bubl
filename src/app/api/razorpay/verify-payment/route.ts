import { type NextRequest, NextResponse } from "next/server"
import crypto from "crypto"

export async function POST(request: NextRequest) {
  try {
    console.log("Entering verify-payment API route")

    const body = await request.json()
    const { payment_id, order_id, signature, email } = body

    console.log("Verifying payment:", {
      payment_id,
      order_id,
      signature: signature ? "Present" : "Missing",
      email,
    })

    // Get the secret key from environment variables
    const secret = process.env.RAZORPAY_KEY_SECRET || "hgY2wImLdqR0TFLoFa7xJYcS"

    // Create the signature verification string
    const text = `${order_id}|${payment_id}`

    // Create the expected signature
    const expectedSignature = crypto.createHmac("sha256", secret).update(text).digest("hex")

    // Verify the signature
    const isValid = expectedSignature === signature

    console.log("Signature verification:", isValid ? "Valid" : "Invalid")

    // If the signature is valid, update the payment status
    // But DO NOT send emails from here - they will be sent from the success page
    // This prevents duplicate emails

    return NextResponse.json({
      success: isValid,
      message: isValid ? "Payment verified successfully" : "Invalid signature",
    })
  } catch (error) {
    console.error("Error verifying payment:", error)
    return NextResponse.json(
      {
        success: false,
        message: error instanceof Error ? error.message : "An error occurred while verifying payment",
      },
      { status: 500 },
    )
  }
}
