"use client";
import React from "react";
import FeatureSwiperProduct from "../swipers/feature-swiper-product";
import ImageOverlay from "../ImageOverlay";

const KeyFeatures = () => {
  return (
    <main className="max-h-screen pt-[8vh] md:pt-[12vh] px-[6vw] w-full relative">
      {/* Heading section */}
      <div className="mb-0 md:mb-12 relative">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between">
          <div className="relative">
            <h1 className="text-4xl md:text-[clamp(3rem,7vw,8rem)] text-center md:text-start font-semibold leading-[1.3] tracking-normal mb-6 md:mb-0">
              <div className="flex items-center justify-center md:justify-start relative">
                <div className="text-center md:text-start">
                  <span className="text-black"> Key</span>
                  <span className="gradient-text-1"> Features</span>
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
        </div>
      </div>
      <ImageOverlay
        imageSrc="/backgroundImages/indianDesc/IndianDescOverlay.png"
        horizontalPosition="left"
        verticalPosition="top"
        width="67%"
        height="160vh" // Exceeds viewport height
        exceedViewport={true}
        scale={1}
        opacity={1}
        className="translate-y-1/6"
        // Mobile-specific props
      />
      <section className=" relative ">
        <FeatureSwiperProduct />
      </section>
    </main>
  );
};

export default KeyFeatures;
