"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronUp, ChevronDown } from "lucide-react";

// Types
interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  selected?: boolean;
}

export default function CartPage() {
  // State for cart items
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: "babybubl-1",
      name: "Babybubl",
      price: 69900,
      image: "/backgroundImages/productPage/productLandingPageOverlay.png",
      quantity: 1,
      selected: true,
    },
    {
      id: "hepa-filters-1",
      name: "HEPA Filters",
      price: 4499,
      image: "/backgroundImages/accessories/HepaFilters.png",
      quantity: 0,
      selected: false,
    },
    {
      id: "bluetooth-controller-1",
      name: "Bluetooth Controller",
      price: 5999,
      image: "/backgroundImages/accessories/BublController.png",

      quantity: 0,
      selected: false,
    },
  ]);

  // Calculate cart totals
  const cartTotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  // Function to update quantity
  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity < 0) return;

    setCartItems((prevItems) =>
      prevItems.map((item) => {
        if (item.id === id) {
          return { ...item, quantity: newQuantity, selected: newQuantity > 0 };
        }
        return item;
      })
    );
  };

  // Function to remove item
  const removeItem = (id: string) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: 0 } : item
      )
    );
  };

  // Function to select an item (move to top)
  const selectItem = (id: string) => {
    setCartItems((prevItems) =>
      prevItems.map((item) => ({
        ...item,
        selected: item.id === id,
      }))
    );
  };

  // Sort items - selected first, then by quantity
  const sortedItems = [...cartItems].sort((a, b) => {
    if (a.selected && !b.selected) return -1;
    if (!a.selected && b.selected) return 1;
    if (a.quantity > 0 && b.quantity === 0) return -1;
    if (a.quantity === 0 && b.quantity > 0) return 1;
    return 0;
  });

  // Active items (quantity > 0)
  const activeItems = sortedItems.filter((item) => item.quantity > 0);
  // Recommended items (quantity = 0)
  const recommendedItems = sortedItems.filter((item) => item.quantity === 0);

  return (
    <div className="min-h-screen text-black">
      {/* Hero Banner */}
      <div className="w-full bg-[#8ad3c3] py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <h1 className="text-4xl md:text-6xl font-bold text-white text-center">
            Your Basket
          </h1>
        </div>
        {/* Decorative circles */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-0">
          <div className="absolute w-[200%] h-[200%] border-[1px] border-white/20 rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            {activeItems.length > 0 ? (
              <div className="space-y-6">
                {/* Active Items */}
                {activeItems.map((item) => (
                  <div
                    key={item.id}
                    className={`bg-white rounded-lg p-4 border ${
                      item.selected ? "border-[#8ad3c3]" : "border-gray-200"
                    } shadow-sm`}
                  >
                    <div className="flex flex-col sm:flex-row items-center gap-4">
                      <div className="w-24 h-24 relative flex-shrink-0">
                        <Image
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          fill
                          className="object-contain"
                          sizes="(max-width: 768px) 96px, 96px"
                        />
                      </div>
                      <div className="flex-grow text-center sm:text-left">
                        <h3 className="text-xl font-semibold">{item.name}</h3>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-semibold">
                          INR {item.price.toLocaleString()}
                        </p>
                      </div>
                    </div>

                    <div className="flex justify-between items-center mt-4">
                      <div className="flex items-center">
                        <span className="mr-3">Quantity</span>
                        <div className="flex border border-gray-300 rounded">
                          <input
                            type="number"
                            min="1"
                            value={item.quantity}
                            onChange={(e) =>
                              updateQuantity(
                                item.id,
                                Number.parseInt(e.target.value) || 0
                              )
                            }
                            className="w-12 text-center py-1 px-2 border-0 focus:ring-0 focus:outline-none"
                          />
                          <div className="flex flex-col">
                            <button
                              onClick={() =>
                                updateQuantity(item.id, item.quantity + 1)
                              }
                              className="border-l border-gray-300 px-2 py-0 flex items-center justify-center hover:bg-gray-100"
                            >
                              <ChevronUp size={14} />
                            </button>
                            <button
                              onClick={() =>
                                updateQuantity(
                                  item.id,
                                  Math.max(1, item.quantity - 1)
                                )
                              }
                              className="border-l border-t border-gray-300 px-2 py-0 flex items-center justify-center hover:bg-gray-100"
                            >
                              <ChevronDown size={14} />
                            </button>
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-gray-500 hover:text-red-500 transition-colors"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}

                {/* Recommended Items Section */}
                {recommendedItems.length > 0 && (
                  <div className="mt-12">
                    <h2 className="text-xl font-semibold mb-4">
                      You might also be interested in
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {recommendedItems.map((item) => (
                        <div
                          key={item.id}
                          className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm hover:border-[#8ad3c3] transition-colors cursor-pointer"
                          onClick={() => {
                            updateQuantity(item.id, 1);
                            selectItem(item.id);
                          }}
                        >
                          <div className="flex flex-col items-center">
                            <div className="w-32 h-32 relative mb-3">
                              <Image
                                src={item.image || "/placeholder.svg"}
                                alt={item.name}
                                fill
                                className="object-contain"
                                sizes="(max-width: 768px) 128px, 128px"
                              />
                            </div>
                            <h3 className="text-lg font-medium text-center">
                              {item.name}
                            </h3>
                            <p className="mt-1 text-gray-600">
                              INR {item.price.toLocaleString()}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-12">
                <h2 className="text-2xl font-semibold mb-4">
                  Your basket is empty
                </h2>
                <p className="mb-8">
                  Add items to your basket to see them here.
                </p>
                <Link
                  href="/products"
                  className="inline-block px-6 py-3 bg-[#8ad3c3] text-white rounded-full font-medium hover:bg-[#7bc4b4] transition-colors"
                >
                  Browse Products
                </Link>
              </div>
            )}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm sticky top-6">
              <h2 className="text-xl font-semibold mb-6">Order Summary</h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span>Cart Total</span>
                  <span className="font-medium">
                    INR {cartTotal.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="text-green-600 font-medium">Free</span>
                </div>
                <div className="pt-2">
                  <label
                    htmlFor="coupon"
                    className="block mb-1 text-sm font-medium"
                  >
                    Coupon Code
                  </label>
                  <div className="flex">
                    <input
                      type="text"
                      id="coupon"
                      className="flex-grow rounded-l-lg border-gray-300 focus:border-[#8ad3c3] focus:ring focus:ring-[#8ad3c3] focus:ring-opacity-50"
                    />
                    <button className="bg-gray-100 text-gray-700 px-4 rounded-r-lg border border-gray-300 border-l-0 hover:bg-gray-200 transition-colors">
                      Apply
                    </button>
                  </div>
                </div>
                <div className="border-t border-gray-200 pt-4 mt-4">
                  <div className="flex justify-between font-semibold text-lg">
                    <span>Subtotal</span>
                    <span>INR {cartTotal.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <button
                className={`w-full py-3 px-4 bg-[#8ad3c3] text-white rounded-lg font-medium text-lg hover:bg-[#7bc4b4] transition-colors ${
                  activeItems.length === 0
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                }`}
                disabled={activeItems.length === 0}
              >
                Secure Checkout
              </button>

              <div className="mt-6">
                <p className="text-sm text-gray-500 mb-3 text-center">
                  We accept
                </p>
                <div className="flex justify-center space-x-3">
                  <div className="w-12 h-8 border border-gray-200 rounded flex items-center justify-center">
                    <span className="text-xs font-semibold">UPI</span>
                  </div>
                  <div className="w-12 h-8 border border-gray-200 rounded flex items-center justify-center">
                    <span className="text-xs font-semibold">VISA</span>
                  </div>
                  <div className="w-12 h-8 border border-gray-200 rounded flex items-center justify-center">
                    <span className="text-xs font-semibold">MC</span>
                  </div>
                  <div className="w-12 h-8 border border-gray-200 rounded flex items-center justify-center">
                    <span className="text-xs font-semibold">RuPay</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
