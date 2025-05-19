"use client"

import type { RazorpayOptions, RazorpayResponse, RazorpayError } from "./types"

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

// Function to load Razorpay script
export const loadRazorpayScript = (): Promise<boolean> => {
  return new Promise((resolve) => {
    if (typeof window === "undefined") {
      console.log("Running on server, can't load Razorpay")
      resolve(false)
      return
    }

    if (window.Razorpay) {
      console.log("Razorpay already loaded")
      resolve(true)
      return
    }

    console.log("Loading Razorpay script")
    const script = document.createElement("script")
    script.src = "https://checkout.razorpay.com/v1/checkout.js"
    script.async = true
    script.onload = () => {
      console.log("Razorpay script loaded successfully")
      resolve(true)
    }
    script.onerror = () => {
      console.error("Failed to load Razorpay script")
      resolve(false)
    }
    document.body.appendChild(script)
  })
}

// Function to initialize Razorpay payment
export const initializeRazorpay = (options: RazorpayOptions): Promise<RazorpayResponse> => {
  return new Promise((resolve, reject) => {
    console.log(
      "Initializing Razorpay with options:",
      JSON.stringify(
        {
          ...options,
          key: options.key ? "KEY_PROVIDED" : "KEY_MISSING", // Log without exposing the actual key
        },
        null,
        2,
      ),
    )

    try {
      // Check if Razorpay is loaded
      if (typeof window === "undefined" || !window.Razorpay) {
        throw new Error("Razorpay is not loaded. Please call loadRazorpayScript first.")
      }

      // Create a new Razorpay instance
      const razorpay = new window.Razorpay({
        key: options.key,
        amount: options.amount,
        currency: options.currency || "INR",
        name: options.name || "Bubl Store",
        description: options.description || "Purchase from Bubl Store",
        image: options.image,
        prefill: options.prefill,
        theme: options.theme || { color: "#7FDAC0" },
        handler: (response: RazorpayResponse) => {
          console.log("Payment successful:", response)
          resolve(response)
        },
      })

      // Listen for payment failure
      razorpay.on("payment.failed", (response: unknown) => {
        const errorResponse = response as RazorpayError
        console.error("Payment failed:", errorResponse)
        reject(
          new Error(
            `Payment failed: ${errorResponse.description || errorResponse.description || "Unknown error"}`,
          ),
        )
      })

      // Open the payment modal
      console.log("Opening Razorpay payment modal")
      razorpay.open()
    } catch (error) {
      console.error("Error initializing Razorpay:", error)
      reject(error)
    }
  })
}
