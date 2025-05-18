// components/MediaCarousel.tsx
"use client";

import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Thumbs } from "swiper/modules"; // ← import from swiper/modules :contentReference[oaicite:1]{index=1}
import type { Swiper as SwiperClass } from "swiper";
import "swiper/css";
import "swiper/css/thumbs";
import Image from "next/image";

export type MediaItem =
  | {
      type: "image";
      src: string;
      alt?: string;
      thumbnailSrc?: string;
    }
  | {
      type: "video";
      src: string;
      thumbnailSrc?: string;
    };

export default function MediaCarousel({ items }: { items: MediaItem[] }) {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperClass | null>(null);
  return (
    <div className="w-full">
      {/* Main carousel */}
      <Swiper
        modules={[Thumbs]}
        spaceBetween={10}
        thumbs={{ swiper: thumbsSwiper }}
        className="w-full h-[60vh] md:h-[80vh]"
      >
        {items.map((item, idx) => (
          <SwiperSlide key={idx}>
            {item.type === "image" ? (
              <div className="w-full h-full relative">
                <Image
                  src={item.src}
                  alt={item.alt || ""}
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            ) : (
              <div className="w-full h-full">
                <video
                  src={item.src}
                  className="w-full h-full object-cover"
                  autoPlay
                  loop
                  muted
                  controls
                />
              </div>
            )}
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Thumbnails */}
      <Swiper
        modules={[Thumbs]}
        onSwiper={setThumbsSwiper}
        spaceBetween={10}
        slidesPerView={Math.min(items.length, 4)}
        watchSlidesProgress
        className="mt-4 w-full h-24"
        breakpoints={{
          640: { slidesPerView: Math.min(items.length, 3) },
          1024: { slidesPerView: Math.min(items.length, 4) },
        }}
      >
        {items.map((item, idx) => (
          <SwiperSlide key={idx}>
            <div className="w-full h-full border-2 border-transparent hover:border-indigo-500 cursor-pointer overflow-hidden">
              {item.type === "image" ? (
                <Image
                  src={item.thumbnailSrc || item.src}
                  alt={item.alt || ""}
                  fill
                  className="object-contain"
                />
              ) : (
                <video
                  src={item.src}
                  className="w-full h-full object-cover"
                  muted
                  loop
                />
              )}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
