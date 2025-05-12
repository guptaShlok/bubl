import React from "react";

import Navbar from "@/app/components/navbar";
// import HeroSection from "@/app/components/AboutUs/HeroSection";

import Footer from "@/app/components/footer";
import ProductPage from "@/app/components/ProductPage/HeroSection";

const Page = () => {
  return (
    <>
      <section className="product-hero-gradient-background w-full">
        <div className="product-bg-image-overlay"></div>
        <Navbar />
        <ProductPage />
        {/* <HeroSection /> */}
      </section>

      <Footer />
    </>
  );
};

export default Page;
