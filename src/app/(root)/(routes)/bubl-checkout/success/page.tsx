import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import OrderSuccessContent from "@/components/Cart/order-success-content";

export default function OrderSuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-white flex items-center justify-center">
          <div className="flex flex-col items-center">
            <Skeleton className="h-16 w-16 rounded-full mb-4" />
            <Skeleton className="h-6 w-48 rounded mb-2" />
            <Skeleton className="h-4 w-64 rounded" />
          </div>
        </div>
      }
    >
      <OrderSuccessContent />
    </Suspense>
  );
}
