"use server"

import { revalidatePath } from "next/cache"
import { CartItem, CustomerDetails } from "./types"


interface OrderData {
  customerDetails: CustomerDetails
  items: CartItem[]
  subtotal: number
  shipping: number
  total: number
  paymentMethod: "online" | "cod"
}

export async function createOrder(orderData: OrderData) {
  try {
    // Generate a random order ID
    const orderId = Math.random().toString(36).substring(2, 10).toUpperCase()

    // In a real app, you would store this in a database
    console.log("Order created:", {
      id: orderId,
      ...orderData,
      paymentStatus: orderData.paymentMethod === "cod" ? "pending" : "paid",
      createdAt: new Date().toISOString(),
    })

    // Revalidate the orders page
    revalidatePath("/orders")

    return {
      success: true,
      orderId,
    }
  } catch (error) {
    console.error("Error creating order:", error)
    return {
      success: false,
      error: "Failed to create order",
    }
  }
}
