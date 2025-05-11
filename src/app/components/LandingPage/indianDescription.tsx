import Image from "next/image";
import React from "react";

import NumberSection from "./numberSection";

const IndianDescription = () => {
  return (
    <>
      {"India's Shield against India's Polluted Air"}
      <main className="max-h-screen pt-[6vw] px-[6vw] w-full relative">
        {/* Heading section */}
        <div className=" h-fit flexß relative">
          <h1 className="text-4xl md:text-[clamp(3rem,7vw,8rem)] text-center md:text-start font-semibold leading-[1.3] tracking-normal mb-6 md:mb-0">
            <span className="gradient-text-1 ">Shield</span>
            <span className="text-black font-semi-bold"> against </span>
            <span className="gradient-text-1">India&#39;s</span>
            <br />
            <div className="flex items-center justify-center md:justify-start relative">
              <div className="text-center md:text-start">
                <span className="gradient-text-1">Polluted Air</span>
              </div>

              {/* Arrow positioned next to "Take Action" */}
              <div className="hidden md:block ml-12 transform translate-y-1">
                <svg
                  width="50"
                  height="50"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3 3L21 21M21 21H6M21 21V6"
                    stroke="black"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
          </h1>
        </div>

        {/* Content grid */}
        <div className="flex flex-col justify-center items-center pt-10 mx-auto md:flex-row md:justify-center md:items-stretch  gap-4">
          {/* Content block */}
          <div
            className="w-full md:w-1/3 flex flex-col justify-center md:justify-between text-center md:text-left
                  text-[clamp(0.8rem,1.5vw,2rem)] font-light text-black"
          >
            <p className="mt-2 md:mt-6">
              <span>
                India&#39;s air pollution isn&#39;t just seasonal — it&#39;s a
                silent,
                <span className="font-semibold"> everyday threat,</span> we{" "}
                <span> And the ones breathing the most are the ones</span>
                <span className="font-semibold">
                  {" "}
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
              width={900}
              height={900}
              className="w-[990px] h-[320px] object-cover"
            />
          </div>
        </div>
      </main>

      {"Data about india"}
      <NumberSection />

      <main className="max-h-screen pt-[6vw] px-[6vw] w-full relative">
        <div className="flex flex-col-reverse md:flex-row justify-center items-center md:items-center gap-4 md:mt-6 mt-3 mx-auto">
          {/* Image block */}
          <div className="w-full md:w-2/3 rounded-2xl shrink-0 flex justify-center md:justify-start overflow-hidden pr-0 md:pr-2">
            <Image
              src="/backgroundImages/indianDesc/joggingCrowd.png"
              alt="people jogging in India"
              width={900}
              height={900}
              className="w-[700px] h-[500px] object-cover rounded-2xl"
            />
          </div>

          {/* Content block */}
          <div className="w-full flex flex-col justify-between  text-center md:text-left text-[clamp(0.8rem,1.6vw,2rem)] font-light text-black">
            <p className="mt-4">
              Air quality in India can&#39;t be controlled — but your baby&#39;s
              breathing space can be.
              <br />
              Babybubl creates a protective dome of clean air using HEPA
              filtration and real-time monitoring, making it{" "}
              <span className="font-semibold">India-ready, baby-safe.</span>
            </p>
          </div>
        </div>
      </main>
    </>
  );
};

export default IndianDescription;
