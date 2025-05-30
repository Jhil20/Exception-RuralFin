import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ShieldCheck, LockKeyhole, Eye, History } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const SecuritySection = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);
  const featuresRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    // Heading animation
    gsap.from([titleRef.current, descriptionRef.current], {
      opacity: 0,
      y: 30,
      stagger: 0.2,
      duration: 0.8,
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 70%',
      },
    });

    // Features animation
    if (featuresRef.current) {
      const features = featuresRef.current.querySelectorAll('.security-feature');

      gsap.from(features, {
        opacity: 0,
        y: 20,
        stagger: 0.1,
        duration: 0.6,
        scrollTrigger: {
          trigger: featuresRef.current,
          start: 'top 80%',
        },
      });
    }

    // Image animation
    if (imageRef.current) {
      gsap.from(imageRef.current, {
        opacity: 0,
        x: 50,
        duration: 1,
        scrollTrigger: {
          trigger: imageRef.current,
          start: 'top 70%',
        },
      });
    }
  }, []);

  const securityFeatures = [
    {
      icon: <ShieldCheck size={30} />,
      title: 'Security Deposit System',
      description: 'Agents maintain a security deposit ensuring transaction integrity and preventing fraud.',
    },
    {
      icon: <LockKeyhole size={30} />,
      title: 'End-to-End Encryption',
      description: 'All financial data and personal information is protected with state-of-the-art encryption.',
    },
    {
      icon: <Eye size={30} />,
      title: 'Transparent Operations',
      description: 'Complete visibility into all transactions and fees with no hidden charges.',
    },
    {
      icon: <History size={30} />,
      title: 'Real-time Monitoring',
      description: 'Continuous transaction monitoring and instant alerts for any suspicious activity.',
    },
  ];

  return (
    <section ref={sectionRef} className="py-20 pb-36 px-6 md:px-12 bg-white" id="security-section">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 ref={titleRef} className="text-3xl md:text-4xl font-bold mb-4">
            Security You Can Trust
          </h2>
          <p ref={descriptionRef} className="text-lg text-gray-700 max-w-3xl mx-auto">
            We've built a fraud-proof system with multiple layers of security to ensure your money is always safe and transactions are reliable.
          </p>
        </div>

        <div className="flex flex-col w-full items-center gap-12">
          <div ref={featuresRef} className="w-full">
            <div className="grid w-full grid-cols-4 gap-6">
              {securityFeatures.map((feature, index) => (
                <div
                  key={index}
                  className="security-feature h-fit rounded-xl border-2 border-gray-300 hover:shadow-lg hover:shadow-gray-300 transition-shadow duration-300  bg-gray-50 p-8 "
                >
                  <div className="flex items-center mb-4">
                    <div className="bg-black text-white h-14 w-14 rounded-lg flex items-center justify-center mr-3">
                      {feature.icon}
                    </div>
                  </div>
                    <h3 className="font-bold text-xl mb-3">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>

        
        </div>
      </div>
    </section>
  );
};

export default SecuritySection;
