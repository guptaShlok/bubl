"use client";

import Image from "next/image";
import ImageOverlay from "../ImageOverlay";
import Link from "next/link";

const Leadership = () => {
  return (
    <main className="h-auto px-[6vw] pt-[12vh] w-full relative">
      {/* Heading section */}
      <div className="mb-8 md:mb-12 relative">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between">
          <div className="relative">
            <h1 className="text-4xl md:text-[clamp(3rem,7vw,8rem)] text-center md:text-start font-semibold leading-[1.3] tracking-normal mb-6 md:mb-0">
              <div className="flex items-center justify-center md:justify-start relative">
                <div className="text-center md:text-start">
                  <span className="gradient-text-1"> Leadership</span>
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

      {/* Team section */}
      <section className="w-full py-2 md:py-16 px-6 md:px-0relative overflow-hidden leading-[1.3]">
        <div className="w-full mx-auto space-y-4">
          {/* Conny Karlsson */}
          <div className="flex flex-col md:flex-row md:justify-start">
            {/* Image */}
            <div className="w-full md:max-w-[500px] mb-2 md:mb-0 relative">
              <div className="relative p-1 rounded-3xl max-w-[500px]">
                <div className="rounded-2xl relative z-10 overflow-hidden ">
                  <Link
                    href="https://www.linkedin.com/in/conny-karlsson-6aab83110/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group"
                  >
                    <div className="relative">
                      <Image
                        src="/backgroundImages/aboutUs/team/Conny.png"
                        alt="Conny Karlsson"
                        width={450}
                        height={450}
                        className="w-full h-auto object-cover aspect-square transition-opacity group-hover:opacity-90"
                      />
                    </div>
                  </Link>
                </div>
              </div>
            </div>
            <ImageOverlay
              imageSrc="/backgroundImages/indianDesc/IndianDescOverlay.png"
              horizontalPosition="left"
              verticalPosition="top"
              exceedViewport={true}
              scale={1}
              opacity={1}
              className=" -translate-y-1/6"
              mobile={{
                horizontalPosition: "left", // Centered on mobile
                verticalPosition: "top", // At the top on mobile
                width: "100%", // Full width on mobile
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

            {/* Content */}
            <div className="w-full pl-[3vw] text-center md:text-left text-black">
              <h2 className="text-5xl md:text-6xl lg:text-9xl font-semibold mb-4 leading-[1.3]">
                <p className=" w-full md:w-1/2">Conny Karlsson</p>
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
          <ImageOverlay
            imageSrc="/backgroundImages/philosphy/PhilosphyOverlay.png"
            horizontalPosition="right"
            width="50%"
            height="110vh" // Exceeds viewport height
            exceedViewport={true}
            scale={1}
            opacity={1}
            className=" -translate-y-1/6"
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
          {/* Rajeev Singh Rathore */}
          <div className="flex flex-col mt-12 md:flex-row-reverse items-center">
            {/* Image */}
            <div className="w-full md:max-w-[500px] mb-2 md:mb-0 relative">
              <div className="relative p-1 rounded-3xl max-w-[500px]">
                <div className="rounded-2xl overflow-hidden ">
                  <Link
                    href="https://www.linkedin.com/in/rajeevsinghrathore/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group"
                  >
                    <div className="relative">
                      <Image
                        src="/backgroundImages/aboutUs/team/Rajeev.png"
                        alt="Rajeev Singh Rathore"
                        width={450}
                        height={450}
                        className="w-full h-auto object-cover aspect-square transition-opacity group-hover:opacity-90"
                      />
                    </div>
                  </Link>
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
                Spearheading the company&#39;s vision to revolutionize
                respiratory wellness for children and elderly populations in
                India and South Asia. A seasoned business leader with over two
                decades of global experience across the Telecom and IT sectors,
                he brings a unique blend of strategic foresight, innovation
                focus, and operational excellence to drive sustainable growth
                and societal impact.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Leadership;
