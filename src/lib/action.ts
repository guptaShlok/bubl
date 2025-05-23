"use server"

import { revalidatePath } from "next/cache"
import type { CartItem, OrderData, OrderResult, PaymentStatus, EmailResult, CustomerDetails } from "@/lib/types"
import { sendOrderConfirmationEmail, sendPaymentFailureEmail, sendOwnerNotificationEmail } from "@/lib/email"

// Store to track which orders have already had emails sent
// This prevents duplicate emails if updatePaymentStatus is called multiple times
const emailSentOrders = new Set<string>()

// Store customer details for orders to use when sending emails
const orderCustomerDetails = new Map<string, CustomerDetails>()

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

    // Store customer details for this order
    orderCustomerDetails.set(orderId, data.customerDetails)
    console.log(`Stored customer details for order ${orderId}:`, data.customerDetails)

    console.log("Order created:", orderId)

    // For Cash on Delivery orders, send emails immediately
    if (data.paymentMethod === "cod") {
      try {
        console.log("COD order - Sending order confirmation email to:", data.customerDetails.email)
        const emailResult: EmailResult = await sendOrderConfirmationEmail(
          data.customerDetails.email,
          orderId,
          data.items,
          data.total,
        )

        if (emailResult.success) {
          console.log("Email sent successfully to customer:", emailResult.messageId)

          // Mark this order as having had emails sent
          emailSentOrders.add(orderId)
        } else {
          console.error("Failed to send email to customer:", emailResult.error)
        }

        // Send notification email to owner for COD orders
        const ownerEmail = process.env.OWNER_EMAIL
        if (ownerEmail) {
          console.log("COD order - Sending order notification email to owner:", ownerEmail)
          const ownerEmailResult: EmailResult = await sendOwnerNotificationEmail(
            ownerEmail,
            orderId,
            data.items,
            data.total,
            data.customerDetails,
          )

          if (ownerEmailResult.success) {
            console.log("Email sent successfully to owner:", ownerEmailResult.messageId)
          } else {
            console.error("Failed to send email to owner:", ownerEmailResult.error)
          }
        }
      } catch (emailError) {
        console.error("Failed to send emails for COD order:", emailError)
      }
    } else {
      // For online payments, emails will be sent after payment confirmation
      console.log("Online payment - Emails will be sent after payment confirmation")
    }

    revalidatePath("/checkout")
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
 * @param customerDetails - Optional customer details from the checkout form
 * @returns Promise with success status
 */
export async function updatePaymentStatus(
  orderId: string,
  paymentId: string,
  status: PaymentStatus,
  email: string,
  items: CartItem[],
  total: number,
  customerDetails?: CustomerDetails,
): Promise<{ success: boolean; error?: string }> {
  try {
    // In a real app, you would update the payment status in your database
    console.log("Payment status updated:", { orderId, paymentId, status })

    // Check if emails have already been sent for this order
    if (emailSentOrders.has(orderId)) {
      console.log(`Emails already sent for order ${orderId}, skipping email sending`)
      return { success: true }
    }

    // Get stored customer details or use provided ones
    let details: CustomerDetails | undefined = customerDetails
    if (!details) {
      details = orderCustomerDetails.get(orderId)
      console.log(`Retrieved stored customer details for order ${orderId}:`, details)
    }

    // If still no details, create default ones
    if (!details) {
      details = {
        firstName: "Customer",
        lastName: "",
        email: email,
        phone: "Not provided",
        streetAddress1: "Not provided",
        streetAddress2: "",
        city: "Not provided",
        state: "",
        pincode: "Not provided",
        country: "Not provided",
        useSameAddressForBilling: true,
        billingAddress: {
          firstName: "Customer",
          lastName: "",
          streetAddress1: "Not provided",
          streetAddress2: "",
          city: "Not provided",
          state: "",
          pincode: "Not provided",
          country: "Not provided",
        },
      }
      console.log(`Using default customer details for order ${orderId}:`, details)
    }

    // Send appropriate emails based on payment status
    if (status === "paid") {
      try {
        // Add delay to prevent rate limiting
        await new Promise((resolve) => setTimeout(resolve, 1000))

        // Send confirmation email to customer
        console.log("Payment successful - Sending order confirmation email to:", email)
        const emailResult: EmailResult = await sendOrderConfirmationEmail(email, orderId, items, total)

        if (emailResult.success) {
          console.log("Email sent successfully to customer:", emailResult.messageId)

          // Mark this order as having had emails sent
          emailSentOrders.add(orderId)
        } else {
          console.error("Failed to send email to customer:", emailResult.error)
        }

        // Add another delay before sending owner email
        await new Promise((resolve) => setTimeout(resolve, 2000))

        // Send notification email to owner
        const ownerEmail = process.env.OWNER_EMAIL
        if (ownerEmail) {
          console.log("Payment successful - Sending order notification email to owner:", ownerEmail)
          console.log("Using customer details for owner email:", details)

          const ownerEmailResult: EmailResult = await sendOwnerNotificationEmail(
            ownerEmail,
            orderId,
            items,
            total,
            details,
          )

          if (ownerEmailResult.success) {
            console.log("Email sent successfully to owner:", ownerEmailResult.messageId)
          } else {
            console.error("Failed to send email to owner:", ownerEmailResult.error)
          }
        }
      } catch (emailError) {
        console.error("Failed to send emails for successful payment:", emailError)
      }
    } else if (status === "failed") {
      try {
        console.log("Payment failed - Sending payment failure email to:", email)
        const emailResult: EmailResult = await sendPaymentFailureEmail(email, orderId, items, total)

        if (emailResult.success) {
          console.log("Email sent successfully:", emailResult.messageId)

          // Mark this order as having had emails sent
          emailSentOrders.add(orderId)
        } else {
          console.error("Failed to send email:", emailResult.error)
        }
      } catch (emailError) {
        console.error("Failed to send payment failure email:", emailError)
      }
    }

    revalidatePath("/checkout")
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
