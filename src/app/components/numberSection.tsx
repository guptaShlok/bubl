import React from "react";

const NumberSection = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5  text-center p-8 md:px-16 md:pt-[5vw] rounded-2xl">
      {/* First number block */}
      <div className="flex flex-col items-center">
        <h2 className="text-5xl md:text-8xl font-bold text-black">14</h2>
        <p className="mt-4 text-base md:text-2xl text-black max-w-xs">
          of the world’s 20 most polluted cities are in India
        </p>
      </div>

      {/* Second number block */}
      <div className="flex flex-col items-center">
        <h2 className="text-5xl md:text-8xl font-bold text-black">500+</h2>
        <p className="mt-4 text-base md:text-2xl text-black max-w-xs">
          AQI levels recorded in Delhi, Mumbai & Kolkata during winters -
          classified as Very Unhealthy to Hazardous
        </p>
      </div>

      {/* Third number block */}
      <div className="flex flex-col items-center">
        <h2 className="text-5xl md:text-8xl font-bold text-black">158.8</h2>
        <p className="mt-4 text-base md:text-2xl text-black max-w-xs">
          million children under age 6 are at high risk from air pollution
        </p>
      </div>
    </div>
  );
};

export default NumberSection;
