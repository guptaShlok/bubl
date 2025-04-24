import React from "react";
import Navbar from "@/app/components/navbar";
import HeroSection from "@/app/components/heroSection";
import MissionPhilosphy from "../components/missionPhilosphy";

const Page = () => {
  return (
    <>
      <section className=" hero-gradient-background w-full">
        <div className="bg-image-overlay"></div>
        <Navbar />
        <HeroSection />
      </section>
      <MissionPhilosphy />
    </>
  );
};

export default Page;
