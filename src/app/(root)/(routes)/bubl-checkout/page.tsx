import React from "react";

// import HeroSection from "@/app/components/AboutUs/HeroSection";

import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import CheckoutPage from "@/components/Cart/bubl-checkout";

const Page = () => {
  return (
    <>
      <Navbar />
      <CheckoutPage />
      <Footer />
    </>
  );
};

export default Page;
