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
import PageTransition from "@/components/page-transition";
import SectionTransition from "@/components/section-transition";

import React from "react";

const Page = () => {
  return (
    <>
      <PageTransition>
        <section className=" hero-gradient-background w-full">
          <div className="bg-image-overlay"></div>
          <Navbar />
          <HeroSection />
        </section>
        <SectionTransition animation="slide-up">
          <MissionPhilosophy />
        </SectionTransition>
        <SectionTransition animation="slide-up">
          <IndianDescription />
        </SectionTransition>
        <SectionTransition animation="slide-up">
          <ShopBubl />
        </SectionTransition>
        <SectionTransition animation="slide-up">
          <Benefit />
        </SectionTransition>
        <SectionTransition animation="slide-up">
          <ScienceBehindProduct />
        </SectionTransition>
        <SectionTransition animation="slide-up">
          <BublApp />
        </SectionTransition>
        <SectionTransition animation="slide-up">
          <TestimonialSection />
        </SectionTransition>
        <SectionTransition animation="slide-up">
          <Thinking />
        </SectionTransition>
        <SectionTransition animation="slide-up">
          <Footer />
        </SectionTransition>
        ß
      </PageTransition>
    </>
  );
};

export default Page;
