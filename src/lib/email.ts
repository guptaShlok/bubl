"use server"

import nodemailer from "nodemailer"
import type { CartItem, EmailResult } from "./types"

// Create a debug logger for email operations
const logEmailDebug = (message: string, data?: unknown): void => {
  console.log(`[EMAIL DEBUG] ${message}`, data ? JSON.stringify(data, null, 2) : "")
}

/**
 * Create a nodemailer transporter with fallback options
 * @returns Promise with configured transporter
 */
const createTransporter = async (): Promise<nodemailer.Transporter> => {
  try {
    // Log environment variables (without sensitive data)
    logEmailDebug("Email configuration:", {
      host: process.env.EMAIL_SERVER,
      port: process.env.EMAIL_PORT,
      secure: process.env.EMAIL_PORT === "465",
      hasUser: !!process.env.EMAIL_USER,
      hasPassword: !!process.env.EMAIL_PASSWORD,
    })

    // Check if all required email environment variables are set
    if (
      !process.env.EMAIL_SERVER ||
      !process.env.EMAIL_PORT ||
      !process.env.EMAIL_USER ||
      !process.env.EMAIL_PASSWORD
    ) {
      logEmailDebug("Email configuration is incomplete. Using test account fallback.")

      // Create a test account using ethereal.email for testing
      const testAccount = await nodemailer.createTestAccount()
      logEmailDebug("Created test email account:", {
        user: testAccount.user,
        server: "smtp.ethereal.email",
      })

      return nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false,
        auth: {
          user: testAccount.user,
          pass: testAccount.pass,
        },
      })
    }

    // Create the real transporter
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_SERVER,
      port: Number(process.env.EMAIL_PORT),
      secure: process.env.EMAIL_PORT === "465", // true for 465, false for other ports
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
      // Add additional options for better reliability
      tls: {
        // Do not fail on invalid certificates
        rejectUnauthorized: false,
      },
      // Set timeout to 30 seconds
      connectionTimeout: 30000,
      // Set greeting timeout to 30 seconds
      greetingTimeout: 30000,
      // Set socket timeout to 30 seconds
      socketTimeout: 30000,
    })

    // Verify the connection
    await transporter.verify()
    logEmailDebug("SMTP connection verified successfully")

    return transporter
  } catch (error) {
    logEmailDebug("Error creating email transporter:", error)

    // Create a fallback test account if the main transporter fails
    try {
      logEmailDebug("Creating fallback test account")
      const testAccount = await nodemailer.createTestAccount()

      return nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false,
        auth: {
          user: testAccount.user,
          pass: testAccount.pass,
        },
      })
    } catch (fallbackError) {
      logEmailDebug("Failed to create fallback transporter:", fallbackError)
      throw new Error(`Failed to create email transporter: ${error instanceof Error ? error.message : String(error)}`)
    }
  }
}

/**
 * Format currency for display
 * @param amount - The amount to format
 * @returns Formatted currency string
 */
