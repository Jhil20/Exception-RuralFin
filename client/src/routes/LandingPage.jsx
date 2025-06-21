import React, { useState } from "react";
import Hero from "../components/Hero";
import Features from "../components/Features";
import AgentModel from "../components/AgentModel";
import SecuritySection from "../components/SecuritySection";
import BudgetTracking from "../components/BudgetTracking";
import FinancialLiteracy from "../components/FinancialLiteracy";
import Stats from "../components/Stats";
import { useGSAP } from "../hooks/useGSAP";
import LandingFooter from "../components/LandingFooter";
import Header from "../components/Header";
import AboutUs from "./AboutUs";
import { X } from "lucide-react";
import Mission from "./Mission";
import PrivacyPolicy from "./PrivacyPolicy";
import TermsOfService from "./TermsOfService";
import Licenses from "./Licenses";
import Compliance from "./Compliance";

const LandingPage = () => {
  // Initialize GSAP and ScrollTrigger
  useGSAP();
  const [showAboutUs, setShowAboutUs] = useState(false);
  const [showOurMission, setShowOurMission] = useState(false);
  const [showPrivacyPolicy, setShowPrivacyPolicy] = useState(false);
  const [showTermsOfService, setShowTermsOfService] = useState(false);
  const [showLicenses, setShowLicenses] = useState(false);
  const [showCompliance, setShowCompliance] = useState(false);
  return (
    <div className="min-h-screen w-[98.9vw] bg-white text-gray-900">
      {showAboutUs && (
        <div
          onClick={() => setShowAboutUs(false)}
          className="bg-black/40 flex justify-center items-center fixed top-0 z-50 w-full h-full"
        >
          <AboutUs />
        </div>
      )}
      {showOurMission && (
        <div
          onClick={() => setShowOurMission(false)}
          className="bg-black/40 flex justify-center items-center fixed top-0 z-50 w-full h-full"
        >
          <Mission />
        </div>
      )}
      {showPrivacyPolicy && (
        <div
          onClick={() => setShowPrivacyPolicy(false)}
          className="bg-black/40 flex justify-center items-center fixed top-0 z-50 w-full h-full"
        >
          <PrivacyPolicy />
        </div>
      )}
      {showTermsOfService && (
        <div
          onClick={() => setShowTermsOfService(false)}
          className="bg-black/40 flex justify-center items-center fixed top-0 z-50 w-full h-full"
        >
          <TermsOfService />
        </div>
      )}
      {showCompliance && (
        <div
          onClick={() => setShowCompliance(false)}
          className="bg-black/40 flex justify-center items-center fixed top-0 z-50 w-full h-full"
        >
          <Compliance />
        </div>
      )}
      {showLicenses && (
        <div
          onClick={() => setShowLicenses(false)}
          className="bg-black/40 flex justify-center items-center fixed top-0 z-50 w-full h-full"
        >
          <Licenses />
        </div>
      )}
      <Hero />
      <Stats />
      <Features />
      <AgentModel />
      <SecuritySection />
      <BudgetTracking />
      {/* <FinancialLiteracy /> */}
      <LandingFooter
        setShowAboutUs={setShowAboutUs}
        setShowTermsOfService={setShowTermsOfService}
        setShowPrivacyPolicy={setShowPrivacyPolicy}
        setShowOurMission={setShowOurMission}
        setShowLicenses={setShowLicenses}
        setShowCompliance={setShowCompliance}
      />
    </div>
  );
};

export default LandingPage;
