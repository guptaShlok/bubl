"use client";

import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";
import type { Swiper as SwiperType } from "swiper";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const features = [
  {
    id: "01",
    title: "360° Clean Air Flow",
    description:
      "Wraparound HEPA filtration to reduce PM2.5, dust, pollen & allergens.",
  },
  {
    id: "02",
    title: "Smart AQI Sensors",
    description: "Monitors and adjusts based on real-time air quality.",
  },
  {
    id: "03",
    title: "Lightweight & Comfortable",
    description: "Ergonomically designed for infant safety and ease.",
  },
  {
    id: "04",
    title: "Silent Night Mode",
    description:
      "Auto-dims and quiets operation during nighttime for uninterrupted sleep.",
  },
  {
    id: "05",
    title: "App-Controlled Convenience",
    description:
      "Full control and monitoring via a dedicated mobile app, anytime, anywhere.",
  },
];

// Empty placeholder slides

export default function FeatureSwiperProduct() {
  const [mounted, setMounted] = useState(false);

  const [swiper, setSwiper] = useState<SwiperType | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Function to handle manual navigation
  const handleNavigation = (direction: "prev" | "next") => {
    if (!swiper) return;

    if (direction === "prev") {
      swiper.slidePrev();
    } else if (direction === "next") {
      swiper.slideNext();
    }
  };

  if (!mounted) return null;

  return (
    <div className="relative">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={50}
        slidesPerView={1}
        loop={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        initialSlide={0}
        centeredSlides={false}
        slidesPerGroup={1}
        breakpoints={{
          640: {
            slidesPerView: 2,
            centeredSlides: false,
          },
          1024: {
            slidesPerView: 3,
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
        navigation={false}
        onSwiper={setSwiper}
        className="w-full"
      >
        {/* Regular feature slides */}
        {features.map((feature) => (
          <SwiperSlide key={feature.id}>
            <div className="feature-card bg-[#5dcfb6] h-[400px] max-w-[500px] rounded-lg p-6 flex flex-col justify-between text-white relative overflow-hidden group cursor-pointer">
              {/* Number */}
              <div className="mb-4">
                <h3 className="text-8xl hidden font-semibold">{feature.id}</h3>
                <h3 className="text-3xl font-semibold w-2/3">
                  {feature.title}
                </h3>
              </div>

              {/* Title */}
              <div className="text-center">
                <h4 className="text-3xl text-start font-normal leading-tight">
                  {feature.description}
                </h4>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="flex items-center justify-between mt-8">
        <div className="flex space-x-4">
          <button
            onClick={() => handleNavigation("prev")}
            className={`p-2 rounded-full transition-colors text-black  hover:bg-[#5dcfb6] hover:text-white`}
          >
            <ArrowLeftIcon className="h-9 w-9" />
          </button>
          <button
            onClick={() => handleNavigation("next")}
            className={`p-2 rounded-full transition-colors text-black  hover:bg-[#5dcfb6] hover:text-white`}
          >
            <ArrowRightIcon className="h-9 w-9" />
          </button>
        </div>
        <div className="feature-pagination flex items-center justify-center flex-wrap min-h-[20px] w-full sm:w-auto"></div>
      </div>
    </div>
  );
}
