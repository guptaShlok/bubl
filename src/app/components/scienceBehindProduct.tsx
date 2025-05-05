"use client";
import React, { useState } from "react";

interface Slide {
  title: string;
  content: string;
}

const slides: Slide[] = [
  {
    title: "Patented Air Purification Technology",
    content:
      "Babybubl utilizes a unique design to create a microenvironment around your child, achieving air quality up to 95% cleaner than the surrounding environment without the need for full encapsulation.",
  },
  {
    title: "Smart Airflow Design",
    content:
      "Our smart airflow channels direct clean air exactly where your baby needs it most, ensuring optimal circulation in every setting.",
  },
  {
    title: "HEPA Filtration",
    content:
      "High‑efficiency particulate air filters trap 99.97% of particles ≥0.3 microns, keeping dust, pollen, and pollutants away.",
  },
  {
    title: "Real‑Time Monitoring",
    content:
      "Integrated sensors track air quality in real time, adjusting filtration speed automatically for consistent protection.",
  },
  {
    title: "Portable & Lightweight",
    content:
      "Designed for on‑the‑go families: lightweight, stroller‑compatible, and battery‑powered for wherever life takes you.",
  },
];

export default function StepCarousel() {
  const [current, setCurrent] = useState(0);
  const lastIndex = slides.length - 1;
  const progressPct = `${(current / lastIndex) * 100}%`;

  const prev = () => setCurrent((i) => Math.max(i - 1, 0));
  const next = () => setCurrent((i) => Math.min(i + 1, lastIndex));

  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      {/* DESKTOP */}
      <div className="hidden md:flex items-center gap-x-12">
        {/* arrows */}
        <div className="flex flex-col space-y-6">
          <button
            onClick={prev}
            disabled={current === 0}
            className={`text-3xl ${
              current === 0 ? "text-gray-400" : "text-gray-600"
            }`}
          >
            ←
          </button>
          <button
            onClick={next}
            disabled={current === lastIndex}
            className={`text-3xl ${
              current === lastIndex ? "text-gray-400" : "text-black"
            }`}
          >
            →
          </button>
        </div>
        {/* sliding text pane */}
        <div className="w-2/3 overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${current * 100}%)` }}
          >
            {slides.map((slide, idx) => (
              <div key={idx} className="w-full flex-shrink-0 px-4">
                <h2 className="text-2xl md:text-3xl font-semibold">
                  {slide.title}
                </h2>
                <p className="mt-4 text-base md:text-lg text-gray-800">
                  {slide.content}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* MOBILE: vertical scroll, no buttons */}
      <div className="md:hidden flex flex-col gap-8 overflow-y-auto max-h-[60vh] snap-y snap-mandatory">
        {slides.map((slide, idx) => (
          <div key={idx} className="snap-start px-2">
            <h2 className="text-2xl font-semibold mb-2">{slide.title}</h2>
            <p className="text-base text-gray-800">{slide.content}</p>
          </div>
        ))}
      </div>

      {/* TIMELINE (desktop only) */}
      <div className="hidden md:block mt-8 w-2/3 mx-auto relative h-px bg-gray-300 rounded">
        {/* filled portion */}
        <div
          className="absolute inset-y-0 left-0 bg-green-400 h-px rounded"
          style={{ width: progressPct }}
        />
        {/* markers */}
        <div className="absolute inset-0 flex justify-between items-center">
          {slides.map((_, idx) => {
            const isActive = idx === current;
            return isActive ? (
              <div
                key={idx}
                className="w-4 h-4 rounded-full border-2 border-green-400 bg-white"
              />
            ) : (
              <div key={idx} className="w-3 h-3 rounded-full bg-gray-400" />
            );
          })}
        </div>
      </div>
    </div>
  );
}
