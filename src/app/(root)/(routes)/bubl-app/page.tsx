import React from "react";

import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import HeroSection from "@/components/Bubl-App/HeroSection";
import MeetBubl from "@/components/Bubl-App/MeetBubl";
import KeyFeatures from "@/components/Bubl-App/KeyFeatures";
import HowItWorks from "@/components/Bubl-App/HowItWorks";
import WhatWeStandFor from "@/components/Bubl-App/WhatWeStandFor";
import OtherProducts from "@/components/Bubl-App/OtherProducts";

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
