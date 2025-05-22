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
        <SectionTransition animation="fade">
          <OurStory />
        </SectionTransition>
        <SectionTransition animation="fade">
          <MissionVision />
        </SectionTransition>
        <SectionTransition animation="fade">
          <WhatWeStandFor />
        </SectionTransition>
        <SectionTransition animation="fade">
          <Leadership />
        </SectionTransition>
        <SectionTransition animation="fade">
          <GlobalImpact />
        </SectionTransition>
        <SectionTransition animation="fade">
          <OurImpact />
        </SectionTransition>
        <SectionTransition animation="fade">
          <StepInto />
        </SectionTransition>
        <SectionTransition animation="fade">
          <Footer />
        </SectionTransition>
      </PageTransition>
    </>
  );
};

export default Page;
