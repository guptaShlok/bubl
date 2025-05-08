import Link from "next/link";
import React from "react";
import InfoSwiper from "./swipers/info-feature";

const ScienceBehindProduct = () => {
  return (
    <main className="max-h-screen pt-[5vw] px-[7vw] w-full relative">
      {/* Heading section */}
      <div className="mb-8 md:mb-12 h-fit flex justify-around relative">
        <h1 className="w-full text-4xl md:text-[clamp(4rem,8vw,8rem)] text-center md:text-start font-semibold leading-tighter tracking-normal">
          {/* note to add the abouve text class as an utlity one and update the hero section as well */}
          <span className="gradient-text-1">Science </span>
          <span className="gradient-text-1"> Behind</span>
          <br />
          <span className="text-black">Our </span>
          <span className="text-black">Product </span>
        </h1>

        <div className="absolute bottom-0 right-0 text-black">
          <Link href="/about" className="cta-button w-80 h-24 ">
            Learn More
          </Link>
        </div>
      </div>
      <div>
        <InfoSwiper />
      </div>
    </main>
  );
};

export default ScienceBehindProduct;
