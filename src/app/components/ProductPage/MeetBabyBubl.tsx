"use client";
import Image from "next/image";
import ImageOverlay from "../ImageOverlay";

const MeetBabyBubl = () => {
  return (
    <main className="px-[6vw] md:pt-[12vh] pt-[22vh] w-full relative">
      <ImageOverlay
        imageSrc="/backgroundImages/philosphy/PhilosphyOverlay.png"
        horizontalPosition="right"
        width="50%"
        height="110vh" // Exceeds viewport height
        exceedViewport={true}
        scale={1}
        opacity={1}
        // Mobile-specific props
        mobile={{
          horizontalPosition: "right", // Centered on mobile
          verticalPosition: "bottom", // At the top on mobile
          width: "80%", // Full width on mobile
          height: "120vh", // Half viewport height on mobile
        }}
        // Tablet-specific props
        tablet={{
          horizontalPosition: "center",
          width: "90%",
          height: "80vh",
          scale: 1,
        }}
      />
      {/* Heading section */}
      <div className="mb-0 md:mb-0 relative">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between">
          <div className="relative">
            <h1 className="text-4xl md:text-[clamp(3rem,7vw,8rem)] text-center md:text-start font-semibold leading-[1.3] tracking-normal mb-6 md:mb-0">
              <div className="flex items-center justify-center md:justify-start relative">
                <div className="text-center md:text-start">
                  <span className="text-black"> Meet</span>
                  <span className="gradient-text-1"> BabyBubl</span>
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
      {/* Content section */}
      <div className="flex flex-col md:flex-row gap-4 md:gap-12 pt-0 md:pt-12">
        {/* Image */}
        <div className="w-full relative z-20 md:w-1/2 rounded-2xl overflow-hidden">
          <Image
            src="/backgroundImages/productPage/MeetBabyBubl.png"
            alt="Baby in stroller with air purification"
            width={900}
            height={500}
            className="w-full h-[350px] object-cover rounded-2xl"
          />
        </div>

        {/* Text content */}
        <div className="w-full md:w-1/2 flex flex-col md:justify-evenly md:items-baseline tracking-wide space-y-8 text-left text-[clamp(1rem,1.6vw,2rem)]">
          <div>
            <p className="text-black font-normal">
              Babybubl is the
              <span className="font-medium">
                first-of-its-kind wearable air purification system
              </span>{" "}
              designed specifically for infants. With
              <span className="font-medium">
                {" "}
                cutting-edge filtration, real-time air quality monitoring, and
                whisper-quiet protection,
              </span>
              babybubl ensures your little one breathes clean air wherever life
              takes you.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default MeetBabyBubl;
