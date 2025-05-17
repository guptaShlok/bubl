"use client";

import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperClass } from "swiper";
import { Navigation, Pagination } from "swiper/modules";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";

// Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const infoSlides = [
  {
    id: 1,
    title: "Patented Air Purification Technology",
    content:
      "Babybubl utilizes a unique design to create a microenvironment around your child, achieving air quality up to 95% cleaner than the surrounding environment without the need for full encapsulation.",
  },
  {
    id: 2,
    title: "Advanced Sensor Technology",
    content:
      "Real-time monitoring of air quality with intelligent sensors that automatically adjust purification levels based on detected pollutants.",
  },
  {
    id: 3,
    title: "Multi-Stage Filtration System",
    content:
      "Our comprehensive filtration system captures particles of all sizes, from large allergens to microscopic pollutants and harmful gases.",
  },
  {
    id: 4,
    title: "Child-Safe Design",
    content:
      "Engineered with rounded edges, child-lock features, and non-toxic materials to ensure complete safety for your little ones.",
  },
  {
    id: 5,
    title: "Silent Operation",
    content:
      "Engineered with low-noise technology, it runs quietly to maintain a peaceful environment for the baby — ideal for naps during strolls or travel.",
  },
];

export default function InfoSwiperWorking() {
  const [mounted, setMounted] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [swiperInst, setSwiperInst] = useState<SwiperClass | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="relative text-black rounded-xl md:p-8 p-2">
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={20}
        slidesPerView={1}
        loop={true}
        onSwiper={(sw) => setSwiperInst(sw)}
        onSlideChange={(sw) => setActiveIndex(sw.realIndex)}
        className="swiper-container"
      >
        {infoSlides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="md:py-8 px-4 md:px-12 flex flex-col md:flex-row items-center">
              <div className="w-full md:w-1/2 mb-0">
                <h3 className="text-5xl md:text-7xl font-bold scale-0 text-[#5dcfb6]">
                  {slide.id}
                </h3>
              </div>
              <div className="w-full md:w-1/2 md:pl-8">
                <h3 className="text-2xl md:text-3xl font-bold mb-2 md:mb-4">
                  {slide.title}
                </h3>
                <p className="text-gray-700 text-lg">{slide.content}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* arrows + timeline aligned */}
      <div className="mt-12 w-full">
        <div className="relative w-full mx-auto flex flex-col gap-10 md:-translate-y-1/2">
          {/* arrows */}
          <div className="flex space-x-4">
            <button
              onClick={() => swiperInst?.slidePrev()}
              disabled={!swiperInst}
              className="p-2 rounded-full hover:bg-[#5dcfb6] z-40 hover:text-white transition-colors"
            >
              <ArrowLeftIcon className="h-9 w-9 " />
            </button>
            <button
              onClick={() => swiperInst?.slideNext()}
              disabled={!swiperInst}
              className="p-2 rounded-full hover:bg-[#5dcfb6] z-40 hover:text-white transition-colors"
            >
              <ArrowRightIcon className="h-9 w-9  " />
            </button>
          </div>

          {/* timeline */}
          <div className="relative flex-1 mx-8">
            <div className="h-0.5 bg-gray-900 absolute inset-x-0 top-1/2 -translate-y-1/2 z-0" />
            <div className="flex justify-between relative z-10">
              {infoSlides.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => swiperInst?.slideToLoop(idx)}
                  className={`w-4 h-4 rounded-full border-2 transition-all ${
                    idx === activeIndex
                      ? "bg-[#5dcfb6] border-[#5dcfb6]"
                      : "bg-white border-gray-900"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
