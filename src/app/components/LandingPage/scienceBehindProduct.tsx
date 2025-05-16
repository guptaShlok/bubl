"use client";
import Link from "next/link";
import React from "react";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import InfoSwiper from "../swipers/info-feature";
import ImageOverlay from "../ImageOverlay";

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
    <main className="max-h-screen pt-[8vh] px-[6vw] w-full relative">
      {/* Heading section */}
      <div className="mb-2 md:mb-12 relative">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between">
          <div className="relative">
            <h1 className="text-4xl md:text-[clamp(3rem,7vw,8rem)] text-center md:text-start font-semibold leading-[1.3] tracking-normal mb-6 md:mb-0">
              <span className="gradient-text-1">Science Behind</span>
              <br />
              <div className="flex items-center justify-center md:justify-start relative">
                <div className="text-center md:text-start">
                  <span className="text-black">Our Product</span>
                </div>

                {/* Arrow positioned next to "& Mission" */}
                <div className="hidden md:block ml-22 transform translate-y-1">
                  <svg
                    width="80"
                    height="80"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M3 3L21 21M21 21H6M21 21V6"
                      stroke="black"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>
            </h1>
          </div>

          <div className="self-center md:self-auto">
            <Link
              ref={buttonRef}
              href="/bubl-science"
              className="gsap-button inline-block px-12 md:px-22 py-3 md:py-6 border-2 border-[#1ee3af] rounded-full text-black font-normal text-2xl md:text-4xl relative overflow-hidden z-10"
            >
              <span className="relative z-10 font-semibold">Learn More</span>
              <div
                ref={circleRef}
                className=" gradient-background-1 absolute left-1/2 bottom-0 w-full h-full -translate-x-1/2 rounded-full pointer-events-none"
              ></div>
            </Link>
          </div>
        </div>
        <ImageOverlay
          imageSrc="/backgroundImages/philosphy/PhilosphyOverlay.png"
          exceedViewport={true}
          scale={1}
          opacity={1}
          className=" absolute translate-y-1/3 left-0 pointer-events-none"
          // Mobile-specific props
          mobile={{
            horizontalPosition: "right", // Centered on mobile
            verticalPosition: "top", // At the top on mobile
            width: "100%", // Full width on mobile
            height: "50vh", // Half viewport height on mobile
          }}
        />
        <InfoSwiper />
      </div>
    </main>
  );
};

export default ScienceBehindProduct;
