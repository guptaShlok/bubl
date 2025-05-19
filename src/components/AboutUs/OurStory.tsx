import Image from "next/image";
import React from "react";
import ImageOverlay from "../ImageOverlay";

const OurStory = () => {
  return (
    <main className="max-h-screen px-[6vw] pt-[8vh] w-full relative">
      {/* Heading section */}
      <div className="mb-0 md:mb-12 relative">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between">
          <div className="relative">
            <h1 className="text-4xl md:text-[clamp(3rem,7vw,8rem)] text-center md:text-start font-semibold leading-[1.3] tracking-normal mb-6 md:mb-0">
              <div className="flex items-center justify-center md:justify-start relative">
                <div className="text-center md:text-start">
                  <span className=" text-black"> Our</span>
                  <span className="gradient-text-1"> Story</span>
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
            Bubl. was founded in 2018 in Sweden by physician
            <span className="font-semibold"> Dr. Conny Karlsson</span> and his
            brother <span className="font-semibold">Erik</span> to{" "}
            <span className="font-semibold">
              tackle the growing threat of air pollution on children&#39;s
              health
            </span>
            . Conny&#39;s medical expertise led to the invention of Bubl&#39;s
            patented personal air purification technology - creating a
            protective “bubble” of clean air around infants.
          </p>
          <p className="mt-4">
            In 2024,{" "}
            <span className="font-semibold">Bubl. Technologies India</span> was
            established to bring this life-saving innovation to one of the
            world&#39;s most affected regions.
          </p>
        </div>

        {/* Image block */}
        <div className="w-full relative z-10 md:w-1/2 rounded-2xl flex justify-center overflow-hidden pr-0 md:pr-2">
          <Image
            // src="/backgroundImages/aboutUs/OurStory.png"
            src="/backgroundImages/aboutUs/ourStory.png"
            alt="A Healthy Baby"
            width={900}
            height={900}
            className="w-[600px] h-[400px] object-cover rounded-2xl"
          />
        </div>
      </div>
    </main>
  );
};

export default OurStory;
