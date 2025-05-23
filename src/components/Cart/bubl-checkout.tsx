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
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowLeft, ChevronDown, ChevronUp } from "lucide-react";
import { useCartStore } from "@/lib/store";
import { loadRazorpayScript, initializeRazorpay } from "@/lib/razorpay";
import type { CustomerDetails, OrderData, OrderResult } from "@/lib/types";
import { createOrder } from "@/lib/action";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, clearCart } = useCartStore();
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<"online" | "cod">(
    "online"
  );
  const [mounted, setMounted] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [razorpayLoaded, setRazorpayLoaded] = useState(false);
  const [showBillingAddress, setShowBillingAddress] = useState(false);
  const [useSameAddress, setUseSameAddress] = useState(true);
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
    state: "",
    country: "India",
    useSameAddressForBilling: true,
    billingAddress: {
      firstName: "",
      lastName: "",
      streetAddress1: "",
      streetAddress2: "",
      city: "",
      pincode: "",
      state: "",
      country: "India",
    },
  });

  // Form validation
  const [errors, setErrors] = useState<
    Partial<Record<keyof CustomerDetails | string, string>>
  >({});

  // Load Razorpay script on component mount
  useEffect(() => {
    const loadScript = async () => {
      try {
        const loaded = await loadRazorpayScript();
        console.log("Razorpay script loaded:", loaded);
        setRazorpayLoaded(loaded);

        if (!loaded) {
          setError(
            "Failed to load payment gateway. Please try again or choose Cash on Delivery."
          );
        }
      } catch (error) {
        console.error("Error loading Razorpay script:", error);
        setError(
          "Failed to load payment gateway. Please try again or choose Cash on Delivery."
        );
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

  // Update billing address when useSameAddress changes
  useEffect(() => {
    if (useSameAddress) {
      setFormData((prev) => ({
        ...prev,
        useSameAddressForBilling: true,
        billingAddress: {
          firstName: prev.firstName,
          lastName: prev.lastName || "",
          streetAddress1: prev.streetAddress1,
          streetAddress2: prev.streetAddress2 || "",
          city: prev.city,
          pincode: prev.pincode,
          state: prev.state || "",
          country: prev.country || "India",
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        useSameAddressForBilling: false,
      }));
    }
  }, [
    useSameAddress,
    formData.firstName,
    formData.lastName,
    formData.streetAddress1,
    formData.streetAddress2,
    formData.city,
    formData.pincode,
    formData.state,
    formData.country,
  ]);

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

    // Check if this is a billing address field
    if (name.startsWith("billing.")) {
      const billingField = name.replace("billing.", "");
      setFormData((prev) => ({
        ...prev,
        billingAddress: {
          ...prev.billingAddress!,
          [billingField]: value,
        },
      }));

      // Clear error when user types
      if (errors[name]) {
        setErrors((prev) => ({ ...prev, [name]: "" }));
      }
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));

      // Clear error when user types
      if (errors[name]) {
        setErrors((prev) => ({ ...prev, [name]: "" }));
      }

      // If using same address for billing, update billing address too
      if (
        useSameAddress &&
        (name === "firstName" ||
          name === "lastName" ||
          name === "streetAddress1" ||
          name === "streetAddress2" ||
          name === "city" ||
          name === "pincode" ||
          name === "state" ||
          name === "country")
      ) {
        setFormData((prev) => ({
          ...prev,
          billingAddress: {
            ...prev.billingAddress!,
            [name]: value,
          },
        }));
      }
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof CustomerDetails | string, string>> =
      {};

    // Required fields for shipping address
    if (!formData.email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Email is invalid";

    if (!formData.phone) newErrors.phone = "Phone number is required";
    if (!formData.firstName) newErrors.firstName = "First name is required";
    if (!formData.city) newErrors.city = "City is required";
    if (!formData.pincode) newErrors.pincode = "Pincode is required";
    if (!formData.streetAddress1)
      newErrors.streetAddress1 = "Address is required";

    // Validate billing address if not using same address
    if (showBillingAddress && !useSameAddress) {
      if (!formData.billingAddress?.firstName)
        newErrors["billing.firstName"] = "First name is required";
      if (!formData.billingAddress?.city)
        newErrors["billing.city"] = "City is required";
      if (!formData.billingAddress?.pincode)
        newErrors["billing.pincode"] = "Pincode is required";
      if (!formData.billingAddress?.streetAddress1)
        newErrors["billing.streetAddress1"] = "Address is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent, method: "online" | "cod") => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    // Check if Razorpay is loaded for online payment
    if (method === "online" && !razorpayLoaded) {
      setError(
        "Payment gateway is not loaded. Please try again or choose Cash on Delivery."
      );
      return;
    }

    setPaymentMethod(method);
    setLoading(true);
    setError(null);

    try {
      // Create order in database
      const orderData: OrderData = {
        customerDetails: {
          ...formData,
          useSameAddressForBilling: useSameAddress,
          billingAddress:
            showBillingAddress && !useSameAddress
              ? formData.billingAddress
              : undefined,
        },
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
        if (method === "cod") {
          // For COD, redirect to success page directly
          clearCart();
          setOrderComplete(true);
          const customerParams = new URLSearchParams({
            firstName: formData.firstName,
            lastName: formData.lastName || "",
            phone: formData.phone,
            streetAddress1: formData.streetAddress1,
            streetAddress2: formData.streetAddress2 || "",
            city: formData.city,
            state: formData.state || "",
            pincode: formData.pincode,
            country: formData.country || "India",
          }).toString();

          router.push(
            `/bubl-checkout/success?orderId=${result.orderId}&paymentMethod=cod&email=${encodeURIComponent(
              formData.email
            )}&total=${total}&${customerParams}`
          );
        } else {
          // For online payment, initialize Razorpay
          console.log("Initializing online payment for order:", result.orderId);

          try {
            initializeRazorpay(
              total,
              formData,
              (paymentId, orderId, signature) => {
                // Payment successful
                console.log("Payment successful with ID:", paymentId);
                clearCart();
                setOrderComplete(true);

                // Verify the payment on the server
                fetch("/api/razorpay/verify-payment", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    razorpay_payment_id: paymentId,
                    razorpay_order_id: orderId,
                    razorpay_signature: signature,
                  }),
                })
                  .then((response) => response.json())
                  .then((data) => {
                    console.log("Payment verification result:", data);

                    // Redirect to success page regardless of verification result
                    // The verification is just for server-side validation
                    const customerParams = new URLSearchParams({
                      firstName: formData.firstName,
                      lastName: formData.lastName || "",
                      phone: formData.phone,
                      streetAddress1: formData.streetAddress1,
                      streetAddress2: formData.streetAddress2 || "",
                      city: formData.city,
                      state: formData.state || "",
                      pincode: formData.pincode,
                      country: formData.country || "India",
                    }).toString();

                    router.push(
                      `/bubl-checkout/success?orderId=${
                        result.orderId
                      }&paymentId=${paymentId}&paymentMethod=online&email=${encodeURIComponent(
                        formData.email
                      )}&total=${total}&${customerParams}`
                    );
                  })
                  .catch((error) => {
                    console.error("Error verifying payment:", error);
                    // Still redirect to success page as the payment was successful on Razorpay's end
                    const customerParams = new URLSearchParams({
                      firstName: formData.firstName,
                      lastName: formData.lastName || "",
                      phone: formData.phone,
                      streetAddress1: formData.streetAddress1,
                      streetAddress2: formData.streetAddress2 || "",
                      city: formData.city,
                      state: formData.state || "",
                      pincode: formData.pincode,
                      country: formData.country || "India",
                    }).toString();

                    router.push(
                      `/bubl-checkout/success?orderId=${
                        result.orderId
                      }&paymentId=${paymentId}&paymentMethod=online&email=${encodeURIComponent(
                        formData.email
                      )}&total=${total}&${customerParams}`
                    );
                  });
              },
              (error) => {
                // Payment failed
                console.error("Payment failed:", error);
                setLoading(false);
                setError(
                  `Payment failed: ${
                    error instanceof Error
                      ? error.message
                      : "Please try again or choose a different payment method"
                  }`
                );
              }
            );
          } catch (error) {
            console.error("Error initializing Razorpay:", error);
            setLoading(false);
            setError(
              `Failed to initialize payment: ${
                error instanceof Error
                  ? error.message
                  : "Please try again or choose Cash on Delivery"
              }`
            );
          }
        }
      } else {
        throw new Error(result.error || "Failed to create order");
      }
    } catch (error) {
      console.error(
        "Order error:",
        error instanceof Error ? error.message : String(error)
      );
      setError("There was an error processing your order. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="bg-[#7FDAC0] pt-[15vh] py-16 mb-8">
        <h1 className="text-7xl font-semibold text-white text-center">
          Checkout
        </h1>
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
                        className={`border-[#e0f5ef] ${errors.email ? "border-red-500" : ""}`}
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
                        className={`border-[#e0f5ef] ${errors.phone ? "border-red-500" : ""}`}
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
                        className={`border-[#e0f5ef] ${errors.firstName ? "border-red-500" : ""}`}
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
                        value={formData.lastName || ""}
                        onChange={handleInputChange}
                        className="border-[#e0f5ef]"
                      />
                    </div>
                  </div>

                  <h2 className="text-xl font-medium pt-4">Shipping Address</h2>

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
                        className={`border-[#e0f5ef] ${errors.streetAddress1 ? "border-red-500" : ""}`}
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
                        className={`border-[#e0f5ef] ${errors.city ? "border-red-500" : ""}`}
                      />
                      {errors.city && (
                        <p className="text-red-500 text-sm">{errors.city}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="state">State</Label>
                      <Input
                        id="state"
                        name="state"
                        value={formData.state || ""}
                        onChange={handleInputChange}
                        className="border-[#e0f5ef]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="pincode">
                        Pincode<span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="pincode"
                        name="pincode"
                        value={formData.pincode}
                        onChange={handleInputChange}
                        className={`border-[#e0f5ef] ${errors.pincode ? "border-red-500" : ""}`}
                      />
                      {errors.pincode && (
                        <p className="text-red-500 text-sm">{errors.pincode}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="country">Country</Label>
                      <Input
                        id="country"
                        name="country"
                        value={formData.country || "India"}
                        onChange={handleInputChange}
                        className="border-[#e0f5ef]"
                      />
                    </div>
                  </div>

                  {/* Billing Address Toggle */}
                  <div className="pt-4">
                    <button
                      type="button"
                      onClick={() => setShowBillingAddress(!showBillingAddress)}
                      className="flex items-center text-[#7FDAC0] hover:text-[#6bc9af] transition-colors"
                    >
                      <span className="font-medium">Billing Address</span>
                      {showBillingAddress ? (
                        <ChevronUp className="ml-2 h-4 w-4" />
                      ) : (
                        <ChevronDown className="ml-2 h-4 w-4" />
                      )}
                    </button>
                  </div>

                  {/* Billing Address Section */}
                  {showBillingAddress && (
                    <div className="space-y-6 pt-2 pb-4 border-t border-[#e0f5ef]">
                      <div className="flex items-center space-x-2 pt-4">
                        <Checkbox
                          id="useSameAddress"
                          checked={useSameAddress}
                          onCheckedChange={(checked) => {
                            setUseSameAddress(checked === true);
                          }}
                        />
                        <Label
                          htmlFor="useSameAddress"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          Use shipping address as billing address
                        </Label>
                      </div>

                      {!useSameAddress && (
                        <>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                              <Label htmlFor="billing.firstName">
                                First Name
                                <span className="text-red-500">*</span>
                              </Label>
                              <Input
                                id="billing.firstName"
                                name="billing.firstName"
                                value={formData.billingAddress?.firstName || ""}
                                onChange={handleInputChange}
                                className={`border-[#e0f5ef] ${errors["billing.firstName"] ? "border-red-500" : ""}`}
                              />
                              {errors["billing.firstName"] && (
                                <p className="text-red-500 text-sm">
                                  {errors["billing.firstName"]}
                                </p>
                              )}
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="billing.lastName">
                                Last Name
                              </Label>
                              <Input
                                id="billing.lastName"
                                name="billing.lastName"
                                value={formData.billingAddress?.lastName || ""}
                                onChange={handleInputChange}
                                className="border-[#e0f5ef]"
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                              <Label htmlFor="billing.streetAddress1">
                                Street Address 1
                                <span className="text-red-500">*</span>
                              </Label>
                              <Input
                                id="billing.streetAddress1"
                                name="billing.streetAddress1"
                                value={
                                  formData.billingAddress?.streetAddress1 || ""
                                }
                                onChange={handleInputChange}
                                className={`border-[#e0f5ef] ${
                                  errors["billing.streetAddress1"]
                                    ? "border-red-500"
                                    : ""
                                }`}
                              />
                              {errors["billing.streetAddress1"] && (
                                <p className="text-red-500 text-sm">
                                  {errors["billing.streetAddress1"]}
                                </p>
                              )}
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="billing.streetAddress2">
                                Street Address 2
                              </Label>
                              <Input
                                id="billing.streetAddress2"
                                name="billing.streetAddress2"
                                value={
                                  formData.billingAddress?.streetAddress2 || ""
                                }
                                onChange={handleInputChange}
                                className="border-[#e0f5ef]"
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                              <Label htmlFor="billing.city">
                                City<span className="text-red-500">*</span>
                              </Label>
                              <Input
                                id="billing.city"
                                name="billing.city"
                                value={formData.billingAddress?.city || ""}
                                onChange={handleInputChange}
                                className={`border-[#e0f5ef] ${errors["billing.city"] ? "border-red-500" : ""}`}
                              />
                              {errors["billing.city"] && (
                                <p className="text-red-500 text-sm">
                                  {errors["billing.city"]}
                                </p>
                              )}
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="billing.state">State</Label>
                              <Input
                                id="billing.state"
                                name="billing.state"
                                value={formData.billingAddress?.state || ""}
                                onChange={handleInputChange}
                                className="border-[#e0f5ef]"
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                              <Label htmlFor="billing.pincode">
                                Pincode<span className="text-red-500">*</span>
                              </Label>
                              <Input
                                id="billing.pincode"
                                name="billing.pincode"
                                value={formData.billingAddress?.pincode || ""}
                                onChange={handleInputChange}
                                className={`border-[#e0f5ef] ${errors["billing.pincode"] ? "border-red-500" : ""}`}
                              />
                              {errors["billing.pincode"] && (
                                <p className="text-red-500 text-sm">
                                  {errors["billing.pincode"]}
                                </p>
                              )}
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="billing.country">Country</Label>
                              <Input
                                id="billing.country"
                                name="billing.country"
                                value={
                                  formData.billingAddress?.country || "India"
                                }
                                onChange={handleInputChange}
                                className="border-[#e0f5ef]"
                              />
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  )}
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
                    disabled={loading || !razorpayLoaded}
                  >
                    {loading && paymentMethod === "online"
                      ? "Processing..."
                      : "Pay Now"}
                  </Button>
                </div>

                {error && (
                  <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-md text-red-600 text-sm">
                    {error}
                  </div>
                )}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
