"use client";
import Link from "next/link";
import React from "react";
import InfoSwiper from "./swipers/info-feature";
import { useEffect, useRef } from "react";
import gsap from "gsap";

const ScienceBehindProduct = () => {
  const buttonRef = useRef<HTMLAnchorElement>(null);
  const circleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!buttonRef.current || !circleRef.current) return;

    const button = buttonRef.current;
    const circle = circleRef.current;

    // Initial setup - hide the circle
    gsap.set(circle, {
      scale: 0,
      opacity: 0,
      y: "50%", // Position at bottom center
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
          y: "25%", // Show upper half of circle
          duration: 0.1,
          ease: "power1.out",
        },
        "<"
      )
      .to(circle, {
        scale: 2.5,
        y: "0%", // Cover the whole button
        duration: 0.5,
        ease: "power2.out",
      })
      .to(
        button,
        {
          color: "white",
          borderColor: "#8ad3c3",
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
  }, []);
  return (
    <main className="max-h-screen pt-[5vw] px-[7vw] w-full relative">
      {/* Heading section */}
      <div className="mb-8 md:mb-12 h-fit flex justify-around relative">
        <h1 className="w-full text-4xl md:text-[clamp(4rem,8vw,8rem)] text-center md:text-start font-semibold leading-tighter tracking-normal">
          {/* note to add the abouve text class as an utlity one and update the hero section as well */}
          <span className="gradient-text-1">Science </span>
          <span className="gradient-text-1"> Behind</span>
          <br />
          <span className="text-black">Our </span>
          <span className="text-black">Product </span>
        </h1>

        <div className="absolute bottom-0 right-0 text-black">
          <Link
            ref={buttonRef}
            href="/about"
            className="gsap-button inline-block px-22 py-6 border-2 border-[#1ee3af] rounded-full text-black font-normal text-4xl relative overflow-hidden z-10"
          >
            <span className="relative z-10">Learn more</span>
            <div
              ref={circleRef}
              className="absolute left-1/2 bottom-0 w-full h-full -translate-x-1/2 bg-[#8ad3c3] rounded-full pointer-events-none"
            ></div>
          </Link>
        </div>
      </div>
      <div>
        <InfoSwiper />
      </div>
    </main>
  );
};

export default ScienceBehindProduct;
