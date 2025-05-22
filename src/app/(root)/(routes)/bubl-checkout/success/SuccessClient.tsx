"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";
import { updatePaymentStatus } from "@/lib/action";

// Flag to track if we've already processed this order
let processedOrder = false;

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const [isUpdating, setIsUpdating] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const updateOrder = async () => {
      try {
        // If we've already processed this order, don't do it again
        if (processedOrder) {
          setIsUpdating(false);
          return;
        }

        setIsUpdating(true);

        const orderId = searchParams.get("orderId") || "";
        const paymentId = searchParams.get("paymentId") || "";
        const paymentMethod = searchParams.get("paymentMethod") || "online";
        const email = searchParams.get("email") || "";
        const total = Number(searchParams.get("total") || "0");

        console.log("Processing order on success page:", {
          orderId,
          paymentId,
          paymentMethod,
        });

        // For online payments, we need to update the payment status
        if (paymentMethod === "online" && paymentId) {
          // Create dummy items for the email
          // In a real app, you would retrieve the actual items from your database
          const items = [
            {
              id: "baby-bubl-1",
              name: "Baby Bubl Air Purifier",
              description: "Advanced air purification for your home",
              price: total,
              image:
                "/backgroundImages/productPage/productLandingPageOverlay.png",
              category: "air-purifiers",
              quantity: 1,
            },
          ];

          // Update payment status to trigger emails - only once
          const result = await updatePaymentStatus(
            orderId,
            paymentId,
            "paid",
            email,
            items,
            total
          );

          // Mark this order as processed
          processedOrder = true;

          if (!result.success) {
            throw new Error(result.error || "Failed to update payment status");
          }
        }

        setIsUpdating(false);
      } catch (err) {
        console.error("Error updating order:", err);
        setError(err instanceof Error ? err.message : "An error occurred");
        setIsUpdating(false);
      }
    };

    updateOrder();
  }, [searchParams]);

  const orderId = searchParams.get("orderId") || "Unknown";
  const paymentId = searchParams.get("paymentId") || "";
  const paymentMethod = searchParams.get("paymentMethod") || "online";
  const email = searchParams.get("email") || "";
  const total = Number(searchParams.get("total") || "0");

  return (
    <div className="min-h-screen bg-white">
      <div className="bg-[#7FDAC0] py-16 mb-8">
        <h1 className="text-4xl font-light text-white text-center">
          Order Confirmation
        </h1>
      </div>

      <div className="container mx-auto px-4 pb-16">
        <Card className="max-w-2xl mx-auto border border-[#e0f5ef] rounded-lg overflow-hidden">
          <div className="p-8 text-center">
            {isUpdating ? (
              <div className="flex flex-col items-center justify-center py-8">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#7FDAC0]"></div>
                <p className="mt-4 text-lg">Processing your order...</p>
              </div>
            ) : error ? (
              <div className="flex flex-col items-center justify-center py-8">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
                  <span className="text-red-500 text-2xl">!</span>
                </div>
                <h2 className="text-2xl font-medium mb-4">
                  Payment Verification Failed
                </h2>
                <p className="text-neutral-600 mb-6">{error}</p>
                <p className="text-neutral-600 mb-6">
                  Your order ID is:{" "}
                  <span className="font-medium">{orderId}</span>
                </p>
                <p className="text-neutral-600 mb-6">
                  Please contact our customer support with this order ID for
                  assistance.
                </p>
                <Link href="/" passHref>
                  <Button className="bg-[#7FDAC0] hover:bg-[#6bc9af] text-white">
                    Return to Home
                  </Button>
                </Link>
              </div>
            ) : (
              <>
                <div className="w-16 h-16 bg-[#e0f5ef] rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="h-8 w-8 text-[#7FDAC0]" />
                </div>
                <h2 className="text-2xl font-medium mb-4">
                  Thank You for Your Order!
                </h2>
                <p className="text-neutral-600 mb-6">
                  Your order has been received and is now being processed.
                </p>
                <div className="bg-[#f9fdfc] p-4 rounded-lg mb-6">
                  <p className="text-neutral-600">
                    Order ID: <span className="font-medium">{orderId}</span>
                  </p>
                  <p className="text-neutral-600">
                    Payment Method:{" "}
                    <span className="font-medium">
                      {paymentMethod === "online"
                        ? "Online Payment"
                        : "Cash on Delivery"}
                    </span>
                  </p>
                  {paymentMethod === "online" && paymentId && (
                    <p className="text-neutral-600">
                      Payment ID:{" "}
                      <span className="font-medium">{paymentId}</span>
                    </p>
                  )}
                  <p className="text-neutral-600">
                    Amount:{" "}
                    <span className="font-medium">₹{total.toFixed(2)}</span>
                  </p>
                </div>
                <p className="text-neutral-600 mb-8">
                  We&#39;ve sent a confirmation email to{" "}
                  <span className="font-medium">{email}</span> with all the
                  details of your order.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/" passHref>
                    <Button className="bg-[#7FDAC0] hover:bg-[#6bc9af] text-white">
                      Continue Shopping
                    </Button>
                  </Link>
                </div>
              </>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}
