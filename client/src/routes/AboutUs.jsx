import React from "react";
import { Users, Target, Award, Globe, Heart, Shield, X } from "lucide-react";

const AboutUs = () => {
  const stats = [
    { number: "50,000+", label: "Rural Families Served" },
    { number: "₹500Cr+", label: "Loans Disbursed" },
    { number: "1,200+", label: "Villages Reached" },
    { number: "98%", label: "Customer Satisfaction" },
  ];

  const team = [
    {
      name: "Rajesh Kumar",
      role: "Founder & CEO",
      image:
        "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400",
      description: "Former banker with 15+ years in rural finance",
    },
    {
      name: "Priya Sharma",
      role: "Head of Operations",
      image:
        "https://images.pexels.com/photos/3756679/pexels-photo-3756679.jpeg?auto=compress&cs=tinysrgb&w=400",
      description: "Expert in microfinance and rural development",
    },
    {
      name: "Amit Patel",
      role: "Technology Director",
      image:
        "https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=400",
      description: "Fintech innovator specializing in rural solutions",
    },
    {
      name: "Sunita Devi",
      role: "Community Relations",
      image:
        "https://images.pexels.com/photos/3756681/pexels-photo-3756681.jpeg?auto=compress&cs=tinysrgb&w=400",
      description: "Rural community advocate and social worker",
    },
  ];

  const values = [
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Empathy",
      description:
        "Understanding the unique challenges faced by rural communities",
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Trust",
      description:
        "Building lasting relationships through transparency and reliability",
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: "Innovation",
      description:
        "Leveraging technology to create accessible financial solutions",
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: "Inclusion",
      description:
        "Ensuring financial services reach every corner of rural India",
    },
  ];

  return (
    <div onClick={(e)=>e.stopPropagation()} className="w-10/12 p-5 py-6 h-11/12 bg-white rounded-xl shadow-lg">
      
      <div className="h-12/12 w-full overflow-y-auto rounded-xl">
        {/* Hero Section */}
        <section className="relative py-20 bg-black text-white overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-black"></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <Users className="w-16 h-16 mx-auto mb-6 opacity-90" />
            <h1 className="text-5xl font-bold mb-6 animate-fadeIn">
              About Rural-Fin
            </h1>
            <p className="text-xl  max-w-3xl mx-auto leading-relaxed opacity-90">
              Bridging the gap between rural communities and modern financial
              services through innovation, trust, and unwavering commitment to
              inclusive growth.
            </p>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 ">
            <div className="grid grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center group">
                  <div className="bg-white border-2 border-gray-300 rounded-2xl p-8 hover:border-black hover:shadow-xl transition-all duration-300">
                    <div className="text-4xl font-bold text-black mb-2  transition-all duration-300">
                      {stat.number}
                    </div>
                    <div className="text-gray-600 font-medium">
                      {stat.label}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-4xl font-bold text-black mb-8">
                  Our Story
                </h2>
                <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
                  <p>
                    Rural-Fin was born from a simple yet powerful observation:
                    millions of hardworking individuals in rural India lacked
                    access to fair and transparent financial services.
                    Traditional banking systems often overlooked these
                    communities, leaving them vulnerable to exploitative lending
                    practices.
                  </p>
                  <p>
                    Founded in 2018 by a team of passionate financial experts
                    and rural development advocates, Rural-Fin set out to
                    revolutionize how financial services are delivered to
                    India's rural heartland. We believed that technology could
                    be the great equalizer, bringing sophisticated financial
                    tools to even the most remote villages.
                  </p>
                  <p>
                    Today, we're proud to serve over 50,000 rural families
                    across 1,200+ villages, providing everything from microloans
                    and crop insurance to digital payment solutions and
                    financial literacy programs. Our journey has just begun.
                  </p>
                </div>
              </div>
              <div className="relative">
                <div className="bg-gray-100 border-2 border-gray-300 rounded-2xl hover:shadow-black/50 hover:shadow-lg transition-all duration-300">
                  <img
                    src="https://images.pexels.com/photos/1595385/pexels-photo-1595385.jpeg?auto=compress&cs=tinysrgb&w=800"
                    alt="Rural community"
                    className="rounded-xl shadow-lg transition-all duration-500"
                  />
                </div>
                <div className="absolute -bottom-6 -right-6 bg-black text-white p-6 rounded-xl shadow-lg border-2 border-white">
                  <div className="text-2xl font-bold">7+</div>
                  <div className="text-sm opacity-90">Years of Impact</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-black mb-4">
                Our Core Values
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                These principles guide every decision we make and every service
                we provide
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <div key={index} className="text-center group">
                  <div className="bg-white border-2 border-gray-300 rounded-2xl p-8 hover:border-black hover:shadow-xl transition-all duration-300">
                    <div className="bg-gray-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-black group-hover:text-white transition-all duration-300 border-2 border-gray-200 group-hover:border-black">
                      {value.icon}
                    </div>
                    <h3 className="text-xl font-semibold text-black mb-4">
                      {value.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {value.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-black mb-4">
                Meet Our Team
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Passionate professionals dedicated to transforming rural finance
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {team.map((member, index) => (
                <div
                  key={index}
                  className="bg-white border-2 border-gray-300 rounded-2xl shadow-lg overflow-hidden hover:shadow-xl hover:border-black transition-all duration-300 group"
                >
                  <div className="overflow-hidden">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-64 object-cover transition-all duration-500"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-black mb-2">
                      {member.name}
                    </h3>
                    <p className="text-gray-700 font-medium mb-3 border-b border-gray-200 pb-2">
                      {member.role}
                    </p>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {member.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Mission Statement */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white border-2 border-gray-300 rounded-2xl p-12 text-center hover:border-black transition-all duration-300">
              <Award className="w-16 h-16 mx-auto mb-6 text-gray-700" />
              <h2 className="text-3xl font-bold text-black mb-6">
                Our Mission
              </h2>
              <p className="text-xl text-gray-700 leading-relaxed mb-8">
                "To democratize financial services for rural India by leveraging
                technology, building trust, and creating sustainable economic
                opportunities that empower communities to thrive and prosper."
              </p>
              <div className="flex items-center justify-center space-x-4">
                <div className="h-px bg-gray-300 flex-1"></div>
                <div className="bg-black w-3 h-3 rounded-full"></div>
                <div className="h-px bg-gray-300 flex-1"></div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AboutUs;
