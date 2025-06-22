import React, { useState } from "react";
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
import AboutUs from "../routes/AboutUs";
import Mission from "../routes/Mission";
import PrivacyPolicy from "../routes/PrivacyPolicy";
import TermsOfService from "../routes/TermsOfService";
import Compliance from "../routes/Compliance";
import Licenses from "../routes/Licenses";

const Footer = () => {
  const [showAboutUs, setShowAboutUs] = useState(false);
  const [showOurMission, setShowOurMission] = useState(false);
  const [showPrivacyPolicy, setShowPrivacyPolicy] = useState(false);
  const [showTermsOfService, setShowTermsOfService] = useState(false);
  const [showLicenses, setShowLicenses] = useState(false);
  const [showCompliance, setShowCompliance] = useState(false);
  return (
    <footer className="bg-black py-12">
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
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div>
            <div className="text-3xl font-bold text-white mb-4">
              Rural<span className="text-gray-500">Fin</span>
            </div>
            <p className="text-gray-400 mb-4 text-md">
              The modern way to manage your finances. Simple, secure, and
              designed for you.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-gray-400 hover:text-gray-200 transition-colors duration-200"
              >
                <Facebook size={20} />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-gray-200 transition-colors duration-200"
              >
                <Twitter size={20} />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-gray-200 transition-colors duration-200"
              >
                <Instagram size={20} />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-gray-200 transition-colors duration-200"
              >
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold text-gray-100  mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <h1
                  onClick={() => setShowAboutUs(true)}
                  className="w-fit text-gray-400 cursor-pointer transition-all duration-300 hover:text-gray-200 text-sm"
                >
                  About Us
                </h1>
              </li>
              <li>
                <h1
                  onClick={() => setShowOurMission(true)}
                  className="w-fit text-gray-400 cursor-pointer transition-all duration-300 hover:text-gray-200 text-sm"
                >
                  Our Mission
                </h1>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold text-gray-100 mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <h1
                  onClick={()=>setShowPrivacyPolicy(true)}
                  className="w-fit text-gray-400 transition-all duration-300 hover:text-gray-200 cursor-pointer text-sm"
                >
                  Privacy Policy
                </h1>
              </li>
              <li>
                <h1
                  onClick={() => setShowTermsOfService(true)}
                  className="w-fit text-gray-400 transition-all duration-300 hover:text-gray-200 cursor-pointer text-sm"
                >
                  Terms Of Services
                </h1>
              </li>
              <li>
                <h1
                  onClick={() => setShowCompliance(true)}
                  className="w-fit text-gray-400 transition-all duration-300 hover:text-gray-200 cursor-pointer text-sm"
                >
                  Compliance
                </h1>
              </li>
              <li>
                <h1
                  onClick={() => setShowLicenses(true)}
                  className="w-fit text-gray-400 transition-all duration-300 hover:text-gray-200 cursor-pointer text-sm"
                >
                  Licenses
                </h1>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-100/20 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-500">
            © 2025 RuralFin. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a
              href="#"
              className="text-sm text-gray-400 cursor-pointer transition-all duration-300 hover:text-gray-200"
            >
              Privacy
            </a>
            <a
              href="#"
              className="text-sm text-gray-400 cursor-pointer transition-all duration-300 hover:text-gray-200"
            >
              Terms
            </a>
            <a
              href="#"
              className="text-sm text-gray-400 cursor-pointer transition-all duration-300 hover:text-gray-200"
            >
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
