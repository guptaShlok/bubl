"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, CheckCircle } from "lucide-react";
import { useCartStore } from "@/lib/store";
import { CustomerDetails, CartItem } from "@/lib/types";
import { createOrder } from "@/lib/action";

// Define proper types for the order data and result
interface OrderData {
  customerDetails: CustomerDetails;
  items: CartItem[];
  subtotal: number;
  shipping: number;
  total: number;
  paymentMethod: "online" | "cod";
}

interface OrderResult {
  success: boolean;
  orderId?: string;
  error?: string;
}

export default function CheckoutPage() {
  const router = useRouter();
  const { items, clearCart } = useCartStore();
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderId, setOrderId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<"online" | "cod">(
    "online"
  );
  const [mounted, setMounted] = useState(false);

  // Form state
  const [formData, setFormData] = useState<CustomerDetails>({
    email: "",
    phone: "",
    firstName: "",
    lastName: "",
    city: "",
    pincode: "",
    streetAddress1: "",
    streetAddress2: "",
  });

  // Form validation
  const [errors, setErrors] = useState<
    Partial<Record<keyof CustomerDetails, string>>
  >({});

  // Fix hydration issues
  useEffect(() => {
    setMounted(true);
  }, []);

  // Redirect to cart if cart is empty
  useEffect(() => {
    if (mounted && items.length === 0 && !orderComplete) {
      router.push("/cart");
    }
  }, [items, router, orderComplete, mounted]);

  if (!mounted) {
    return <div className="container mx-auto px-4 py-8">Loading...</div>;
  }

  // Explicitly type the calculations to avoid "never" type issues
  const subtotal: number = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const shipping: number = 0; // Free shipping
  const total: number = subtotal + shipping;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error when user types
    if (errors[name as keyof CustomerDetails]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof CustomerDetails, string>> = {};

    // Required fields
    if (!formData.email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Email is invalid";

    if (!formData.phone) newErrors.phone = "Phone number is required";
    if (!formData.firstName) newErrors.firstName = "First name is required";
    if (!formData.city) newErrors.city = "City is required";
    if (!formData.pincode) newErrors.pincode = "Pincode is required";
    if (!formData.streetAddress1)
      newErrors.streetAddress1 = "Address is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent, method: "online" | "cod") => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setPaymentMethod(method);
    setLoading(true);

    try {
      // Create order in database with proper typing
      const orderData: OrderData = {
        customerDetails: formData,
        items: items,
        subtotal,
        shipping,
        total,
        paymentMethod: method,
      };

      // Type the result properly
      const result = (await createOrder(orderData)) as OrderResult;

      if (result.success && result.orderId) {
        // Ensure orderId exists before setting it
        setOrderId(result.orderId);
        setOrderComplete(true);
        clearCart();
      } else {
        throw new Error(result.error || "Failed to create order");
      }
    } catch (error) {
      console.error("Order error:", error);
      alert("There was an error processing your order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (orderComplete) {
    return (
      <div className="min-h-screen bg-white">
        <div className="bg-[#7FDAC0] py-16 mb-8">
          <h1 className="text-4xl font-light text-white text-center">
            Order Confirmed
          </h1>
        </div>

        <div className="container mx-auto px-4 py-8 max-w-3xl">
          <Card className="border border-[#e0f5ef] rounded-lg">
            <div className="p-8">
              <div className="text-center py-8">
                <CheckCircle className="h-16 w-16 text-[#7FDAC0] mx-auto mb-4" />
                <h1 className="text-2xl font-bold mb-2">
                  Thank You for Your Order!
                </h1>
                <p className="text-muted-foreground mb-6">
                  Your order #{orderId} has been confirmed.
                </p>
                <p className="mb-6">
                  We&#39;ve sent a confirmation email to{" "}
                  <span className="font-medium">{formData.email}</span> with
                  your order details.
                </p>
                {paymentMethod === "cod" && (
                  <p className="mb-6 p-4 bg-[#e0f5ef] rounded-lg">
                    You&#39;ve selected Cash on Delivery. Please have the exact
                    amount ready when your order arrives.
                  </p>
                )}
                <Link href="/">
                  <Button className="bg-[#7FDAC0] hover:bg-[#6bc9af] text-white">
                    Continue Shopping
                  </Button>
                </Link>
              </div>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="bg-[#7FDAC0] py-16 mb-8">
        <h1 className="text-4xl font-light text-white text-center">Checkout</h1>
      </div>

      <div className="container mx-auto px-4 pb-16">
        <div className="flex items-center mb-6">
          <Link href="/cart">
            <Button variant="ghost" size="sm" className="text-[#7FDAC0]">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Cart
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card className="border border-[#e0f5ef] rounded-lg">
              <div className="p-6">
                <h2 className="text-xl font-medium mb-6">Your Details</h2>
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="email">
                        Email Address<span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className={`border-[#e0f5ef] ${
                          errors.email ? "border-red-500" : ""
                        }`}
                      />
                      {errors.email && (
                        <p className="text-red-500 text-sm">{errors.email}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">
                        Phone Number<span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className={`border-[#e0f5ef] ${
                          errors.phone ? "border-red-500" : ""
                        }`}
                      />
                      {errors.phone && (
                        <p className="text-red-500 text-sm">{errors.phone}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">
                        First Name<span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className={`border-[#e0f5ef] ${
                          errors.firstName ? "border-red-500" : ""
                        }`}
                      />
                      {errors.firstName && (
                        <p className="text-red-500 text-sm">
                          {errors.firstName}
                        </p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className="border-[#e0f5ef]"
                      />
                    </div>
                  </div>

                  <h2 className="text-xl font-medium pt-4">Delivery</h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="city">
                        City<span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        className={`border-[#e0f5ef] ${
                          errors.city ? "border-red-500" : ""
                        }`}
                      />
                      {errors.city && (
                        <p className="text-red-500 text-sm">{errors.city}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="pincode">
                        Pincode<span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="pincode"
                        name="pincode"
                        value={formData.pincode}
                        onChange={handleInputChange}
                        className={`border-[#e0f5ef] ${
                          errors.pincode ? "border-red-500" : ""
                        }`}
                      />
                      {errors.pincode && (
                        <p className="text-red-500 text-sm">{errors.pincode}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="streetAddress1">
                        Street Address 1<span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="streetAddress1"
                        name="streetAddress1"
                        value={formData.streetAddress1}
                        onChange={handleInputChange}
                        className={`border-[#e0f5ef] ${
                          errors.streetAddress1 ? "border-red-500" : ""
                        }`}
                      />
                      {errors.streetAddress1 && (
                        <p className="text-red-500 text-sm">
                          {errors.streetAddress1}
                        </p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="streetAddress2">Street Address 2</Label>
                      <Input
                        id="streetAddress2"
                        name="streetAddress2"
                        value={formData.streetAddress2 || ""}
                        onChange={handleInputChange}
                        className="border-[#e0f5ef]"
                      />
                    </div>
                  </div>
                </form>
              </div>
            </Card>
          </div>

          <div>
            <Card className="border border-[#e0f5ef] rounded-lg sticky top-4">
              <div className="p-6">
                <h2 className="text-xl font-medium mb-4">Order Summary</h2>

                {/* Order Items */}
                <div className="space-y-4 mb-4">
                  {items.map((item) => (
                    <div key={item.id} className="flex items-center gap-4">
                      <div className="relative h-16 w-16 rounded overflow-hidden flex-shrink-0 border border-[#e0f5ef]">
                        <Image
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-grow">
                        <h3 className="font-medium text-sm">{item.name}</h3>
                        <p className="text-xs text-muted-foreground">
                          Qty: {item.quantity}
                        </p>
                      </div>
                      <div className="text-sm font-bold">
                        INR {(item.price * item.quantity).toLocaleString()}
                      </div>
                    </div>
                  ))}
                </div>

                <Separator className="bg-[#e0f5ef] my-4" />

                {/* Order Totals */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Cart Total</span>
                    <span>INR {subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Shipping</span>
                    <span>
                      {shipping === 0
                        ? "Free"
                        : `INR ${shipping.toLocaleString()}`}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Coupon Code</span>
                    <span className="text-sm text-muted-foreground">-</span>
                  </div>
                  <Separator className="bg-[#e0f5ef]" />
                  <div className="flex justify-between font-bold">
                    <span>Subtotal</span>
                    <span>INR {total.toLocaleString()}</span>
                  </div>
                </div>

                {/* Payment Methods */}
                <div className="mt-6">
                  <h3 className="font-medium mb-4">Accepted Payment Methods</h3>
                  <div className="flex justify-center gap-4 mb-6">
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

                  <Button
                    onClick={(e) => handleSubmit(e, "online")}
                    className="w-full bg-[#7FDAC0] hover:bg-[#6bc9af] text-white mb-3"
                    disabled={loading}
                  >
                    {loading && paymentMethod === "online"
                      ? "Processing..."
                      : "Pay Now"}
                  </Button>

                  <Button
                    onClick={(e) => handleSubmit(e, "cod")}
                    variant="outline"
                    className="w-full border-[#7FDAC0] text-[#7FDAC0] hover:bg-[#e0f5ef]"
                    disabled={loading}
                  >
                    {loading && paymentMethod === "cod"
                      ? "Processing..."
                      : "Pay on Delivery"}
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
