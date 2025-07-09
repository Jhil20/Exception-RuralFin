import  { useEffect, useRef } from "react";
import { gsap } from "gsap";
import {
  Lock,
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
} from "lucide-react";


const LandingFooter = ({ setShowAboutUs,setShowCompliance,setShowLicenses,setShowTermsOfService, setShowOurMission,setShowPrivacyPolicy }) => {
  const footerRef = useRef(null);

  useEffect(() => {
    if (!footerRef.current) return;

    gsap.from(footerRef.current, {
      opacity: 0,
      y: 30,
      duration: 0.8,
      scrollTrigger: {
        trigger: footerRef.current,
        start: "top 90%",
      },
    });
  }, []);

  const footerLinks = [
    {
      title: "",
      links: ["", "", ""],
    },
    {
      title: "",
      links: ["Privacy Policy", "Terms of Service", "Compliance", "Licenses"],
    },
  ];


  return (
    <footer ref={footerRef} className="bg-black text-white py-16 px-6 md:px-12">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          <div className="lg:col-span-2">
            <div className="text-3xl font-bold text-white mb-4">
              Rural<span className="text-gray-500">Fin</span>
            </div>
            <p className="text-gray-400 mb-6 max-w-md">
              Empowering underbanked communities with secure, accessible
              financial tools that bridge the gap between cash and digital
              economies.
            </p>
            <div className="space-y-3">
              <div className="flex items-center">
                <Mail size={18} className="text-gray-400 mr-3" />
                <p className="text-gray-400">ruralfin@gmail.com</p>
              </div>
              <div className="flex items-center">
                <Phone size={18} className="text-gray-400 mr-3" />
                <p className="text-gray-400">+91 98765 43210</p>
              </div>
              <div className="flex items-center">
                <MapPin size={18} className="text-gray-400 mr-3" />
                <p className="text-gray-400">
                  123 Financial District, Mumbai, India
                </p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-bold mb-6">Company</h3>
            <ul className="space-y-3">
              <li>
                <h1
                  onClick={() => setShowAboutUs(true)}
                  className="cursor-pointer w-fit text-gray-400 hover:text-white transition-colors"
                >
                  About Us
                </h1>
              </li>
              <li>
                <h1
                  onClick={() => setShowOurMission(true)}
                  className="cursor-pointer w-fit text-gray-400 hover:text-white transition-colors"
                >
                  Our Mission
                </h1>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-6">Features</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="#features"
                  className="cursor-pointer w-fit text-gray-400 hover:text-white transition-colors"
                >
                  Mobile Transfers
                </a>
              </li>
              <li>
                <a
                  href="#how-it-works"
                  className="cursor-pointer w-fit text-gray-400 hover:text-white transition-colors"
                >
                  Agent Network
                </a>
              </li>
              <li>
                <a
                  href="#financial-tools"
                  className="cursor-pointer w-fit text-gray-400 hover:text-white transition-colors"
                >
                  Budget Tracking
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-6">Legal</h3>
            <ul className="space-y-3">
              <li>
                <h1
                  onClick={() => setShowPrivacyPolicy(true)}
                  className="cursor-pointer w-fit text-gray-400 hover:text-white transition-colors"
                >
                  Privacy Policy
                </h1>
              </li>
              <li>
                <h1
                  onClick={() => setShowTermsOfService(true)}
                  className="cursor-pointer w-fit text-gray-400 hover:text-white transition-colors"
                >
                  Terms of Service
                </h1>
              </li>
              <li>
                <h1
                  onClick={() => setShowCompliance(true)}
                  className="cursor-pointer w-fit text-gray-400 hover:text-white transition-colors"
                >
                  Compliance
                </h1>
              </li>
              <li>
                <h1
                  onClick={() => setShowLicenses(true)}
                  className="cursor-pointer w-fit text-gray-400 hover:text-white transition-colors"
                >
                  Licenses
                </h1>
              </li>
            </ul>
          </div>
        </div>

        <hr className="border-gray-800 my-10" />

        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 mb-6 md:mb-0">
            &copy; {new Date().getFullYear()} RuralFin. All rights reserved.
          </p>
          <div className="flex space-x-4">
            <a
              href="https://www.facebook.com/"
              className="text-gray-400 hover:text-white transition-colors"
            >
              <Facebook size={20} />
            </a>
            <a
              href="https://x.com/?lang=en"
              className="text-gray-400 hover:text-white transition-colors"
            >
              <Twitter size={20} />
            </a>
            <a
              href="https://www.instagram.com/"
              className="text-gray-400 hover:text-white transition-colors"
            >
              <Instagram size={20} />
            </a>
            <a
              href="https://www.linkedin.com/in/harsh-patadia-a677a4289/"
              className="text-gray-400 hover:text-white transition-colors"
            >
              <Linkedin size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default LandingFooter;
