import React from 'react';
import { Target, Users, Lightbulb, TrendingUp, Shield, Globe } from 'lucide-react';

const Mission = () => {
  const goals = [
    {
      icon: <Users className="w-12 h-12" />,
      title: 'Financial Inclusion',
      description: 'Bring modern banking services to every rural household in India',
      target: '10 Million Families by 2030'
    },
    {
      icon: <Lightbulb className="w-12 h-12" />,
      title: 'Digital Literacy',
      description: 'Educate rural communities about digital financial tools and services',
      target: '5 Million People Trained'
    },
    {
      icon: <TrendingUp className="w-12 h-12" />,
      title: 'Economic Growth',
      description: 'Support rural entrepreneurship and agricultural development',
      target: '₹1000 Cr+ Loans Disbursed'
    },
    {
      icon: <Shield className="w-12 h-12" />,
      title: 'Financial Security',
      description: 'Provide insurance and risk management solutions for rural families',
      target: '100% Coverage Goal'
    }
  ];

  const initiatives = [
    {
      title: 'Mobile Banking Units',
      description: 'Bringing banking services directly to remote villages through our fleet of mobile banking units equipped with the latest technology.',
      image: 'https://images.pexels.com/photos/5650026/pexels-photo-5650026.jpeg?auto=compress&cs=tinysrgb&w=600'
    },
    {
      title: 'Farmer Producer Organizations',
      description: 'Supporting the formation and growth of FPOs to help farmers access better markets and financial services.',
      image: 'https://images.pexels.com/photos/2132227/pexels-photo-2132227.jpeg?auto=compress&cs=tinysrgb&w=600'
    },
    {
      title: 'Women Empowerment',
      description: 'Special programs focused on empowering rural women through microfinance and entrepreneurship support.',
      image: 'https://images.pexels.com/photos/8867482/pexels-photo-8867482.jpeg?auto=compress&cs=tinysrgb&w=600'
    },
    {
      title: 'Digital Payment Solutions',
      description: 'Introducing user-friendly digital payment systems designed specifically for rural communities.',
      image: 'https://images.pexels.com/photos/4968391/pexels-photo-4968391.jpeg?auto=compress&cs=tinysrgb&w=600'
    }
  ];

  return (
    <div onClick={(e)=>e.stopPropagation()} className="w-10/12 p-5 py-6 h-11/12 bg-white rounded-xl shadow-lg">
      <div className="h-12/12 w-full overflow-y-auto rounded-xl">
      
      {/* Hero Section */}
      <section className="relative py-20 bg-black text-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-black"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Target className="w-16 h-16 mx-auto mb-6 opacity-90" />
          <h1 className="text-5xl font-bold mb-6 animate-fadeIn">
            Our Mission
          </h1>
          <p className="text-xl  max-w-4xl mx-auto leading-relaxed opacity-90">
            To democratize financial services for rural India, empowering communities with 
            accessible, affordable, and innovative financial solutions that drive sustainable growth.
          </p>
        </div>
      </section>

      {/* Vision Statement */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold text-black mb-8">Our Vision</h2>
              <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
                <p>
                  We envision a rural India where every farmer, entrepreneur, and family has 
                  access to the financial tools they need to thrive. A future where geographical 
                  boundaries don't limit financial opportunities, and where technology serves 
                  as a bridge to prosperity.
                </p>
                <p>
                  By 2030, we aim to be the leading financial services provider for rural 
                  communities across India, known for our innovative solutions, deep community 
                  understanding, and unwavering commitment to inclusive growth.
                </p>
              </div>
              <div className="mt-8 p-6 bg-white border-l-4 rounded-r-xl border border-gray-200">
                <p className="text-black font-medium italic">
                  "Financial inclusion is not just about providing services; it's about 
                  empowering communities to build their own path to prosperity."
                </p>
                <p className="text-gray-600 mt-2 text-sm">- Rural-Fin Leadership Team</p>
              </div>
            </div>
            <div className="relative">
              <div className="bg-gray-100 rounded-2xl  hover:shadow-black/40 hover:shadow-lg transition-all duration-300">
                <img 
                  src="https://images.pexels.com/photos/1595385/pexels-photo-1595385.jpeg?auto=compress&cs=tinysrgb&w=800" 
                  alt="Rural development" 
                  className="rounded-xl shadow-lg transition-all duration-500"
                />
              </div>
              <div className="absolute -top-6 -left-6 bg-white border-2 border-gray-300 p-6 rounded-xl shadow-lg hover:border-black transition-all duration-300">
                <Globe className="w-8 h-8 text-gray-700 mb-2" />
                <div className="text-sm font-medium text-black">Global Impact</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Goals Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-black mb-4">Our Strategic Goals</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Measurable objectives that drive our mission forward
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {goals.map((goal, index) => (
              <div key={index} className="bg-white border-2 border-gray-300 rounded-2xl shadow-lg p-8 hover:shadow-xl hover:border-black transition-all duration-300 group">
                <div className="flex items-start space-x-6">
                  <div className="bg-gray-100 p-4 rounded-xl flex-shrink-0 border-2 border-gray-200 group-hover:bg-black group-hover:text-white group-hover:border-black transition-all duration-300">
                    <div className="text-gray-700 group-hover:text-white">{goal.icon}</div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-semibold text-black mb-3">{goal.title}</h3>
                    <p className="text-gray-600 mb-4 leading-relaxed">{goal.description}</p>
                    <div className="bg-gray-100 border border-gray-300 px-4 py-2 rounded-full inline-block">
                      <span className="text-black font-medium text-sm">{goal.target}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Key Initiatives */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-black mb-4">Key Initiatives</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Innovative programs designed to create lasting impact in rural communities
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {initiatives.map((initiative, index) => (
              <div key={index} className="group cursor-pointer">
                <div className="relative overflow-hidden rounded-2xl shadow-lg hover:shadow-black/50 hover:shadow-lg  transition-all duration-300">
                  <img 
                    src={initiative.image} 
                    alt={initiative.title}
                    className="w-full h-64 object-cover   "
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h3 className="text-xl font-semibold mb-2">{initiative.title}</h3>
                    <p className="text-sm opacity-90 leading-relaxed">{initiative.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Metrics */}
      <section className="py-20 bg-black text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Our Impact So Far</h2>
            <p className="text-xl opacity-90 max-w-3xl mx-auto">
              Real numbers that reflect our commitment to rural development
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center bg-white/10 border border-white/20 p-8 rounded-2xl hover:bg-white/20 transition-all duration-300">
              <div className="text-5xl font-bold mb-4">50,000+</div>
              <div className="text-xl opacity-90">Families Empowered</div>
              <div className="text-sm opacity-75 mt-2">Across 15 states in India</div>
            </div>
            <div className="text-center bg-white/10 border border-white/20 p-8 rounded-2xl hover:bg-white/20 transition-all duration-300">
              <div className="text-5xl font-bold mb-4">₹500Cr+</div>
              <div className="text-xl opacity-90">Credit Disbursed</div>
              <div className="text-sm opacity-75 mt-2">Supporting rural enterprises</div>
            </div>
            <div className="text-center bg-white/10 border border-white/20 p-8 rounded-2xl hover:bg-white/20 transition-all duration-300">
              <div className="text-5xl font-bold mb-4">1,200+</div>
              <div className="text-xl opacity-90">Villages Reached</div>
              <div className="text-sm opacity-75 mt-2">From remote to semi-urban</div>
            </div>
          </div>
        </div>
      </section>

      
      </div>
    </div>
  );
};

export default Mission;