"use client";

import { useState, useEffect, useRef } from "react";

import gsap from "gsap";

export default function HeroSection() {
  const [mounted, setMounted] = useState(false);

  // refs for buttons and circles
  const buttonRef1 = useRef<HTMLAnchorElement>(null);
  const circleRef1 = useRef<HTMLDivElement>(null);
  const buttonRef2 = useRef<HTMLAnchorElement>(null);
  const circleRef2 = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Animation for first button
  useEffect(() => {
    if (!mounted || !buttonRef1.current || !circleRef1.current) return;

    const button = buttonRef1.current;
    const circle = circleRef1.current;

    // Initial setup - hide the circle
    gsap.set(circle, {
      scale: 0,
      opacity: 0,
      y: "50%",
    });

    // Create a timeline for the hover animation
    const tl = gsap.timeline({ paused: true });

    tl.to(circle, {
      opacity: 1,
      duration: 0.1,
    })
      .to(
        circle,
        {
          scale: 0.5,
          y: "25%",
          duration: 0.1,
          ease: "power1.out",
        },
        "<"
      )
      .to(circle, {
        scale: 2.5,
        y: "0%",
        duration: 0.5,
        ease: "power2.out",
      })
      .to(
        button,
        {
          color: "#8ad3c3",
          borderColor: "#1ee3af",
          duration: 0.1,
        },
        "<0.1"
      );

    // Add event listeners
    const handleMouseEnter = () => {
      tl.play();
    };

    const handleMouseLeave = () => {
      tl.reverse();
    };

    button.addEventListener("mouseenter", handleMouseEnter);
    button.addEventListener("mouseleave", handleMouseLeave);

    // Cleanup
    return () => {
      button.removeEventListener("mouseenter", handleMouseEnter);
      button.removeEventListener("mouseleave", handleMouseLeave);
      tl.kill();
    };
  }, [mounted]);

  // Animation for second button
  useEffect(() => {
    if (!mounted || !buttonRef2.current || !circleRef2.current) return;

    const button = buttonRef2.current;
    const circle = circleRef2.current;

    // Initial setup - hide the circle
    gsap.set(circle, {
      scale: 0,
      opacity: 0,
      y: "50%",
    });

    // Create a timeline for the hover animation
    const tl = gsap.timeline({ paused: true });

    tl.to(circle, {
      opacity: 1,
      duration: 0.1,
    })
      .to(
        circle,
        {
          scale: 0.5,
          y: "25%",
          duration: 0.1,
          ease: "power1.out",
        },
        "<"
      )
      .to(circle, {
        scale: 2.5,
        y: "0%",
        duration: 0.5,
        ease: "power2.out",
      })
      .to(
        button,
        {
          color: "#8ad3c3",
          borderColor: "#1ee3af",
          duration: 0.1,
        },
        "<0.1"
      );

    // Add event listeners
    const handleMouseEnter = () => {
      tl.play();
    };

    const handleMouseLeave = () => {
      tl.reverse();
    };

    button.addEventListener("mouseenter", handleMouseEnter);
    button.addEventListener("mouseleave", handleMouseLeave);

    // Cleanup
    return () => {
      button.removeEventListener("mouseenter", handleMouseEnter);
      button.removeEventListener("mouseleave", handleMouseLeave);
      tl.kill();
    };
  }, [mounted]);

  if (!mounted) return null;

  return (
    <div className="h-auto overflow-hidden">
      {/* Main Content */}
      <main className=" mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16 relative">
        <div className="flex flex-col md:flex-row items-center">
          {/* Product Info - Right Side */}
          <div className="w-full md:w-4/5 z-10 order-1 md:order-2 text-white">
            <h1 className="text-6xl md:text-9xl md:h-[60vh] leading-[1.3] translate-y-1/4 md:translate-y-1/2 font-semibold mb-6">
              Where Innovation Meets Care
            </h1>
          </div>
        </div>
      </main>
    </div>
  );
}
