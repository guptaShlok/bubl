import { NextResponse } from "next/server"

// Razorpay test credentials
const KEY_ID = "rzp_test_BvRCejha9FdLTh"
const KEY_SECRET = "hgY2wImLdqR0TFLoFa7xJYcS"

interface RequestBody {
  amount: number
}

// Helper function to generate a unique receipt ID
function generateReceiptId() {
  return `receipt_${Date.now()}_${Math.floor(Math.random() * 1000)}`
}

export async function POST(request: Request) {
  try {
    console.log("Entering create-order API route")

    // Parse the request body
    const body: RequestBody = await request.json()
    const { amount } = body

    console.log("Received request with amount:", amount)

    if (!amount || amount <= 0) {
      console.error("Invalid amount provided:", amount)
      return NextResponse.json(
        {
          success: false,
          error: "Invalid amount",
        },
        { status: 400 },
      )
    }

    // Convert amount to paise (Razorpay uses smallest currency unit)
    const amountInPaise = Math.round(amount * 100)

    // Generate a receipt ID
    const receiptId = generateReceiptId()

    console.log("Creating Razorpay order with:", {
      amount: amountInPaise,
      currency: "INR",
      receipt: receiptId,
    })

    // Make an actual API call to Razorpay to create an order
    const response = await fetch("https://api.razorpay.com/v1/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Base64 encode the API key and secret
        Authorization: `Basic ${Buffer.from(`${KEY_ID}:${KEY_SECRET}`).toString("base64")}`,
      },
      body: JSON.stringify({
        amount: amountInPaise,
        currency: "INR",
        receipt: receiptId,
        notes: {
          description: "Order from Bubl Store",
        },
      }),
    })

    const data = await response.json()

    console.log("Razorpay API response:", JSON.stringify(data, null, 2))

    if (!response.ok) {
      console.error("Razorpay API error:", data)
      return NextResponse.json(
        {
          success: false,
          error: data.error?.description || "Failed to create order with Razorpay",
        },
        { status: response.status },
      )
    }

    // Return the order ID from Razorpay
    return NextResponse.json({
      success: true,
      orderId: data.id,
      amount: data.amount,
      currency: data.currency,
    })
  } catch (error) {
    console.error("Error creating Razorpay order:", error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Failed to create order",
      },
      { status: 500 },
    )
  }
}
