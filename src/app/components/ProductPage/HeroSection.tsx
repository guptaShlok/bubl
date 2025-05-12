"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";

export default function ProductPage() {
  const [mounted, setMounted] = useState(false);

  // refs for header, buttons, and circles
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
          color: "white",
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
          color: "white",
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
    <div className="h-screen overflow-hidden">
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8 relative">
        <div className="flex flex-col md:flex-row items-center gap-12">
          {/* Product Info */}
          <div className="flex-1 z-10 order-2 md:order-2 translate-x-1/12 translate-y-1/5">
            <h1 className="text-9xl font-semibold mb-6">BabyBubl</h1>

            <p className="text-2xl mb-8 max-w-xl">
              A compact air purification system to protect your baby from air
              pollution, viruses, and allergens — anytime, anywhere.
            </p>

            <div className="mb-6 text-xl">
              <p className="mb-2">
                <span className="font-semibold">Measurements (MM)</span>: L:
                365, W: 470, H:190
              </p>
              <p>
                <span className="font-semibold">Materials:</span> 100% FR
                Polyester/Oeko Tex 100 class 1, Polypropylene (recycled)
              </p>
            </div>

            <p className="text-3xl font-semibold mb-8">MRP : INR 69,900</p>

            {/* CTA Buttons */}
            <div className="flex gap-6">
              <Link
                ref={buttonRef1}
                href="/shop"
                className="inline-block px-16 py-4 border-2 border-white rounded-full text-white text-xl relative overflow-hidden z-10 font-semibold"
              >
                <span className="relative z-10">Add to Cart</span>
                <div
                  ref={circleRef1}
                  className="absolute left-1/2 bottom-0 w-full h-full -translate-x-1/2 bg-[#8ad3c3] rounded-full pointer-events-none"
                />
              </Link>

              <Link
                ref={buttonRef2}
                href="/amazon"
                className="inline-block px-18 py-4 border-2 border-white rounded-full text-white text-xl relative overflow-hidden z-10 font-semibold"
              >
                <span className="relative z-10">Buy on Amazon</span>
                <div
                  ref={circleRef2}
                  className="absolute left-1/2 bottom-0 w-full h-full -translate-x-1/2 bg-[#8ad3c3] rounded-full pointer-events-none"
                />
              </Link>
            </div>
          </div>

          {/* Product Image */}
          <div className="flex-1 order-1 md:order-1 flex justify-center md:translate-y-1/4 md:scale-125 lg:scale-150 z-30 mb-8 md:mb-0">
            <div className="relative w-full h-[400px] sm:h-[500px] md:h-[600px] lg:h-[600px]">
              <Image
                src="/backgroundImages/productPage/productLandingPageOverlay.png"
                alt="BabyBubl Air Purification System"
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
