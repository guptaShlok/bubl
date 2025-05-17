"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";

import { motion } from "framer-motion";
import { useCartStore } from "../lib/store";

export default function CartIcon() {
  const [mounted, setMounted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Get cart items count from the store
  const getTotalItems = useCartStore((state) => state.getTotalItems);

  // Handle hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  // If not mounted yet, show a placeholder
  if (!mounted) {
    return (
      <div className="relative p-2">
        <ShoppingCart size={24} className="text-white" />
        <div className="absolute -top-2 -right-2 bg-white text-[#1a7d6b] text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
          0
        </div>
      </div>
    );
  }

  // Get the actual item count once mounted
  const itemCount = getTotalItems ? getTotalItems() : 0;

  return (
    <motion.div
      className="relative p-2"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      animate={{ y: isHovered ? -3 : 0 }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.2 }}
    >
      <Link href="/cart">
        <ShoppingCart
          size={24}
          className="text-white transition-transform duration-200"
        />
        <div className="absolute -top-2 -right-2 bg-white text-[#1a7d6b] text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
          {itemCount}
        </div>
      </Link>

      {/* Dot indicator */}
      {isHovered && (
        <motion.div
          className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-white"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          transition={{ duration: 0.2 }}
        />
      )}
    </motion.div>
  );
}
