import { type NextRequest, NextResponse } from "next/server"
import crypto from "crypto"

interface VerifyPaymentRequest {
  paymentId: string
  orderId: string
  signature: string
}

interface VerifyPaymentResponse {
  verified: boolean
}

export async function POST(request: NextRequest): Promise<NextResponse<VerifyPaymentResponse | { error: string }>> {
  try {
    const body = (await request.json()) as VerifyPaymentRequest

    if (!body.paymentId || !body.orderId || !body.signature) {
      return NextResponse.json({ error: "Missing required parameters" }, { status: 400 })
    }

    // In a real implementation, you would verify the signature using Razorpay's algorithm
    // For this example, we'll simulate a successful verification
    const razorpaySecret = process.env.RAZORPAY_KEY_SECRET 
    if (!razorpaySecret) {
      return NextResponse.json({ error: "Razorpay secret key not configured" }, { status: 500 })
    }

    const payload = `${body.orderId}|${body.paymentId}`
    const expectedSignature = crypto.createHmac("sha256", razorpaySecret).update(payload).digest("hex")

    const isValid = crypto.timingSafeEqual(Buffer.from(expectedSignature), Buffer.from(body.signature))

    return NextResponse.json({
      verified: isValid,
    })
  } catch (error) {
    console.error("Error verifying payment:", error instanceof Error ? error.message : String(error))
    return NextResponse.json({ error: "Failed to verify payment" }, { status: 500 })
  }
}
