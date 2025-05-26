import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Users,
  ShieldCheck,
  Wallet,
  RefreshCw,
  TrendingUp,
} from "lucide-react";

const AgentModel = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);
  const stepRefs = useRef([]);
  const imageRef = useRef(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    gsap.registerPlugin(ScrollTrigger);

    gsap.from([titleRef.current, descriptionRef.current], {
      opacity: 0,
      y: 50,
      stagger: 0.2,
      duration: 0.8,
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 70%",
      },
    });

    stepRefs.current.forEach((step, index) => {
      if (!step) return;

      gsap.from(step, {
        opacity: 0,
        x: index % 2 === 0 ? -30 : 30,
        duration: 0.8,
        delay: 0.2 + index * 0.1,
        scrollTrigger: {
          trigger: step,
          start: "top 85%",
        },
      });
    });

    if (imageRef.current) {
      gsap.from(imageRef.current, {
        opacity: 0,
        scale: 0.9,
        duration: 1,
        scrollTrigger: {
          trigger: imageRef.current,
          start: "top 80%",
        },
      });
    }
  }, []);

  const steps = [
    {
      icon: <Users size={24} />,
      title: "Agent Recruitment",
      description:
        "Trusted individuals from local communities become our financial agents.",
    },
    {
      icon: <ShieldCheck size={24} />,
      title: "Security Deposit",
      description:
        "Agents deposit ₹5,000-₹10,000 as security, ensuring transaction liquidity.",
    },
    {
      icon: <Wallet size={24} />,
      title: "Transaction Facilitation",
      description:
        "Agents help users deposit, withdraw, and transfer money seamlessly.",
    },
    {
      icon: <TrendingUp size={24} />,
      title: "Earnings-Based Model",
      description:
        "Agents earn a percentage from each user transaction—similar to freelancing. Higher deposits unlock more earning potential.",
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="py-20 px-6 md:px-12 bg-gray-50"
      id="how-it-works"
    >
      <div className="container mx-auto">
        <div className="text-center mb-6">
          <h2 ref={titleRef} className="text-3xl md:text-4xl font-bold mb-4">
            How Our Agent Model Works
          </h2>
          <p
            ref={descriptionRef}
            className="text-lg text-gray-700 max-w-3xl mx-auto"
          >
            Our innovative agent network bridges the gap between cash and
            digital economies, ensuring transactions are secure, reliable and
            accessible to everyone.
          </p>
        </div>

        <div className="flex flex-col justify-end lg:flex-row items-center gap-12">
          <div className="w-full h-full lg:w-1/2 order-2 lg:order-1 ">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {steps.map((step, index) => (
                <div
                  key={index}
                  ref={(el) => (stepRefs.current[index] = el)}
                  className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
                >
                  <div className="bg-gray-100 h-12 w-12 rounded-lg flex items-center justify-center mb-4 text-black">
                    {step.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div ref={imageRef} className="w-full lg:w-1/2 order-1 lg:order-2">
            <div className="bg-gradient-to-br from-gray-200 to-gray-300 p-6 rounded-2xl shadow-lg">
              <div className="bg-white rounded-xl p-6">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mr-4">
                    <Users size={24} className="text-black" />
                  </div>
                  <div>
                    <h4 className="font-bold">Agent AgentDashboard</h4>
                    <p className="text-sm text-gray-500">
                      Secure transactions & management
                    </p>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <p className="font-medium">Security Deposit</p>
                    <p className="font-bold">₹10,000.00</p>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                    <div className="bg-black h-2 rounded-full w-full"></div>
                  </div>
                  <p className="text-xs text-gray-500">
                    Bond Period: 4 months remaining
                  </p>
                </div>

                <div className="mb-4">
                  <p className="text-sm font-medium text-gray-700 mb-2">
                    Recent Transactions
                  </p>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium">User1 Deposit</p>
                        <p className="text-xs text-gray-500">Today, 2:30 PM</p>
                      </div>
                      <p className="font-medium text-green-500">+₹2,000.00</p>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium">User2 Withdrawal</p>
                        <p className="text-xs text-gray-500">Today, 11:15 AM</p>
                      </div>
                      <p className="font-medium text-red-500">-₹500.00</p>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between">
                  <div className="text-center p-3 bg-gray-50 rounded-lg flex-1 mr-2">
                    <p className="text-sm text-gray-600">Today</p>
                    <p className="font-bold">₹4,500</p>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg flex-1 ml-2">
                    <p className="text-sm text-gray-600">This Month</p>
                    <p className="font-bold">₹32,750</p>
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

export default AgentModel;
