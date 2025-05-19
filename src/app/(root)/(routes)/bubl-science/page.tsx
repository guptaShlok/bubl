import React from "react";

import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import TheTechThatPower from "@/components/Science/TheTechThatPowers";
import WorkingOfBabyBubl from "@/components/Science/WorkingOfBabyBubl";
import TriedTested from "@/components/Science/TriedTested";
import BuiltForIndia from "@/components/Science/BuiltForIndia";
import BringHomeBubl from "@/components/Science/BringHomeBubl";
import HeroSection from "@/components/Science/HeroSection";
import PageTransition from "@/components/page-transition";
import SectionTransition from "@/components/section-transition";

const Page = () => {
  return (
    <>
      <PageTransition>
        <section className="science-hero-gradient-background w-full">
          <Navbar />
          <HeroSection />
        </section>
        <SectionTransition animation="fade">
          <TheTechThatPower />
        </SectionTransition>
        <SectionTransition animation="fade">
          <WorkingOfBabyBubl />
        </SectionTransition>
        <SectionTransition animation="fade">
          <TriedTested />
        </SectionTransition>
        <SectionTransition animation="fade">
          <BuiltForIndia />
        </SectionTransition>
        <SectionTransition animation="fade">
          <BringHomeBubl />
        </SectionTransition>
        <SectionTransition animation="fade">
          <Footer />
        </SectionTransition>
      </PageTransition>
    </>
  );
};

export default Page;
