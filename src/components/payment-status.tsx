"use client";

import { useEffect, useState } from "react";
import { CheckCircle, XCircle, Clock } from "lucide-react";

interface PaymentStatusProps {
  status: "processing" | "paid" | "failed" | "pending";
  className?: string;
}

export default function PaymentStatus({
  status,
  className = "",
}: PaymentStatusProps) {
  const [statusConfig, setStatusConfig] = useState({
    icon: <Clock className="h-5 w-5" />,
    text: "Processing",
    color: "text-yellow-500",
    bgColor: "bg-yellow-50",
  });

  useEffect(() => {
    switch (status) {
      case "paid":
        setStatusConfig({
          icon: <CheckCircle className="h-5 w-5" />,
          text: "Paid",
          color: "text-green-500",
          bgColor: "bg-green-50",
        });
        break;
      case "failed":
        setStatusConfig({
          icon: <XCircle className="h-5 w-5" />,
          text: "Failed",
          color: "text-red-500",
          bgColor: "bg-red-50",
        });
        break;
      case "pending":
        setStatusConfig({
          icon: <Clock className="h-5 w-5" />,
          text: "Pending",
          color: "text-orange-500",
          bgColor: "bg-orange-50",
        });
        break;
      default:
        setStatusConfig({
          icon: <Clock className="h-5 w-5" />,
          text: "Processing",
          color: "text-yellow-500",
          bgColor: "bg-yellow-50",
        });
    }
  }, [status]);

  return (
    <div
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full ${statusConfig.bgColor} ${statusConfig.color} ${className}`}
    >
      {statusConfig.icon}
      <span className="text-sm font-medium">{statusConfig.text}</span>
    </div>
  );
}
