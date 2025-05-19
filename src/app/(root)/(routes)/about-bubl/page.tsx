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
import PageTransition from "@/components/page-transition";
import SectionTransition from "@/components/section-transition";

const Page = () => {
  return (
    <>
      <PageTransition>
        <section className=" about-hero-gradient-background w-full">
          <div className="about-bg-image-overlay"></div>
          <Navbar />
          <HeroSection />
        </section>
        <SectionTransition animation="slide-left">
          <OurStory />
        </SectionTransition>
        <SectionTransition animation="slide-left">
          <MissionVision />
        </SectionTransition>
        <SectionTransition animation="slide-left">
          <WhatWeStandFor />
        </SectionTransition>
        <SectionTransition animation="slide-left">
          <Leadership />
        </SectionTransition>
        <SectionTransition animation="slide-left">
          <GlobalImpact />
        </SectionTransition>
        <SectionTransition animation="slide-left">
          <OurImpact />
        </SectionTransition>
        <SectionTransition animation="slide-left">
          <StepInto />
        </SectionTransition>
        <SectionTransition animation="slide-left">
          <Footer />
        </SectionTransition>
      </PageTransition>
    </>
  );
};

export default Page;
