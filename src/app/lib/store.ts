import { create } from "zustand"
import { persist } from "zustand/middleware"

export interface CartItem {
  id: string
  name: string
  price: number
  image: string
  quantity: number
}

interface CartState {
  items: CartItem[]
  addItem: (item: CartItem) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void
  getTotalItems: () => number
  getTotalPrice: () => number
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (item) => {
        const { items } = get()
        const existingItem = items.find((i) => i.id === item.id)

        if (existingItem) {
          set({
            items: items.map((i) => (i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i)),
          })
        } else {
          set({ items: [...items, item] })
        }
      },

      removeItem: (id) => {
        const { items } = get()
        set({ items: items.filter((i) => i.id !== id) })
      },

      updateQuantity: (id, quantity) => {
        const { items } = get()
        set({
          items: items.map((i) => (i.id === id ? { ...i, quantity } : i)),
        })
      },

      clearCart: () => set({ items: [] }),

      getTotalItems: () => {
        const { items } = get()
        return items.reduce((total, item) => total + item.quantity, 0)
      },

      getTotalPrice: () => {
        const { items } = get()
        return items.reduce((total, item) => total + item.price * item.quantity, 0)
      },
    }),
    {
      name: "bubl-cart-storage",
    },
  ),
)

// Customer information store
interface CustomerInfo {
  email: string
  phone: string
  firstName: string
  lastName: string
  city: string
  pincode: string
  streetAddress1: string
  streetAddress2: string
}

interface CheckoutState {
  customerInfo: CustomerInfo
  updateCustomerInfo: (info: Partial<CustomerInfo>) => void
  paymentMethod: "pay-now" | "pay-on-delivery" | null
  setPaymentMethod: (method: "pay-now" | "pay-on-delivery" | null) => void
  couponCode: string
  setCouponCode: (code: string) => void
}

export const useCheckoutStore = create<CheckoutState>()(
  persist(
    (set) => ({
      customerInfo: {
        email: "",
        phone: "",
        firstName: "",
        lastName: "",
        city: "",
        pincode: "",
        streetAddress1: "",
        streetAddress2: "",
      },
      updateCustomerInfo: (info) =>
        set((state) => ({
          customerInfo: { ...state.customerInfo, ...info },
        })),
      paymentMethod: null,
      setPaymentMethod: (method) => set({ paymentMethod: method }),
      couponCode: "",
      setCouponCode: (code) => set({ couponCode: code }),
    }),
    {
      name: "bubl-checkout-storage",
    },
  ),
)
