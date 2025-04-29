import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const Hero = () => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const paragraphRef = useRef(null);
  const ctaRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const heading = headingRef.current;
    const paragraph = paragraphRef.current;
    const cta = ctaRef.current;
    const image = imageRef.current;

    if (!section || !heading || !paragraph || !cta || !image) return;

    const tl = gsap.timeline();

    tl.from(heading, {
      opacity: 0,
      y: 50,
      duration: 1,
      ease: "power3.out",
    })
      .from(
        paragraph,
        {
          opacity: 0,
          y: 30,
          duration: 1,
          ease: "power3.out",
        },
        "-=0.6"
      )
      .from(
        cta,
        {
          opacity: 0,
          y: 30,
          duration: 0.8,
          ease: "power3.out",
        },
        "-=0.6"
      )
      .from(
        image,
        {
          opacity: 0,
          x: 50,
          duration: 1,
          ease: "power3.out",
        },
        "-=0.8"
      );
  }, []);

  return (
    <section
      ref={sectionRef}
      className="pt-32 pb-20 md:py-32 px-6 md:px-12 bg-gradient-to-b from-white to-gray-50"
      id="home"
    >
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="w-full md:w-1/2 mb-12 md:mb-0 pr-0 md:pr-12">
            <h1
              ref={headingRef}
              className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-gray-900 mb-6"
            >
              Financial <span className="text-black">Inclusion</span> For
              Everyone
            </h1>
            <p
              ref={paragraphRef}
              className="text-lg md:text-xl text-gray-700 mb-8 leading-relaxed"
            >
              Empowering underbanked communities with secure, transparent
              financial tools. Bridge cash and digital transactions, gain
              financial control, and build a better future.
            </p>
            <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4">
              <Link to={"/signup"}>
              <button className="bg-black cursor-pointer text-white px-8 py-4 rounded-full font-medium hover:shadow-gray-600 hover:shadow-lg duration-300 transition-all flex items-center justify-center">
                Get Started <ArrowRight size={20} className="ml-2" />
              </button>
              </Link>
              <a href="#features">
              <button  className="border-2 cursor-pointer  border-gray-300 text-gray-800 px-8 py-4 rounded-full font-medium hover:shadow-gray-600 shadow-lg duration-300 hover:border-gray-400 transition-all">
                Learn More
              </button>
              </a>
            </div>
          </div>
          <div ref={imageRef} className="w-full md:w-1/2 relative">
            <div className="bg-gradient-to-br from-gray-200 to-gray-300 rounded-2xl p-6 shadow-xl">
              <div className="rounded-xl bg-white p-6 shadow-sm">
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <p className="text-sm text-gray-500">Current Balance</p>
                    <p className="text-2xl font-bold">₹12,580.50</p>
                  </div>
                  
                </div>

                <div className="space-y-4 mb-6">
                  <div className="bg-gray-100 p-4 rounded-lg">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">Grocery Store</p>
                        <p className="text-sm text-gray-500">
                          Yesterday, 8:30 PM
                        </p>
                      </div>
                      <p className="font-medium text-red-500">-₹450.00</p>
                    </div>
                  </div>
                  <div className="bg-gray-100 p-4 rounded-lg">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">Salary Deposit</p>
                        <p className="text-sm text-gray-500">Mar 1, 10:00 AM</p>
                      </div>
                      <p className="font-medium text-green-500">+₹15,000.00</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-100 rounded-lg p-4">
                  <p className="text-sm text-gray-500 mb-1">Monthly Budget</p>
                  <div className="flex justify-between items-center mb-2">
                    <p className="font-medium">₹8,450 / ₹12,000</p>
                    <p className="text-sm text-gray-500">70%</p>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-black h-2 rounded-full"
                      style={{ width: "70%" }}
                    ></div>
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

export default Hero;
