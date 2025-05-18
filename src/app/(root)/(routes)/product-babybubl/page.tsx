import React from "react";

import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import HeroSection from "@/components/ProductPage/HeroSection";
import MeetBabyBubl from "@/components/ProductPage/MeetBabyBubl";
import KeyFeatures from "@/components/ProductPage/KeyFeatures";
import HowItWorks from "@/components/ProductPage/HowItWorks";
import WhatIncluded from "@/components/ProductPage/WhatIncluded";
import BublApp from "@/components/ProductPage/BublApp";
import OtherProducts from "@/components/ProductPage/OtherProducts";
import ProductTestimonials from "@/components/ProductPage/ProdcutTestimonials";

const Page = () => {
  return (
    <>
      <section className="product-hero-gradient-background w-full">
        {/* <div className="product-bg-image-overlay"></div> */}
        <Navbar />
        <HeroSection />
      </section>
      <MeetBabyBubl />
      <KeyFeatures />
      <HowItWorks />
      <WhatIncluded />
      <BublApp />
      <ProductTestimonials />
      <OtherProducts />
      <Footer />
    </>
  );
};

export default Page;
