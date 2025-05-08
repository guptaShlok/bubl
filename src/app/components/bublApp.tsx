import Image from "next/image";
import Link from "next/link";
import React from "react";

const BubblApp = () => {
  return (
    <>
      <main className="pt-[8vw] px-[7vw] w-full relative">
        {/* Heading section */}
        <div className="mb-8 md:mb-12 flex flex-col md:flex-row justify-around relative">
          <h1 className="w-full text-4xl md:text-[clamp(4rem,8vw,8rem)] text-center md:text-start font-bold leading-tighter tracking-normal">
            <span className="gradient-text-1">Bubl App</span>
          </h1>

          <div className="mt-6 md:mt-0 md:absolute bottom-0 right-0 text-black">
            <Link
              href="/BubblApp"
              className="cta-button w-60 h-20 md:w-80 md:h-24"
            >
              Explore
            </Link>
          </div>
        </div>

        {/* Content block */}
        <div className="flex flex-col justify-center items-center mx-auto md:flex-row md:justify-start md:items-center gap-8 pt-[2vw]">
          <div className="w-full md:w-2/5 flex flex-col justify-center items-center md:items-start text-center md:text-left text-[clamp(0.8rem,1.5vw,2rem)] font-light text-black">
            <p className="mt-4">
              The Bubl lets you monitor and control your babybubl in real time.
              Track
              <span className="font-semibold">
                air quality, temperqture, and pollution levels (PM2.5)
              </span>{" "}
              , recieve
              <span className="font-semibold">smart alerts</span>, and adjust
              settings for optimal protection- all form your phone.
            </p>
          </div>
        </div>

        {/* Full-width Image */}
        <div className="w-full -mt-[5vw] md:-mt-[15vw]">
          <Image
            src="/backgroundImages/bublApp.png"
            alt="Baby Bubl"
            width={1300}
            height={2000}
            className="w-full h-auto object-cover rounded-2xl"
          />
        </div>
      </main>
    </>
  );
};

export default BubblApp;
