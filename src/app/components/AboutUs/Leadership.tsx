"use client";

import Image from "next/image";
import React from "react";

const Leadership = () => {
  return (
    <main className="max-h-screen px-[6vw] mt-[8vw] w-full relative">
      {/* Heading section */}
      <div className="h-fit flex relative leading-[1.3]">
        <h1 className="text-4xl md:text-[clamp(3rem,7vw,8rem)] text-center md:text-start font-semibold">
          <div className="flex items-center justify-center md:justify-start">
            <span className="gradient-text-1">Leadership</span>
            {/* Arrow next to heading */}
            <div className="hidden md:block ml-8">
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

      {/* Team section */}
      <section className="w-full py-16 px-6 md:px-0relative overflow-hidden leading-[1.3]">
        <div className="w-full mx-auto space-y-4">
          {/* Conny Karlsson */}
          <div className="flex flex-col md:flex-row md:justify-start">
            {/* Image */}
            <div className="w-full md:max-w-[500px] mb-8 md:mb-0">
              <div className="relative p-1 rounded-3xl max-w-[500px]">
                <div className="rounded-2xl overflow-hidden ">
                  <Image
                    src="/backgroundImages/aboutUs/team/Conny.png"
                    alt="Conny Karlsson"
                    width={450}
                    height={450}
                    className="w-full h-auto object-cover aspect-square"
                  />
                </div>
              </div>
            </div>
            {/* Content */}
            <div className="w-full pl-[3vw] text-center md:text-left text-black">
              <h2 className="text-5xl md:text-6xl lg:text-9xl font-semibold mb-4 leading-[1.3]">
                <p className=" w-1/2">Conny Karlsson</p>
              </h2>
              <h3 className="text-xl md:text-3xl font-semibold mb-1">
                Founder & CEO
              </h3>
              <p className="text-lg md:text-2xl max-w-3xl pt-2 font-normal w-full md:mx-0">
                A physician with years of research in pathophysiology and air
                pollution, Conny is the mind behind Bubl&#39;s revolutionary
                technology.
              </p>
            </div>
          </div>

          {/* Rajeev Singh Rathore */}
          <div className="flex flex-col md:flex-row-reverse items-center">
            {/* Image */}
            <div className="w-full md:max-w-[500px] mb-8 md:mb-0">
              <div className="relative p-1 rounded-3xl max-w-[500px]">
                <div className="rounded-2xl overflow-hidden ">
                  <Image
                    src="/backgroundImages/aboutUs/team/Rajeev.png"
                    alt="Rajeev Singh Rathore"
                    width={450}
                    height={450}
                    className="w-full h-auto object-cover aspect-square"
                  />
                </div>
              </div>
            </div>
            {/* Content */}
            <div className="w-full  text-center md:text-left text-black">
              <h2 className="text-5xl md:text-6xl lg:text-9xl font-semibold mb-4 leading-[1.3]">
                Rajeev Singh Rathore
              </h2>
              <h3 className="text-xl md:text-2xl font-semibold mb-1">
                CEO / Director, Bubl. Technologies India
              </h3>
              <p className="text-lg md:text-2xl max-w-3xl pt-2 font-normal w-full md:mx-0">
                With deep experience and leadership in Indian markets, Rajeev is
                steering Bubl&#39;s vision across the subcontinent.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Leadership;
