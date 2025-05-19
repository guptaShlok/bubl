"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Trash2, Plus, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useCartStore } from "@/lib/store";
import { getRecommendedProducts } from "@/lib/product";
import type { Product, CartItem } from "@/lib/types";

export default function CartPage() {
  const router = useRouter();
  const { items, removeItem, updateQuantity, addItem } = useCartStore();
  const [mounted, setMounted] = useState(false);
  const [recommendedProducts, setRecommendedProducts] = useState<Product[]>([]);

  // Fix hydration issues
  useEffect(() => {
    setMounted(true);

    // Get recommended products based on cart items
    if (items.length > 0) {
      const itemIds = items.map((item) => item.id);
      setRecommendedProducts(getRecommendedProducts(itemIds));
    } else {
      // Get popular products if cart is empty
      setRecommendedProducts(getRecommendedProducts([]));
    }
  }, [items]);

  if (!mounted) {
    return <div className="container mx-auto px-4 py-8">Loading...</div>;
  }

  // Calculate totals
  const subtotal = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const shipping = 0; // Free shipping
  const total = subtotal + shipping;

  const handleQuantityChange = (item: CartItem, newQuantity: number) => {
    if (newQuantity < 1) return;
    updateQuantity(item.id, newQuantity);
  };

  const handleRemoveItem = (id: string) => {
    removeItem(id);
  };

  const handleCheckout = () => {
    router.push("/bubl-checkout");
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="bg-[#7FDAC0] py-16 mb-8">
        <h1 className="text-4xl font-light text-white text-center">
          Your Basket
        </h1>
      </div>

      <div className="container mx-auto px-4 pb-16">
        {items.length === 0 ? (
          <div className="text-center py-12">
            <h2 className="text-xl mb-4">Your basket is empty</h2>
            <p className="text-sm text-muted-foreground mb-6">
              Looks like you haven&#39;t added anything to your basket yet.
            </p>
            <Link href="/product-babybubl">
              <Button className="bg-[#7FDAC0] hover:bg-[#6bc9af] text-white">
                Continue Shopping
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              {/* Cart Items */}
              <Card className="overflow-hidden border border-[#e0f5ef] rounded-lg">
                <div className="p-6 space-y-6">
                  {items.map((item: CartItem) => (
                    <div
                      key={item.id}
                      className="flex flex-col sm:flex-row items-start sm:items-center gap-4 py-4"
                    >
                      <div className="relative h-24 w-24 rounded overflow-hidden flex-shrink-0 border border-[#e0f5ef]">
                        <Image
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-grow">
                        <h3 className="font-medium text-lg">{item.name}</h3>
                        <p className="text-sm text-muted-foreground mb-2">
                          {item.description}
                        </p>
                        <p className="font-bold text-lg">
                          INR {item.price.toFixed(2)}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 mt-2 sm:mt-0">
                        <div className="flex items-center border border-[#e0f5ef] rounded-md">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() =>
                              handleQuantityChange(
                                item,
                                Math.max(1, item.quantity - 1)
                              )
                            }
                            disabled={item.quantity <= 1}
                            className="h-8 w-8 rounded-none text-[#7FDAC0]"
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          <div className="w-12 h-8 flex items-center justify-center text-center">
                            {item.quantity}
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() =>
                              handleQuantityChange(item, item.quantity + 1)
                            }
                            className="h-8 w-8 rounded-none text-[#7FDAC0]"
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleRemoveItem(item.id)}
                          className="h-8 w-8 text-muted-foreground hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Recommended Products */}
              {recommendedProducts.length > 0 && (
                <div>
                  <h2 className="text-xl font-medium mb-4">
                    You might also be interested in
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {recommendedProducts.map((product: Product) => (
                      <Card
                        key={product.id}
                        className="overflow-hidden border border-[#e0f5ef] rounded-lg"
                      >
                        <div className="p-4">
                          <div className="flex items-center gap-4">
                            <div className="relative h-24 w-24 rounded overflow-hidden flex-shrink-0 border border-[#e0f5ef]">
                              <Image
                                src={product.image || "/placeholder.svg"}
                                alt={product.name}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div>
                              <h3 className="font-medium">{product.name}</h3>
                              <p className="text-sm text-muted-foreground mb-2">
                                {product.description}
                              </p>
                              <p className="font-bold">
                                INR {product.price.toFixed(2)}
                              </p>
                              <Button
                                onClick={() => addItem(product)}
                                className="mt-2 bg-[#7FDAC0] hover:bg-[#6bc9af] text-white"
                                size="sm"
                              >
                                Add to Basket
                              </Button>
                            </div>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Order Summary */}
            <div>
              <Card className="border border-[#e0f5ef] rounded-lg sticky top-4">
                <div className="p-6">
                  <h2 className="text-xl font-medium mb-4">Order Summary</h2>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span>Cart Total</span>
                      <span>INR {subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Shipping</span>
                      Free
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Coupon Code</span>
                      <span className="text-sm text-muted-foreground">-</span>
                    </div>
                    <Separator className="bg-[#e0f5ef]" />
                    <div className="flex justify-between font-bold">
                      <span>Subtotal</span>
                      <span>INR {total.toFixed(2)}</span>
                    </div>
                    <Button
                      className="w-full bg-[#7FDAC0] hover:bg-[#6bc9af] text-white"
                      onClick={handleCheckout}
                    >
                      Secure Checkout
                    </Button>
                  </div>

                  <div className="mt-6">
                    <div className="flex justify-center gap-4 mt-4">
                      <Image
                        src="/backgroundImages/Cart/UPI.png"
                        alt="UPI"
                        width={40}
                        height={40}
                        className="object-contain"
                      />
                      <Image
                        src="/backgroundImages/Cart/VISA.png"
                        alt="Visa"
                        width={40}
                        height={40}
                        className="object-contain"
                      />
                      <Image
                        src="/backgroundImages/Cart/MasterCard.png"
                        alt="Mastercard"
                        width={40}
                        height={40}
                        className="object-contain"
                      />
                      <Image
                        src="/backgroundImages/Cart/RuPay.png"
                        alt="RuPay"
                        width={40}
                        height={40}
                        className="object-contain"
                      />
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
