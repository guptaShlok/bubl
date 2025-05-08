"use client";

import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";

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
    title: "Energy Efficient",
    description: "Low power consumption for continuous operation.",
  },
];

export default function FeatureSwiper() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="relative">
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={20}
        slidesPerView={1}
        initialSlide={0}
        centeredSlides={true}
        breakpoints={{
          640: {
            slidesPerView: 2,
            centeredSlides: true,
          },
          1024: {
            slidesPerView: 3,
            centeredSlides: true,
          },
        }}
        pagination={{
          clickable: true,
          el: ".feature-pagination",
          bulletClass:
            "inline-block w-8 h-1 bg-gray-700 rounded-full mx-1 cursor-pointer transition-all",
          bulletActiveClass: "!bg-[#5dcfb6]",
        }}
        navigation={{
          prevEl: ".feature-prev",
          nextEl: ".feature-next",
        }}
        className="w-full"
      >
        {features.map((feature) => (
          <SwiperSlide key={feature.id}>
            <div className="bg-[#5dcfb6] rounded-lg p-8 h-64 flex flex-row items-center text-white">
              <h3 className="text-7xl font-bold mr-6">{feature.id}</h3>
              <div className="flex-1">
                <h4 className="text-xl font-medium mb-2">{feature.title}</h4>
                <p className="text-white/80">{feature.description}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="flex items-center justify-between mt-8">
        <div className="flex space-x-4">
          <button className="feature-prev p-2  text-black rounded-full hover:bg-[#5dcfb6] hover:border-[#5dcfb6] hover:text-white transition-colors">
            <ArrowLeftIcon className="h-7 w-7 " />
          </button>
          <button className="feature-next p-2  text-black rounded-full hover:bg-[#5dcfb6] hover:border-[#5dcfb6] hover:text-white transition-colors">
            <ArrowRightIcon className="h-7 w-7" />
          </button>
        </div>
        <div className="feature-pagination flex items-center justify-center flex-wrap min-h-[20px] w-full sm:w-auto"></div>
      </div>
    </div>
  );
}
