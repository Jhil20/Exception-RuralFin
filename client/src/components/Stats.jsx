import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Stats = () => {
  const sectionRef = useRef(null);
  const statsRef = useRef(null);

  useEffect(() => {
    if (!sectionRef.current || !statsRef.current) return;

    const statElements = statsRef.current.querySelectorAll('.stat-number');

    statElements.forEach(stat => {
      const target = parseInt(stat.textContent || '0', 10);
      gsap.to(stat, {
        innerText: target,
        duration: 2,
        snap: { innerText: 1 },
        ease: 'power2.out',
        scrollTrigger: {
          trigger: stat,
          start: 'top 80%',
        }
      });
    });

    gsap.from(sectionRef.current, {
      opacity: 0,
      y: 50,
      duration: 1,
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%',
      }
    });
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="py-16 px-6 md:px-12 bg-gray-100"
    >
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">The Challenge</h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            Financial exclusion remains a significant barrier for rural and low-income communities in India.
          </p>
        </div>

        <div 
          ref={statsRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          <div className="bg-white hover:shadow-lg hover:shadow-gray-300 transition-all duration-300 p-8 rounded-xl shadow-sm text-center">
            <p className="text-4xl font-bold mb-2">
              <span className="stat-number">190</span>M
            </p>
            <p className="text-gray-600">Indians remain unbanked despite financial inclusion initiatives</p>
          </div>

          <div className="bg-white hover:shadow-lg hover:shadow-gray-300 transition-all duration-300 p-8 rounded-xl shadow-sm text-center">
            <p className="text-4xl font-bold mb-2">
              <span className="stat-number">53</span>%
            </p>
            <p className="text-gray-600">Of women in rural India use financial services regularly</p>
          </div>

          <div className="bg-white hover:shadow-lg hover:shadow-gray-300 transition-all duration-300 p-8 rounded-xl shadow-sm text-center">
            <p className="text-4xl font-bold mb-2">
              <span className="stat-number">82</span>%
            </p>
            <p className="text-gray-600">Of village transactions are still cash-based</p>
          </div>

          <div className="bg-white hover:shadow-lg hover:shadow-gray-300 transition-all duration-300 p-8 rounded-xl shadow-sm text-center">
            <p className="text-4xl font-bold mb-2">
              <span className="stat-number">23</span>%
            </p>
            <p className="text-gray-600">Of rural users trust mobile wallets due to fear of fraud</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Stats;
