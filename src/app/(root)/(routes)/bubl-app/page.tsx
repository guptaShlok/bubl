import React from "react";

import Navbar from "@/app/components/navbar";
// import HeroSection from "@/app/components/AboutUs/HeroSection";

import Footer from "@/app/components/footer";

import HeroSection from "@/app/components/Bubl-App/HeroSection";
import MeetBubl from "@/app/components/Bubl-App/MeetBubl";
import KeyFeatures from "@/app/components/Bubl-App/KeyFeatures";
import HowItWorks from "@/app/components/Bubl-App/HowItWorks";
import WhatWeStandFor from "@/app/components/Bubl-App/WhatWeStandFor";
import OtherProducts from "@/app/components/Bubl-App/OtherProducts";

const Page = () => {
  return (
    <>
      <section className="product-hero-gradient-background w-full">
        {/* <div className="product-bg-image-overlay"></div> */}
        <Navbar />
        <HeroSection />
      </section>
      <MeetBubl />
      <KeyFeatures />
      <HowItWorks />
      <WhatWeStandFor />
      <OtherProducts />
      <Footer />
    </>
  );
};

export default Page;
