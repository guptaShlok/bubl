"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useEffect, useRef } from "react";
import gsap from "gsap";

const MissionPhilosphy = () => {
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
    <main className="max-h-screen pt-[6vw] px-[6vw] w-full relative">
      {/* Heading section */}
      <div className=" mb-3 md:mb-6 h-fit flex justify-around relative">
        <h1 className="w-full text-4xl md:text-[clamp(3rem,7vw,8rem)] text-center md:text-start font-bold leading-[1.3] tracking-normal">
          <span className="text-black">Our </span>
          <span className="gradient-text-1">Philosophy</span>
          <br />
          <span className="text-black">&amp; </span>
          <span className="gradient-text-1">Mission</span>
        </h1>

        <div className="absolute bottom-0 right-0 text-black">
          <Link
            ref={buttonRef}
            href="/about"
            className="gsap-button inline-block px-22 py-6 border-2 border-[#1ee3af] rounded-full text-black font-normal text-4xl relative overflow-hidden z-10"
          >
            <span className="relative z-10">About us</span>
            <div
              ref={circleRef}
              className="absolute left-1/2 bottom-0 w-full h-full -translate-x-1/2 bg-[#8ad3c3] rounded-full pointer-events-none"
            ></div>
          </Link>
        </div>
      </div>

      {/* Content grid */}
      <div className="flex flex-col items-center md:flex-row md:justify-evenly md:items-start gap-4 mx-auto">
        {/* First image */}
        <div className="hidden md:block md:w-1/4 rounded-2xl overflow-hidden">
          <Image
            src="/backgroundImages/philosphy/babyfeet.png"
            alt="Baby feet"
            width={320}
            height={320}
            className="w-full h-auto object-cover"
          />
        </div>

        {/* Content block */}
        <div className="w-full md:w-1/4 md:mt-6 flex flex-col items-center md:items-stretch text-center md:text-left text-[clamp(0.8rem,1.5vw,2rem)] font-light text-black">
          <p>
            <span>Every baby deserves a safe, pure environment.</span>
            <span className="font-semibold"> At Bubl,</span> we{" "}
            <span className="font-semibold">
              combine science and innovation
            </span>{" "}
            to{" "}
            <span className="font-medium">
              protect infants from air pollution,
            </span>{" "}
            ensuring peace of mind for parents.
          </p>
        </div>

        {/* Second image */}
        <div className="w-full md:w-1/2 rounded-2xl overflow-hidden">
          <Image
            src="/backgroundImages/philosphy/babyhands.png"
            alt="Baby hand holding parent's finger"
            width={730}
            height={320}
            className="w-full h-auto object-cover"
          />
        </div>
      </div>
    </main>
  );
};

export default MissionPhilosphy;
