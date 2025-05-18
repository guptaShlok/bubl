import React from "react";

import Navbar from "@/components/navbar";
import HeroSection from "@/components/AboutUs/HeroSection";
import OurStory from "@/components/AboutUs/OurStory";
import MissionVision from "@/components/AboutUs/MissionVision";
import WhatWeStandFor from "@/components/AboutUs/WhatWeStandFor";
import Leadership from "@/components/AboutUs/Leadership";
import GlobalImpact from "@/components/AboutUs/GlobalImpact";
import OurImpact from "@/components/AboutUs/OurImpact";
import StepInto from "@/components/AboutUs/StepInto";
import Footer from "@/components/footer";

const Page = () => {
  return (
    <>
      <section className=" about-hero-gradient-background w-full">
        <div className="about-bg-image-overlay"></div>
        <Navbar />
        <HeroSection />
      </section>
      <OurStory />
      <MissionVision />
      <WhatWeStandFor />
      <Leadership />
      <GlobalImpact />
      <OurImpact />
      <StepInto />
      <Footer />
    </>
  );
};

export default Page;
