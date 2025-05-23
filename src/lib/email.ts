"use server"

import { Resend } from "resend"
import type { CartItem, CustomerDetails, EmailResult, ValidatedCustomerDetails } from "./types"

// Initialize Resend with your API key
const resend = new Resend(process.env.RESEND_API_KEY)

// Create a debug logger for email operations
const logEmailDebug = (message: string, data?: unknown): void => {
  console.log(`[EMAIL DEBUG] ${message}`, data ? JSON.stringify(data, null, 2) : "")
}

/**
 * Format currency for display
 * @param amount - The amount to format
 * @returns Formatted currency string
 */
const formatCurrency = (amount: number): string => {
  return `INR ${(amount ).toFixed(2)}`
}

/**
 * Validate customer details for email display
 * @param customerDetails - Customer details to validate
 * @returns Validated customer details with fallbacks
 */
const validateCustomerDetailsForEmail = (customerDetails: CustomerDetails): ValidatedCustomerDetails => {
  return {
    firstName: customerDetails.firstName?.trim() || "Customer",
    lastName: customerDetails.lastName?.trim() || "",
    email: customerDetails.email?.trim() || "Not provided",
    phone: customerDetails.phone?.trim() || "Not provided",
    city: customerDetails.city?.trim() || "Not provided",
    pincode: customerDetails.pincode?.trim() || "Not provided",
    streetAddress1: customerDetails.streetAddress1?.trim() || "Not provided",
    streetAddress2: customerDetails.streetAddress2?.trim() || "",
    state: customerDetails.state?.trim() || "",
    country: customerDetails.country?.trim() || "India",
    useSameAddressForBilling: customerDetails.useSameAddressForBilling ?? true,
    billingAddress: customerDetails.billingAddress || {
      firstName: customerDetails.firstName?.trim() || "Customer",
      lastName: customerDetails.lastName?.trim() || "",
      streetAddress1: customerDetails.streetAddress1?.trim() || "Not provided",
      streetAddress2: customerDetails.streetAddress2?.trim() || "",
      city: customerDetails.city?.trim() || "Not provided",
      state: customerDetails.state?.trim() || "",
      pincode: customerDetails.pincode?.trim() || "Not provided",
      country: customerDetails.country?.trim() || "India",
    },
  }
}

/**
 * Create HTML for order confirmation email
 * @param orderId - The order ID
 * @param items - The order items
 * @param total - The order total
 * @returns HTML string for the email
 */
