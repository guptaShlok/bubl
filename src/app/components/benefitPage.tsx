"use client";
import React from "react";
import FeatureSwiper from "./swipers/feature-swiper";

const Benefit = () => {
  return (
    <main className="max-h-screen pt-[5vw] px-[7vw] w-full relative">
      {/* Heading section */}
      <div className="mb-8 md:mb-12 h-fit flex justify-around relative">
        <h1 className="w-full text-4xl md:text-[clamp(4rem,8vw,8rem)] text-center md:text-start font-semibold leading-tighter tracking-normal">
          {/* note to add the abouve text class as an utlity one and update the hero section as well */}

          <span className="gradient-text-1">Benefits</span>
        </h1>
      </div>

      <section className="py-8 relative md:translate-x-1/3">
        <FeatureSwiper />
      </section>
    </main>
  );
};

export default Benefit;
