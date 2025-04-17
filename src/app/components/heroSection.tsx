import Image from "next/image";
import React from "react";

export default function HeroSection() {
  return (
    <div className="relative flex h-[92vh] items-center justify-start">
      {/* Centered Vector */}
      <div className=" center-absolute-y absolute left-1/4 top-[35%] w-[1133px] h-[1133px] z-0">
        <Image
          src="/backgroundImages/eclipse/eclipseCenter.png"
          alt="vector 1"
          fill
          className="object-fill"
        />
      </div>

      {/* Top-right vector */}
      <div className="absolute top-16 right-12 w-40 h-32">
        <Image
          src="/backgroundImages/eclipse/eclipseRightSmall.png"
          alt="vector 2"
          fill
          className="object-contain"
        />
      </div>

      {/* Hero text */}
      <div className="relative z-10 w-[45%] text-start left-1/12">
        <h1 className=" gradient-text-2 text-4xl md:text-9xl font-medium leading-tighter text-left wrap-break-word">
          World&apos;s First Stroller Air Purifier
        </h1>
        <p className="mt-10 text-4xl md:text-9xl font-bold tracking-tight text-start">
          Now in India
        </p>
      </div>
    </div>
  );
}