const createOrderConfirmationHTML = (orderId: string, items: CartItem[], total: number): string => {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background-color: #7FDAC0; padding: 20px; text-align: center; color: white;">
        <h1>Order Confirmation</h1>
      </div>
      <div style="padding: 20px;">
        <p>Thank you for your order!</p>
        <p>Your order <strong>#${orderId}</strong> has been received and is being processed.</p>
        
        <h2>Order Summary</h2>
        <table style="width: 100%; border-collapse: collapse;">
          <thead>
            <tr style="background-color: #f3f3f3;">
              <th style="padding: 10px; text-align: left; border-bottom: 1px solid #ddd;">Product</th>
              <th style="padding: 10px; text-align: center; border-bottom: 1px solid #ddd;">Quantity</th>
              <th style="padding: 10px; text-align: right; border-bottom: 1px solid #ddd;">Price</th>
            </tr>
          </thead>
          <tbody>
            ${items
              .map(
                (item) => `
              <tr>
                <td style="padding: 10px; border-bottom: 1px solid #ddd;">${item.name}</td>
                <td style="padding: 10px; text-align: center; border-bottom: 1px solid #ddd;">${item.quantity}</td>
                <td style="padding: 10px; text-align: right; border-bottom: 1px solid #ddd;">${formatCurrency(
                  item.price * item.quantity,
                )}</td>
              </tr>
            `,
              )
              .join("")}
            <tr>
              <td colspan="2" style="padding: 10px; text-align: right; font-weight: bold;">Total:</td>
              <td style="padding: 10px; text-align: right; font-weight: bold;">${formatCurrency(total)}</td>
            </tr>
          </tbody>
        </table>
        
        <div style="margin-top: 30px;">
          <p>If you have any questions about your order, please contact our customer service.</p>
          <p>Thank you for shopping with us!</p>
        </div>
      </div>
      <div style="background-color: #f3f3f3; padding: 15px; text-align: center; font-size: 12px; color: #666;">
        <p>&copy; ${new Date().getFullYear()} Bubl Store. All rights reserved.</p>
      </div>
    </div>
  `
}

/**
 * Create HTML for owner notification email
 * @param orderId - The order ID
 * @param items - The order items
 * @param total - The order total
 * @param customerDetails - Customer details
 * @returns HTML string for the email
 */
const createOwnerNotificationHTML = (
  orderId: string,
  items: CartItem[],
  total: number,
  customerDetails: CustomerDetails,
): string => {
  const validatedDetails = validateCustomerDetailsForEmail(customerDetails)

  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background-color: #7FDAC0; padding: 20px; text-align: center; color: white;">
        <h1>New Order Received</h1>
      </div>
      <div style="padding: 20px;">
        <p>A new order <strong>#${orderId}</strong> has been received.</p>
        
        <h2>Customer Information</h2>
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #ddd; width: 30%;"><strong>Name:</strong></td>
            <td style="padding: 10px; border-bottom: 1px solid #ddd;">${validatedDetails.firstName} ${validatedDetails.lastName}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #ddd;"><strong>Email:</strong></td>
            <td style="padding: 10px; border-bottom: 1px solid #ddd;">${validatedDetails.email}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #ddd;"><strong>Phone:</strong></td>
            <td style="padding: 10px; border-bottom: 1px solid #ddd;">${validatedDetails.phone}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #ddd;"><strong>Address:</strong></td>
            <td style="padding: 10px; border-bottom: 1px solid #ddd;">
              ${validatedDetails.streetAddress1}<br>
              ${validatedDetails.streetAddress2 ? validatedDetails.streetAddress2 + "<br>" : ""}
              ${validatedDetails.city}, ${validatedDetails.state} ${validatedDetails.pincode}<br>
              ${validatedDetails.country}
            </td>
          </tr>
        </table>
        
        <h2>Order Summary</h2>
        <table style="width: 100%; border-collapse: collapse;">
          <thead>
            <tr style="background-color: #f3f3f3;">
              <th style="padding: 10px; text-align: left; border-bottom: 1px solid #ddd;">Product</th>
              <th style="padding: 10px; text-align: center; border-bottom: 1px solid #ddd;">Quantity</th>
              <th style="padding: 10px; text-align: right; border-bottom: 1px solid #ddd;">Price</th>
            </tr>
          </thead>
          <tbody>
            ${items
              .map(
                (item) => `
              <tr>
                <td style="padding: 10px; border-bottom: 1px solid #ddd;">${item.name}</td>
                <td style="padding: 10px; text-align: center; border-bottom: 1px solid #ddd;">${item.quantity}</td>
                <td style="padding: 10px; text-align: right; border-bottom: 1px solid #ddd;">${formatCurrency(
                  item.price * item.quantity,
                )}</td>
              </tr>
            `,
              )
              .join("")}
            <tr>
              <td colspan="2" style="padding: 10px; text-align: right; font-weight: bold;">Total:</td>
              <td style="padding: 10px; text-align: right; font-weight: bold;">${formatCurrency(total)}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div style="background-color: #f3f3f3; padding: 15px; text-align: center; font-size: 12px; color: #666;">
        <p>&copy; ${new Date().getFullYear()} Bubl Store. All rights reserved.</p>
      </div>
    </div>
  `
}

/**
 * Create HTML for payment failure email
 * @param orderId - The order ID
 * @param items - The order items
 * @param total - The order total
 * @returns HTML string for the email
 */
