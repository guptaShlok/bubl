import React from "react";

import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import TheTechThatPower from "@/components/Science/TheTechThatPowers";
import WorkingOfBabyBubl from "@/components/Science/WorkingOfBabyBubl";
import TriedTested from "@/components/Science/TriedTested";
import BuiltForIndia from "@/components/Science/BuiltForIndia";
import BringHomeBubl from "@/components/Science/BringHomeBubl";
import HeroSection from "@/components/Science/HeroSection";

const Page = () => {
  return (
    <>
      <section className="science-hero-gradient-background w-full">
        <Navbar />
        <HeroSection />
      </section>
      <TheTechThatPower />
      <WorkingOfBabyBubl />
      <TriedTested />
      <BuiltForIndia />
      <BringHomeBubl />
      <Footer />
    </>
  );
};

export default Page;
