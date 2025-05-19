"use client";
import Image from "next/image";
import ImageOverlay from "../ImageOverlay";

const MissionVision = () => {
  return (
    <main className="px-[6vw] pt-[8vh] w-full relative">
      {/* Heading section */}
      <div className="mb-0 md:mb-12 relative">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between">
          <div className="relative">
            <h1 className="text-4xl md:text-[clamp(3rem,7vw,8rem)] text-center md:text-start font-semibold leading-[1.3] tracking-normal mb-6 md:mb-0">
              <div className="flex items-center justify-center md:justify-start relative">
                <div className="text-center md:text-start">
                  <span className="gradient-text-1"> Mission & Vision</span>
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
        imageSrc="/backgroundImages/indianDesc/IndianDescOverlay.png"
        horizontalPosition="left"
        verticalPosition="top"
        width="85%"
        height="200vh" // Exceeds viewport height
        exceedViewport={true}
        scale={1}
        opacity={1}
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
      {/* Content section */}
      <div className="flex flex-col md:flex-row gap-8 md:gap-12 pt-0 md:pt-12">
        {/* Image */}
        <div className="w-full md:w-2/3 rounded-2xl relative z-10 overflow-hidden">
          <Image
            src="/backgroundImages/aboutUs/missionAndVision.png"
            alt="Baby in stroller with air purification"
            width={900}
            height={500}
            className="w-full h-[350px] object-cover rounded-2xl"
          />
        </div>

        {/* Text content */}
        <div className="w-full md:w-1/3 flex flex-col md:justify-evenly md:items-baseline tracking-wide space-y-8 text-left text-[clamp(1rem,1.6vw,2rem)]">
          <div>
            <p className="text-black font-normal">
              To create{" "}
              <span className="font-semibold">
                safe spaces filled with clean air
              </span>{" "}
              around individuals - especially children - through cutting-edge
              personal air purification technology.
            </p>
          </div>
          <div>
            <p className="text-black font-normal">
              A{" "}
              <span className="font-semibold">
                world where every child breathes clean air
              </span>
              , everywhere.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default MissionVision;