const createPaymentFailureHTML = (orderId: string, items: CartItem[], total: number): string => {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background-color: #ff6b6b; padding: 20px; text-align: center; color: white;">
        <h1>Payment Failed</h1>
      </div>
      <div style="padding: 20px;">
        <p>We're sorry, but your payment for order <strong>#${orderId}</strong> could not be processed.</p>
        <p>Please try again with a different payment method or contact your bank for assistance.</p>
        
        <h2>Order Details</h2>
        <table style="width: 100%; border-collapse: collapse;">
          <thead>
            <tr style="background-color: #f3f3f3;">
              <th style="padding: 10px; text-align: left; border-bottom: 1px solid #ddd;">Product</th>
              <th style="padding: 10px; text-align: center; border-bottom: 1px solid #ddd;">Quantity</th>
              <th style="padding: 10px; text-align: right; border-bottom: 1px solid #ddd;">Price</th>
            </tr>
          </thead>
          <tbody>
            ${items
              .map(
                (item) => `
              <tr>
                <td style="padding: 10px; border-bottom: 1px solid #ddd;">${item.name}</td>
                <td style="padding: 10px; text-align: center; border-bottom: 1px solid #ddd;">${item.quantity}</td>
                <td style="padding: 10px; text-align: right; border-bottom: 1px solid #ddd;">${formatCurrency(
                  item.price * item.quantity,
                )}</td>
              </tr>
            `,
              )
              .join("")}
            <tr>
              <td colspan="2" style="padding: 10px; text-align: right; font-weight: bold;">Total:</td>
              <td style="padding: 10px; text-align: right; font-weight: bold;">${formatCurrency(total)}</td>
            </tr>
          </tbody>
        </table>
        
        <div style="margin-top: 30px; text-align: center;">
          <a href="${
            process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
          }/checkout" style="display: inline-block; background-color: #7FDAC0; color: white; padding: 10px 20px; text-decoration: none; border-radius: 4px;">Try Again</a>
        </div>
        
        <div style="margin-top: 30px;">
          <p>If you need assistance, please contact our customer service.</p>
        </div>
      </div>
      <div style="background-color: #f3f3f3; padding: 15px; text-align: center; font-size: 12px; color: #666;">
        <p>&copy; ${new Date().getFullYear()} Bubl Store. All rights reserved.</p>
      </div>
    </div>
  `
}

/**
 * Send order confirmation email to customer
 * @param email - Recipient email address
 * @param orderId - The order ID
 * @param items - The order items
 * @param total - The order total
 * @returns Promise with email result
 */
export async function sendOrderConfirmationEmail(
  email: string,
  orderId: string,
  items: CartItem[],
  total: number,
): Promise<EmailResult> {
  try {
    logEmailDebug(`Attempting to send order confirmation email to ${email}`)

    // Check if email is provided
    if (!email) {
      throw new Error("Email address is required")
    }

    // For testing mode, only send to verified email
    const isTestingMode = !process.env.EMAIL_FROM || process.env.EMAIL_FROM.includes("onboarding@resend.dev")
    const verifiedEmail = "shlok.official01@gmail.com"

    if (isTestingMode && email !== verifiedEmail) {
      logEmailDebug(`Testing mode: Redirecting email from ${email} to ${verifiedEmail}`)
      email = verifiedEmail
    }

    // Determine the from address
    const emailFrom = process.env.EMAIL_FROM || "Bubl Store <onboarding@resend.dev>"

    // Send the email using Resend
    const { data, error } = await resend.emails.send({
      from: emailFrom,
      to: email,
      subject: `Order Confirmation #${orderId}`,
      html: createOrderConfirmationHTML(orderId, items, total),
      tags: [{ name: "type", value: "order_confirmation" }],
    })

    if (error) {
      logEmailDebug(`Error sending email: ${error.message}`)
      return { success: false, error: error.message }
    }

    logEmailDebug(`Order confirmation email sent to ${email}. Message ID: ${data?.id}`)
    return { success: true, messageId: data?.id }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error)
    logEmailDebug("Error sending order confirmation email:", errorMessage)
    return { success: false, error: errorMessage }
  }
}

/**
 * Send order notification email to store owner
 * @param ownerEmail - Owner's email address
 * @param orderId - The order ID
 * @param items - The order items
 * @param total - The order total
 * @param customerDetails - Customer details
 * @returns Promise with email result
 */
