"use client";

import type React from "react";

import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import CountUp from "react-countup";

// Define types for our number items
interface NumberItem {
  id: string;
  endValue: number;
  hasPlus: boolean;
  decimals: number;
  description: string;
}

const numberItems: NumberItem[] = [
  {
    id: "polluted-cities",
    endValue: 14,
    hasPlus: false,
    decimals: 0,
    description: "of the world's 20 most polluted cities are in India",
  },
  {
    id: "aqi-levels",
    endValue: 500,
    hasPlus: true,
    decimals: 0,
    description:
      "AQI levels recorded in Delhi, Mumbai & Kolkata during winters - classified as Very Unhealthy to Hazardous",
  },
  {
    id: "children-at-risk",
    endValue: 158.8,
    hasPlus: false,
    decimals: 1,
    description:
      "million children under age 6 are at high risk from air pollution",
  },
];

const NumberSection: React.FC = () => {
  // Use react-intersection-observer with TypeScript
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true, // Only trigger once
  });

  // State to track if animation has started
  const [hasStarted, setHasStarted] = useState<boolean>(false);

  // Start animation when section comes into view
  useEffect(() => {
    if (inView && !hasStarted) {
      setHasStarted(true);
    }
  }, [inView, hasStarted]);

  return (
    <div
      ref={ref}
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 text-center p-8 md:px-16 md:pt-[4vw] rounded-2xl"
    >
      {numberItems.map((item) => (
        <div key={item.id} className="flex flex-col items-center">
          <h2 className="text-5xl md:text-8xl font-semibold text-black">
            {hasStarted ? (
              <CountUp
                start={0}
                end={item.endValue}
                duration={1}
                decimals={item.decimals}
                separator=","
                suffix={item.hasPlus ? "+" : ""}
                useEasing={true}
                enableScrollSpy={false}
              />
            ) : (
              // Fallback before animation starts
              "0"
            )}
          </h2>
          <p className="mt-4 text-base md:text-2xl font-normal text-black max-w-xs">
            {item.description}
          </p>
        </div>
      ))}
    </div>
  );
};

export default NumberSection;
