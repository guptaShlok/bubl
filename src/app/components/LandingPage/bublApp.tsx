"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import AppStoreLinks from "../AppDownload";

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
      <main className="pt-[8vh] px-[6vw] overflow-x-hidden w-full relative">
        {/* Heading section */}
        <div className="mb-8 md:mb-12 relative">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between">
            <div className="relative">
              <h1 className="text-4xl md:text-[clamp(3rem,7vw,8rem)] text-center md:text-start font-semibold leading-[1.3] tracking-normal mb-6 md:mb-0">
                <div className="flex items-center justify-center md:justify-start relative">
                  <div className="text-center md:text-start">
                    <span className="gradient-text-1"> Bubl App</span>
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

        {/* Content block */}
        <div className="flex flex-col overflow-x-hidden justify-center items-center mx-auto md:flex-row md:justify-start md:items-center gap-8 ">
          <div className="w-full md:w-2/5 flex flex-col justify-center items-center md:items-start text-left text-[clamp(1rem,1.5vw,2rem)] font-light text-black">
            <p className="mt-4">
              The Bubl lets you monitor and control your babybubl in real time.
              Track{" "}
              <span className="font-semibold">
                air quality, temperqture, and pollution levels (PM2.5)
              </span>{" "}
              , recieve
              <span className="font-semibold">smart alerts</span>, and adjust
              settings for optimal protection- all form your phone.
            </p>
          </div>
        </div>

        {/* Full-width Image */}
        <div className="md:w-[95vw] -z-10 relative w-full -mt-[3vh] md:-mt-[25vh]">
          <Image
            src="/backgroundImages/bublApp.png"
            alt="Baby Bubl"
            width={1300}
            height={2000}
            className="w-full h-auto object-coverrounded-2xl"
          />
        </div>
        <div className="md:absolute relative md:right-0 md:bottom-0 md:h-[22vh] md:w-[200px] md:-translate-x-2/3 md:-translate-y-1/5 md:scale-125 ">
          <AppStoreLinks />
        </div>
      </main>
    </>
  );
};

export default BublApp;
