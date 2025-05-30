import React from "react";
import Hero from "../components/Hero";
import Features from "../components/Features";
import AgentModel from "../components/AgentModel";
import SecuritySection from "../components/SecuritySection";
import BudgetTracking from "../components/BudgetTracking";
import FinancialLiteracy from "../components/FinancialLiteracy";
import Stats from "../components/Stats";
import { useGSAP } from "../hooks/useGSAP";
import LandingFooter from "../components/Footer1";
import Header from "../components/Header";

const LandingPage = () => {
  // Initialize GSAP and ScrollTrigger
  useGSAP();

  return (
    <div className="min-h-screen w-[98.9vw] bg-white text-gray-900">
        <Hero />
        <Stats />
        <Features />
        <AgentModel />
        <SecuritySection />
        <BudgetTracking />
        <FinancialLiteracy />
      <LandingFooter />
    </div>
  );
};

export default LandingPage;
