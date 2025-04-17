import Image from "next/image";
import Link from "next/link";
import React from "react";

const MissionPhilosphy = () => {
  return (
    <main className="min-h-screen bg-[#f2faf7] relative">
      {/* Content container */}
      <div className="container mx-auto px-4 relative ">
        {/* Heading section */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-9xl font-semibold leading-tight tracking-wide">
            <span className="text-black">Our </span>
            <span className="gradient-text-1">Philosophy</span>
            <br />
            <span className="text-black">&amp; </span>
            <span className="gradient-text-1">Mission</span>
          </h1>

          <div className="flex justify-end overflow-hidden text-black">
            <Link href="/about" className="cta-button w-80 h-24 ">
              About us
            </Link>
          </div>
        </div>

        {/* Content grid */}
        <div className="flex justify-evenly items-center gap-6">
          {/* First image */}
          <div className="rounded-2xl overflow-hidden">
            <Image
              src="/backgroundImages/philosphy/babyfeet.png"
              alt="Baby feet"
              width={100}
              height={100}
              className="w-[320px] h-[320px] object-cover"
            />
          </div>

          {/* Content block */}
          <div className="flex flex-col justify-center w-[25%] text-3xl font-light text-black">
            <p>Every baby deserves a safe, pure environment.</p>
            <p className=" mb-4">
              <span className=" font-normal">At Bubl,</span> we{" "}
              <span className="font-medium">
                combine science and innovation
              </span>{" "}
              to{" "}
              <span className="font-medium">
                protect infants from air pollution,
              </span>{" "}
              ensuring peace of mind for parents.
            </p>
          </div>

          {/* Second image */}
          <div className="md:col-start-2 rounded-2xl overflow-hidden">
            <Image
              src="/backgroundImages/philosphy/babyhands.png"
              alt="Baby hand holding parent's finger"
              width={500}
              height={400}
              className="w-[730px] h-[320px] object-cover"
            />
          </div>
        </div>
      </div>
    </main>
  );
};

export default MissionPhilosphy;
