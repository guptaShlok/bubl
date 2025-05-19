"use client";

import type React from "react";

import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SectionTransitionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  delay?: number;
  threshold?: number;
  animation?: "fade" | "slide-up" | "slide-left" | "slide-right";
}

export default function SectionTransition({
  children,
  className,
  id,
  delay = 0,
  threshold = 0.1,
  animation = "fade",
}: SectionTransitionProps) {
  const { ref, inView } = useInView({
    threshold,
    triggerOnce: true,
  });

  const animations = {
    fade: {
      hidden: { opacity: 0 },
      visible: { opacity: 1 },
    },
    "slide-up": {
      hidden: { opacity: 0, y: 50 },
      visible: { opacity: 1, y: 0 },
    },
    "slide-left": {
      hidden: { opacity: 0, x: 50 },
      visible: { opacity: 1, x: 0 },
    },
    "slide-right": {
      hidden: { opacity: 0, x: -50 },
      visible: { opacity: 1, x: 0 },
    },
  };

  return (
    <motion.section
      id={id}
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={animations[animation]}
      transition={{ duration: 0.6, delay }}
      className={cn(className)}
    >
      {children}
    </motion.section>
  );
}
