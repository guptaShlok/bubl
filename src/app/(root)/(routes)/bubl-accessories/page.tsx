import React from "react";

import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import HeroSection from "@/components/accessories/HeroSection";
import HepaFiltersPage from "@/components/accessories/HepaFilters";
import BUblController from "@/components/accessories/BublController";
import OtherProducts from "@/components/accessories/OtherProducts";

const Page = () => {
  return (
    <>
      <section className="product-hero-gradient-background w-full">
        {/* <div className="product-bg-image-overlay"></div> */}
        <Navbar />
        <HeroSection />
      </section>
      <HepaFiltersPage />
      <BUblController />
      <OtherProducts />
      <Footer />
    </>
  );
};

export default Page;
