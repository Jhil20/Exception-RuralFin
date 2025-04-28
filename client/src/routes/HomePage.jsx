import Header from '../components/Header';
import { ChevronRight, ArrowRight, Wallet, Shield, CreditCard, DollarSign, BarChart, Calendar, Menu, X } from 'lucide-react';
import { Info, ShieldCheck, TrendingUp } from 'lucide-react';

import React, { useState } from 'react';
const HomePage = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <div className="min-h-screen bg-white text-black flex flex-col">
        <Header/>

  
    <div className="min-h-screen bg-white text-gray-900 font-sans">
      {/* Navigation */}
      <nav className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <Wallet className="h-8 w-8 text-black" />
              <span className="ml-2 text-xl font-bold">eRupee<span className="text-gray-500">Wallet</span></span>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8">
              <a href="#features" className="text-gray-600 hover:text-black">Features</a>
              <a href="#how-it-works" className="text-gray-600 hover:text-black">How it Works</a>
              <a href="#pricing" className="text-gray-600 hover:text-black">Pricing</a>
              <a href="#testimonials" className="text-gray-600 hover:text-black">Testimonials</a>
            </div>
            
            <div className="hidden md:flex items-center space-x-4">
              <button className="px-4 py-2 rounded hover:bg-gray-100 text-gray-700">Login</button>
              <button className="px-4 py-2 rounded bg-black text-white hover:bg-gray-800">Sign Up</button>
            </div>
            
            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-black focus:outline-none"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>
        
        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <a href="#features" className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded">Features</a>
              <a href="#how-it-works" className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded">How it Works</a>
              <a href="#pricing" className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded">Pricing</a>
              <a href="#testimonials" className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded">Testimonials</a>
            </div>
            <div className="pt-4 pb-3 border-t border-gray-200">
              <div className="flex items-center px-4 space-x-2">
                <button className="px-4 py-2 rounded hover:bg-gray-100 text-gray-700">Login</button>
                <button className="px-4 py-2 rounded bg-black text-white hover:bg-gray-800">Sign Up</button>
              </div>
            </div>
          </div>
        )}
      </nav>
      
      {/* Hero Section */}
      <header className="bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24 md:pt-32 md:pb-32">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                Your Gateway to<br />Digital <span className="text-gray-700">e-Rupee</span> Transactions
              </h1>
              <p className="mt-6 text-lg text-gray-600">
                Convert your money into e-Rupee effortlessly. Fast, secure, and government backed digital currency in your pocket.
              </p>
              <div className="mt-10 flex flex-col sm:flex-row gap-4">
                <button className="px-6 py-3 bg-black text-white rounded-md hover:bg-gray-800 flex items-center justify-center">
                  Get Started <ArrowRight className="ml-2 h-5 w-5" />
                </button>
                <button className="px-6 py-3 border border-gray-300 rounded-md hover:bg-gray-50 flex items-center justify-center">
                  Learn More <ChevronRight className="ml-2 h-5 w-5" />
                </button>
              </div>
            </div>
            <div className="hidden md:block relative">
            <div className="relative bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto">
      
      {/* Decorative background circle */}
      <div className="absolute -top-6 -left-6 w-64 h-64 bg-gray-200 rounded-full opacity-50 -z-10"></div>
      
      {/* Main Content */}
      <div className="bg-gray-100 rounded-lg p-4 mb-6">
        <div className="flex items-center space-x-4">
          <Info className="h-10 w-10 text-black" />
          <div>
            <p className="text-xs text-gray-500">About the Project</p>
            <p className="text-xl font-bold">Finance E-Wallet</p>
          </div>
        </div>
      </div>

      {/* Project Highlights */}
      <div className="space-y-4 mb-6">
        <div className="flex items-start space-x-3">
          <ShieldCheck className="h-6 w-6 text-black mt-1" />
          <div>
            <p className="font-semibold text-gray-900">Secure Transactions</p>
            <p className="text-sm text-gray-500">
              All transfers and payments are protected with high-end encryption.
            </p>
          </div>
        </div>

        <div className="flex items-start space-x-3">
          <TrendingUp className="h-6 w-6 text-black mt-1" />
          <div>
            <p className="font-semibold text-gray-900">Empowering Users</p>
            <p className="text-sm text-gray-500">
              Designed for easy money management, even in remote and underbanked regions.
            </p>
          </div>
        </div>
      </div>

      {/* Button */}
      <button className="w-full bg-black text-white py-3 rounded-md hover:bg-gray-800 transition">
        Learn More
      </button>
    </div>
            </div>
          </div>
        </div>
      </header>
      
      {/* Features Section */}
      <section id="features" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold">Why Choose eRupee Wallet</h2>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              Experience the future of digital financial transactions with the most secure and convenient e-wallet.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
              <Shield className="h-12 w-12 text-gray-800 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Secure Transactions</h3>
              <p className="text-gray-600">Advanced encryption and security protocols protect your every transaction and personal information.</p>
            </div>
            
            <div className="p-6 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
              <CreditCard className="h-12 w-12 text-gray-800 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Instant Conversion</h3>
              <p className="text-gray-600">Convert your money to e-Rupee instantly with just a few taps. No waiting periods or delays.</p>
            </div>
            
            <div className="p-6 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
              <DollarSign className="h-12 w-12 text-gray-800 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Zero Transaction Fees</h3>
              <p className="text-gray-600">Enjoy fee-free transactions when you convert and spend your e-Rupee on our platform.</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* How It Works Section */}
      <section id="how-it-works" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold">How It Works</h2>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              Simple steps to get started with your e-Rupee wallet
            </p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-4 mb-10">
            <div className="text-center p-6">
              <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-gray-200 text-gray-800 mb-4">
                <span className="text-xl font-bold">1</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Sign Up</h3>
              <p className="text-gray-600">Create your account in minutes with simple verification</p>
            </div>
            
            <div className="text-center p-6">
              <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-gray-200 text-gray-800 mb-4">
                <span className="text-xl font-bold">2</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Add Money</h3>
              <p className="text-gray-600">Link your bank account or add money via UPI/cards</p>
            </div>
            
            <div className="text-center p-6">
              <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-gray-200 text-gray-800 mb-4">
                <span className="text-xl font-bold">3</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Convert</h3>
              <p className="text-gray-600">Convert your money to e-Rupee with one tap</p>
            </div>
            
            <div className="text-center p-6">
              <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-gray-200 text-gray-800 mb-4">
                <span className="text-xl font-bold">4</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Spend</h3>
              <p className="text-gray-600">Use e-Rupee for payments at supported merchants</p>
            </div>
          </div>
          
          <div className="flex justify-center">
            <button className="px-6 py-3 bg-black text-white rounded-md hover:bg-gray-800 flex items-center">
              Get Started Now <ArrowRight className="ml-2 h-5 w-5" />
            </button>
          </div>
        </div>
      </section>
      
      {/* Pricing Section */}
      <section id="pricing" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold">Simple, Transparent Pricing</h2>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              Choose the plan that works best for your financial needs
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-8 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
              <h3 className="text-xl font-bold mb-2">Basic</h3>
              <p className="text-gray-600 mb-6">Perfect for occasional users</p>
              <p className="text-4xl font-bold mb-6">₹0<span className="text-lg text-gray-500 font-normal">/month</span></p>
              
              <ul className="space-y-3 mb-8">
                <li className="flex items-center">
                  <ChevronRight className="h-5 w-5 text-gray-600 mr-2" />
                  <span>Up to ₹20,000 monthly conversion</span>
                </li>
                <li className="flex items-center">
                  <ChevronRight className="h-5 w-5 text-gray-600 mr-2" />
                  <span>Basic customer support</span>
                </li>
                <li className="flex items-center">
                  <ChevronRight className="h-5 w-5 text-gray-600 mr-2" />
                  <span>Standard security features</span>
                </li>
              </ul>
              
              <button className="w-full px-4 py-2 border border-black rounded-md hover:bg-gray-100">Get Started</button>
            </div>
            
            <div className="p-8 border-2 border-black rounded-lg relative hover:shadow-lg transition-shadow">
              <div className="absolute top-0 right-0 bg-black text-white px-3 py-1 text-sm font-medium transform translate-y-(-50%)">Popular</div>
              <h3 className="text-xl font-bold mb-2">Premium</h3>
              <p className="text-gray-600 mb-6">For regular e-Rupee users</p>
              <p className="text-4xl font-bold mb-6">₹149<span className="text-lg text-gray-500 font-normal">/month</span></p>
              
              <ul className="space-y-3 mb-8">
                <li className="flex items-center">
                  <ChevronRight className="h-5 w-5 text-gray-600 mr-2" />
                  <span>Up to ₹1,00,000 monthly conversion</span>
                </li>
                <li className="flex items-center">
                  <ChevronRight className="h-5 w-5 text-gray-600 mr-2" />
                  <span>Priority customer support</span>
                </li>
                <li className="flex items-center">
                  <ChevronRight className="h-5 w-5 text-gray-600 mr-2" />
                  <span>Advanced security features</span>
                </li>
                <li className="flex items-center">
                  <ChevronRight className="h-5 w-5 text-gray-600 mr-2" />
                  <span>Transaction analytics</span>
                </li>
              </ul>
              
              <button className="w-full px-4 py-3 bg-black text-white rounded-md hover:bg-gray-800">Get Started</button>
            </div>
            
            <div className="p-8 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
              <h3 className="text-xl font-bold mb-2">Business</h3>
              <p className="text-gray-600 mb-6">For enterprise users</p>
              <p className="text-4xl font-bold mb-6">₹499<span className="text-lg text-gray-500 font-normal">/month</span></p>
              
              <ul className="space-y-3 mb-8">
                <li className="flex items-center">
                  <ChevronRight className="h-5 w-5 text-gray-600 mr-2" />
                  <span>Unlimited monthly conversion</span>
                </li>
                <li className="flex items-center">
                  <ChevronRight className="h-5 w-5 text-gray-600 mr-2" />
                  <span>Dedicated account manager</span>
                </li>
                <li className="flex items-center">
                  <ChevronRight className="h-5 w-5 text-gray-600 mr-2" />
                  <span>Enterprise-grade security</span>
                </li>
                <li className="flex items-center">
                  <ChevronRight className="h-5 w-5 text-gray-600 mr-2" />
                  <span>Advanced analytics & reporting</span>
                </li>
                <li className="flex items-center">
                  <ChevronRight className="h-5 w-5 text-gray-600 mr-2" />
                  <span>API access for integration</span>
                </li>
              </ul>
              
              <button className="w-full px-4 py-2 border border-black rounded-md hover:bg-gray-100">Contact Sales</button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section id="testimonials" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold">What Our Users Say</h2>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              Thousands of users trust eRupee Wallet for their digital currency needs
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full bg-gray-200"></div>
                <div className="ml-4">
                  <h4 className="font-semibold">Rajesh Kumar</h4>
                  <p className="text-sm text-gray-500">Small Business Owner</p>
                </div>
              </div>
              <p className="text-gray-600">"Converting to e-Rupee has made my business transactions smoother and more secure. The instant conversion feature saves me time every day."</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full bg-gray-200"></div>
                <div className="ml-4">
                  <h4 className="font-semibold">Priya Sharma</h4>
                  <p className="text-sm text-gray-500">Freelance Designer</p>
                </div>
              </div>
              <p className="text-gray-600">"As someone who handles multiple client payments, the zero transaction fee for e-Rupee conversions has been a game-changer for my business finances."</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full bg-gray-200"></div>
                <div className="ml-4">
                  <h4 className="font-semibold">Vikram Singh</h4>
                  <p className="text-sm text-gray-500">Tech Professional</p>
                </div>
              </div>
              <p className="text-gray-600">"The security features are impressive. I feel confident knowing my digital transactions are protected by advanced encryption technology."</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-black text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-4">Ready to Experience the Future of Digital Currency?</h2>
              <p className="text-gray-300 mb-8">
                Join thousands of users who have already made the switch to e-Rupee. Sign up today and enjoy seamless digital transactions.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="px-6 py-3 bg-white text-black rounded-md hover:bg-gray-100 flex items-center justify-center">
                  Create Account <ArrowRight className="ml-2 h-5 w-5" />
                </button>
                <button className="px-6 py-3 border border-white rounded-md hover:bg-gray-900 flex items-center justify-center">
                  Learn More
                </button>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="bg-gray-800 p-6 rounded-lg">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <p className="text-sm text-gray-400">Download Our App</p>
                    <p className="text-xl font-medium">Manage on the Go</p>
                  </div>
                  <div className="bg-gray-700 p-3 rounded-full">
                    <Wallet className="h-6 w-6" />
                  </div>
                </div>
                <div className="flex gap-4">
                  <button className="flex-1 py-3 bg-gray-700 rounded-md hover:bg-gray-600 flex items-center justify-center">
                    <span>iOS</span>
                  </button>
                  <button className="flex-1 py-3 bg-gray-700 rounded-md hover:bg-gray-600 flex items-center justify-center">
                    <span>Android</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold">Our Impact</h2>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              Leading the digital currency revolution in India
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-4xl font-bold text-black">1M+</p>
              <p className="text-gray-600 mt-2">Active Users</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-black">₹50Cr+</p>
              <p className="text-gray-600 mt-2">Monthly Transactions</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-black">4.8/5</p>
              <p className="text-gray-600 mt-2">User Rating</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-black">100+</p>
              <p className="text-gray-600 mt-2">Partner Merchants</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* FAQ Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold">Frequently Asked Questions</h2>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              Find answers to common questions about eRupee Wallet
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold mb-2">What is e-Rupee?</h3>
              <p className="text-gray-600">E-Rupee is the digital version of the Indian Rupee, issued and regulated by the Reserve Bank of India (RBI). It's a secure, government-backed digital currency designed for everyday transactions.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold mb-2">Is eRupee Wallet secure?</h3>
              <p className="text-gray-600">Yes, eRupee Wallet employs bank-grade encryption and security protocols to protect your transactions and personal information. We also offer multi-factor authentication for added security.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold mb-2">How do I convert my money to e-Rupee?</h3>
              <p className="text-gray-600">After creating an account, simply add money to your wallet via UPI, bank transfer, or debit/credit card. Then use our simple conversion tool to convert your money to e-Rupee instantly.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold mb-2">Where can I use e-Rupee?</h3>
              <p className="text-gray-600">E-Rupee can be used at all participating merchants and businesses that accept digital payments. Our network is constantly growing, with over 100+ partner merchants already onboard.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold mb-2">Are there any transaction limits?</h3>
              <p className="text-gray-600">Transaction limits vary based on your account type. Basic accounts have a monthly conversion limit of ₹20,000, while Premium and Business accounts offer higher limits.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold mb-2">How is eRupee Wallet different from other payment apps?</h3>
              <p className="text-gray-600">Unlike other payment apps that simply process transactions, eRupee Wallet lets you convert and hold government-backed digital currency, offering greater security and reliability for your digital finances.</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Blog Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold">Latest Updates</h2>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              Stay informed about digital currency trends and eRupee news
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
              <div className="h-48 bg-gray-200"></div>
              <div className="p-6">
                <p className="text-sm text-gray-500 mb-2">April 20, 2025</p>
                <h3 className="text-xl font-semibold mb-2">The Rise of e-Rupee in Modern India</h3>
                <p className="text-gray-600 mb-4">How digital currency is transforming the financial landscape of India and what it means for consumers.</p>
                <a href="#" className="text-black font-medium flex items-center">
                  Read More <ChevronRight className="ml-1 h-4 w-4" />
                </a>
              </div>
            </div>
            
            <div className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
              <div className="h-48 bg-gray-200"></div>
              <div className="p-6">
                <p className="text-sm text-gray-500 mb-2">April 15, 2025</p>
                <h3 className="text-xl font-semibold mb-2">5 Benefits of Using e-Rupee for Daily Transactions</h3>
                <p className="text-gray-600 mb-4">Discover how e-Rupee can simplify your financial life and provide enhanced security for everyday payments.</p>
                <a href="#" className="text-black font-medium flex items-center">
                  Read More <ChevronRight className="ml-1 h-4 w-4" />
                </a>
              </div>
            </div>
            
            <div className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
              <div className="h-48 bg-gray-200"></div>
              <div className="p-6">
                <p className="text-sm text-gray-500 mb-2">April 10, 2025</p>
                <h3 className="text-xl font-semibold mb-2">eRupee Wallet Partners with Major Retailers</h3>
                <p className="text-gray-600 mb-4">New partnerships expand the eRupee Wallet ecosystem, making digital currency more accessible than ever.</p>
                <a href="#" className="text-black font-medium flex items-center">
                  Read More <ChevronRight className="ml-1 h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>  
    </div>
  );
};

export default HomePage;
