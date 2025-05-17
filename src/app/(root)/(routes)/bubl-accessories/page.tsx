import React from "react";

import Navbar from "@/app/components/navbar";
// import HeroSection from "@/app/components/AboutUs/HeroSection";

import Footer from "@/app/components/footer";
import HeroSection from "@/app/components/accessories/HeroSection";
import HepaFiltersPage from "@/app/components/accessories/HepaFilters";
import BUblController from "@/app/components/accessories/BublController";
import OtherProducts from "@/app/components/ProductPage/OtherProducts";

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
