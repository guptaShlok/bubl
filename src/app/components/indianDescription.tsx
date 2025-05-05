import Image from "next/image";
import React from "react";

import NumberSection from "./numberSection";

const IndianDescription = () => {
  return (
    <>
      {"India's Shield against India's Polluted Air"}
      <main className="max-h-screen pt-[5vw] px-[7vw] w-full relative">
        {/* Heading section */}
        <div className="mb-8 md:mb-12 h-fit flex justify-around relative">
          <h1 className="w-full text-4xl md:text-[clamp(4rem,8vw,8rem)] text-center md:text-start font-semibold leading-tighter tracking-normal">
            {/* note to add the abouve text class as an utlity one and update the hero section as well */}
            <span className="gradient-text-1 ">Shield</span>
            <span className="text-black font-semi-bold"> against </span>
            <span className="gradient-text-1">India&amp;</span>
            <br />
            <span className="gradient-text-1">Polluted Air</span>
          </h1>
        </div>

        {/* Content grid */}
        <div className="flex flex-col justify-center items-center mx-auto md:flex-row md:justify-center md:items-stretch  gap-4">
          {/* Content block */}
          <div
            className="w-full md:w-1/3 flex flex-col justify-center text-center md:text-left
                  text-[clamp(0.8rem,1.5vw,2rem)] font-light text-black"
          >
            <p className="mt-4 w-full flex flex-col justify-around items-center-">
              <span>
                India&amp;s air pollution isn&amp;t just seasonal — it&amp;s a
                silent,
                <span className="font-normal">everyday threat,</span> we{" "}
                <span> And the ones breathing the most are the ones</span>
                <span className="font-semi-bold">
                  most at risk: our babies.
                </span>
                With 158.8 million children under the age of 6, the need for
                clean air solutions is urgent and undeniable.
              </span>
            </p>
          </div>

          {/* image block */}
          <div className="w-full md:w-2/3 rounded-2xl flex justify-end overflow-hidden">
            <Image
              src="/backgroundImages/indianDesc/joggingCouple.png"
              alt="people jogging in India"
              width={500}
              height={400}
              className="w-[900px] h-[320px] object-cover"
            />
          </div>
        </div>
      </main>

      {"Data about india"}
      <NumberSection />

      <main className="max-h-screen pt-[5vw] px-[7vw] w-full relative">
        <div className="flex flex-col-reverse md:flex-row justify-center items-center md:items-stretch gap-4 mx-auto">
          {/* Image block */}
          <div className="w-full md:w-2/3 rounded-2xl shrink-0 flex justify-center md:justify-start overflow-hidden pr-0 md:pr-8">
            <Image
              src="/backgroundImages/indianDesc/joggingCrowd.png"
              alt="people jogging in India"
              width={500}
              height={400}
              className="w-[90%] h-[320px] object-cover rounded-2xl"
            />
          </div>

          {/* Content block */}
          <div className="w-full md:w-1/2 flex flex-col justify-center text-center md:text-left text-[clamp(0.8rem,1.5vw,2rem)] font-light text-black">
            <p className="mt-4">
              Air quality in India can’t be controlled — but your baby’s
              breathing space can be.
              <br />
              Babybubl creates a protective dome of clean air using HEPA
              filtration and real-time monitoring, making it{" "}
              <span className="font-normal">India-ready, baby-safe.</span>
            </p>
          </div>
        </div>
      </main>
    </>
  );
};

export default IndianDescription;
