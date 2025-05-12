// import Image from "next/image";
import React from "react";

export default function HeroSection() {
  return (
    <div className="relative flex items-center justify-start">
      {/* Hero text */}
      <div className="relative z-10 w-full h-[40vh] md:h-[60vh] flex flex-col justify-center md:justify-end md:w-[50%] md:translate-y-1/3 text-start md:pl-[6vw]">
        <h1 className="gradient-text-2 text-4xl md:text-[clamp(3rem,7vw,8rem)] font-medium leading-tighter text-center md:text-start wrap-break-word">
          Protecting your baby&#39;s frist breaths
        </h1>
      </div>
    </div>
  );
}
