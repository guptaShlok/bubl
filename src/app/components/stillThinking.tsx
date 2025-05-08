import Link from "next/link";
import React from "react";

const Thinking = () => {
  return (
    <>
      <main className="max-h-screen pt-[5vw] mb-[30vh] px-[7vw] w-full relative">
        <div className="mb-8 md:mb-12 h-fit flex justify-around relative">
          <h1 className="w-full text-4xl md:text-[clamp(4rem,8vw,8rem)] text-center md:text-start font-semibold leading-tighter tracking-normal">
            {/* note to add the abouve text class as an utlity one and update the hero section as well */}
            <span className="text-black">Still </span>
            <span className="gradient-text-1">Thinking?</span>
            <br />
            <span className="text-black">Take </span>
            <span className="gradient-text-1">Action</span>
          </h1>

          <div className="absolute right-0 bottom-0 flex items-center justify-between w-[40vw] t-[20vh] translate-y-[12vw] text-black">
            <Link href="/about" className="cta-button w-80 h-24 ">
              Shop BabyBubl
            </Link>
            <Link href="/about" className="cta-button w-80 h-24 ">
              Learn More
            </Link>
          </div>
        </div>
      </main>
    </>
  );
};

export default Thinking;
