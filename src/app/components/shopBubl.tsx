"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useEffect, useRef } from "react";
import gsap from "gsap";
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
      <main className="pt-[6vw] px-[6vw] w-full relative">
        {/* Heading section */}
        <div className=" flex flex-col md:flex-row justify-around relative">
          <h1 className="w-full text-4xl md:text-[clamp(4rem,8vw,8rem)] leading-[1.3] text-center md:text-start font-medium leading-tighter tracking-normal">
            <span className="text-black">Meet </span>
            <br />
            <span className="gradient-text-1">BabyBubl</span>
          </h1>

          <div className=" md:absolute bottom-0 right-0 text-black">
            <Link
              ref={buttonRef}
              href="/about"
              className="gsap-button inline-block px-22 py-6 border-2 border-[#1ee3af] rounded-full text-black font-normal text-4xl relative overflow-hidden z-10"
            >
              <span className="relative z-10 font-semibold">Shop BabyBubl</span>
              <div
                ref={circleRef}
                className="absolute left-1/2 bottom-0 w-full h-full -translate-x-1/2 bg-[#8ad3c3] rounded-full pointer-events-none"
              ></div>
            </Link>
          </div>
        </div>

        {/* Content block */}
        <div className="flex flex-col justify-center items-center mx-auto md:flex-row md:justify-start md:items-center gap-8 pt-[2vw]">
          <div className="w-full md:w-1/3 flex flex-col justify-center items-center md:items-start text-center md:text-left text-[clamp(0.8rem,1.5vw,2rem)] font-light text-black">
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
        <div className="w-full -mt-[15vw] -mb-[13vw]">
          <Image
            src="/backgroundImages/meetBabyBubl.png"
            alt="Baby Bubl"
            width={1300}
            height={2000}
            className="w-[90vw] h-auto m-auto object-cover"
          />
        </div>
      </main>
    </>
  );
};

export default ShopBubl;
