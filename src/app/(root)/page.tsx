import React from "react";

import Navbar from "@/app/components/navbar";
import Footer from "../components/footer";
import MissionPhilosophy from "../components/LandingPage/missionPhilosphy";
import IndianDescription from "../components/LandingPage/indianDescription";
import ShopBubl from "../components/LandingPage/shopBubl";
import Benefit from "../components/LandingPage/benefitPage";
import ScienceBehindProduct from "../components/LandingPage/scienceBehindProduct";
import BublApp from "../components/LandingPage/bublApp";
import TestimonialSection from "../components/LandingPage/testimonials";
import Thinking from "../components/LandingPage/stillThinking";
import HeroSection from "../components/LandingPage/heroSection";

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
