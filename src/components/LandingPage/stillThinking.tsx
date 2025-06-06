"use client";
import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";

const Thinking = () => {
  // Create separate refs for each button and circle
  const buttonRef1 = useRef<HTMLAnchorElement>(null);
  const circleRef1 = useRef<HTMLDivElement>(null);
  const buttonRef2 = useRef<HTMLAnchorElement>(null);
  const circleRef2 = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Set up animation for the first button
    if (buttonRef1.current && circleRef1.current) {
      const button = buttonRef1.current;
      const circle = circleRef1.current;

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
    }
  }, []);

  // Set up animation for the second button
  useEffect(() => {
    if (buttonRef2.current && circleRef2.current) {
      const button = buttonRef2.current;
      const circle = circleRef2.current;

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
    }
  }, []);

  return (
    <>
      <main className="max-h-screen pt-[12vh] mb-[10vh] md:mb-[25vh] px-[6vw] w-full relative">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between">
          <div className="relative">
            <h1 className="text-4xl md:text-[clamp(3rem,7vw,8rem)] text-center md:text-start font-semibold leading-[1.3] tracking-normal mb-6 md:mb-0">
              <span className="text-black">Still Thinking? </span>
              <br />
              <div className="flex items-center justify-center md:justify-start relative">
                <div className="text-center md:text-start">
                  <span className="gradient-text-1"> Take Action</span>
                </div>

                {/* Arrow positioned next to "Take Action" */}
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

          {/* Buttons container - centered on mobile, positioned on desktop */}
          <div className="flex flex-col sm:flex-row px-[6vw] items-center justify-center md:justify-end gap-4 sm:gap-6 mt-8 md:mt-0 md:absolute md:right-0 md:bottom-0 md:translate-y-[12vw] w-full md:w-auto">
            <Link
              ref={buttonRef1}
              href="/product-babybubl"
              className="gsap-button inline-block px-6 py-3 sm:px-8 sm:py-4 md:px-12 md:py-6 border-2 border-[#1ee3af] rounded-full text-black text-xl sm:text-2xl md:text-3xl relative overflow-hidden z-10 font-semibold"
            >
              <span className="relative z-10">Shop BabyBubl</span>
              <div
                ref={circleRef1}
                className="absolute gradient-background-1 left-1/2 bottom-0 w-full h-full -translate-x-1/2 rounded-full pointer-events-none"
              ></div>
            </Link>
            <Link
              ref={buttonRef2}
              href="/bubl-science"
              className="gsap-button inline-block px-6 py-3 sm:px-8 sm:py-4 md:px-12 md:py-6 border-2 border-[#1ee3af] rounded-full text-black text-xl sm:text-2xl md:text-3xl relative overflow-hidden z-10 font-semibold"
            >
              <span className="relative z-10">Learn More</span>
              <div
                ref={circleRef2}
                className="absolute left-1/2 bottom-0 w-full h-full -translate-x-1/2  gradient-background-1 rounded-full pointer-events-none"
              ></div>
            </Link>
          </div>
        </div>
      </main>
    </>
  );
};

export default Thinking;
