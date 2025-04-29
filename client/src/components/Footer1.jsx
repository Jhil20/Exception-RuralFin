import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Lock, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const Footer1 = () => {
  const footerRef = useRef(null);

  useEffect(() => {
    if (!footerRef.current) return;

    gsap.from(footerRef.current, {
      opacity: 0,
      y: 30,
      duration: 0.8,
      scrollTrigger: {
        trigger: footerRef.current,
        start: 'top 90%',
      }
    });
  }, []);

  const footerLinks = [
    {
      title: 'Company',
      links: ['About Us', 'Our Mission', 'Careers', 'Press']
    },
    {
      title: 'Features',
      links: ['Mobile Transfers', 'Budget Tracking', 'Agent Network', 'Financial Literacy']
    },
    {
      title: 'Resources',
      links: ['Help Center', 'Security', 'Blog', 'Testimonials']
    },
    {
      title: 'Legal',
      links: ['Privacy Policy', 'Terms of Service', 'Compliance', 'Licenses']
    }
  ];

  return (
    <footer ref={footerRef} className="bg-gray-900 text-white py-16 px-6 md:px-12">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          <div className="lg:col-span-2">
            <div className="flex items-center mb-6">
              <Lock size={28} className="text-white mr-2" />
              <span className="text-xl font-bold">FinSecure</span>
            </div>
            <p className="text-gray-400 mb-6 max-w-md">
              Empowering underbanked communities with secure, accessible financial
              tools that bridge the gap between cash and digital economies.
            </p>
            <div className="space-y-3">
              <div className="flex items-center">
                <Mail size={18} className="text-gray-400 mr-3" />
                <p className="text-gray-400">contact@finsecure.com</p>
              </div>
              <div className="flex items-center">
                <Phone size={18} className="text-gray-400 mr-3" />
                <p className="text-gray-400">+91 1234 567 890</p>
              </div>
              <div className="flex items-center">
                <MapPin size={18} className="text-gray-400 mr-3" />
                <p className="text-gray-400">123 Financial District, Mumbai, India</p>
              </div>
            </div>
          </div>

          {footerLinks.map((column, index) => (
            <div key={index}>
              <h3 className="font-bold mb-6">{column.title}</h3>
              <ul className="space-y-3">
                {column.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a href="#" className="text-gray-400 hover:text-white transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <hr className="border-gray-800 my-10" />

        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 mb-6 md:mb-0">
            &copy; {new Date().getFullYear()} FinSecure. All rights reserved.
          </p>
          <div className="flex space-x-4">
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              <Facebook size={20} />
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              <Twitter size={20} />
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              <Instagram size={20} />
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              <Linkedin size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer1;
