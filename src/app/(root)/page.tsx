import React from "react";

import Navbar from "@/app/components/navbar";
import HeroSection from "@/app/components/heroSection";
import MissionPhilosphy from "../components/missionPhilosphy";
import IndianDescription from "../components/indianDescription";
import ShopBubl from "../components/shopBubl";
import Benefit from "../components/benefitPage";
import StepCarousel from "../components/scienceBehindProduct";

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
      <StepCarousel />
    </>
  );
};

export default Page;
