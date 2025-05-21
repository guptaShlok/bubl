"use server"

import { revalidatePath } from "next/cache"
import type { CartItem, OrderData, OrderResult, PaymentStatus, EmailResult } from "@/lib/types"
import { sendOrderConfirmationEmail, sendPaymentFailureEmail } from "@/lib/email"

/**
 * Create a new order
 * @param data - The order data
 * @returns Promise with order result
 */
export async function createOrder(data: OrderData): Promise<OrderResult> {
  try {
    console.log("Creating order with data:", JSON.stringify(data, null, 2))

    // In a real app, you would save the order to a database
    // For this example, we'll simulate it with a mock order ID
    const orderId = `order_${Date.now()}`

    console.log("Order created:", orderId)

    // Always send confirmation email regardless of payment method
    try {
      console.log("Sending order confirmation email to:", data.customerDetails.email)
      const emailResult: EmailResult = await sendOrderConfirmationEmail(
        data.customerDetails.email,
        orderId,
        data.items,
        data.total,
      )

      if (emailResult.success) {
        console.log("Email sent successfully:", emailResult.messageId)
        if (emailResult.previewUrl) {
          console.log("Email preview URL (for test emails):", emailResult.previewUrl)
        }
      } else {
        console.error("Failed to send email:", emailResult.error)
      }
    } catch (emailError) {
      console.error("Failed to send confirmation email:", emailError)
      // Continue with order creation even if email fails
    }

    revalidatePath("/bubl-checkout")
    revalidatePath("/bubl-checkout")
    return { success: true, orderId }
  } catch (error) {
    console.error("Error creating order:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to create order",
    }
  }
}

/**
 * Update payment status for an order
 * @param orderId - The order ID
 * @param paymentId - The payment ID
 * @param status - The payment status
 * @param email - Customer email
 * @param items - Order items
 * @param total - Order total
 * @returns Promise with success status
 */
export async function updatePaymentStatus(
  orderId: string,
  paymentId: string,
  status: PaymentStatus,
  email: string,
  items: CartItem[],
  total: number,
): Promise<{ success: boolean; error?: string }> {
  try {
    // In a real app, you would update the payment status in your database
    console.log("Payment status updated:", { orderId, paymentId, status })

    // Send appropriate email based on status
    if (status === "paid") {
      try {
        console.log("Sending confirmation email for successful payment to:", email)
        const emailResult: EmailResult = await sendOrderConfirmationEmail(email, orderId, items, total)

        if (emailResult.success) {
          console.log("Email sent successfully:", emailResult.messageId)
          if (emailResult.previewUrl) {
            console.log("Email preview URL (for test emails):", emailResult.previewUrl)
          }
        } else {
          console.error("Failed to send email:", emailResult.error)
        }
      } catch (emailError) {
        console.error("Failed to send confirmation email:", emailError)
        // Continue even if email fails
      }
    } else if (status === "failed") {
      try {
        console.log("Sending payment failure email to:", email)
        const emailResult: EmailResult = await sendPaymentFailureEmail(email, orderId, items, total)

        if (emailResult.success) {
          console.log("Email sent successfully:", emailResult.messageId)
          if (emailResult.previewUrl) {
            console.log("Email preview URL (for test emails):", emailResult.previewUrl)
          }
        } else {
          console.error("Failed to send email:", emailResult.error)
        }
      } catch (emailError) {
        console.error("Failed to send payment failure email:", emailError)
        // Continue even if email fails
      }
    }

    revalidatePath("/bubl-checkout")
    revalidatePath("/bubl-checkout")
    return { success: true }
  } catch (error) {
    console.error("Error updating payment status:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to update payment status",
    }
  }
}
