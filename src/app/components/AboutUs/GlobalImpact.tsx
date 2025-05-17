"use client";
import Image from "next/image";
import React from "react";
import ImageOverlay from "../ImageOverlay";

const GlobalImpact = () => {
  return (
    <main className="h-auto px-[6vw] pt-[8vh] w-full relative">
      {/* Heading section */}
      <div className="mb-8 md:mb-12 relative">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between">
          <div className="relative">
            <h1 className="text-4xl md:text-[clamp(3rem,7vw,8rem)] text-center md:text-start font-semibold leading-[1.3] tracking-normal mb-6 md:mb-0">
              <div className="flex items-center justify-center md:justify-start relative">
                <div className="text-center md:text-start">
                  <span className="gradient-text-1"> Global Partners</span>
                </div>
                <ImageOverlay
                  imageSrc="/circularOverlay.png"
                  exceedViewport={true}
                  scale={1}
                  opacity={1}
                  className=" -translate-y-1/12"
                  // Mobile-specific props
                  mobile={{
                    horizontalPosition: "center", // Centered on mobile
                    verticalPosition: "top", // At the top on mobile
                    width: "100%", // Full width on mobile
                    height: "100vh", // Half viewport height on mobile
                  }}
                />
                {/* Arrow positioned next to "& Mission" */}
                <div className="hidden md:block ml-12 transform translate-y-1">
                  <svg
                    width="50"
                    height="50"
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
      <ImageOverlay
        imageSrc="/backgroundImages/indianDesc/IndianDescOverlay.png"
        horizontalPosition="left"
        verticalPosition="top"
        width="85%"
        height="200vh" // Exceeds viewport height
        exceedViewport={true}
        scale={1}
        opacity={1}
        mobile={{
          horizontalPosition: "left", // Centered on mobile
          verticalPosition: "top", // At the top on mobile
          width: "100%", // Full width on mobile
          height: "200vh", // Half viewport height on mobile
        }}
        // Tablet-specific props
        tablet={{
          horizontalPosition: "center",
          width: "90%",
          height: "80vh",
          scale: 1,
        }}
        // Mobile-specific props
      />
      {/* Two-up images: row on md+, column on mobile */}
      <div className="flex flex-col md:flex-row justify-center items-center mt-[6vw] gap-3.5 md:gap-[14vw]">
        <div className="w-full md:w-1/4 rounded-2xl relative z-10 overflow-hidden">
          <Image
            src="/backgroundImages/aboutUs/globalPartners/client1.png"
            alt="Mission"
            width={600}
            height={400}
            className="w-full h-auto object-cover rounded-2xl"
          />
        </div>
        <div className="w-full md:w-1/4 rounded-2xl relative z-10 overflow-hidden">
          <Image
            src="/backgroundImages/aboutUs/globalPartners/client2.png"
            alt="Vision"
            width={600}
            height={400}
            className="w-full h-auto object-cover rounded-2xl"
          />
        </div>
      </div>
    </main>
  );
};

export default GlobalImpact;
