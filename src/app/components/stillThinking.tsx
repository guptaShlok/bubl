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
      <main className="max-h-screen pt-[5vw] mb-[30vh] px-[7vw] w-full relative">
        <div className="mb-8 md:mb-12 h-fit flex justify-around relative">
          <h1 className="w-full text-4xl md:text-[clamp(4rem,8vw,8rem)] text-center md:text-start border border-black font-nornal leading-tighter tracking-normal">
            {/* note to add the abouve text class as an utlity one and update the hero section as well */}
            <span className="text-black">Still </span>
            <span className="gradient-text-1">Thinking?</span>
            <br />
            <span className="text-black">Take </span>
            <span className="gradient-text-1">Action</span>
          </h1>

          <div className="absolute right-0 bottom-0 flex items-center justify-between w-[40vw] t-[20vh] translate-y-[12vw] text-black">
            <Link
              ref={buttonRef1}
              href="/about"
              className="gsap-button inline-block px-22 py-6 border-2 border-[#1ee3af] rounded-full text-black font-normal text-4xl relative overflow-hidden z-10"
            >
              <span className="relative z-10">Shop BabyBubl</span>
              <div
                ref={circleRef1}
                className="absolute left-1/2 bottom-0 w-full h-full -translate-x-1/2 bg-[#8ad3c3] rounded-full pointer-events-none"
              ></div>
            </Link>
            <Link
              ref={buttonRef2}
              href="/contact"
              className="gsap-button inline-block px-22 py-6 border-2 border-[#1ee3af] rounded-full text-black font-normal text-4xl relative overflow-hidden z-10"
            >
              <span className="relative z-10">Contact</span>
              <div
                ref={circleRef2}
                className="absolute left-1/2 bottom-0 w-full h-full -translate-x-1/2 bg-[#8ad3c3] rounded-full pointer-events-none"
              ></div>
            </Link>
          </div>
        </div>
      </main>
    </>
  );
};

export default Thinking;
