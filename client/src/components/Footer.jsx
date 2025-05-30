import React from 'react';
import { Facebook, Instagram, Linkedin, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-100 py-12">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="text-xl font-bold text-black mb-4">
              Rural<span className="text-gray-500">Fin</span>
            </div>
            <p className="text-gray-600 mb-4 text-sm">
              The modern way to manage your finances. Simple, secure, and designed for you.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-gray-700 transition-colors duration-200">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-700 transition-colors duration-200">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-700 transition-colors duration-200">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-700 transition-colors duration-200">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase mb-4">Company</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-600 hover:text-gray-800 text-sm">About Us</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-800 text-sm">Careers</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-800 text-sm">News & Blog</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-800 text-sm">Contact Us</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase mb-4">Support</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-600 hover:text-gray-800 text-sm">Help Center</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-800 text-sm">Security</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-800 text-sm">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-800 text-sm">Terms of Service</a></li>
            </ul>
          </div>

          
        </div>

        <div className="border-t border-gray-200 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-500">
            © 2025 RuralFin. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-sm text-gray-500 hover:text-gray-700">Privacy</a>
            <a href="#" className="text-sm text-gray-500 hover:text-gray-700">Terms</a>
            <a href="#" className="text-sm text-gray-500 hover:text-gray-700">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
