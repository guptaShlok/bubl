"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { CheckCircle, ShoppingBag, AlertTriangle, Loader2 } from "lucide-react";
import { updatePaymentStatus } from "@/lib/action";
import type { CustomerDetails, SuccessPageParams } from "@/lib/types";

/**
 * Extract and validate URL parameters
 * @param searchParams - URL search parameters
 * @returns Validated parameters object
 */
function extractUrlParams(searchParams: URLSearchParams): SuccessPageParams {
  return {
    orderId: searchParams.get("orderId") || "Unknown",
    paymentId: searchParams.get("paymentId") || undefined,
    paymentMethod: searchParams.get("paymentMethod") || "Unknown",
    email: searchParams.get("email") || "Unknown",
    total: searchParams.get("total") || "0",
    firstName: searchParams.get("firstName") || undefined,
    lastName: searchParams.get("lastName") || undefined,
    phone: searchParams.get("phone") || undefined,
    streetAddress1: searchParams.get("streetAddress1") || undefined,
    streetAddress2: searchParams.get("streetAddress2") || undefined,
    city: searchParams.get("city") || undefined,
    state: searchParams.get("state") || undefined,
    pincode: searchParams.get("pincode") || undefined,
    country: searchParams.get("country") || undefined,
  };
}

/**
 * Create customer details from URL parameters with proper type safety
 * @param params - URL parameters
 * @returns Complete customer details object
 */
function createCustomerDetailsFromParams(
  params: SuccessPageParams
): CustomerDetails {
  return {
    firstName: params.firstName || "Customer",
    lastName: params.lastName || "",
    email: params.email !== "Unknown" ? params.email : "customer@example.com",
    phone: params.phone || "Not provided",
    streetAddress1: params.streetAddress1 || "Not provided",
    streetAddress2: params.streetAddress2 || "",
    city: params.city || "Not provided",
    state: params.state || "",
    pincode: params.pincode || "000000",
    country: params.country || "India",
    useSameAddressForBilling: true,
    billingAddress: {
      firstName: params.firstName || "Customer",
      lastName: params.lastName || "",
      streetAddress1: params.streetAddress1 || "Not provided",
      streetAddress2: params.streetAddress2 || "",
      city: params.city || "Not provided",
      state: params.state || "",
      pincode: params.pincode || "000000",
      country: params.country || "India",
    },
  };
}

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const [isProcessing, setIsProcessing] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [processed, setProcessed] = useState<boolean>(false);

  // Extract and validate URL parameters
  const params = extractUrlParams(searchParams);
  const total = Number(params.total);

  // Log the extracted parameters for debugging
  console.log("Extracted URL parameters:", params);

  useEffect(() => {
    if (processed) return;

    const processOrder = async (): Promise<void> => {
      try {
        setIsProcessing(true);

        // Create customer details object from URL params with proper defaults
        const customerDetails: CustomerDetails =
          createCustomerDetailsFromParams(params);
        console.log(
          "Created customer details from URL params:",
          customerDetails
        );

        // Only process online payments
        if (
          params.paymentMethod === "online" &&
          params.paymentId &&
          params.paymentId !== "Unknown"
        ) {
          const items = [
            {
              id: "baby-bubl-1",
              name: "Baby Bubl Air Purifier",
              description: "Portable air purifier for babies",
              price: total,
              image:
                "/backgroundImages/productPage/productLandingPageOverlay.png",
              category: "air-purifiers",
              quantity: 1,
            },
          ];

          console.log(
            "Processing payment with customer details:",
            customerDetails
          );
          const result = await updatePaymentStatus(
            params.orderId,
            params.paymentId,
            "paid",
            params.email,
            items,
            total,
            customerDetails // Now properly typed as CustomerDetails
          );

          if (!result.success) {
            throw new Error(result.error || "Failed to update payment status");
          }
        }

        setIsProcessing(false);
        setProcessed(true);
      } catch (err) {
        console.error("Error processing order:", err);
        setError(
          err instanceof Error ? err.message : "An unknown error occurred"
        );
        setIsProcessing(false);
        setProcessed(true);
      }
    };

    processOrder();
  }, [params, total, processed]);

  if (isProcessing) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-md">
          <Card className="w-full shadow-lg border-0">
            <CardHeader className="bg-[#7FDAC0] text-white text-center py-6">
              <h1 className="text-2xl font-bold">Processing Your Order</h1>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center p-8 space-y-4">
              <div className="w-16 h-16 flex items-center justify-center">
                <Loader2 className="h-10 w-10 text-[#7FDAC0] animate-spin" />
              </div>
              <p className="text-lg font-medium text-center">
                Please wait while we process your order...
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-md">
          <Card className="w-full shadow-lg border-0">
            <CardHeader className="bg-red-500 text-white text-center py-6">
              <h1 className="text-2xl font-bold">Order Processing Error</h1>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center p-8 space-y-4">
              <div className="w-16 h-16 flex items-center justify-center bg-red-100 rounded-full">
                <AlertTriangle className="h-10 w-10 text-red-500" />
              </div>
              <p className="text-lg font-medium text-center">
                There was an error processing your order
              </p>
              <p className="text-sm text-gray-500 text-center">{error}</p>
              <p className="text-sm text-gray-500 text-center">
                Order ID: {params.orderId}
              </p>
            </CardContent>
            <CardFooter className="flex justify-center p-6 pt-0">
              <Button asChild className="bg-[#7FDAC0] hover:bg-[#6bc4ab]">
                <Link href="/">Return to Home</Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card className="w-full shadow-lg border-0">
          <CardHeader className="bg-[#7FDAC0] text-white text-center py-6">
            <h1 className="text-2xl font-bold">Order Confirmed</h1>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center p-8 space-y-6">
            <div className="w-20 h-20 flex items-center justify-center bg-green-100 rounded-full">
              <CheckCircle className="h-12 w-12 text-green-500" />
            </div>
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-bold">Thank You!</h2>
              <p className="text-gray-600">
                Your order has been received and is being processed.
              </p>
            </div>

            <div className="w-full bg-gray-50 p-4 rounded-lg space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Order ID:</span>
                <span className="font-medium">{params.orderId}</span>
              </div>
              {params.paymentMethod === "online" && params.paymentId && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Payment ID:</span>
                  <span className="font-medium">{params.paymentId}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-gray-600">Payment Method:</span>
                <span className="font-medium capitalize">
                  {params.paymentMethod === "cod"
                    ? "Cash on Delivery"
                    : "Online Payment"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Amount:</span>
                <span className="font-medium">₹{(total / 100).toFixed(2)}</span>
              </div>
              <div className="pt-2 text-sm text-gray-500">
                A confirmation email has been sent to {params.email}
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-center p-6 pt-0">
            <Button asChild className="bg-[#7FDAC0] hover:bg-[#6bc4ab]">
              <Link href="/">
                <ShoppingBag className="mr-2 h-4 w-4" />
                Continue Shopping
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
