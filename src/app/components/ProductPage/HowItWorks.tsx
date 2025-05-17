"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import Image from "next/image";

const HowItWorks = () => {
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
    <main className="max-h-screen pt-[8vh] md:-pt-[10vh] -mt-[3vh] px-[6vw] mb-[3vh]  w-full relative">
      {/* Heading section */}
      <div className="mb-8 md:mb-12 relative">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between">
          <div className="relative">
            <h1 className="text-4xl md:text-[clamp(3rem,7vw,8rem)] text-center md:text-start font-semibold leading-[1.3] tracking-normal mb-6 md:mb-0">
              <br />
              <div className="flex items-center justify-center md:justify-start relative">
                <div className="text-center md:text-start">
                  <span className="text-black">How it </span>
                  <span className="gradient-text-1"> Works?</span>
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

          <div className="self-center md:self-auto translate-y-[0] z-40 md:translate-y-[22vh]">
            <Link
              ref={buttonRef}
              href="/bubl-science"
              className="gsap-button inline-block px-12 md:translate-y-[15vh] md:px-12 py-3 md:py-6 border-2 border-[#1ee3af] rounded-full text-black font-normal text-2xl md:text-4xl relative overflow-hidden z-10"
            >
              <span className="relative z-10 font-semibold">
                Explore Science
              </span>
              <div
                ref={circleRef}
                className=" gradient-background-1 absolute left-1/2 bottom-0 w-full h-full -translate-x-1/2 rounded-full pointer-events-none"
              ></div>
            </Link>
          </div>
        </div>
      </div>

      {/* Content grid */}
      <div className="flex flex-col items-center md:flex-row md:justify-between md:items-start gap-4 md:gap-6">
        {/* Content block */}
        <div className="w-full md:w-3/5 md:mt-0 mt-0 flex flex-col items-center md:items-stretch text-start md:text-left text-[clamp(1rem,1.5vw,2rem)] font-normal text-black">
          <p>
            <span>
              Babybubl creates a gentle, invisible air bubble around your child
              using
            </span>
            <span className="font-semibold">
              {" "}
              advanced HEPA filtration and intelligent sensors.{" "}
            </span>
            It continuously purifies and circulates clean air around the
            baby&#39;s breathing zone—keeping pollutants out and fresh air in.
            All of this is seamlessly managed through the mobile app, giving you
            real-time updates and full control.
          </p>
        </div>
      </div>
      <div className="relative w-full h-auto">
        <div className="relative top-0 left-0 select-none z-10">
          <Image
            src="/backgroundImages/ProductPage/HowItWorks.png"
            alt="Baby hand holding parent's finger"
            width={1330}
            height={1020}
            className="w-[100vw] h-[40vh] object-cover"
          />
        </div>
      </div>
    </main>
  );
};

export default HowItWorks;
