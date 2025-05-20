"use client";
import React, { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import ImageOverlay from "../ImageOverlay";

const ShopBubl = () => {
  const buttonRef = useRef<HTMLAnchorElement>(null);
  const circleRef = useRef<HTMLDivElement>(null);

  const cursorRef = useRef<HTMLDivElement | null>(null);

  const targetXRef = useRef<number>(0);
  const targetYRef = useRef<number>(0);
  const currentXRef = useRef<number>(0);
  const currentYRef = useRef<number>(0);

  const videoTriggerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const buttonEl = buttonRef.current;
    const circleEl = circleRef.current;
    if (!buttonEl || !circleEl) return;

    // Hide the circular gradient initially
    gsap.set(circleEl, { scale: 0, opacity: 0, y: "50%" });

    const tl = gsap.timeline({ paused: true });
    tl.to(circleEl, { opacity: 1, duration: 0.1 })
      .to(
        circleEl,
        { scale: 0.5, y: "25%", duration: 0.1, ease: "power1.out" },
        "<"
      )
      .to(circleEl, { scale: 2.5, y: "0%", duration: 0.5, ease: "power2.out" })
      .to(
        buttonEl,
        { color: "white", borderColor: "#8ad3c3", duration: 0.1 },
        "<0.1"
      );

    const onEnter = () => tl.play();
    const onLeave = () => tl.reverse();

    buttonEl.addEventListener("mouseenter", onEnter);
    buttonEl.addEventListener("mouseleave", onLeave);

    return () => {
      buttonEl.removeEventListener("mouseenter", onEnter);
      buttonEl.removeEventListener("mouseleave", onLeave);
      tl.kill();
    };
  }, []);

  useEffect(() => {
    // 6.1 Create and style the custom cursor element (only once)
    const existing = document.querySelector("#custom-cursor");
    if (!existing) {
      const div = document.createElement("div");
      div.id = "custom-cursor";
      document.body.appendChild(div);
      cursorRef.current = div;

      // Hide by default
      Object.assign(div.style, {
        position: "fixed",
        top: "0px",
        left: "0px",
        width: "80px",
        height: "80px",
        border: "2px solid #8ad3c3", // mint-green
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
        opacity: "0", // initially hidden
        transition: "opacity 0.2s ease",
      });
      div.innerText = "Play Video";
    } else {
      cursorRef.current = existing as HTMLDivElement;
    }

    let rafId: number;
    const lerp = (start: number, end: number, amt: number) =>
      (1 - amt) * start + amt * end;

    // 6.2 Animate function to smoothly move cursor toward target
    const animateCursor = () => {
      currentXRef.current = lerp(currentXRef.current, targetXRef.current, 0.1);
      currentYRef.current = lerp(currentYRef.current, targetYRef.current, 0.1);
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${currentXRef.current}px, ${currentYRef.current}px) translate(-50%, -50%)`;
      }
      rafId = requestAnimationFrame(animateCursor);
    };

    // 6.3 Handlers for mousemove, enter, and leave on the image container
    const handleMouseMove = (e: MouseEvent) => {
      targetXRef.current = e.clientX;
      targetYRef.current = e.clientY;
    };
    const handleMouseEnter = () => {
      // Show the custom cursor and start animation loop
      if (cursorRef.current) {
        cursorRef.current.style.opacity = "1";
      }
      window.addEventListener("mousemove", handleMouseMove);
      rafId = requestAnimationFrame(animateCursor);
    };
    const handleMouseLeave = () => {
      // Hide the custom cursor and stop animation
      if (cursorRef.current) {
        cursorRef.current.style.opacity = "0";
      }
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(rafId);
    };

    // 6.4 Click handler to open video in a new tab (only inside image area)
    const handleClick = () => {
      window.open("/Babybubl3dtransparent.webm", "_blank");
    };

    const containerEl = videoTriggerRef.current;
    if (containerEl) {
      containerEl.addEventListener("mouseenter", handleMouseEnter);
      containerEl.addEventListener("mouseleave", handleMouseLeave);
      containerEl.addEventListener("click", handleClick);
    }

    return () => {
      // Cleanup everything on unmount
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
    <>
      <main className="max-h-screen pt-[12vh] overflow-x-clip px-[6vw] mb-[0vh] md:mb-[30vh] lg:mb-[50vh] w-full relative">
        <ImageOverlay
          imageSrc="/circularOverlay.png"
          exceedViewport={true}
          scale={1}
          opacity={1}
          className="absolute -translate-y-1/4 left-0 pointer-events-none"
          mobile={{
            horizontalPosition: "center",
            verticalPosition: "top",
            width: "100%",
            height: "50vh",
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
                  className="gradient-background-1 absolute left-1/2 bottom-0 w-full h-full -translate-x-1/2 rounded-full pointer-events-none"
                />
              </Link>
            </div>
          </div>
        </div>

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
              </span>{" "}
              With a sleek, stroller-compatible design, it ensures your baby
              breathes cleaner air effortlessly, anytime, anywhere.
            </p>
          </div>
        </div>

        <div
          ref={videoTriggerRef}
          className="relative min-w-[100vw] md:-mt-[25vh] mt-[5vw] mb-0 cursor-none"
        >
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
