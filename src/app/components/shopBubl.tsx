import Image from "next/image";
import Link from "next/link";
import React from "react";

const ShopBubl = () => {
  return (
    <>
      <main className="pt-[8vw] px-[7vw] w-full relative">
        {/* Heading section */}
        <div className="mb-8 md:mb-12 flex flex-col md:flex-row justify-around relative">
          <h1 className="w-full text-4xl md:text-[clamp(4rem,8vw,8rem)] text-center md:text-start font-bold leading-tighter tracking-normal">
            <span className="text-black">Meet </span>
            <br />
            <span className="gradient-text-1">Baby Bubl</span>
          </h1>

          <div className="mt-6 md:mt-0 md:absolute bottom-0 right-0 text-black">
            <Link
              href="/shopbubl"
              className="cta-button w-60 h-20 md:w-80 md:h-24"
            >
              Shop Bubl
            </Link>
          </div>
        </div>

        {/* Content block */}
        <div className="flex flex-col justify-center items-center mx-auto md:flex-row md:justify-start md:items-center gap-8 pt-[2vw]">
          <div className="w-full md:w-2/5 flex flex-col justify-center items-center md:items-start text-center md:text-left text-[clamp(0.8rem,1.5vw,2rem)] font-light text-black">
            <p className="mt-4">
              Babybubl is a{" "}
              <span className="font-semibold">
                tech-forward air purification system
              </span>{" "}
              designed to{" "}
              <span className="font-semibold">
                protect infants from airborne pollutants.
              </span>
              With a sleek, stroller-compatible design, it ensures your baby
              breathes cleaner air effortlessly, anytime, anywhere.
            </p>
          </div>
        </div>

        {/* Full-width Image */}
        <div className="w-full -mt-[10vw]">
          <Image
            src="/backgroundImages/meetBabyBubl.png"
            alt="Baby Bubl"
            width={1300}
            height={2000}
            className="w-full h-auto object-cover rounded-2xl"
          />
        </div>
      </main>
    </>
  );
};

export default ShopBubl;
