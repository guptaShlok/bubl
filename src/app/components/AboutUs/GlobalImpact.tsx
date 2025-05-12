"use client";
import Image from "next/image";
import React from "react";

const GlobalImpact = () => {
  return (
    <main className="max-h-screen px-[6vw] pt-[35vh] w-full relative">
      {/* Heading section */}
      <div className="h-fit flex relative leading-[1.3] mb-8">
        <h1 className="text-4xl md:text-[clamp(3rem,7vw,8rem)] text-center md:text-start font-semibold">
          <div className="flex items-center justify-center md:justify-start w-full">
            <span className="gradient-text-1">Global Partners</span>
            {/* Arrow next to heading */}
            <div className="hidden md:block ml-8 translate-y-1">
              <svg
                width="80"
                height="80"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-black"
              >
                <path
                  d="M3 3L21 21M21 21H6M21 21V6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
        </h1>
      </div>

      {/* Two-up images: row on md+, column on mobile */}
      <div className="flex flex-col md:flex-row justify-center items-center mt-[6vw] gap-[14vw]">
        <div className="w-full md:w-1/4 rounded-2xl overflow-hidden">
          <Image
            src="/backgroundImages/aboutUs/globalPartners/client1.png"
            alt="Mission"
            width={600}
            height={400}
            className="w-full h-auto object-cover rounded-2xl"
          />
        </div>
        <div className="w-full md:w-1/4 rounded-2xl overflow-hidden">
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
