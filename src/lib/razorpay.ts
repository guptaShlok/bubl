"use client"
/* eslint-disable */
import type { CustomerDetails } from "./types"

type RazorpayOptions = {
  key: string
  amount: number
  currency: string
  name: string
  description: string
  image?: string
  order_id?: string
  prefill?: {
    name?: string
    email?: string
    contact?: string
  }
  theme?: {
    color?: string
  }
  handler?: (response: any) => void
  modal?: {
    ondismiss?: () => void
    escape?: boolean
    animation?: boolean
  }
}

type RazorpayResponse = {
  razorpay_payment_id: string
  razorpay_order_id?: string
  razorpay_signature?: string
}

type RazorpayConstructor = new (
  options: RazorpayOptions,
) => {
  open: () => void
  on: (event: string, callback: (response: unknown) => void) => void
}

declare global {
  interface Window {
    Razorpay: RazorpayConstructor
  }
}

/**
 * Loads the Razorpay script dynamically
 * @returns Promise<boolean> - Whether the script was loaded successfully
 */
export const loadRazorpayScript = (): Promise<boolean> => {
  return new Promise((resolve) => {
    if (typeof window === "undefined") {
      // Server-side rendering
      resolve(false)
      return
    }

    if (window.Razorpay) {
      // Script already loaded
      resolve(true)
      return
    }

    const script = document.createElement("script")
    script.src = "https://checkout.razorpay.com/v1/checkout.js"
    script.async = true
    script.onload = () => resolve(true)
    script.onerror = () => {
      console.error("Failed to load Razorpay script")
      resolve(false)
    }

    document.body.appendChild(script)
  })
}

/**
 * Creates a Razorpay order
 * @param amount - The amount in INR (in whole numbers)
 * @returns Promise with order ID
 */
export const createRazorpayOrder = async (amount: number): Promise<string> => {
  try {
    console.log("Creating Razorpay order for amount:", amount)

    const response = await fetch("/api/razorpay/create-order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount }),
    })

    const data = await response.json()

    if (!response.ok) {
      console.error("Error response from create-order API:", data)
      throw new Error(data.error || `Failed to create order: ${response.status}`)
    }

    console.log("Create order API response:", data)

    if (!data.success || !data.orderId) {
      throw new Error(data.error || "Failed to create order: Missing orderId")
    }

    return data.orderId
  } catch (error) {
    console.error("Error creating Razorpay order:", error)
    throw error
  }
}

/**
 * Verifies a Razorpay payment
 * @param paymentId - The Razorpay payment ID
 * @param orderId - The Razorpay order ID
 * @param signature - The Razorpay signature
 * @returns Promise<boolean> - Whether the payment was verified successfully
 */
export const verifyRazorpayPayment = async (
  paymentId: string,
  orderId: string,
  signature: string,
): Promise<boolean> => {
  try {
    console.log("Verifying Razorpay payment:", { paymentId, orderId, signature })

    // For client-side verification, we'll call our API endpoint
    const response = await fetch("/api/razorpay/verify-payment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        paymentId,
        orderId,
        signature,
      }),
    })

    const data = await response.json()

    if (!response.ok) {
      console.error("Error response from verify-payment API:", data)
      return false
    }

    console.log("Verification response:", data)
    return data.verified === true
  } catch (error) {
    console.error("Error verifying Razorpay payment:", error)
    return false
  }
}

/**
 * Initializes the Razorpay payment
 * @param amount - The amount in INR (in whole numbers)
 * @param customerDetails - The customer details
 * @param onSuccess - Callback for successful payment
 * @param onError - Callback for failed payment
 */
export const initializeRazorpay = (
  amount: number,
  customerDetails: CustomerDetails,
  onSuccess: (paymentId: string, orderId: string, signature: string) => void,
  onError: (error: Error) => void,
): void => {
  if (typeof window === "undefined" || !window.Razorpay) {
    onError(new Error("Razorpay not loaded"))
    return
  }

  try {
    // Create a new order
    createRazorpayOrder(amount)
      .then((orderId) => {
        // Use the hardcoded key - this is the test key you provided
        const razorpayKey = "rzp_test_BvRCejha9FdLTh"

        console.log("Using Razorpay Key:", razorpayKey)
        console.log("Order ID:", orderId)
        console.log("Amount (in paise):", amount * 100)

        // Configure Razorpay options
        const options: RazorpayOptions = {
          key: razorpayKey,
          amount: amount * 100, // Convert to paise
          currency: "INR",
          name: "Bubl Store",
          description: `Order #${orderId}`,
          image: "/logo/bublgreen.png",
          order_id: orderId,
          prefill: {
            name: `${customerDetails.firstName} ${customerDetails.lastName || ""}`.trim(),
            email: customerDetails.email,
            contact: customerDetails.phone,
          },
          theme: {
            color: "#7FDAC0",
          },
          handler: (response: RazorpayResponse) => {
            // Handle successful payment
            console.log("Payment successful, response:", response)
            if (response.razorpay_payment_id) {
              onSuccess(
                response.razorpay_payment_id,
                response.razorpay_order_id || orderId,
                response.razorpay_signature || "",
              )
            } else {
              onError(new Error("Payment failed: No payment ID received"))
            }
          },
          modal: {
            ondismiss: () => {
              console.log("Payment modal dismissed")
              // Redirect to /bubl-checkout on cancellation
              window.location.href = "/bubl-checkout"
            },
            escape: true,
            animation: true,
          },
        }

        console.log("Initializing Razorpay with options:", JSON.stringify(options, null, 2))

        // Initialize Razorpay
        const razorpay = new window.Razorpay(options)

        // Add event listeners for debugging
        razorpay.on("payment.failed", (response:any) => {
          console.error("Payment failed:", response.error)
          onError(new Error(`Payment failed: ${response.error.description}`))
        })

        // Open the payment modal
        console.log("Opening Razorpay payment modal")
        razorpay.open()
      })
      .catch((error) => {
        console.error("Error in order creation:", error)
        onError(error)
      })
  } catch (error) {
    console.error("Error initializing Razorpay:", error)
    onError(error instanceof Error ? error : new Error("Failed to initialize payment"))
  }
}
