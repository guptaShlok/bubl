"use client";

import Image from "next/image";
import ImageOverlay from "../ImageOverlay";

export default function BuiltForIndia() {
  return (
    <main className="px-[6vw] pt-[8vh] text-black">
      <ImageOverlay
        imageSrc="/backgroundImages/indianDesc/IndianDescOverlay.png"
        horizontalPosition="left"
        verticalPosition="top"
        exceedViewport={true}
        scale={1}
        opacity={1}
        className=" -translate-y-1/3"
        mobile={{
          horizontalPosition: "left", // Centered on mobile
          verticalPosition: "top", // At the top on mobile
          width: "80%", // Full width on mobile
          height: "80vh", // Half viewport height on mobile
        }}
        // Tablet-specific props
        tablet={{
          horizontalPosition: "center",
          width: "90%",
          height: "80vh",
          scale: 1,
        }}
        // Mobile-specific props
      />
      {/* Header */}
      <div className="md:mb-4 relative">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between">
          <div className="relative">
            <h1 className="text-4xl md:text-[clamp(3rem,7vw,8rem)] text-center md:text-start font-semibold leading-[1.3] tracking-normal mb-6 md:mb-0">
              <span className="text-black">Built For </span>
              <span className="gradient-text-1">India&#39;s</span>
              <div className="flex items-center justify-center md:justify-start relative">
                <div className="text-center md:text-start">
                  <span className="gradient-text-1">Polluted Air</span>
                </div>

                {/* Arrow positioned next to "& Mission" */}
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
        </div>
      </div>
      <ImageOverlay
        imageSrc="/backgroundImages/philosphy/PhilosphyOverlay.png"
        horizontalPosition="right"
        width="50%"
        height="110vh" // Exceeds viewport height
        exceedViewport={true}
        scale={1}
        opacity={1}
        className=" translate-y-1/3"
        // Mobile-specific props
        mobile={{
          horizontalPosition: "right", // Centered on mobile
          verticalPosition: "top", // At the top on mobile
          width: "80%", // Full width on mobile
          height: "80vh", // Half viewport height on mobile
        }}
        // Tablet-specific props
        tablet={{
          horizontalPosition: "center",
          width: "90%",
          height: "80vh",
          scale: 1,
        }}
      />
      <div className=" mx-auto md:pt-[4vh]">
        {/* Two‑column image + summary */}
        <div className="flex flex-col-reverse lg:flex-row items-center">
          <div className="w-full md:w-1/2 mt-4">
            <h2 className="text-2xl md:text-3xl w-4/5 md:ml-10 font-normal mb-4">
              <p className="font-semibold">
                Your Baby&#39;s Shield Against Pollution.
              </p>{" "}
              <p className="md:mt-[6vh]">
                India&#39;s air can be tough on developing lungs. Babybubl gives
                Indian parents an edge with:
              </p>
            </h2>
          </div>

          <div className="w-full md:w-3/5 flex justify-center">
            <div className="relative w-full">
              <Image
                src="/backgroundImages/indianDesc/joggingCouple.png"
                alt="HEPA Replacement Filters"
                width={1600}
                height={1600}
                className="w-full h-full object-cover"
                priority
              />
            </div>
          </div>
        </div>

        {/* Full‑width detailed description */}
        <section className="md:mt-12 ml-12 space-y-4 text-lg font-normal tracking-wide md:text-2xl">
          <div className="grid text-base md:text-2xl grid-cols-1 md:grid-cols-3 gap-6 pt-4 ">
            <div>
              <p className="font-semibold mb-1 mt-3 w-4/5 text-center">
                Up to 95% cleaner air inside the canopy
              </p>
            </div>
            <div>
              <p className="font-semibold mb-1 mt-3 w-4/5 text-center">
                Real-time pollution insights via the Bubl app
              </p>
            </div>
            <div>
              <p className="font-semibold mb-1 w-4/5 text-center">
                Designed with India&#39;s urban pollution in mind
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
