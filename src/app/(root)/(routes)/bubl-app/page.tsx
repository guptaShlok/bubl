import React from "react";

import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import HeroSection from "@/components/Bubl-App/HeroSection";
import MeetBubl from "@/components/Bubl-App/MeetBubl";
import KeyFeatures from "@/components/Bubl-App/KeyFeatures";
import HowItWorks from "@/components/Bubl-App/HowItWorks";
import WhatWeStandFor from "@/components/Bubl-App/WhatWeStandFor";
import OtherProducts from "@/components/Bubl-App/OtherProducts";
import PageTransition from "@/components/page-transition";
import SectionTransition from "@/components/section-transition";

const Page = () => {
  return (
    <>
      <PageTransition>
        <section className="product-hero-gradient-background w-full">
          {/* <div className="product-bg-image-overlay"></div> */}
          <Navbar />
          <HeroSection />
        </section>
        <SectionTransition>
          <MeetBubl />
        </SectionTransition>
        <SectionTransition>
          <KeyFeatures />
        </SectionTransition>
        <SectionTransition>
          <HowItWorks />
        </SectionTransition>
        <SectionTransition>
          <WhatWeStandFor />
        </SectionTransition>
        <SectionTransition>
          <OtherProducts />
        </SectionTransition>
        <SectionTransition>
          <Footer />
        </SectionTransition>
      </PageTransition>
    </>
  );
};

export default Page;
