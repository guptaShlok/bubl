"use client";

import Image from "next/image";
import ImageOverlay from "../ImageOverlay";

const HowItWorks = () => {
  //TODO add a video over here
  return (
    <main className="max-h-screen pt-[8vh] md:pt-[0vh] px-[6vw] mb-[3vh] md:mb-[30vh]  w-full relative">
      {/* Heading section */}
      <div className="mb-0 relative">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between">
          <div className="relative">
            <h1 className="text-4xl md:text-[clamp(3rem,7vw,8rem)] text-center md:text-start font-semibold leading-[1.3] tracking-normal mb-6 md:mb-0">
              <br />
              <div className="flex items-center justify-center md:justify-start relative">
                <div className="text-center md:text-start">
                  <span className="text-black">How it </span>
                  <span className="gradient-text-1"> Works?</span>
                </div>

                {/* Arrow positioned next to "& Mission" */}
                <div className="hidden md:block ml-12 transform translate-y-1">
                  <svg
                    width="80"
                    height="80"
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
        exceedViewport={true}
        scale={1}
        opacity={1}
        className=" absolute -translate-y-1/4 left-0 pointer-events-none"
        // Mobile-specific props
        mobile={{
          horizontalPosition: "right", // Centered on mobile
          verticalPosition: "bottom", // At the top on mobile
          width: "80%", // Full width on mobile
          height: "100vh", // Half viewport height on mobile
        }}
      />
      {/* Content grid */}
      <div className="flex flex-col items-center pt-[2vh] justify-start md:flex-row md:justify-between md:items-start gap-4 md:gap-6">
        {/* Content block */}
        <div className="w-full md:w-3/5 flex flex-col items-center md:items-stretch text-start md:text-left text-[clamp(0.8rem,1.5vw,2rem)] font-normal text-black">
          <p>
            The babybubl device connects to the app via Bluetooth, allowing
            users to monitor real-time indoor and outdoor air quality, visualize
            data on a color-coded map, take manual spot readings, and manage
            device settings like fan speed and maintenance alerts—all from their
            phone.
          </p>
        </div>
      </div>
      <div className="relative w-full h-auto pt-0 md:pt-[5vh]">
        <div className="relative top-0 left-0 select-none z-10">
          <Image
            src="/backgroundImages/bubl-app/HowItWorks.png"
            alt="Baby hand holding parent's finger"
            width={1330}
            height={1020}
            className="w-[100vw] object-contain"
          />
        </div>
      </div>
    </main>
  );
};

export default HowItWorks;
