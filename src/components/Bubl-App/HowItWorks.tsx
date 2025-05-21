"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import ImageOverlay from "../ImageOverlay";

const HowItWorks = () => {
  const videoTriggerRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement | null>(null);

  const targetXRef = useRef<number>(0);
  const targetYRef = useRef<number>(0);
  const currentXRef = useRef<number>(0);
  const currentYRef = useRef<number>(0);

  useEffect(() => {
    const existing = document.querySelector("#custom-cursor");
    if (!existing) {
      const div = document.createElement("div");
      div.id = "custom-cursor";
      document.body.appendChild(div);
      cursorRef.current = div;

      Object.assign(div.style, {
        position: "fixed",
        top: "0px",
        left: "0px",
        width: "80px",
        height: "80px",
        border: "2px solid #8ad3c3",
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#8ad3c3",
        fontSize: "12px",
        fontWeight: "600",
        pointerEvents: "none",
        userSelect: "none",
        zIndex: "9999",
        transform: "translate(-50%, -50%)",
        opacity: "0",
        transition: "opacity 0.2s ease",
      });
      div.innerText = "Play Video";
    } else {
      cursorRef.current = existing as HTMLDivElement;
    }

    let rafId: number;
    const lerp = (start: number, end: number, amt: number) =>
      (1 - amt) * start + amt * end;

    const animateCursor = () => {
      currentXRef.current = lerp(currentXRef.current, targetXRef.current, 0.1);
      currentYRef.current = lerp(currentYRef.current, targetYRef.current, 0.1);
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${currentXRef.current}px, ${currentYRef.current}px) translate(-50%, -50%)`;
      }
      rafId = requestAnimationFrame(animateCursor);
    };

    const handleMouseMove = (e: MouseEvent) => {
      targetXRef.current = e.clientX;
      targetYRef.current = e.clientY;
    };

    const handleMouseEnter = () => {
      if (cursorRef.current) {
        cursorRef.current.style.opacity = "1";
      }
      window.addEventListener("mousemove", handleMouseMove);
      rafId = requestAnimationFrame(animateCursor);
    };

    const handleMouseLeave = () => {
      if (cursorRef.current) {
        cursorRef.current.style.opacity = "0";
      }
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(rafId);
    };

    const handleClick = () => {
      window.open(
        "/backgroundImages/accessories/changingFilters.mp4",
        "_blank"
      );
    };

    const containerEl = videoTriggerRef.current;
    if (containerEl) {
      containerEl.addEventListener("mouseenter", handleMouseEnter);
      containerEl.addEventListener("mouseleave", handleMouseLeave);
      containerEl.addEventListener("click", handleClick);
    }

    return () => {
      const div = cursorRef.current;
      if (div) {
        document.body.removeChild(div);
      }
      if (containerEl) {
        containerEl.removeEventListener("mouseenter", handleMouseEnter);
        containerEl.removeEventListener("mouseleave", handleMouseLeave);
        containerEl.removeEventListener("click", handleClick);
      }
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <main className="relative max-h-screen pt-[8vh] md:pt-[0vh] px-[6vw] mb-[3vh] md:mb-[30vh] w-full">
      <ImageOverlay
        imageSrc="/backgroundImages/philosphy/PhilosphyOverlay.png"
        exceedViewport={true}
        scale={1}
        opacity={1}
        className="absolute -translate-y-1/4 left-0 pointer-events-none"
        mobile={{
          horizontalPosition: "right",
          verticalPosition: "bottom",
          width: "80%",
          height: "100vh",
        }}
      />

      <div className="mb-0 relative">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between">
          <div className="relative">
            <h1 className="text-4xl md:text-[clamp(3rem,7vw,8rem)] text-center md:text-start font-semibold leading-[1.3] tracking-normal mb-6 md:mb-0">
              <br />
              <div className="flex items-center justify-center md:justify-start relative">
                <div className="text-center md:text-start">
                  <span className="text-black">How it </span>
                  <span className="gradient-text-1"> Works?</span>
                </div>
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
        </div>
      </div>

      <div className="flex flex-col items-center pt-[2vh] justify-start md:flex-row md:justify-between md:items-start gap-4 md:gap-6">
        <div className="w-full md:w-3/5 flex flex-col items-center md:items-stretch text-start md:text-left text-[clamp(0.8rem,1.5vw,2rem)] font-normal text-black">
          <p>
            The babybubl device connects to the app via Bluetooth, allowing
            users to monitor real-time indoor and outdoor air quality, visualize
            data on a color-coded map, take manual spot readings, and manage
            device settings like fan speed and maintenance alerts—all from their
            phone.
          </p>
        </div>
      </div>

      <div
        ref={videoTriggerRef}
        className="relative w-full h-auto pt-[5vh] cursor-none"
      >
        <div className="relative top-0 left-0 select-none z-10">
          <Image
            src="/backgroundImages/bubl-app/HowItWorks.png"
            alt="How it works video"
            width={1330}
            height={1020}
            className="w-[100vw] object-contain"
          />
        </div>
      </div>
    </main>
  );
};

export default HowItWorks;
