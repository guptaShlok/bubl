// app/(root)/(routes)/bubl-checkout/success/SuccessClient.js
"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";
import { updatePaymentStatus } from "@/lib/action";
import { verifyRazorpayPayment } from "@/lib/razorpay";

export default function SuccessClient() {
  const searchParams = useSearchParams();
  const [isVerifying, setIsVerifying] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const orderId = searchParams.get("orderId") || "";
  const paymentId = searchParams.get("paymentId") || "";
  const signature = searchParams.get("signature") || "";
  const paymentMethod = searchParams.get("paymentMethod") || "cod";
  const email = searchParams.get("email") || "";
  const total = Number.parseFloat(searchParams.get("total") || "0");

  useEffect(() => {
    const verifyPayment = async () => {
      try {
        if (paymentMethod === "online" && paymentId) {
          setIsVerifying(true);

          let verified = true;
          if (paymentId && orderId && signature) {
            verified = await verifyRazorpayPayment(
              paymentId,
              orderId,
              signature
            );
          }

          if (verified) {
            await updatePaymentStatus(
              orderId,
              paymentId,
              "paid",
              email,
              [],
              total
            );
          } else {
            await updatePaymentStatus(
              orderId,
              paymentId,
              "failed",
              email,
              [],
              total
            );
            setError(
              "Payment verification failed. Please contact customer support."
            );
          }
        } else if (paymentMethod === "cod") {
          await updatePaymentStatus(
            orderId,
            "cod_" + orderId,
            "pending",
            email,
            [],
            total
          );
        }
      } catch (err) {
        console.error("Error verifying payment:", err);
        setError(
          "An error occurred while verifying your payment. Please contact customer support."
        );
      } finally {
        setIsVerifying(false);
      }
    };

    verifyPayment();
  }, [orderId, paymentId, signature, paymentMethod, email, total]);

  return (
    <div className="min-h-screen bg-white">
      <div className="bg-[#7FDAC0] pt-[10vh] py-16 mb-8">
        <h1 className="text-7xl font-semibold text-white text-center">
          Order Confirmation
        </h1>
      </div>

      <div className="container mx-auto px-4 pb-16">
        <Card className="max-w-2xl mx-auto border border-[#e0f5ef] rounded-lg overflow-hidden">
          <div className="p-8 text-center">
            {isVerifying ? (
              <div className="flex flex-col items-center justify-center py-8">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#7FDAC0]" />
                <p className="mt-4 text-lg">Verifying your payment...</p>
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
                  {paymentMethod === "online" && (
                    <p className="text-neutral-600">
                      Payment ID:{" "}
                      <span className="font-medium">{paymentId}</span>
                    </p>
                  )}
                </div>
                <p className="text-neutral-600 mb-8">
                  We’ve sent a confirmation email to{" "}
                  <span className="font-medium">{email}</span> with all the
                  details.
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
