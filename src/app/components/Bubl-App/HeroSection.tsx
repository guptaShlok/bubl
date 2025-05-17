"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import AppStoreLinks from "../AppDownload";

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
    <div className="h-[100vh] relative top-1/6 overflow-hidden">
      {/* Main Content */}
      <main className=" mx-auto px-6 lg:px-8 py-12 lg:py-16 relative">
        <div className="flex flex-col md:flex-row  md:items-start items-end justify-between">
          {/* Product Image - Left Side */}
          <div className="w-full md:w-1/3 lg:w-1/2 order-2 md:order-1 flex justify-center md:justify-start items-center translate-y-1/5 z-10 md:mb-0">
            <div className="relative w-full h-[300px] md:h-[950px] -translate-y-1/5 translate-x-1/6 md:-translate-y-1/4 md:translate-x-1/5">
              <Image
                src="/backgroundImages/bubl-app/BublAppLandingPage.png"
                alt="BabyBubl Air Purification System"
                width={1000}
                height={1000}
                className="object-contain md:w-3/4 w-3/5 md:object-cover "
                priority
              />
            </div>
          </div>

          {/* Product Info - Right Side */}
          <div className="w-full text-center md:text-start md:w-1/2 lg:w-3/5 z-10 md:translate-x-1/12 order-1 md:order-2 text-white">
            <h1 className="text-4xl md:text-9xl font-semibold md:mb-6">
              BabyBubl
            </h1>
            <h1 className="text-4xl md:text-9xl font-semibold mb-6">App</h1>
            <p className="w-full md:w-2/3 md:text-2xl text-start mt-[3vh] text-lg">
              The babybubl. comes with a companion app to allow you to use all
              of the functions of the babybubl, and to explore the world of
              bubl. The bubl. app is free to download and use, available on both
              App store and Google Play. Connect to the bubl. app to unlock the
              full potential
            </p>
            <div className=" md:h-[10vh] md:translate-y-4/5">
              <AppStoreLinks />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
