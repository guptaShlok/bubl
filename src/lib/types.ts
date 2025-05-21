export interface Product {
  id: string
  name: string
  description: string
  price: number
  image: string
  category: string
  featured?: boolean
}

export interface CartItem extends Product {
  quantity: number
}

export interface Address {
  firstName: string
  lastName?: string
  streetAddress1: string
  streetAddress2?: string
  city: string
  state?: string
  pincode: string
  country?: string
}

export interface CustomerDetails {
  email: string
  phone: string
  firstName: string
  lastName?: string
  city: string
  pincode: string
  streetAddress1: string
  streetAddress2?: string
  state?: string
  country?: string
  useSameAddressForBilling?: boolean
  billingAddress?: Address
}

export interface Order {
  id: string
  customerDetails: CustomerDetails
  items: CartItem[]
  subtotal: number
  shipping: number
  total: number
  paymentMethod: PaymentMethod
  paymentStatus: PaymentStatus
  paymentId?: string
  createdAt: Date
}

export type PaymentMethod = "online" | "cod"
export type PaymentStatus = "pending" | "paid" | "failed"

export interface PaymentDetails {
  paymentId: string
  orderId?: string
  signature?: string
}

export interface OrderData {
  customerDetails: CustomerDetails
  items: CartItem[]
  subtotal: number
  shipping: number
  total: number
  paymentMethod: PaymentMethod
  paymentDetails?: PaymentDetails
}

export interface OrderResult {
  success: boolean
  orderId?: string
  error?: string
}

// Email related types
export interface EmailResult {
  success: boolean
  messageId?: string
  previewUrl?: string | false
  error?: string
}

// Razorpay related types
export interface RazorpayOptions {
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
    method?: string
  }
  theme?: {
    color?: string
  }
  modal?: {
    ondismiss?: () => void
    escape?: boolean
    animation?: boolean
  }
  handler?: (response: RazorpayResponse) => void
}

export interface RazorpayResponse {
  razorpay_payment_id: string
  razorpay_order_id?: string
  razorpay_signature?: string
}

export interface RazorpayError {
  error?: {
    code: string
    description: string
    source: string
    step: string
    reason: string
    metadata: {
      order_id: string
      payment_id: string
    }
  }
  description?: string
}


// Store related types
export interface CartStore {
  items: CartItem[]
  addItem: (product: Product) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void
}

// API related types
export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
}

export interface CreateOrderResponse {
  success: boolean
  orderId?: string
  error?: string
}

export interface VerifyPaymentResponse {
  success: boolean
  verified?: boolean
  error?: string
}
