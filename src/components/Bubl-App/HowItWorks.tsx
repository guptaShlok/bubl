"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import ImageOverlay from "../ImageOverlay";

const HowItWorks = () => {
  const [showModal, setShowModal] = useState(false);

  const handlePlayVideo = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  // Prevent background scroll when modal is open
  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [showModal]);

  return (
    <main className="max-h-screen pt-[8vh] md:pt-[0vh] px-[6vw] mb-[3vh] md:mb-[30vh] w-full relative">
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

      {/* Background overlay image */}
      <ImageOverlay
        imageSrc="/backgroundImages/philosphy/PhilosphyOverlay.png"
        exceedViewport={true}
        scale={1}
        opacity={1}
        className=" absolute -translate-y-1/4 left-0 pointer-events-none"
        mobile={{
          horizontalPosition: "right",
          verticalPosition: "bottom",
          width: "80%",
          height: "100vh",
        }}
      />

      {/* Description */}
      <div className="flex flex-col items-center pt-[2vh] justify-start md:flex-row md:justify-between md:items-start gap-4 md:gap-6">
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

      {/* Image with play button */}
      <div className="relative w-full h-auto pt-0 md:pt-[5vh]">
        <div className="relative top-0 left-0 select-none z-10 w-full flex justify-center">
          <Image
            src="/backgroundImages/bubl-app/HowItWorks.png"
            alt="How It Works"
            width={1330}
            height={1020}
            className="w-[100vw] object-contain"
          />

          <button
            className="absolute inset-0 flex items-center justify-center"
            onClick={handlePlayVideo}
            aria-label="Play video"
          >
            <div className="bg-white/80 hover:bg-white/90 transition duration-200 rounded-full p-5 shadow-lg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="40"
                height="40"
                fill="black"
                viewBox="0 0 24 24"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </button>
        </div>
      </div>

      {/* Video Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 backdrop-blur-sm">
          <div className="relative w-[90vw] max-w-4xl aspect-video bg-black rounded-lg overflow-hidden shadow-xl">
            {/* Close button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-white hover:text-gray-300 z-50"
              aria-label="Close video"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="28"
                height="28"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  d="M18 6L6 18M6 6l12 12"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </button>

            {/* Replace this iframe with your custom video player if needed */}
            <iframe
              className="w-full h-full"
              src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
              title="How It Works Video"
              frameBorder="0"
              allow="autoplay; encrypted-media"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}
    </main>
  );
};

export default HowItWorks;
