import React from 'react';
import { Link } from 'react-router-dom';

const BankingAnimation = () => {
  return (
    <div className="relative w-full h-[400px] bg-gradient-to-br from-indigo-50 via-white to-purple-50 rounded-xl overflow-hidden">
      {/* Main Card */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-48 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl shadow-2xl card-animation">
        {/* Card Shine Effect */}
        <div className="absolute inset-0 shine-effect"></div>
        
        <div className="absolute inset-0 p-6">
          <div className="flex justify-between items-start">
            <div className="w-12 h-8 bg-white/20 rounded-lg backdrop-blur-sm chip-animation">
              <div className="w-6 h-6 bg-white/30 rounded-md chip-lines"></div>
            </div>
            <div className="text-white/80 text-sm">RuralFin</div>
          </div>
          <div className="mt-8">
            <div className="text-white/60 text-sm">Balance</div>
            <div className="text-white text-2xl font-bold balance-animation">₹25,000.00</div>
          </div>
        </div>

        {/* Card Details */}
        <div className="absolute bottom-6 left-6 right-6">
          <div className="flex justify-between items-center">
            <div className="text-white/60 text-sm card-number-animation">**** **** **** 1234</div>
            <div className="text-white/60 text-sm">12/25</div>
          </div>
        </div>
      </div>

      {/* Background Effects */}
      <div className="absolute inset-0">
        {/* Gradient Orbs */}
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-indigo-400/20 rounded-full blur-3xl orb-animation"></div>
        <div className="absolute bottom-1/4 right-1/4 w-32 h-32 bg-purple-400/20 rounded-full blur-3xl orb-animation" style={{ animationDelay: '1s' }}></div>
        
        {/* Particles */}
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-indigo-400 rounded-full particle-animation"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.1}s`
            }}
          />
        ))}
      </div>

      {/* Status Indicators */}
      <div className="absolute top-4 right-4 flex space-x-2">
        {['green', 'blue', 'purple'].map((color, i) => (
          <div
            key={i}
            className={`w-3 h-3 bg-${color}-400 rounded-full pulse-animation`}
            style={{ animationDelay: `${i * 0.2}s` }}
          />
        ))}
      </div>
    </div>
  );
};

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Navbar */}
      <header className="flex justify-between items-center px-8 py-6 shadow-sm fixed w-full bg-white z-50">
        <h1 className="text-2xl font-bold text-blue-700">RuralFin</h1>
        <nav className="space-x-6">
          <a href="#about" className="text-gray-700 hover:text-blue-600">About</a>
          <a href="#services" className="text-gray-700 hover:text-blue-600">Services</a>
          <a href="#features" className="text-gray-700 hover:text-blue-600">Features</a>
          <Link to="/login" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
            Get Started
          </Link>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="pt-24">
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 px-8 py-20">
          <div className="flex flex-col justify-center">
            <h2 className="text-4xl md:text-5xl font-extrabold text-black mb-6">
              Banking Made Simple <br /> for Everyone
            </h2>
            <p className="text-lg text-gray-600 mb-10">
              Secure, Fast, and Reliable Financial Services at Your Fingertips
            </p>
            <div className="flex gap-4">
              <Link to="/login" className="bg-blue-600 text-white px-6 py-3 rounded-md text-lg hover:bg-blue-700 transition-all">
                Start Banking →
              </Link>
              <a href="#learn" className="border border-blue-600 text-blue-600 px-6 py-3 rounded-md text-lg hover:bg-blue-50 transition-all">
                Learn More
              </a>
            </div>
          </div>

          {/* Banking Animation */}
          <BankingAnimation />
        </section>

        {/* Features Section */}
        <section id="features" className="bg-gray-50 py-20 px-8">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Why Choose RuralFin?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: "Easy Access",
                  description: "Access your finances anytime, anywhere with our mobile-first platform",
                  icon: "📱"
                },
                {
                  title: "Secure Transactions",
                  description: "Bank-grade security to keep your money and data safe",
                  icon: "🔒"
                },
                {
                  title: "24/7 Support",
                  description: "Round-the-clock customer support to assist you",
                  icon: "💬"
                }
              ].map((feature, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Statistics Section */}
        <section className="py-20 px-8 bg-blue-600 text-white">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              {[
                { number: "1M+", label: "Happy Customers" },
                { number: "₹500Cr+", label: "Transactions Processed" },
                { number: "99.9%", label: "Uptime" }
              ].map((stat, index) => (
                <div key={index}>
                  <div className="text-4xl font-bold mb-2">{stat.number}</div>
                  <div className="text-blue-100">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-20 px-8">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">What Our Customers Say</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                {
                  quote: "RuralFin has transformed how I manage my finances. It's simple and efficient!",
                  author: "Rahul Sharma",
                  role: "Small Business Owner"
                },
                {
                  quote: "The best banking experience I've ever had. Highly recommended!",
                  author: "Priya Patel",
                  role: "Teacher"
                }
              ].map((testimonial, index) => (
                <div key={index} className="bg-gray-50 p-6 rounded-lg">
                  <p className="text-gray-600 mb-4">"{testimonial.quote}"</p>
                  <div className="font-semibold">{testimonial.author}</div>
                  <div className="text-gray-500">{testimonial.role}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-8 bg-gray-50">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Start Your Financial Journey?</h2>
            <p className="text-gray-600 mb-8">Join thousands of satisfied customers who trust RuralFin for their banking needs.</p>
            <Link to="/login" className="bg-blue-600 text-white px-8 py-3 rounded-md text-lg hover:bg-blue-700 transition-all inline-block">
              Get Started Now
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-8">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">RuralFin</h3>
            <p className="text-gray-400">Making banking accessible to everyone.</p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#about" className="text-gray-400 hover:text-white">About Us</a></li>
              <li><a href="#services" className="text-gray-400 hover:text-white">Services</a></li>
              <li><a href="#features" className="text-gray-400 hover:text-white">Features</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-gray-400">
              <li>Email: support@ruralfin.com</li>
              <li>Phone: 1800-123-4567</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Follow Us</h4>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white">Twitter</a>
              <a href="#" className="text-gray-400 hover:text-white">LinkedIn</a>
              <a href="#" className="text-gray-400 hover:text-white">Facebook</a>
            </div>
          </div>
        </div>
        <div className="max-w-6xl mx-auto mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
          <p>&copy; 2024 RuralFin. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

// Enhanced animations
const styles = `
@keyframes card {
  0% {
    transform: translate(-50%, -50%) scale(0.9) rotate(-5deg);
    opacity: 0;
  }
  100% {
    transform: translate(-50%, -50%) scale(1) rotate(0);
    opacity: 1;
  }
}

@keyframes chip {
  0% {
    transform: scale(0.8);
    opacity: 0;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

@keyframes balance {
  0% {
    transform: translateY(10px);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
}

@keyframes particle {
  0% {
    transform: translateY(0) scale(1);
    opacity: 0;
  }
  50% {
    opacity: 0.8;
  }
  100% {
    transform: translateY(-100px) scale(0);
    opacity: 0;
  }
}

@keyframes pulse {
  0%, 100% {
    transform: scale(1);
    opacity: 0.6;
  }
  50% {
    transform: scale(1.2);
    opacity: 1;
  }
}

@keyframes shine {
  0% {
    transform: translateX(-100%) rotate(45deg);
  }
  100% {
    transform: translateX(100%) rotate(45deg);
  }
}

@keyframes orb {
  0%, 100% {
    transform: translate(0, 0) scale(1);
    opacity: 0.2;
  }
  50% {
    transform: translate(20px, -20px) scale(1.2);
    opacity: 0.3;
  }
}

@keyframes cardNumber {
  0% {
    opacity: 0;
    transform: translateX(-10px);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
}

.card-animation {
  animation: card 0.8s ease-out forwards;
  position: relative;
  overflow: hidden;
}

.chip-animation {
  animation: chip 0.5s ease-out forwards;
  animation-delay: 0.3s;
  position: relative;
  overflow: hidden;
}

.balance-animation {
  animation: balance 0.5s ease-out forwards;
  animation-delay: 0.5s;
}

.particle-animation {
  animation: particle 2s ease-out infinite;
}

.pulse-animation {
  animation: pulse 2s ease-in-out infinite;
}

.shine-effect {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    45deg,
    transparent 0%,
    rgba(255, 255, 255, 0.1) 50%,
    transparent 100%
  );
  animation: shine 3s ease-in-out infinite;
}

.chip-lines {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: repeating-linear-gradient(
    90deg,
    transparent,
    transparent 2px,
    rgba(255, 255, 255, 0.2) 2px,
    rgba(255, 255, 255, 0.2) 4px
  );
}

.orb-animation {
  animation: orb 4s ease-in-out infinite;
}

.card-number-animation {
  animation: cardNumber 0.5s ease-out forwards;
  animation-delay: 0.7s;
}
`;
