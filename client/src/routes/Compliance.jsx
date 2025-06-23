import React from 'react';
import { Shield, CheckCircle, FileText, Award, AlertTriangle, Users } from 'lucide-react';

const Compliance = () => {
  const regulations = [
    {
      title: 'Reserve Bank of India (RBI)',
      description: 'Compliance with all RBI guidelines for NBFC operations',
      status: 'Compliant',
      details: [
        'NBFC registration and licensing',
        'Capital adequacy requirements',
        'Asset classification norms',
        'Provisioning requirements',
        'Fair practices code implementation'
      ]
    },
    {
      title: 'Prevention of Money Laundering Act (PMLA)',
      description: 'Anti-money laundering and counter-terrorism financing measures',
      status: 'Compliant',
      details: [
        'Customer Due Diligence (CDD) procedures',
        'Suspicious transaction reporting',
        'Record keeping requirements',
        'Employee training programs',
        'Regular compliance audits'
      ]
    },
    {
      title: 'Information Technology Act, 2000',
      description: 'Data protection and cybersecurity compliance',
      status: 'Compliant',
      details: [
        'Data encryption and security',
        'Privacy policy implementation',
        'Incident response procedures',
        'Regular security assessments',
        'Employee data handling training'
      ]
    },
    {
      title: 'Consumer Protection Act, 2019',
      description: 'Consumer rights and fair business practices',
      status: 'Compliant',
      details: [
        'Transparent pricing and terms',
        'Grievance redressal mechanism',
        'Fair debt collection practices',
        'Consumer education programs',
        'Regular customer feedback analysis'
      ]
    }
  ];

  const certifications = [
    {
      name: 'ISO 27001:2013',
      description: 'Information Security Management System',
      issuer: 'International Organization for Standardization',
      validUntil: 'December 2025',
      icon: <Shield className="w-8 h-8" />
    },
    {
      name: 'PCI DSS Level 1',
      description: 'Payment Card Industry Data Security Standard',
      issuer: 'PCI Security Standards Council',
      validUntil: 'March 2025',
      icon: <Award className="w-8 h-8" />
    },
    {
      name: 'SOC 2 Type II',
      description: 'Service Organization Control 2',
      issuer: 'American Institute of CPAs',
      validUntil: 'June 2025',
      icon: <FileText className="w-8 h-8" />
    }
  ];

  const auditResults = [
    {
      year: '2024',
      auditor: 'KPMG India',
      type: 'Financial & Compliance Audit',
      result: 'Clean Opinion',
      keyFindings: [
        'Strong internal controls',
        'Effective risk management',
        'Compliance with regulatory requirements',
        'Robust IT security framework'
      ]
    },
    {
      year: '2023',
      auditor: 'Deloitte India',
      type: 'Information Security Audit',
      result: 'Satisfactory',
      keyFindings: [
        'Adequate security controls',
        'Effective incident response',
        'Regular security training',
        'Continuous monitoring systems'
      ]
    }
  ];

  const riskManagement = [
    {
      category: 'Credit Risk',
      measures: [
        'Comprehensive credit scoring models',
        'Regular portfolio monitoring',
        'Diversification strategies',
        'Stress testing procedures'
      ]
    },
    {
      category: 'Operational Risk',
      measures: [
        'Business continuity planning',
        'Process automation and controls',
        'Regular staff training',
        'Vendor risk management'
      ]
    },
    {
      category: 'Technology Risk',
      measures: [
        'Multi-layered security architecture',
        'Regular penetration testing',
        'Data backup and recovery',
        'Cybersecurity incident response'
      ]
    },
    {
      category: 'Regulatory Risk',
      measures: [
        'Continuous regulatory monitoring',
        'Compliance training programs',
        'Regular policy updates',
        'External compliance reviews'
      ]
    }
  ];

  return (
    <div onClick={(e)=>e.stopPropagation()} className="w-10/12 p-5 py-6 h-11/12 bg-white rounded-xl shadow-lg">
      <div className='h-12/12 w-full overflow-y-auto rounded-xl'>
      {/* Hero Section */}
      <section className="relative py-20 bg-black text-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-black"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Shield className="w-16 h-16 mx-auto mb-6 opacity-90" />
          <h1 className="text-4xl md:text-5xl  font-bold mb-6 animate-fadeIn">
            Compliance & Governance
          </h1>
          <p className="text-xl max-w-4xl mx-auto leading-relaxed opacity-90">
            Maintaining the highest standards of regulatory compliance, risk management, 
            and corporate governance to protect our customers and stakeholders.
          </p>
        </div>
      </section>

      {/* Compliance Overview */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-black mb-4">Regulatory Compliance</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We adhere to all applicable laws and regulations governing financial services in India
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {regulations.map((regulation, index) => (
              <div key={index} className="bg-white border-2 border-gray-300 rounded-2xl shadow-lg p-8 hover:shadow-xl hover:border-black transition-all duration-300">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-black mb-2">{regulation.title}</h3>
                    <p className="text-gray-600 mb-4">{regulation.description}</p>
                  </div>
                  <div className="flex items-center space-x-2 bg-gray-100 px-3 py-1 rounded-full border border-gray-300">
                    <CheckCircle className="w-4 h-4 text-gray-700" />
                    <span className="text-gray-800 text-sm font-medium">{regulation.status}</span>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-black mb-3">Key Compliance Areas:</h4>
                  <ul className="space-y-2">
                    {regulation.details.map((detail, detailIndex) => (
                      <li key={detailIndex} className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-black rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-gray-700 text-sm">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-black mb-4">Certifications & Standards</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Industry-recognized certifications that validate our commitment to security and quality
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {certifications.map((cert, index) => (
              <div key={index} className="bg-white border-2 border-gray-300 rounded-2xl shadow-lg p-8 text-center hover:shadow-xl hover:border-black transition-all duration-300 group">
                <div className="bg-gray-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-black group-hover:text-white transition-all duration-300 border-2 border-gray-200 group-hover:border-black">
                  <div className="text-gray-700 group-hover:text-white">{cert.icon}</div>
                </div>
                <h3 className="text-xl font-semibold text-black mb-3">{cert.name}</h3>
                <p className="text-gray-600 mb-4">{cert.description}</p>
                <div className="space-y-2 text-sm text-gray-500">
                  <p><strong>Issued by:</strong> {cert.issuer}</p>
                  <p><strong>Valid until:</strong> {cert.validUntil}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Risk Management */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-black mb-4">Risk Management Framework</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive risk management strategies to protect our business and customers
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {riskManagement.map((risk, index) => (
              <div key={index} className="bg-white border-2 border-gray-300 rounded-xl p-6 hover:border-black transition-all duration-300">
                <h3 className="text-lg font-semibold text-black mb-4 border-b border-gray-200 pb-2">{risk.category}</h3>
                <ul className="space-y-2">
                  {risk.measures.map((measure, measureIndex) => (
                    <li key={measureIndex} className="flex items-start space-x-2">
                      <CheckCircle className="w-4 h-4 text-gray-600 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700 text-sm">{measure}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Audit Results */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-black mb-4">Independent Audit Results</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Regular independent audits ensure transparency and accountability
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {auditResults.map((audit, index) => (
              <div key={index} className="bg-white border-2 border-gray-300 rounded-2xl shadow-lg p-8 hover:border-black transition-all duration-300">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-2xl font-semibold text-black">{audit.year} Audit</h3>
                    <p className="text-gray-600">{audit.type}</p>
                  </div>
                  <div className="text-right">
                    <div className="bg-gray-100 border border-gray-300 px-4 py-2 rounded-full">
                      <span className="text-black font-medium">{audit.result}</span>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">{audit.auditor}</p>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-black mb-3">Key Findings:</h4>
                  <ul className="space-y-2">
                    {audit.keyFindings.map((finding, findingIndex) => (
                      <li key={findingIndex} className="flex items-start space-x-3">
                        <CheckCircle className="w-4 h-4 text-gray-600 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700 text-sm">{finding}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Governance Structure */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-black mb-4">Corporate Governance</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Strong governance structure ensuring ethical business practices and stakeholder protection
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white border-2 border-gray-300 rounded-xl p-8 hover:border-black transition-all duration-300">
              <Users className="w-12 h-12 text-gray-700 mb-4" />
              <h3 className="text-xl font-semibold text-black mb-4">Board of Directors</h3>
              <ul className="space-y-2 text-gray-700 text-sm">
                <li>• Independent directors (60%)</li>
                <li>• Diverse expertise and experience</li>
                <li>• Regular board meetings</li>
                <li>• Transparent decision-making</li>
              </ul>
            </div>
            <div className="bg-white border-2 border-gray-300 rounded-xl p-8 hover:border-black transition-all duration-300">
              <Shield className="w-12 h-12 text-gray-700 mb-4" />
              <h3 className="text-xl font-semibold text-black mb-4">Audit Committee</h3>
              <ul className="space-y-2 text-gray-700 text-sm">
                <li>• Independent oversight</li>
                <li>• Financial reporting review</li>
                <li>• Internal control assessment</li>
                <li>• External auditor coordination</li>
              </ul>
            </div>
            <div className="bg-white border-2 border-gray-300 rounded-xl p-8 hover:border-black transition-all duration-300">
              <AlertTriangle className="w-12 h-12 text-gray-700 mb-4" />
              <h3 className="text-xl font-semibold text-black mb-4">Risk Committee</h3>
              <ul className="space-y-2 text-gray-700 text-sm">
                <li>• Risk strategy oversight</li>
                <li>• Risk appetite monitoring</li>
                <li>• Compliance supervision</li>
                <li>• Crisis management planning</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Whistleblower Policy */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gray-50 border-2 border-gray-300 rounded-2xl p-8 hover:border-black transition-all duration-300">
            <div className="text-center mb-8">
              <AlertTriangle className="w-12 h-12 text-gray-700 mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-black mb-4">Whistleblower Policy</h2>
              <p className="text-gray-700">
                We encourage reporting of any unethical behavior, fraud, or compliance violations
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-black mb-4">Reporting Channels</h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-black rounded-full"></div>
                    <span>Anonymous hotline: 1800-XXX-XXXX</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-black rounded-full"></div>
                    <span>Email: ethics@rural-fin.com</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-black rounded-full"></div>
                    <span>Online portal (secure & anonymous)</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-black rounded-full"></div>
                    <span>Direct to Audit Committee</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-black mb-4">Protection Guaranteed</h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-center space-x-3">
                    <CheckCircle className="w-4 h-4 text-gray-600" />
                    <span>Complete confidentiality</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <CheckCircle className="w-4 h-4 text-gray-600" />
                    <span>No retaliation policy</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <CheckCircle className="w-4 h-4 text-gray-600" />
                    <span>Independent investigation</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <CheckCircle className="w-4 h-4 text-gray-600" />
                    <span>Legal protection</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-black text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Compliance Inquiries</h2>
          <p className="text-xl mb-8 opacity-90">
            For questions about our compliance practices or to report concerns
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white/10 border border-white/20 p-6 rounded-xl hover:bg-white/20 transition-all duration-300">
              <h3 className="font-semibold mb-2">Compliance Officer</h3>
              <p className="text-sm opacity-90">compliance@rural-fin.com</p>
            </div>
            <div className="bg-white/10 border border-white/20 p-6 rounded-xl hover:bg-white/20 transition-all duration-300">
              <h3 className="font-semibold mb-2">Legal Department</h3>
              <p className="text-sm opacity-90">ruralfin@gmail.com</p>
            </div>
            <div className="bg-white/10 border border-white/20 p-6 rounded-xl hover:bg-white/20 transition-all duration-300">
              <h3 className="font-semibold mb-2">Ethics Hotline</h3>
              <p className="text-sm opacity-90">+91 98765 43210</p>
            </div>
          </div>
        </div>
      </section>
      </div>
    </div>
  );
};

export default Compliance;