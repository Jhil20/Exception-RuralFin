import React, { useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { MenuIcon, X, Lock } from 'lucide-react';

const Header1 = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);

    // Animate header on mount
    // gsap.from('.header', {
    //   y: 100,
    //   opacity: 0,
    //   duration: 1,
    //   ease: 'power3.out',
    //   delay: 0.2
    // });

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div 
      className={` fixed  w-full bg-white h-20 right-0 z-50 transition-all duration-300 px-6 md:px-12 `}
    >
      <div className="w-full h-full mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <Lock size={28} className="text-black mr-2" />
          <span className="text-xl font-bold text-black">FinSecure</span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8">
          {['Features', 'How it Works', 'Security', 'Financial Tools'].map((item) => (
            <a 
              key={item} 
              href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
              className="text-gray-800 hover:text-black font-medium transition-colors"
            >
              {item}
            </a>
          ))}
          <button className="bg-black text-white px-6 py-2 rounded-full hover:bg-gray-800 transition-colors">
            Get Started
          </button>
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-gray-800 focus:outline-none" 
          onClick={toggleMenu}
        >
          {isMenuOpen ? <X size={24} /> : <MenuIcon size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-lg py-4 px-6">
          <div className="flex flex-col space-y-4">
            {['Features', 'How it Works', 'Security', 'Financial Tools'].map((item) => (
              <a 
                key={item} 
                href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
                className="text-gray-800 hover:text-black font-medium py-2 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {item}
              </a>
            ))}
            <button className="bg-black text-white px-6 py-3 rounded-full hover:bg-gray-800 transition-colors">
              Get Started
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header1;
