"use client";

import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import type React from "react";
import { useEffect, useState } from "react";

interface PageTransitionProps {
  children: React.ReactNode;
  className?: string;
}

export default function PageTransition({
  children,
  className = "",
}: PageTransitionProps) {
  const pathname = usePathname();
  const [isFirstRender, setIsFirstRender] = useState(true);

  useEffect(() => {
    // Skip animation on first render
    setIsFirstRender(false);
  }, []);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={isFirstRender ? { opacity: 1 } : { opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className={className}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