const formatCurrency = (amount: number): string => {
  return `INR ${(amount / 100).toFixed(2)}`
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
 * Send order confirmation email with robust error handling
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

    // Create transporter
    const transporter = await createTransporter()

    // Determine the from address
    const emailFrom = process.env.EMAIL_FROM || `"Bubl Store" <${process.env.EMAIL_USER || "noreply@bublstore.com"}>`

    // Send the email
    const info = await transporter.sendMail({
      from: emailFrom,
      to: email,
      subject: `Order Confirmation #${orderId}`,
      html: createOrderConfirmationHTML(orderId, items, total),
    })

    logEmailDebug(`Order confirmation email sent to ${email}. Message ID: ${info.messageId}`)

    // If using ethereal.email, provide the preview URL
    if (info.messageId && info.messageId.includes("ethereal")) {
      const previewUrl = nodemailer.getTestMessageUrl(info)
      if (previewUrl) {
        logEmailDebug(`Preview URL for test email: ${previewUrl}`)
        return { success: true, messageId: info.messageId, previewUrl }
      } else {
        logEmailDebug(`No preview URL available for test email`)
        return { success: true, messageId: info.messageId }
      }
    }

    return { success: true, messageId: info.messageId }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error)
    logEmailDebug("Error sending order confirmation email:", errorMessage)

    // Try to send using a fallback method if the main method fails
    try {
      logEmailDebug("Attempting to send email using fallback method")

      // Create a test account
      const testAccount = await nodemailer.createTestAccount()

      // Create fallback transporter
      const fallbackTransporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false,
        auth: {
          user: testAccount.user,
          pass: testAccount.pass,
        },
      })

      // Send the email using the fallback
      const info = await fallbackTransporter.sendMail({
        from: '"Bubl Store Fallback" <fallback@bublstore.com>',
        to: email,
        subject: `Order Confirmation #${orderId}`,
        html: createOrderConfirmationHTML(orderId, items, total),
      })

      // Get the preview URL
      const previewUrl = nodemailer.getTestMessageUrl(info)
      if (previewUrl) {
        logEmailDebug(`Fallback email sent. Preview URL: ${previewUrl}`)
        return {
          success: true,
          messageId: info.messageId,
          previewUrl,
          error: `Original error: ${errorMessage}. Used fallback method.`,
        }
      } else {
        logEmailDebug(`Fallback email sent, but no preview URL available`)
        return {
          success: true,
          messageId: info.messageId,
          error: `Original error: ${errorMessage}. Used fallback method. No preview URL available.`,
        }
      }
    } catch (fallbackError) {
      const fallbackErrorMessage = fallbackError instanceof Error ? fallbackError.message : String(fallbackError)

      logEmailDebug("Fallback email method also failed:", fallbackErrorMessage)

      return {
        success: false,
        error: `Failed to send email: ${errorMessage}. Fallback also failed: ${fallbackErrorMessage}`,
      }
    }
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

    // Create transporter
    const transporter = await createTransporter()

    // Determine the from address
    const emailFrom = process.env.EMAIL_FROM || `"Bubl Store" <${process.env.EMAIL_USER || "noreply@bublstore.com"}>`

    // Send the email
    const info = await transporter.sendMail({
      from: emailFrom,
      to: email,
      subject: `Payment Failed for Order #${orderId}`,
      html: createPaymentFailureHTML(orderId, items, total),
    })

    logEmailDebug(`Payment failure email sent to ${email}. Message ID: ${info.messageId}`)

    // If using ethereal.email, provide the preview URL
    if (info.messageId && info.messageId.includes("ethereal")) {
      const previewUrl = nodemailer.getTestMessageUrl(info)
      if (previewUrl) {
        logEmailDebug(`Preview URL for test email: ${previewUrl}`)
        return { success: true, messageId: info.messageId, previewUrl }
      } else {
        logEmailDebug(`No preview URL available for test email`)
        return { success: true, messageId: info.messageId }
      }
    }

    return { success: true, messageId: info.messageId }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error)
    logEmailDebug("Error sending payment failure email:", errorMessage)

    // Try to send using a fallback method if the main method fails
    try {
      logEmailDebug("Attempting to send email using fallback method")

      // Create a test account
      const testAccount = await nodemailer.createTestAccount()

      // Create fallback transporter
      const fallbackTransporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false,
        auth: {
          user: testAccount.user,
          pass: testAccount.pass,
        },
      })

      // Send the email using the fallback
      const info = await fallbackTransporter.sendMail({
        from: '"Bubl Store Fallback" <fallback@bublstore.com>',
        to: email,
        subject: `Payment Failed for Order #${orderId}`,
        html: createPaymentFailureHTML(orderId, items, total),
      })

      // Get the preview URL
      const previewUrl = nodemailer.getTestMessageUrl(info)
      if (previewUrl) {
        logEmailDebug(`Fallback email sent. Preview URL: ${previewUrl}`)
        return {
          success: true,
          messageId: info.messageId,
          previewUrl,
          error: `Original error: ${errorMessage}. Used fallback method.`,
        }
      } else {
        logEmailDebug(`Fallback email sent, but no preview URL available`)
        return {
          success: true,
          messageId: info.messageId,
          error: `Original error: ${errorMessage}. Used fallback method. No preview URL available.`,
        }
      }
    } catch (fallbackError) {
      const fallbackErrorMessage = fallbackError instanceof Error ? fallbackError.message : String(fallbackError)

      logEmailDebug("Fallback email method also failed:", fallbackErrorMessage)

      return {
        success: false,
        error: `Failed to send email: ${errorMessage}. Fallback also failed: ${fallbackErrorMessage}`,
      }
    }
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
