"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import ImageOverlay from "../ImageOverlay";
const ShopBubl = () => {
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
    <>
      <main className="max-h-screen pt-[12vh] overflow-x-clip px-[6vw] mb-[0vh] md:mb-[30vh] lg:mb-[50vh] w-full relative">
        {/* Heading section */}
        <ImageOverlay
          imageSrc="/circularOverlay.png"
          exceedViewport={true}
          scale={1}
          opacity={1}
          className=" absolute -translate-y-1/4 left-0 pointer-events-none"
          // Mobile-specific props
          mobile={{
            horizontalPosition: "center", // Centered on mobile
            verticalPosition: "top", // At the top on mobile
            width: "100%", // Full width on mobile
            height: "50vh", // Half viewport height on mobile
          }}
        />
        <div className="mb-8 md:mb-12 relative">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between">
            <div className="relative">
              <h1 className="text-4xl md:text-[clamp(3rem,7vw,8rem)] text-center md:text-start font-semibold leading-[1.3] tracking-normal mb-6 md:mb-0">
                <span className="text-black">Meet </span>
                <br />
                <div className="flex items-center justify-center md:justify-start relative">
                  <div className="text-center md:text-start">
                    <span className="gradient-text-1"> BabyBubl</span>
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
                href="/product-babybubl"
                className="gsap-button inline-block px-12 md:px-22 py-3 md:py-6 border-2 border-[#1ee3af] rounded-full text-black font-normal text-2xl md:text-4xl relative overflow-hidden z-10"
              >
                <span className="relative z-10 font-semibold">
                  Shop BabyBubl
                </span>
                <div
                  ref={circleRef}
                  className=" gradient-background-1 absolute left-1/2 bottom-0 w-full h-full -translate-x-1/2 rounded-full pointer-events-none"
                ></div>
              </Link>
            </div>
          </div>
        </div>

        {/* Content block */}
        <div className="flex flex-col justify-center items-center mx-auto md:flex-row md:justify-start md:items-center gap-8 pt-[2vw]">
          <div className="w-full md:w-1/3 flex flex-col justify-center items-center md:items-start text-left text-[clamp(1rem,1.5vw,2rem)] font-light text-black">
            <p className="mt-4">
              Babybubl is a{" "}
              <span className="font-semibold">
                tech-forward air purification system
              </span>{" "}
              designed to{" "}
              <span className="font-semibold">
                protect infants from airborne pollutants.
              </span>
              With a sleek, stroller-compatible design, it ensures your baby
              breathes cleaner air effortlessly, anytime, anywhere.
            </p>
          </div>
        </div>

        {/* Full-width Image */}
        <div className="min-w-[100vw] md:-mt-[25vh] mt-[5vw] mb-0">
          <Image
            src="/backgroundImages/meetBabyBubl.png"
            alt="Baby Bubl"
            width={1300}
            height={2000}
            className="w-full h-auto m-auto scale-150 md:scale-100 object-cover"
          />
        </div>
      </main>
    </>
  );
};

export default ShopBubl;
