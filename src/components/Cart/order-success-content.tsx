"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle, ShoppingBag } from "lucide-react";

interface OrderDetails {
  orderId: string;
  paymentId?: string;
  paymentMethod: "online" | "cod";
  email: string;
  total: number;
}

export default function OrderSuccessContent() {
  const searchParams = useSearchParams();
  const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get order details from URL parameters
    const orderId = searchParams.get("orderId");
    const paymentId = searchParams.get("paymentId");

    // Check for both method and paymentMethod parameters
    const paymentMethod = (searchParams.get("paymentMethod") ||
      searchParams.get("method")) as "online" | "cod";

    const email = searchParams.get("email");
    const totalParam = searchParams.get("total");

    console.log("URL Parameters:", {
      orderId,
      paymentId,
      paymentMethod,
      email,
      totalParam,
    });

    if (orderId && email && totalParam && paymentMethod) {
      const total = Number.parseFloat(totalParam);
      if (!isNaN(total)) {
        setOrderDetails({
          orderId,
          paymentId: paymentId || undefined,
          paymentMethod,
          email,
          total,
        });
        console.log("Order details set:", {
          orderId,
          paymentId,
          paymentMethod,
          email,
          total,
        });
      } else {
        console.error("Invalid total amount:", totalParam);
      }
    } else {
      console.error("Missing required parameters:", {
        orderId,
        paymentMethod,
        email,
        totalParam,
      });
    }

    setLoading(false);
  }, [searchParams]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-16 w-16 bg-[#e0f5ef] rounded-full mb-4"></div>
          <div className="h-6 w-48 bg-[#e0f5ef] rounded mb-2"></div>
          <div className="h-4 w-64 bg-[#e0f5ef] rounded"></div>
        </div>
      </div>
    );
  }

  if (!orderDetails) {
    return (
      <div className="min-h-screen bg-white">
        <div className="bg-[#7FDAC0] py-16 mb-8">
          <h1 className="text-4xl font-light text-white text-center">
            Order Status
          </h1>
        </div>

        <div className="container mx-auto px-4 py-8 max-w-3xl">
          <Card className="border border-[#e0f5ef] rounded-lg">
            <div className="p-8 text-center">
              <ShoppingBag className="h-16 w-16 text-neutral-300 mx-auto mb-4" />
              <h1 className="text-2xl font-bold mb-2">
                Order Information Not Found
              </h1>
              <p className="text-muted-foreground mb-6">
                We couldn&#39;t find the order details you&#39;re looking for.
              </p>
              <Link href="/bubl-cart">
                <Button className="bg-[#7FDAC0] hover:bg-[#6bc9af] text-white">
                  Return to Cart
                </Button>
              </Link>
            </div>
          </Card>
        </div>
      </div>
    );
  }

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
                Your order #{orderDetails.orderId} has been confirmed.
              </p>
              <p className="mb-6">
                We&#39;ve sent a confirmation email to{" "}
                <span className="font-medium">{orderDetails.email}</span> with
                your order details.
              </p>

              {orderDetails.paymentMethod === "cod" ? (
                <div className="mb-6 p-4 bg-[#e0f5ef] rounded-lg">
                  <p className="font-medium">Cash on Delivery</p>
                  <p className="text-sm text-muted-foreground">
                    Please have the exact amount of INR{" "}
                    {(orderDetails.total / 100).toFixed(2)} ready when your
                    order arrives.
                  </p>
                </div>
              ) : (
                <div className="mb-6 p-4 bg-[#e0f5ef] rounded-lg">
                  <p className="font-medium">Payment Successful</p>
                  <p className="text-sm text-muted-foreground">
                    Payment ID: {orderDetails.paymentId}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Amount: INR {(orderDetails.total / 100).toFixed(2)}
                  </p>
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/">
                  <Button className="bg-[#7FDAC0] hover:bg-[#6bc9af] text-white w-full sm:w-auto">
                    Continue Shopping
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
