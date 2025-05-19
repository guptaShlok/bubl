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
import PageTransition from "@/components/page-transition";
import SectionTransition from "@/components/section-transition";

const Page = () => {
  return (
    <>
      <PageTransition>
        <section className="product-hero-gradient-background w-full">
          {/* <div className="product-bg-image-overlay"></div> */}
          <Navbar />
          <HeroSection />
        </section>
        <SectionTransition animation="slide-up">
          <MeetBabyBubl />
        </SectionTransition>
        <SectionTransition animation="slide-up">
          <KeyFeatures />
        </SectionTransition>
        <SectionTransition animation="slide-up">
          <HowItWorks />
        </SectionTransition>
        <SectionTransition animation="slide-up">
          <WhatIncluded />
        </SectionTransition>
        <SectionTransition animation="slide-up">
          <BublApp />
        </SectionTransition>
        <SectionTransition animation="slide-up">
          <ProductTestimonials />
        </SectionTransition>
        <SectionTransition animation="slide-up">
          <OtherProducts />
        </SectionTransition>
        <SectionTransition animation="slide-up">
          <Footer />
        </SectionTransition>
      </PageTransition>
    </>
  );
};

export default Page;
