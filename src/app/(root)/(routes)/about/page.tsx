import React from "react";

import Navbar from "@/app/components/navbar";
import HeroSection from "@/app/components/AboutUs/HeroSection";
import OurStory from "@/app/components/AboutUs/OurStory";
import MissionVision from "@/app/components/AboutUs/MissionVision";
import WhatWeStandFor from "@/app/components/AboutUs/WhatWeStandFor";

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
    </>
  );
};

export default Page;