export async function sendOwnerNotificationEmail(
  ownerEmail: string,
  orderId: string,
  items: CartItem[],
  total: number,
  customerDetails: CustomerDetails,
): Promise<EmailResult> {
  try {
    logEmailDebug(`Attempting to send order notification email to owner: ${ownerEmail}`)

    // Validate customer details before using them
    const validatedDetails = validateCustomerDetailsForEmail(customerDetails)
    logEmailDebug("Validated customer details for owner email:", validatedDetails)

    // Check if email is provided
    if (!ownerEmail) {
      throw new Error("Owner email address is required")
    }

    // For testing mode, only send to verified email
    const isTestingMode = !process.env.EMAIL_FROM || process.env.EMAIL_FROM.includes("onboarding@resend.dev")
    const verifiedEmail = "shlok.official01@gmail.com"

    if (isTestingMode && ownerEmail !== verifiedEmail) {
      logEmailDebug(`Testing mode: Redirecting owner email from ${ownerEmail} to ${verifiedEmail}`)
      ownerEmail = verifiedEmail
    }

    // Log all environment variables for debugging (without sensitive values)
    logEmailDebug("Environment variables:", {
      RESEND_API_KEY: process.env.RESEND_API_KEY ? "Set" : "Not set",
      OWNER_EMAIL: process.env.OWNER_EMAIL || "Not set",
      EMAIL_FROM: process.env.EMAIL_FROM || "Not set",
    })

    // Determine the from address
    const emailFrom = process.env.EMAIL_FROM || "Bubl Store <onboarding@resend.dev>"

    // Log the email details
    logEmailDebug("Sending owner email with details:", {
      from: emailFrom,
      to: ownerEmail,
      subject: `New Order Received #${orderId}`,
      customerDetails: validatedDetails,
    })

    // Send the email using Resend
    const { data, error } = await resend.emails.send({
      from: emailFrom,
      to: ownerEmail,
      subject: `New Order Received #${orderId}`,
      html: createOwnerNotificationHTML(orderId, items, total, validatedDetails),
      tags: [{ name: "type", value: "owner_notification" }],
    })

    if (error) {
      logEmailDebug(`Error sending email to owner: ${error.message}`)
      return { success: false, error: error.message }
    }

    logEmailDebug(`Order notification email sent to owner ${ownerEmail}. Message ID: ${data?.id}`)
    return { success: true, messageId: data?.id }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error)
    logEmailDebug("Error sending order notification email to owner:", errorMessage)
    return { success: false, error: errorMessage }
  }
}

/**
 * Send payment failure email with robust error handling
 * @param email - Recipient email address
 * @param orderId - The order ID
 * @param items - The order items
 * @param total - The order total
 * @returns Promise with email result
 */
export async function sendPaymentFailureEmail(
  email: string,
  orderId: string,
  items: CartItem[],
  total: number,
): Promise<EmailResult> {
  try {
    logEmailDebug(`Attempting to send payment failure email to ${email}`)

    // Check if email is provided
    if (!email) {
      throw new Error("Email address is required")
    }

    // For testing mode, only send to verified email
    const isTestingMode = !process.env.EMAIL_FROM || process.env.EMAIL_FROM.includes("onboarding@resend.dev")
    const verifiedEmail = "shlok.official01@gmail.com"

    if (isTestingMode && email !== verifiedEmail) {
      logEmailDebug(`Testing mode: Redirecting email from ${email} to ${verifiedEmail}`)
      email = verifiedEmail
    }

    // Determine the from address
    const emailFrom = process.env.EMAIL_FROM || "Bubl Store <onboarding@resend.dev>"

    // Send the email using Resend
    const { data, error } = await resend.emails.send({
      from: emailFrom,
      to: email,
      subject: `Payment Failed for Order #${orderId}`,
      html: createPaymentFailureHTML(orderId, items, total),
      tags: [{ name: "type", value: "payment_failure" }],
    })

    if (error) {
      logEmailDebug(`Error sending email: ${error.message}`)
      return { success: false, error: error.message }
    }

    logEmailDebug(`Payment failure email sent to ${email}. Message ID: ${data?.id}`)
    return { success: true, messageId: data?.id }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error)
    logEmailDebug("Error sending payment failure email:", errorMessage)
    return { success: false, error: errorMessage }
  }
}

/**
 * Send a test email to verify email functionality
 * @param email - Recipient email address
 * @returns Promise with email result
 */
export async function sendTestEmail(email: string): Promise<EmailResult> {
  try {
    logEmailDebug(`Sending test email to ${email}`)

    // Create test order data
    const orderId = `test_${Date.now()}`
    const items: CartItem[] = [
      {
        id: "test-1",
        name: "Test Product 1",
        description: "This is a test product",
        price: 9999,
        image: "/placeholder.svg",
        category: "test",
        quantity: 1,
      },
      {
        id: "test-2",
        name: "Test Product 2",
        description: "This is another test product",
        price: 4999,
        image: "/placeholder.svg",
        category: "test",
        quantity: 2,
      },
    ]
    const total = 19997

    // Send the test email
    return await sendOrderConfirmationEmail(email, orderId, items, total)
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error)
    logEmailDebug("Error sending test email:", errorMessage)

    return {
      success: false,
      error: `Failed to send test email: ${errorMessage}`,
    }
  }
}
