import Image from "next/image";
import Link from "next/link";
import React from "react";

const MissionPhilosphy = () => {
  return (
    <main className="max-h-screen pt-[5vw] px-[7vw] w-full relative">
      {/* Heading section */}
      <div className="mb-8 md:mb-12 h-fit flex justify-around relative">
        <h1 className="w-full text-4xl md:text-[clamp(4rem,8vw,8rem)] text-center md:text-start font-semibold leading-tighter tracking-normal">
          {/* note to add the abouve text class as an utlity one and update the hero section as well */}
          <span className="text-black">Our </span>
          <span className="gradient-text-1">Philosophy</span>
          <br />
          <span className="text-black">&amp; </span>
          <span className="gradient-text-1">Mission</span>
        </h1>

        <div className="absolute bottom-0 right-0 text-black">
          <Link href="/about" className="cta-button w-80 h-24 ">
            About us
          </Link>
        </div>
      </div>

      {/* Content grid */}
      <div className="flex flex-col justify-center items-center mx-auto md:flex-row md:justify-evenly md:items-center gap-4">
        {/* First image */}
        <div className="w-full md:w-1/4 rounded-2xl hidden md:flex justify-center overflow-hidden">
          <Image
            src="/backgroundImages/philosphy/babyfeet.png"
            alt="Baby feet"
            width={100}
            height={100}
            className="w-[320px] h-auto object-cover"
          />
        </div>

        {/* Content block */}
        <div
          className="w-full md:w-1/4 flex flex-col justify-center items-center text-center md:text-left
                  text-[clamp(0.8rem,1.5vw,2rem)] font-light text-black"
        >
          <p className="mt-4">
            <span>Every baby deserves a safe, spanure environment.</span>
            <span className="font-normal">At Bubl,</span> we{" "}
            <span className="font-medium">combine science and innovation</span>{" "}
            to{" "}
            <span className="font-medium">
              protect infants from air pollution,
            </span>{" "}
            ensuring peace of mind for parents.
          </p>
        </div>

        {/* Second image */}
        <div className="w-full md:w-1/2 rounded-2xl md:flex justify-center overflow-hidden">
          <Image
            src="/backgroundImages/philosphy/babyhands.png"
            alt="Baby hand holding parent's finger"
            width={500}
            height={400}
            className="w-[730px] h-[320px] object-cover"
          />
        </div>
      </div>
    </main>
  );
};

export default MissionPhilosphy;
