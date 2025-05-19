"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { useCartStore } from "@/lib/store";

interface CartIconWithCountProps {
  className?: string;
}

export default function CartIconWithCount({
  className = "",
}: CartIconWithCountProps) {
  const { items } = useCartStore();
  const [mounted, setMounted] = useState(false);

  // Fix hydration issues
  useEffect(() => {
    setMounted(true);
  }, []);

  // Calculate cart count and total directly
  const cartCount = mounted
    ? items.reduce((count, item) => count + item.quantity, 0)
    : 0;
  const cartTotal = mounted
    ? items.reduce((total, item) => total + item.price * item.quantity, 0)
    : 0;

  return (
    <Link href="/cart">
      <div className={`relative flex items-center ${className}`}>
        <ShoppingCart className="h-6 w-6" />
        {cartCount > 0 && (
          <div className="absolute -top-2 -right-2 bg-[#7FDAC0] text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
            {cartCount}
          </div>
        )}
        {cartCount > 0 && (
          <span className="ml-2 text-sm font-medium hidden md:inline-block">
            INR {cartTotal.toLocaleString()}
          </span>
        )}
      </div>
    </Link>
  );
}
