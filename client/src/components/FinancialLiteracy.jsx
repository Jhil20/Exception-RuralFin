import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { BookOpen, Award, Lightbulb, Trophy } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const FinancialLiteracy = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);
  const contentRef = useRef(null);
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
      }
    });

    // Content animation
    if (contentRef.current) {
      gsap.from(contentRef.current, {
        opacity: 0,
        x: -50,
        duration: 1,
        scrollTrigger: {
          trigger: contentRef.current,
          start: 'top 70%',
        }
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
        }
      });
    }
  }, []);

  const literacyModules = [
    {
      icon: <BookOpen size={20} />,
      title: 'Basics of Saving',
      description: 'Learn how to build savings habits and emergency funds.',
      progress: 85
    },
    {
      icon: <Award size={20} />,
      title: 'Smart Budgeting',
      description: 'Create effective budgets that match your financial goals.',
      progress: 60
    },
    {
      icon: <Lightbulb size={20} />,
      title: 'Understanding Credit',
      description: 'Learn about loans, interest rates, and building credit history.',
      progress: 40
    },
    {
      icon: <Trophy size={20} />,
      title: 'Investment Basics',
      description: 'Discover how to grow your money through simple investments.',
      progress: 25
    }
  ];

  return (
    <section id='financial-literacy' ref={sectionRef} className="py-20 px-6 md:px-12 bg-white">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 ref={titleRef} className="text-3xl md:text-4xl font-bold mb-4">
            Learn as You Earn
          </h2>
          <p ref={descriptionRef} className="text-lg text-gray-700 max-w-3xl mx-auto">
            Our AI-driven, gamified financial literacy lessons help you build financial
            knowledge and confidence while using the platform.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div ref={contentRef} className="w-full lg:w-1/2">
            <div className="mb-8">
              <h3 className="text-2xl font-bold mb-4">Gamified Learning Experience</h3>
              <p className="text-gray-700 mb-4">
                Our platform offers interactive financial education in local languages, making
                it accessible and engaging for everyone. Complete lessons, earn points, and
                build real-world financial skills.
              </p>
              <p className="text-gray-700">
                The AI adapts lessons based on your financial behavior and knowledge level,
                ensuring you get personalized guidance that's relevant to your situation.
              </p>
            </div>

            <div className="space-y-6">
              {literacyModules.map((module, index) => (
                <div key={index} className="bg-gray-50 shadow-md hover:shadow-lg hover:shadow-gray-300 transition-all duration-300   shadow-black/10 p-4 rounded-xl">
                  <div className="flex items-start mb-3">
                    <div className="bg-black text-white h-8 w-8 rounded-lg flex items-center justify-center mr-3 flex-shrink-0">
                      {module.icon}
                    </div>
                    <div>
                      <h4 className="font-bold mb-1">{module.title}</h4>
                      <p className="text-sm text-gray-600">{module.description}</p>
                    </div>
                  </div>
                  <div className="ml-11">
                    <div className="flex justify-between items-center mb-1">
                      <p className="text-xs text-gray-500">Progress</p>
                      <p className="text-xs font-medium">{module.progress}%</p>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-black h-2 rounded-full"
                        style={{ width: `${module.progress}%` }}
                      ></div>
                    </div>
                  </div>
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
                      <BookOpen size={20} className="text-white" />
                    </div>
                    <h4 className="font-bold">Financial Lessons</h4>
                  </div>
                  <div className="flex items-center">
                    <Trophy size={18} className="text-yellow-500 mr-1" />
                    <p className="text-sm font-medium">950 points</p>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg mb-6">
                  <h5 className="font-bold mb-3">Today's Lesson: Smart Saving</h5>
                  <p className="text-sm text-gray-600 mb-3">
                    Learn how small daily savings can build up to significant amounts over time.
                  </p>
                  <div className="flex space-x-2 mb-4">
                    <span className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-xs">5 minutes</span>
                    <span className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-xs">Beginner</span>
                    <span className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-xs">+50 points</span>
                  </div>
                  <button className="bg-black text-white px-4 py-2 rounded-lg text-sm font-medium w-full">
                    Start Lesson
                  </button>
                </div>

                <div className="mb-6">
                  <h5 className="font-bold mb-3">Your Learning Path</h5>
                  <div className="relative">
                    <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200"></div>

                    <div className="relative z-10 flex mb-4">
                      <div className="h-8 w-8 bg-black rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                        <Award size={16} className="text-white" />
                      </div>
                      <div className="bg-gray-50 p-3 rounded-lg flex-grow">
                        <p className="font-medium text-sm">Basics of Money Management</p>
                        <p className="text-xs text-gray-500">Completed</p>
                      </div>
                    </div>

                    <div className="relative z-10 flex mb-4">
                      <div className="h-8 w-8 bg-black rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                        <Lightbulb size={16} className="text-white" />
                      </div>
                      <div className="bg-gray-50 p-3 rounded-lg flex-grow">
                        <p className="font-medium text-sm">Smart Saving Habits</p>
                        <p className="text-xs text-gray-500">In Progress (75%)</p>
                      </div>
                    </div>

                    <div className="relative z-10 flex">
                      <div className="h-8 w-8 bg-gray-200 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                        <BookOpen size={16} className="text-gray-400" />
                      </div>
                      <div className="bg-gray-100 p-3 rounded-lg flex-grow">
                        <p className="font-medium text-sm text-gray-400">Planning for the Future</p>
                        <p className="text-xs text-gray-400">Locked</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex justify-between items-center">
                    <h5 className="font-bold">Your Achievements</h5>
                    <p className="text-xs text-gray-500">3/12 completed</p>
                  </div>
                  <div className="flex mt-4 space-x-3">
                    <div className="bg-black h-10 w-10 rounded-full flex items-center justify-center">
                      <Trophy size={18} className="text-white" />
                    </div>
                    <div className="bg-black h-10 w-10 rounded-full flex items-center justify-center">
                      <Award size={18} className="text-white" />
                    </div>
                    <div className="bg-black h-10 w-10 rounded-full flex items-center justify-center">
                      <Lightbulb size={18} className="text-white" />
                    </div>
                    <div className="bg-gray-200 h-10 w-10 rounded-full flex items-center justify-center">
                      <BookOpen size={18} className="text-gray-400" />
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

export default FinancialLiteracy;
