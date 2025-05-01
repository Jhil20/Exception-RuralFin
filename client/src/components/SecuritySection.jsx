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
      icon: <ShieldCheck size={24} />,
      title: 'Security Deposit System',
      description: 'Agents maintain a security deposit ensuring transaction integrity and preventing fraud.',
    },
    {
      icon: <LockKeyhole size={24} />,
      title: 'End-to-End Encryption',
      description: 'All financial data and personal information is protected with state-of-the-art encryption.',
    },
    {
      icon: <Eye size={24} />,
      title: 'Transparent Operations',
      description: 'Complete visibility into all transactions and fees with no hidden charges.',
    },
    {
      icon: <History size={24} />,
      title: 'Real-time Monitoring',
      description: 'Continuous transaction monitoring and instant alerts for any suspicious activity.',
    },
  ];

  return (
    <section ref={sectionRef} className="py-20 px-6 md:px-12 bg-white" id="security-section">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 ref={titleRef} className="text-3xl md:text-4xl font-bold mb-4">
            Security You Can Trust
          </h2>
          <p ref={descriptionRef} className="text-lg text-gray-700 max-w-3xl mx-auto">
            We've built a fraud-proof system with multiple layers of security to ensure your money is always safe and transactions are reliable.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div ref={featuresRef} className="w-full lg:w-1/2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {securityFeatures.map((feature, index) => (
                <div
                  key={index}
                  className="security-feature bg-gray-50 p-6 rounded-xl hover:shadow-md transition-shadow duration-300"
                >
                  <div className="flex items-center mb-4">
                    <div className="bg-black text-white h-10 w-10 rounded-lg flex items-center justify-center mr-3">
                      {feature.icon}
                    </div>
                    <h3 className="font-bold">{feature.title}</h3>
                  </div>
                  <p className="text-gray-600 pl-[3.25rem]">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div ref={imageRef} className="w-full lg:w-1/2">
            <div className="bg-gradient-to-br from-gray-200 to-gray-300 p-6 rounded-2xl shadow-lg">
              <div className="bg-white rounded-xl p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center mr-3">
                      <ShieldCheck size={20} className="text-white" />
                    </div>
                    <h4 className="font-bold">Security Center</h4>
                  </div>
                  <div className="text-xs font-medium text-green-500 bg-green-50 px-3 py-1 rounded-full">
                    All Secure
                  </div>
                </div>

                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <p className="text-sm font-medium">Account Protection</p>
                    <p className="text-sm font-medium text-green-500">Active</p>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2 mb-1">
                    <div className="bg-black h-2 rounded-full w-full"></div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg mb-6">
                  <div className="flex items-start mb-2">
                    <LockKeyhole size={18} className="mt-0.5 mr-2 text-gray-700" />
                    <div>
                      <p className="font-medium">Two-Factor Authentication</p>
                      <p className="text-xs text-gray-500">Enabled for all transactions</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Eye size={18} className="mt-0.5 mr-2 text-gray-700" />
                    <div>
                      <p className="font-medium">Transaction Monitoring</p>
                      <p className="text-xs text-gray-500">Real-time alerts for suspicious activity</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm font-medium mb-3">Recent Security Activity</p>
                  <div className="space-y-3">
                    <div className="flex items-start">
                      <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                        <LockKeyhole size={16} />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Password Changed</p>
                        <p className="text-xs text-gray-500">2 days ago</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                        <ShieldCheck size={16} />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Security Scan Completed</p>
                        <p className="text-xs text-gray-500">1 week ago</p>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SecuritySection;
