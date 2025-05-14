"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
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
        <div className="flex flex-col md:flex-row items-center justify-between">
          {/* Product Image - Left Side */}
          <div className="w-full md:w-1/2 lg:w-1/2 order-2 md:order-1 flex justify-center md:justify-start items-center z-10 mb-12 md:mb-0">
            <div className="relative w-full h-[350px] sm:h-[450px] md:h-[950px] md:-translate-y-1/3 md:translate-x-1/6">
              <Image
                src="/backgroundImages/ProductPage/productLandingPageOverlay.png"
                alt="BabyBubl Air Purification System"
                width={1000}
                height={1000}
                className="object-contain md:object-cover md:scale-80 lg:scale-105 md:translate-y-1/4"
                priority
              />
            </div>
          </div>

          {/* Product Info - Right Side */}
          <div className="w-full md:w-1/2 lg:w-2/5 z-10 order-1 md:order-2 text-white md:-translate-y-1/6 md:-translate-x-1/4">
            <h1 className="text-4xl md:text-9xl font-semibold mb-6">
              BabyBubl
            </h1>

            <p className="text-xl md:text-2xl mb-2  md:mb-6 max-w-xl">
              A compact air purification system to protect your baby from air
              pollution, viruses, and allergens — anytime, anywhere.
            </p>

            <div className="mb-3 md:mb-6 text-lg md:text-xl">
              <p className="mb-2">
                <span className="font-semibold">Measurements (MM)</span>: L:
                365, W: 470, H:190
              </p>
              <p>
                <span className="font-semibold">Materials:</span> 100% FR
                Polyester/Oeko Tex 100 class 1, Polypropylene (recycled)
              </p>
            </div>

            <p className="text-2xl md:text-3xl font-semibold mb-8">
              MRP : INR 69,900
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-6">
              <Link
                ref={buttonRef1}
                href="/shop"
                className="inline-block px-10 sm:px-12 md:px-16 py-3 sm:py-4 border-2 border-white bg-[#8ad3c3] rounded-full text-white text-lg md:text-xl relative overflow-hidden z-40 font-semibold"
              >
                <span className="relative z-10">Add to Cart</span>
                <div
                  ref={circleRef1}
                  className="absolute left-1/2 bottom-0 w-full h-full -translate-x-1/2 bg-white rounded-full pointer-events-none"
                />
              </Link>

              <Link
                ref={buttonRef2}
                href="/amazon"
                className="inline-block px-10 sm:px-12 md:px-16 py-3 sm:py-4 border-2 bg-[#8ad3c3] border-white rounded-full text-white text-lg md:text-xl relative overflow-hidden z-10 font-semibold"
              >
                <span className="relative z-10">Buy on Amazon</span>
                <div
                  ref={circleRef2}
                  className="absolute left-1/2 bottom-0 w-full h-full -translate-x-1/2 bg-white rounded-full pointer-events-none"
                />
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
