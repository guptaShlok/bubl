import React from "react";

import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import HeroSection from "@/components/accessories/HeroSection";
import HepaFiltersPage from "@/components/accessories/HepaFilters";
import BUblController from "@/components/accessories/BublController";
import OtherProducts from "@/components/accessories/OtherProducts";
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
        <SectionTransition animation="slide-left">
          <HepaFiltersPage />
        </SectionTransition>
        <SectionTransition animation="slide-left">
          <BUblController />
        </SectionTransition>
        <SectionTransition animation="slide-left">
          <OtherProducts />
        </SectionTransition>
        <SectionTransition animation="slide-left">
          <Footer />
        </SectionTransition>
      </PageTransition>
    </>
  );
};

export default Page;
