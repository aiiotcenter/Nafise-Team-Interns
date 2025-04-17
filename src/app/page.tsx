"use client";
import React, { useState } from "react";
import Hero from "../components/Hero/Hero";
import FeaturesSection from "../components/FeaturesSection/featuresSection";
import SplitTransitionVideo from "../components/SplitTransitionVideo/SplitTransitionVideo";
import Strip from "../components/Strip/Strip";
import AboutProfDux from "../components/AboutProfDux/AboutProfDux";
import Footer from "../components/Footer/Footer";

export default function Home() {
  return (
    <>
      <Hero />
      <div className="h-[110px]"/>
      <FeaturesSection />
      <Strip/>
      <div className="h-[110px]"/>
      <SplitTransitionVideo/>
      <Strip/>
      <div className="h-[110px]"/>
      <AboutProfDux/>
      <div className="h-[110px]"/>
      <Footer/>
    </>
  );
}

