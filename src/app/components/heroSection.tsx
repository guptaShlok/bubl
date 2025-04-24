// import Image from "next/image";
import React from "react";

export default function HeroSection() {
  return (
    <div className="relative flex items-center justify-start">
      {/* Hero text */}
      <div className="relative z-10 w-full h-[40vh] md:h-[80vh] flex flex-col justify-center md:w-[50%] text-start md:pl-12">
        <h1 className="gradient-text-2 text-4xl md:text-[clamp(4rem,8vw,8rem)] font-medium leading-tighter text-center md:text-start wrap-break-word">
          World&apos;s First Stroller Air Purifier
        </h1>
        <p className="mt-10 text-5xl md:text-[clamp(4rem,8vw,8rem)] font-bold tracking-tight text-center md:text-start">
          Now in India
        </p>
      </div>
    </div>
  );
}
