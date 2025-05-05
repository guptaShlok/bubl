"use client";
import React from "react";
import EmblaCarousel from "@/app/components/carousel/EmblaCarousel";
import { EmblaOptionsType } from "embla-carousel";

const Benefit = () => {
  const OPTIONS: EmblaOptionsType = { align: "start", dragFree: true };
  const SLIDE_COUNT = 5;
  const SLIDES = Array.from(Array(SLIDE_COUNT).keys());
  return (
    <main className="max-h-screen pt-[5vw] px-[7vw] w-full relative">
      {/* Heading section */}
      <div className="mb-8 md:mb-12 h-fit flex justify-around relative">
        <h1 className="w-full text-4xl md:text-[clamp(4rem,8vw,8rem)] text-center md:text-start font-semibold leading-tighter tracking-normal">
          {/* note to add the abouve text class as an utlity one and update the hero section as well */}

          <span className="gradient-text-1">Benefits</span>
        </h1>
      </div>

      {/* Content grid */}
      <div className="flex flex-col w-[100vh] text-black border justify-center items-center mx-auto md:flex-row md:justify-evenly md:items-center gap-4">
        <EmblaCarousel slides={SLIDES} options={OPTIONS} />
      </div>
    </main>
  );
};

export default Benefit;
