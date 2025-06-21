import React from 'react';
import { Shield, Eye, Lock, Database, UserCheck, AlertTriangle } from 'lucide-react';

const PrivacyPolicy = () => {
  const sections = [
    {
      icon: <Database className="w-6 h-6" />,
      title: 'Information We Collect',
      content: [
        'Personal identification information (Name, email, phone number, address)',
        'Financial information (Income, employment details, credit history)',
        'Device and usage information (IP address, browser type, app usage)',
        'Location data (for service delivery and fraud prevention)',
        'Biometric data (for identity verification, where legally permitted)',
        'Communication records (customer service interactions, feedback)'
      ]
    },
    {
      icon: <Eye className="w-6 h-6" />,
      title: 'How We Use Your Information',
      content: [
        'Process loan applications and financial service requests',
        'Verify identity and prevent fraud',
        'Provide customer support and respond to inquiries',
        'Send important service updates and notifications',
        'Improve our services through data analysis',
        'Comply with legal and regulatory requirements',
        'Conduct risk assessment and credit scoring'
      ]
    },
    {
      icon: <UserCheck className="w-6 h-6" />,
      title: 'Information Sharing',
      content: [
        'Credit bureaus and financial institutions (for credit assessment)',
        'Regulatory authorities (as required by law)',
        'Service providers and business partners (under strict confidentiality)',
        'Legal authorities (when required by court orders or investigations)',
        'We never sell your personal information to third parties',
        'All sharing is done with appropriate safeguards and consent'
      ]
    },
    {
      icon: <Lock className="w-6 h-6" />,
      title: 'Data Security',
      content: [
        'End-to-end encryption for all sensitive data transmission',
        'Multi-factor authentication for account access',
        'Regular security audits and penetration testing',
        'Secure data centers with 24/7 monitoring',
        'Employee training on data protection best practices',
        'Incident response procedures for potential breaches'
      ]
    }
  ];

  const rights = [
    'Access your personal data and obtain copies',
    'Correct inaccurate or incomplete information',
    'Request deletion of your data (subject to legal requirements)',
    'Object to processing of your personal data',
    'Request data portability to another service provider',
    'Withdraw consent for data processing (where applicable)',
    'File complaints with data protection authorities'
  ];

  return (
    <div onClick={(e)=>e.stopPropagation()} className="w-10/12 p-5 py-6 h-11/12 bg-white rounded-xl shadow-lg">
      <div className='h-12/12 w-full overflow-y-auto rounded-xl'>
      {/* Hero Section */}
      <section className="relative py-20 bg-black text-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-black"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Shield className="w-16 h-16 mx-auto mb-6 opacity-90" />
          <h1 className="text-5xl font-bold mb-6 animate-fadeIn">
            Privacy Policy
          </h1>
          <p className="text-xl  max-w-4xl mx-auto leading-relaxed opacity-90">
            Your privacy is our priority. Learn how we collect, use, and protect your personal information.
          </p>
          <div className="mt-8 text-sm opacity-75">
            Last updated: January 15, 2025
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            <p className="text-xl text-gray-700 leading-relaxed mb-8">
              At Rural-Fin, we are committed to protecting your privacy and ensuring the security 
              of your personal information. This Privacy Policy explains how we collect, use, 
              disclose, and safeguard your information when you use our financial services, 
              website, and mobile applications.
            </p>
            <div className="bg-white border-l-4 border-black p-6 rounded-r-lg border border-gray-200">
              <p className="text-black font-medium">
                By using our services, you consent to the collection and use of your information 
                as described in this policy. We encourage you to read this policy carefully and 
                contact us if you have any questions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Sections */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {sections.map((section, index) => (
              <div key={index} className="bg-white border-2 border-gray-300 rounded-2xl shadow-lg p-8 hover:shadow-xl hover:border-black transition-all duration-300">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="bg-gray-100 p-3 rounded-xl border border-gray-200">
                    <div className="text-gray-700">{section.icon}</div>
                  </div>
                  <h3 className="text-2xl font-semibold text-black">{section.title}</h3>
                </div>
                <ul className="space-y-3">
                  {section.content.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-black rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-700 leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Your Rights */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-black mb-4">Your Privacy Rights</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              You have several rights regarding your personal data under applicable privacy laws
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rights.map((right, index) => (
              <div key={index} className="bg-white border border-gray-300 p-6 rounded-xl hover:border-black transition-all duration-300">
                <div className="flex items-start space-x-3">
                  <UserCheck className="w-5 h-5 text-gray-600 mt-1 flex-shrink-0" />
                  <span className="text-black font-medium">{right}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Data Retention */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white border-2 border-gray-300 rounded-2xl shadow-lg p-8 hover:border-black transition-all duration-300">
            <h3 className="text-3xl font-bold text-black mb-6">Data Retention</h3>
            <div className="space-y-6 text-gray-700">
              <p className="text-lg leading-relaxed">
                We retain your personal information only for as long as necessary to fulfill the 
                purposes for which it was collected, comply with legal obligations, resolve disputes, 
                and enforce our agreements.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 border border-gray-200 p-6 rounded-xl">
                  <h4 className="font-semibold text-black mb-3">Account Information</h4>
                  <p className="text-sm">Retained for the duration of your account plus 7 years for regulatory compliance</p>
                </div>
                <div className="bg-gray-50 border border-gray-200 p-6 rounded-xl">
                  <h4 className="font-semibold text-black mb-3">Transaction Records</h4>
                  <p className="text-sm">Maintained for 10 years as required by financial regulations</p>
                </div>
                <div className="bg-gray-50 border border-gray-200 p-6 rounded-xl">
                  <h4 className="font-semibold text-black mb-3">Communication Logs</h4>
                  <p className="text-sm">Kept for 3 years for quality assurance and dispute resolution</p>
                </div>
                <div className="bg-gray-50 border border-gray-200 p-6 rounded-xl">
                  <h4 className="font-semibold text-black mb-3">Marketing Data</h4>
                  <p className="text-sm">Deleted immediately upon withdrawal of consent</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cookies and Tracking */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white border-2 border-gray-300 rounded-2xl p-8 hover:border-black transition-all duration-300">
            <h3 className="text-3xl font-bold text-black mb-6">Cookies and Tracking Technologies</h3>
            <div className="space-y-6 text-gray-700">
              <p className="text-lg leading-relaxed">
                We use cookies and similar technologies to enhance your experience, analyze usage patterns, 
                and provide personalized services. You can control cookie preferences through your browser settings.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gray-50 border border-gray-200 p-4 rounded-lg">
                  <h4 className="font-semibold text-black mb-2">Essential Cookies</h4>
                  <p className="text-sm">Required for basic website functionality</p>
                </div>
                <div className="bg-gray-50 border border-gray-200 p-4 rounded-lg">
                  <h4 className="font-semibold text-black mb-2">Analytics Cookies</h4>
                  <p className="text-sm">Help us understand how you use our services</p>
                </div>
                <div className="bg-gray-50 border border-gray-200 p-4 rounded-lg">
                  <h4 className="font-semibold text-black mb-2">Marketing Cookies</h4>
                  <p className="text-sm">Used to deliver relevant advertisements</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      
      </div>
    </div>
  );
};

export default PrivacyPolicy;