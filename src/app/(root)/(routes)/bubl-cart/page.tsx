import React from "react";

// import HeroSection from "@/app/components/AboutUs/HeroSection";

import CartPage from "@/components/Cart/Cart";

import Footer from "@/components/footer";
import Navbar from "@/components/navbar";

const Page = () => {
  return (
    <>
      <Navbar />

      <CartPage />
      <Footer />
    </>
  );
};

export default Page;
