import Footer from "@/components/footer";
import Benefit from "@/components/LandingPage/benefitPage";
import BublApp from "@/components/LandingPage/bublApp";
import HeroSection from "@/components/LandingPage/heroSection";
import IndianDescription from "@/components/LandingPage/indianDescription";
import MissionPhilosophy from "@/components/LandingPage/missionPhilosphy";
import ScienceBehindProduct from "@/components/LandingPage/scienceBehindProduct";
import ShopBubl from "@/components/LandingPage/shopBubl";
import Thinking from "@/components/LandingPage/stillThinking";
import TestimonialSection from "@/components/LandingPage/testimonials";
import Navbar from "@/components/navbar";

import React from "react";

const Page = () => {
  return (
    <>
      <section className=" hero-gradient-background w-full">
        <div className="bg-image-overlay"></div>
        <Navbar />
        <HeroSection />
      </section>
      <MissionPhilosophy />
      <IndianDescription />
      <ShopBubl />
      <Benefit />
      <ScienceBehindProduct />
      <BublApp />
      <TestimonialSection />
      <Thinking />
      <Footer />
    </>
  );
};

export default Page;
