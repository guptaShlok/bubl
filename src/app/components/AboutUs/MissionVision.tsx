"use client";
import Image from "next/image";

const MissionVision = () => {
  return (
    <main className="max-h-screen px-[6vw] -mt-[3vw] w-full relative bg-[#f0fbf8]">
      {/* Heading section */}
      <div className=" h-fit flex relative">
        <h1 className="text-4xl md:text-[clamp(3rem,7vw,8rem)] text-center md:text-start font-semibold leading-[1.3]">
          <br />
          <div className="flex items-center justify-center md:justify-start relative">
            <div className="text-center md:text-start">
              <span className="gradient-text-1"> Mission & Vision</span>
            </div>

            {/* Arrow positioned next to "Take Action" */}
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

      {/* Content section */}
      <div className="flex flex-col md:flex-row gap-8 md:gap-12 pt-12">
        {/* Image */}
        <div className="w-full md:w-2/3 rounded-2xl overflow-hidden">
          <Image
            src="/backgroundImages/AboutUs/missionAndVision.png"
            alt="Baby in stroller with air purification"
            width={900}
            height={500}
            className="w-full h-[350px] object-cover rounded-2xl"
          />
        </div>

        {/* Text content */}
        <div className="w-full md:w-1/3 flex flex-col justify-around tracking-wide space-y-8 text-left text-lg md:text-2xl">
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
