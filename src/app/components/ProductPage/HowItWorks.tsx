"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";

const HowItWorks = () => {
  const buttonRef = useRef<HTMLAnchorElement>(null);
  const circleRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const vid = videoRef.current;
    if (vid) {
      // 1. Set the default playback rate
      vid.defaultPlaybackRate = 1.25; // 1.5× speed by default :contentReference[oaicite:1]{index=1}
      // 2. Also apply it immediately
      vid.playbackRate = 1.25; // Ensures the current rate matches :contentReference[oaicite:2]{index=2}
    }
  }, []);

  useEffect(() => {
    if (!buttonRef.current || !circleRef.current) return;

    const button = buttonRef.current;
    const circle = circleRef.current;

    gsap.set(circle, {
      scale: 0,
      opacity: 0,
      y: "50%",
    });

    const tl = gsap.timeline({ paused: true });

    tl.to(circle, {
      opacity: 1,
      duration: 0.1,
    })
      .to(
        circle,
        {
          scale: 0.5,
          y: "25%",
          duration: 0.1,
          ease: "power1.out",
        },
        "<"
      )
      .to(circle, {
        scale: 2.5,
        y: "0%",
        duration: 0.5,
        ease: "power2.out",
      })
      .to(
        button,
        {
          color: "white",
          borderColor: "#1ee3af",
          duration: 0.1,
        },
        "<0.1"
      );

    const handleMouseEnter = () => tl.play();
    const handleMouseLeave = () => tl.reverse();

    button.addEventListener("mouseenter", handleMouseEnter);
    button.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      button.removeEventListener("mouseenter", handleMouseEnter);
      button.removeEventListener("mouseleave", handleMouseLeave);
      tl.kill();
    };
  }, []);

  return (
    <main className="max-h-screen pt-[8vh] md:-pt-[10vh] -mt-[3vh] px-[6vw] mb-[3vh] w-full relative">
      {/* Heading section */}
      <div className="mb-8 md:mb-12 relative">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between">
          <div className="relative">
            <h1 className="text-4xl md:text-[clamp(3rem,7vw,8rem)] text-center md:text-start font-semibold leading-[1.3] tracking-normal mb-6 md:mb-0">
              <div className="flex items-center justify-center md:justify-start relative">
                <span className="text-black">How it </span>
                <span className="gradient-text-1">Works?</span>
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
              className="gsap-button inline-block px-12 md:px-12 py-3 md:py-6 border-2 border-[#1ee3af] rounded-full text-black font-normal text-2xl md:text-4xl relative overflow-hidden z-10"
            >
              <span className="relative z-10 font-semibold">
                Explore Science
              </span>
              <div
                ref={circleRef}
                className="gradient-background-1 absolute left-1/2 bottom-0 w-full h-full -translate-x-1/2 rounded-full pointer-events-none"
              />
            </Link>
          </div>
        </div>
      </div>

      {/* Text section */}
      <div className="flex flex-col items-center md:flex-row md:justify-between md:items-start gap-4 md:gap-6">
        <div className="w-full md:w-3/5 flex flex-col text-start text-[clamp(1rem,1.5vw,2rem)] font-normal text-black">
          <p>
            Babybubl creates a gentle, invisible air bubble around your child
            using{" "}
            <span className="font-semibold">advanced HEPA filtration</span> and
            intelligent sensors. It continuously purifies and circulates clean
            air around the baby&#39;s breathing zone—keeping pollutants out and
            fresh air in. All of this is seamlessly managed through the mobile
            app, giving you real-time updates and full control.
          </p>
        </div>
      </div>

      {/* Video section */}
      <div className="relative w-full h-auto mt-8">
        <div className="relative w-full h-[50vh] aspect-video">
          <video
            ref={videoRef}
            src="/backgroundImages/ProductPage/BublInAction.mp4"
            // poster="/backgroundImages/ProductPage/HowItWorks.png"
            className="w-full h-full object-contain rounded-2xl object-right "
            playsInline
            loop
            autoPlay
            muted
          />
        </div>
      </div>
    </main>
  );
};

export default HowItWorks;
