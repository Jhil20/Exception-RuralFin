import React, { useState } from 'react';
import { Bell, Menu, Search, User, X } from 'lucide-react';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white border-b border-gray-200 fixed w-full top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <span className="text-2xl font-bold text-black">
              Flux<span className="text-gray-500">Wallet</span>
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <a href="#dashboard" className="text-gray-900 hover:text-gray-600 px-3 py-2 text-sm font-medium transition-colors duration-200">Dashboard</a>
            <a href="#transactions" className="text-gray-500 hover:text-gray-900 px-3 py-2 text-sm font-medium transition-colors duration-200">Transactions</a>
            <a href="#cards" className="text-gray-500 hover:text-gray-900 px-3 py-2 text-sm font-medium transition-colors duration-200">Cards</a>
            <a href="#payments" className="text-gray-500 hover:text-gray-900 px-3 py-2 text-sm font-medium transition-colors duration-200">Payments</a>
            <a href="#settings" className="text-gray-500 hover:text-gray-900 px-3 py-2 text-sm font-medium transition-colors duration-200">Settings</a>
          </nav>

          {/* Right Side Icons */}
          <div className="hidden md:flex items-center space-x-4">
            <button className="text-gray-500 hover:text-gray-700 p-1 rounded-full focus:outline-none focus:ring-2 focus:ring-gray-300 transition-colors duration-200">
              <Search size={20} />
            </button>
            <button className="text-gray-500 hover:text-gray-700 p-1 rounded-full focus:outline-none focus:ring-2 focus:ring-gray-300 transition-colors duration-200">
              <Bell size={20} />
            </button>
            <button className="flex items-center space-x-2 bg-gray-100 hover:bg-gray-200 px-3 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-gray-300 transition-colors duration-200">
              <User size={18} />
              <span className="text-sm font-medium text-gray-800">Account</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              type="button"
              className="text-gray-500 hover:text-gray-700 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-300 transition-colors duration-200"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 shadow-lg">
          <div className="container mx-auto px-4 py-3 space-y-1">
            <a href="#dashboard" className="block text-gray-900 px-3 py-2 text-base font-medium rounded-md hover:bg-gray-100 transition-colors duration-200">Dashboard</a>
            <a href="#transactions" className="block text-gray-500 px-3 py-2 text-base font-medium rounded-md hover:bg-gray-100 transition-colors duration-200">Transactions</a>
            <a href="#cards" className="block text-gray-500 px-3 py-2 text-base font-medium rounded-md hover:bg-gray-100 transition-colors duration-200">Cards</a>
            <a href="#payments" className="block text-gray-500 px-3 py-2 text-base font-medium rounded-md hover:bg-gray-100 transition-colors duration-200">Payments</a>
            <a href="#settings" className="block text-gray-500 px-3 py-2 text-base font-medium rounded-md hover:bg-gray-100 transition-colors duration-200">Settings</a>

            <div className="pt-4 pb-3 border-t border-gray-200">
              <div className="flex items-center space-x-4 px-3">
                <div className="flex-shrink-0">
                  <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                    <User size={20} className="text-gray-500" />
                  </div>
                </div>
                <div>
                  <div className="text-base font-medium text-gray-800">Sarah Johnson</div>
                  <div className="text-sm font-medium text-gray-500">sarah@example.com</div>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
