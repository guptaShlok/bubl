"use client";

import Image from "next/image";

const OurImpact = () => {
  return (
    <main className="h-auto px-[6vw] pt-[8vh] w-full relative text-black">
      {/* Heading section */}
      <div className="mb-2 md:mb-12 relative">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between">
          <div className="relative">
            <h1 className="text-4xl md:text-[clamp(3rem,7vw,8rem)] text-center md:text-start font-semibold leading-[1.3] tracking-normal mb-6 md:mb-0">
              <div className="flex items-center justify-center md:justify-start relative">
                <div className="text-center md:text-start">
                  <span className="text-black"> Our</span>
                  <span className="gradient-text-1"> Impact</span>
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
        <div className="flex flex-col md:flex-row items-end gap-8 md:gap-15 mb-10">
          <div className="w-full md:w-1/2">
            <div className="rounded-2xl overflow-hidden">
              <Image
                src="/backgroundImages/aboutUs/ourImpact/impact1.png"
                alt="Clean mountain landscape"
                width={600}
                height={400}
                className="w-full h-auto object-cover rounded-2xl"
              />
            </div>
          </div>
          <div className="w-full md:w-1/2 pb-6">
            <h3 className="text-3xl md:text-2xl font-semibold mb-4">
              95% Cleaner Air
            </h3>
            <p className="text-lg text-gray-800">
              Our personal air purification technology creates micro
              environments around users, especially infants. The advanced
              filtration system removes up to 95% of harmful particles,
              providing a safe breathing space in even the most polluted
              environments.
            </p>
          </div>
        </div>

        {/* Second section - Text left, Image right */}
        <div className="flex flex-col-reverse md:flex-row items-end gap-8 md:gap-15 mb-10">
          <div className="w-full md:w-1/2">
            <h3 className="text-xl md:text-2xl font-semibold pb-4">
              Multiple Certifications
            </h3>
            <p className="text-lg text-gray-800 pb-4">
              Babybubl is approved for sale in Europe, North America, and India
              — setting a global benchmark in air purification for children. Our
              rigorous testing and certification process ensures that our
              products meet the highest standards for safety and effectiveness.
            </p>
          </div>
          <div className="w-full md:w-1/2">
            <div className="rounded-2xl overflow-hidden">
              <Image
                src="/backgroundImages/aboutUs/ourImpact/impact2.png"
                alt="Office team working together"
                width={600}
                height={400}
                className="w-full h-auto object-cover rounded-2xl"
              />
            </div>
          </div>
        </div>

        {/* Third section - Image left, Text right */}
        <div className="flex flex-col md:flex-row items-end gap-8 md:gap-15">
          <div className="w-full md:w-1/2">
            <div className="rounded-2xl overflow-hidden">
              <Image
                src="/backgroundImages/aboutUs/ourImpact/impact3.png"
                alt="Baby with parent"
                width={600}
                height={400}
                className="w-full h-auto object-cover rounded-2xl"
              />
            </div>
          </div>
          <div className="w-full md:w-1/2">
            <h3 className="text-3xl md:text-2xl font-semibold pb-4">
              Increased Awareness
            </h3>
            <p className="text-lg text-gray-800 pb-4">
              We&apos;re changing the way the world thinks about air pollution,
              not as a city-wide issue, but as a personal, preventable threat to
              young lives. Through education and innovation, we&apos;re
              empowering parents to take control of their children&apos;s air
              quality.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default OurImpact;
