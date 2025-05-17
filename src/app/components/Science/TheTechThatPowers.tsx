import Image from "next/image";
import React from "react";
import ImageOverlay from "../ImageOverlay";

const TheTechThatPower = () => {
  return (
    <main className="max-h-screen px-[6vw] pt-[8vh] w-full relative">
      {/* Heading section */}
      <div className="mb-0 md:mb-12 relative">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between">
          <div className="relative">
            <h1 className="text-4xl md:text-[clamp(3rem,7vw,8rem)] text-center md:text-start font-semibold leading-[1.3] tracking-normal mb-6 md:mb-0">
              <span className=" text-black"> The</span>
              <span className="gradient-text-1"> Tech that</span>
              <div className="flex items-center justify-center md:justify-start w-2/3 relative">
                <div className="text-center md:text-start">
                  <span className="gradient-text-1"> Powers</span>
                </div>

                {/* Arrow positioned next to "& Mission" */}
                <div className="hidden md:block ml-12 translate-y-1/2 ">
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
        horizontalPosition="right"
        width="50%"
        height="110vh" // Exceeds viewport height
        exceedViewport={true}
        scale={1}
        opacity={1}
        className=" -translate-y-1/3"
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
      {/* Content section */}
      <div className="flex flex-col md:flex-row justify-center items-center gap-4 md:mt-6 mt-3 mx-auto">
        {/* Content block */}
        <div className="w-full md:w-1/2 flex flex-col justify-around text-center md:text-left text-[clamp(1rem,1.6vw,2rem)] font-normal text-black">
          <p className="mt-0 md:mt-4">
            Developed over four years by Swedish physicians and engineers,
            Babybubl employs advanced personal air purification technology. It
            creates a microenvironment of clean air around your child without
            the need for full enclosure. The system utilizes HEPA-class 11
            filters to remove pollutants, allergens, and pathogens, ensuring the
            air your baby breathes is significantly cleaner.
          </p>
        </div>

        {/* Image block */}
        <div className="w-full md:w-1/2 relative z-10 rounded-2xl flex justify-center overflow-hidden pr-0 md:pr-2">
          <Image
            src="/backgroundImages/science/TechThatMatters.png"
            alt="People jogging in India"
            width={900}
            height={900}
            className="w-[600px] h-[400px] object-cover rounded-2xl"
          />
        </div>
      </div>
    </main>
  );
};

export default TheTechThatPower;
