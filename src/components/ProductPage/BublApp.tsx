"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import AppStoreLinks from "../AppDownload";
import ImageOverlay from "../ImageOverlay";

const BublApp = () => {
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
      <main className="max-h-screen pt-[8vh] md:mb-[70vh] px-[6vw] w-full relative">
        {/* Heading section */}
        <div className=" md:mb-8 mb-5 relative">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between">
            <div className="relative">
              <h1 className="text-4xl md:text-[clamp(3rem,7vw,8rem)] text-center md:text-start font-semibold leading-[1.3] tracking-normal mb-6 md:mb-0">
                <div className="flex items-center justify-center md:justify-start relative">
                  <div className="text-center md:text-start">
                    <span className="gradient-text-1"> Bubl App</span>
                  </div>

                  {/* Arrow positioned next to "& Mission" */}
                  <div className="hidden md:block ml-12 transform translate-y-1">
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
                href="/bubl-app"
                className="gsap-button inline-block px-12 md:px-22 py-3 md:py-6 border-2 border-[#1ee3af] rounded-full text-black font-normal text-2xl md:text-4xl relative overflow-hidden z-10"
              >
                <span className="relative z-10 font-semibold">Explore</span>
                <div
                  ref={circleRef}
                  className=" gradient-background-1 absolute left-1/2 bottom-0 w-full h-full -translate-x-1/2 rounded-full pointer-events-none"
                ></div>
              </Link>
            </div>
          </div>
        </div>
        <ImageOverlay
          imageSrc="/backgroundImages/philosphy/PhilosphyOverlay.png"
          exceedViewport={true}
          scale={1}
          opacity={1}
          className=" absolute -translate-y-2/4 left-0 pointer-events-none"
          // Mobile-specific props
          mobile={{
            horizontalPosition: "right", // Centered on mobile
            verticalPosition: "top", // At the top on mobile
            width: "100%", // Full width on mobile
            height: "50vh", // Half viewport height on mobile
          }}
        />
        <div className="flex flex-col justify-center items-center mx-auto md:flex-row md:justify-start md:items-center gap-8">
          <div className="w-full md:w-3/5 flex flex-col justify-center items-center md:items-start text-center md:text-left text-black">
            <ul className="list-disc mt-0 md:space-y-4 space-y-1 text-start text-lg md:text-2xl font-normal">
              <li>
                <span className="font-semibold">Control Babybubl remotely</span>{" "}
                &#8208; Turn it on/off and adjust fan speed
              </li>
              <li>
                <span className="font-semibold">Live air quality updates</span>{" "}
                &#8208; See AQI and temperature in real-time
              </li>
              <li>
                <span className="font-semibold">Smart alerts</span> &#8208; Get
                notified when air quality drops or filters need changing
              </li>
              <li>
                <span className="font-semibold">Usage insights</span>{" "}
                &#8208;Track device performance over time
              </li>
              <li>
                <span className="font-semibold">Filter status monitoring</span>{" "}
                &#8208; Know exactly when to replace your filter
              </li>
            </ul>
          </div>
        </div>

        {/* Full-width Image */}
        <div className="w-[95vw] relative z-10 -translate-x-1/12 mt-[5vw] md:-mt-[30vh]">
          <Image
            src="/backgroundImages/productPage/bublApp.png"
            alt="Baby Bubl"
            width={1300}
            height={2000}
            className="w-full h-auto object-cover rounded-2xl"
          />
        </div>
        <div className="md:absolute relative z-40 -translate-y-[20vh] md:right-0 md:bottom-0 md:h-[30vh] md:w-[200px] md:-translate-x-2/3 md:translate-y-[75vh] md:scale-120  ">
          <AppStoreLinks />
        </div>
      </main>
    </>
  );
};

export default BublApp;
