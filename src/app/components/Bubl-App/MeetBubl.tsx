"use client";

import Image from "next/image";

const MeetBubl = () => {
  return (
    <main className="h-auto px-[6vw] pt-[8vh] w-full relative text-black">
      {/* Heading section */}
      <div className="mb-2 md:mb-12 relative">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between">
          <div className="relative">
            <h1 className="text-4xl md:text-[clamp(3rem,7vw,8rem)] text-center md:text-start font-semibold leading-[1.3] tracking-normal mb-6 md:mb-0">
              <div className="flex items-center justify-center md:justify-start relative">
                <div className="text-center md:text-start">
                  <span className="text-black"> What&#39;s</span>
                  <span className="gradient-text-1"> Included</span>
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

      {/* First section - Image left, Text right */}
      <div className="mx-auto relative md:pt-[4vh] z-10">
        <div className="flex flex-col md:flex-row items-end gap-8 md:gap-15">
          <div className="w-full md:w-1/2 pb-6">
            <p className="text-lg md:text-2xl text-start md:pb-[10vh]">
              The Bubl app serves as the companion application for the babybubl.
              device, aiming to enhance the device&#39;s functionality and
              provide parents with real-time insights into their child&#39;s
              immediate environment. Its primary goal is to ensure that children
              are surrounded by clean air, both indoors and outdoors, by
              monitoring and controlling air quality around them.
            </p>
          </div>
          <div className="w-full md:w-1/2">
            <div className="rounded-2xl overflow-hidden">
              <Image
                src="/backgroundImages/bubl-app/MeetBubl.png"
                alt="Clean mountain landscape"
                width={600}
                height={400}
                className="w-full h-auto object-cover rounded-2xl"
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default MeetBubl;
