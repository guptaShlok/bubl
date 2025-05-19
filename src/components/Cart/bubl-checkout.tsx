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
import { ArrowLeft } from "lucide-react";
import { useCartStore } from "@/lib/store";
import { loadRazorpayScript, initializeRazorpay } from "@/lib/razorpay";
import type { CustomerDetails, OrderData, OrderResult } from "@/lib/types";
import { createOrder } from "@/lib/action";
import type { RazorpayOptions } from "@/lib/types";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, clearCart } = useCartStore();
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<"online">("online");
  const [mounted, setMounted] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [razorpayLoaded, setRazorpayLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);

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

  // Load Razorpay script on component mount
  useEffect(() => {
    const loadScript = async () => {
      try {
        const loaded = await loadRazorpayScript();
        console.log("Razorpay script loaded:", loaded);
        setRazorpayLoaded(loaded);
      } catch (error) {
        console.error("Error loading Razorpay script:", error);
      }
    };
    loadScript();
  }, []);

  // Fix hydration issues
  useEffect(() => {
    setMounted(true);
  }, []);

  // Redirect to cart if cart is empty
  useEffect(() => {
    if (mounted && items.length === 0 && !orderComplete) {
      router.push("/bubl-cart");
    }
  }, [router, mounted, orderComplete, items.length]);

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

  // Function to handle Razorpay payment
  const handleRazorpayPayment = async (
    orderId: string,
    orderData: OrderData,
    customerDetails: CustomerDetails
  ) => {
    console.log("Starting Razorpay payment for order:", orderId);

    if (!razorpayLoaded) {
      console.error("Razorpay not loaded yet");
      alert("Payment system is still loading. Please try again in a moment.");
      setLoading(false);
      return;
    }

    try {
      // Get the Razorpay key from environment variables
      const razorpayKey = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
      // process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "rzp_test_BvRCejha9FdLTh";

      if (!razorpayKey) {
        throw new Error("Razorpay key not found");
      }

      console.log(
        "Using Razorpay key:",
        razorpayKey.substring(0, 4) +
          "..." +
          razorpayKey.substring(razorpayKey.length - 4)
      );

      const scriptLoaded = await loadRazorpayScript();
      if (!scriptLoaded) {
        console.error("Failed to load Razorpay script");
        setError("Failed to load payment gateway. Please try again.");
        setLoading(false);
        return;
      }

      const options: RazorpayOptions = {
        key: razorpayKey,
        amount: orderData.total * 100, // Convert to paise
        currency: "INR",
        name: "Bubl Store",
        description: `Order #${orderId}`,
        image: "https://your-website.com/logo.png", // Replace with your logo URL
        prefill: {
          name: `${customerDetails.firstName} ${customerDetails.lastName}`,
          email: customerDetails.email,
          contact: customerDetails.phone,
        },
        theme: {
          color: "#7FDAC0",
        },
        handler: function (response) {
          // Redirect to success page with payment details
          const successUrl = `/bubl-checkout/success?orderId=${orderId}&paymentId=${
            response.razorpay_payment_id
          }&method=online&email=${encodeURIComponent(
            customerDetails.email
          )}&total=${orderData.total}`;
          router.push(successUrl);
          clearCart();
          setOrderComplete(true);
        },
      };

      // Initialize payment
      const response = await initializeRazorpay(options);
      console.log("Payment successful:", response);

      // Redirect to success page with payment details
      const successUrl = `/bubl-checkout/success?orderId=${orderId}&paymentId=${
        response.razorpay_payment_id
      }&method=online&email=${encodeURIComponent(
        customerDetails.email
      )}&total=${orderData.total}`;
      router.push(successUrl);

      // Clear cart and redirect
      clearCart();
      setOrderComplete(true);
    } catch (error) {
      console.error("Razorpay payment error:", error);
      alert(
        "Payment failed. Please try again or choose a different payment method."
      );
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent, method: "online") => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setPaymentMethod("online");
    setLoading(true);
    setError(null);

    try {
      // Create order in database
      const orderData: OrderData = {
        customerDetails: formData,
        items: items,
        subtotal,
        shipping,
        total,
        paymentMethod: method,
      };

      console.log(
        "Creating order with data:",
        JSON.stringify(orderData, null, 2)
      );
      const result = (await createOrder(orderData)) as OrderResult;
      console.log("Order creation result:", result);

      if (result.success && result.orderId) {
        // For COD, redirect to success page directly
        clearCart();
        setOrderComplete(true);
        router.push(
          `/bubl-checkout/success?orderId=${
            result.orderId
          }&method=cod&email=${encodeURIComponent(
            formData.email
          )}&total=${total}`
        );

        // For online payment, initialize Razorpay
        console.log("Initializing online payment for order:", result.orderId);
        await handleRazorpayPayment(result.orderId, orderData, formData);
      } else {
        throw new Error(result.error || "Failed to create order");
      }
    } catch (error) {
      console.error(
        "Order error:",
        error instanceof Error ? error.message : String(error)
      );
      alert("There was an error processing your order. Please try again.");
      setLoading(false);
      setError("There was an error processing your order. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="bg-[#7FDAC0] py-16 mb-8">
        <h1 className="text-4xl font-light text-white text-center">Checkout</h1>
      </div>

      <div className="container mx-auto px-4 pb-16">
        <div className="flex items-center mb-6">
          <Link href="/bubl-cart">
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
                        INR {(item.price * item.quantity).toFixed(2)}
                      </div>
                    </div>
                  ))}
                </div>

                <Separator className="bg-[#e0f5ef] my-4" />

                {/* Order Totals */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Cart Total</span>
                    <span>INR {subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Shipping</span>
                    <span>Free</span>
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
                </div>
                {error && <div className="mt-4 text-red-500">{error}</div>}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
