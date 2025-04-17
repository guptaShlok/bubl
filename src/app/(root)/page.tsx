import React from "react";
import Navbar from "@/app/components/navbar";
import HeroSection from "@/app/components/heroSection";
import MissionPhilosphy from "../components/missionPhilosphy";

const Page = () => {
  return (
    <main className=" hero-gradient-background w-full h-screen">
      <div className="image-background bg-image-1 left-[50%] top-[12.5%] my-2 w-[45%] h-[87%] "></div>
      <Navbar />
      <HeroSection />
      <MissionPhilosphy />
    </main>
  );
};

export default Page;
