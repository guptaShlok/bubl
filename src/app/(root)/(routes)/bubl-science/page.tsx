import React from "react";

import Navbar from "@/app/components/navbar";
import Footer from "@/app/components/footer";
import TheTechThatPower from "@/app/components/Science/TheTechThatPowers";
import WorkingOfBabyBubl from "@/app/components/Science/WorkingOfBabyBubl";
import TriedTested from "@/app/components/Science/TriedTested";
import BuiltForIndia from "@/app/components/Science/BuiltForIndia";
import BringHomeBubl from "@/app/components/Science/BringHomeBubl";
import HeroSection from "@/app/components/Science/HeroSection";

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
