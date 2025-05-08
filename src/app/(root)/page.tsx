import React from "react";

import Navbar from "@/app/components/navbar";
import HeroSection from "@/app/components/heroSection";
import MissionPhilosphy from "../components/missionPhilosphy";
import IndianDescription from "../components/indianDescription";
import ShopBubl from "../components/shopBubl";
import Benefit from "../components/benefitPage";
import ScienceBehindProduct from "../components/scienceBehindProduct";
import BubblApp from "../components/bublApp";
import TestimonialSection from "../components/testimonials";
import Thinking from "../components/stillThinking";
import Footer from "../components/footer";

const Page = () => {
  return (
    <>
      <section className=" hero-gradient-background w-full">
        <div className="bg-image-overlay"></div>
        <Navbar />
        <HeroSection />
      </section>
      <MissionPhilosphy />
      <IndianDescription />
      <ShopBubl />
      <Benefit />
      <ScienceBehindProduct />
      <BubblApp />
      <TestimonialSection />
      <Thinking />
      <Footer />
    </>
  );
};

export default Page;
