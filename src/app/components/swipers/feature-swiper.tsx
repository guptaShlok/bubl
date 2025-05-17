"use client";

import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";
import type { Swiper as SwiperType } from "swiper";

// Custom hook to detect mobile screen
const useMobileDetect = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Initial check
    checkMobile();

    // Add event listener for window resize
    window.addEventListener("resize", checkMobile);

    // Cleanup
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return isMobile;
};

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const features = [
  {
    id: "01",
    title: "Up to 95% Cleaner Air",
    description:
      "Advanced filtration technology removes up to 95% of airborne particles.",
  },
  {
    id: "02",
    title: "Smart Airflow Design",
    description: "Optimized airflow pattern ensures maximum efficiency.",
  },
  {
    id: "03",
    title: "HEPA Filtration",
    description:
      "Medical-grade HEPA filter captures particles as small as 0.3 microns.",
  },
  {
    id: "04",
    title: "Ultra-Quiet Operation",
    description: "Whisper-quiet technology for undisturbed sleep.",
  },
  {
    id: "05",
    title: "App-Controlled Convenience",
    description:
      "Full control and monitoring via a dedicated mobile app, anytime, anywhere.",
  },
];

// Empty placeholder slides
const emptySlides = [{ id: "06" }, { id: "07" }];

export default function FeatureSwiper() {
  const [mounted, setMounted] = useState(false);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  const [swiper, setSwiper] = useState<SwiperType | null>(null);
  const isMobile = useMobileDetect();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Function to handle manual navigation
  const handleNavigation = (direction: "prev" | "next") => {
    if (!swiper) return;

    if (direction === "prev" && !isBeginning) {
      swiper.slidePrev();
    } else if (direction === "next" && !isEnd) {
      swiper.slideNext();
    }
  };

  if (!mounted) return null;

  return (
    <div className="relative">
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={20}
        slidesPerView={1}
        initialSlide={0}
        centeredSlides={false}
        slidesPerGroup={1} // Move one slide at a time
        breakpoints={{
          640: {
            slidesPerView: 2,
            centeredSlides: false,
          },
          1024: {
            slidesPerView: 3.5,
            centeredSlides: false,
          },
        }}
        pagination={{
          clickable: true,
          el: ".feature-pagination",
          bulletClass:
            "inline-block w-8 h-1 bg-gray-700 rounded-full mx-1 cursor-pointer transition-all",
          bulletActiveClass: "!bg-[#8ad3c3]",
        }}
        navigation={false} // Disable default navigation
        onSwiper={setSwiper}
        onSlideChange={(swiper: SwiperType) => {
          setIsBeginning(swiper.isBeginning);
          setIsEnd(swiper.isEnd);
          // setActiveIndex(swiper.activeIndex)
        }}
        onInit={(swiper: SwiperType) => {
          setIsBeginning(swiper.isBeginning);
          setIsEnd(swiper.isEnd);
          // setActiveIndex(swiper.activeIndex)
        }}
        className="w-full"
      >
        {/* Regular feature slides */}
        {features.map((feature) => (
          <SwiperSlide key={feature.id}>
            <div className="feature-card vertical-gradient-background-1 h-[400px] rounded-lg p-6 flex flex-col items-start justify-center text-white relative overflow-hidden group cursor-pointer">
              {/* Number */}
              <div className="mb-10">
                <h3 className="text-8xl font-bold">{feature.id}</h3>
              </div>

              {/* Title */}
              <div className="text-center">
                <h4 className="text-2xl w-2/3 text-left font-medium leading-tight">
                  {feature.title}
                </h4>
              </div>
            </div>
          </SwiperSlide>
        ))}

        {/* Empty slides - only show on non-mobile */}
        {!isMobile &&
          emptySlides.map((emptySlide) => (
            <SwiperSlide key={emptySlide.id}>
              <div className="hidden bg-white scale-0 ">
                {/* Empty slide with just the number */}
                <div className="mb-4">
                  <h3 className="">{emptySlide.id}</h3>
                </div>
              </div>
            </SwiperSlide>
          ))}
      </Swiper>

      <div className="flex items-center justify-between mt-8">
        <div className="flex space-x-4">
          <button
            onClick={() => handleNavigation("prev")}
            className={`p-2 rounded-full transition-colors ${
              isBeginning
                ? "text-gray-400 cursor-not-allowed"
                : "text-black hover:bg-[#5dcfb6] hover:text-white"
            }`}
          >
            <ArrowLeftIcon className="h-7 w-7" />
          </button>
          <button
            onClick={() => handleNavigation("next")}
            className={`p-2 rounded-full transition-colors ${
              isEnd
                ? "text-gray-400 cursor-not-allowed"
                : "text-black hover:bg-[#5dcfb6] hover:text-white"
            }`}
          >
            <ArrowRightIcon className="h-7 w-7" />
          </button>
        </div>
        <div className="feature-pagination flex items-center justify-center flex-wrap min-h-[20px] w-full sm:w-auto"></div>
      </div>
    </div>
  );
}
