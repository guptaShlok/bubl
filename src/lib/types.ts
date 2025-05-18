//TODO Gateway and complete shit-2hr
//TODO Image optimisation-30min
//TODO In Page animation-1hour
//TODO Navbar and Footer-1hour

export interface Product {
  id: string
  name: string
  description: string
  price: number
  image: string
}

export interface CartItem extends Product {
  quantity: number
}

export interface CustomerDetails {
  email: string
  phone: string
  firstName: string
  lastName: string
  city: string
  pincode: string
  streetAddress1: string
  streetAddress2?: string
}

export interface Order {
  id: string
  customerDetails: CustomerDetails
  items: CartItem[]
  subtotal: number
  shipping: number
  total: number
  paymentMethod: "online" | "cod"
  paymentStatus: "pending" | "paid" | "failed"
  createdAt: string
}

export type PaymentMethod = "upi" | "visa" | "mastercard" | "rupay"
