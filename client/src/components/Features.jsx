import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Smartphone, DollarSign, Shield, BarChart3 } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    icon: <Smartphone size={28} />,
    title: 'Mobile Number Transfers',
    description: 'Send and receive money using just a mobile number, no need for complex account details.'
  },
  {
    icon: <DollarSign size={28} />,
    title: 'Cash to Digital Bridge',
    description: 'Easily convert physical cash to digital money through our trusted agent network.'
  },
  {
    icon: <Shield size={28} />,
    title: 'Secure Transactions',
    description: 'End-to-end encryption and dual authentication for all financial transactions.'
  },
  {
    icon: <BarChart3 size={28} />,
    title: 'Budget Tracking',
    description: 'Set budget goals based on your income and track your spending in real-time.'
  }
];

const Features = () => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const featureRefs = useRef([]);

  useEffect(() => {
    if (!sectionRef.current || !headingRef.current) return;

    // Animate heading
    gsap.from(headingRef.current, {
      opacity: 0,
      y: 50,
      duration: 1,
      scrollTrigger: {
        trigger: headingRef.current,
        start: 'top 80%',
      }
    });

    // Animate features
    featureRefs.current.forEach((feature, index) => {
      if (!feature) return;

      gsap.from(feature, {
        opacity: 0,
        y: 50,
        duration: 0.8,
        delay: index * 0.2,
        scrollTrigger: {
          trigger: feature,
          start: 'top 85%',
        }
      });
    });
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-20 px-6 md:px-12 bg-white"
      id="features"
    >
      <div className="container mx-auto">
        <div ref={headingRef} className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Core Features</h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            Our platform bridges the gap between cash and digital transactions, 
            empowering users with secure and accessible financial tools.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              ref={el => featureRefs.current[index] = el}
              className="bg-gray-50 p-8 rounded-xl hover:shadow-md transition-shadow duration-300"
            >
              <div className="bg-black text-white h-14 w-14 rounded-lg flex items-center justify-center mb-6">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
