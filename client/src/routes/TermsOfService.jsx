import React from "react";
import {
  FileText,
  Scale,
  AlertCircle,
  CheckCircle,
  XCircle,
  Users,
} from "lucide-react";

const TermsOfService = () => {
  const sections = [
    {
      title: "Service Description",
      icon: <FileText className="w-6 h-6" />,
      content: [
        "Rural-Fin provides financial services including microloans, digital payments, insurance products, and financial literacy programs",
        "Services are available through our website, mobile application, and authorized agents",
        "We reserve the right to modify, suspend, or discontinue services with appropriate notice",
        "Service availability may vary by location and regulatory requirements",
      ],
    },
    {
      title: "User Responsibilities",
      icon: <Users className="w-6 h-6" />,
      content: [
        "Provide accurate and complete information during registration and application processes",
        "Maintain the confidentiality of your account credentials",
        "Use services only for lawful purposes and in accordance with these terms",
        "Notify us immediately of any unauthorized use of your account",
        "Comply with all applicable laws and regulations",
        "Keep your contact information updated",
      ],
    },
    {
      title: "Financial Terms",
      icon: <Scale className="w-6 h-6" />,
      content: [
        "Interest rates and fees are clearly disclosed before loan approval",
        "Repayment schedules are binding and must be adhered to",
        "Late payment charges apply as per the loan agreement",
        "Prepayment of loans is allowed with applicable charges",
        "All financial transactions are subject to applicable taxes",
        "Currency conversion rates (if applicable) are based on prevailing market rates",
      ],
    },
  ];

  const prohibitedActivities = [
    "Providing false or misleading information",
    "Using services for illegal activities or money laundering",
    "Attempting to circumvent security measures",
    "Sharing account credentials with unauthorized persons",
    "Using automated systems to access our services without permission",
    "Engaging in fraudulent activities or identity theft",
  ];

  const terminationReasons = [
    "Violation of these Terms of Service",
    "Fraudulent or suspicious activity",
    "Non-payment of outstanding dues",
    "Providing false information",
    "Regulatory or legal requirements",
    "User request for account closure",
  ];

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="w-10/12 p-5 py-6 h-11/12 bg-white rounded-xl shadow-lg"
    >
      <div className="h-12/12 w-full overflow-y-auto rounded-xl">
        {/* Hero Section */}
        <section className="relative py-20 bg-black text-white overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-black"></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <Scale className="w-16 h-16 mx-auto mb-6 opacity-90" />
            <h1 className="text-5xl  font-bold mb-6 animate-fadeIn">
              Terms of Service
            </h1>
            <p className="text-xl max-w-4xl mx-auto leading-relaxed opacity-90">
              Please read these terms carefully before using our financial
              services. Your use of Rural-Fin services constitutes acceptance of
              these terms.
            </p>
            <div className="mt-8 text-sm opacity-75">
              Effective Date: January 15, 2025 | Last Updated: January 15, 2025
            </div>
          </div>
        </section>

        {/* Agreement Notice */}
        <section className="py-12 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white border-l-4 border-black p-6 rounded-r-lg border border-gray-200">
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-6 h-6 text-gray-700 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-lg font-semibold text-black mb-2">
                    Agreement to Terms
                  </h3>
                  <p className="text-gray-700">
                    By accessing and using Rural-Fin services, you acknowledge
                    that you have read, understood, and agree to be bound by
                    these Terms of Service and our Privacy Policy. If you do not
                    agree to these terms, please do not use our services.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Main Sections */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {sections.map((section, index) => (
                <div
                  key={index}
                  className="bg-white border-2 border-gray-300 rounded-2xl shadow-lg p-8 hover:shadow-xl hover:border-black transition-all duration-300"
                >
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="bg-gray-100 p-3 rounded-xl border border-gray-200">
                      <div className="text-gray-700">{section.icon}</div>
                    </div>
                    <h3 className="text-xl font-semibold text-black">
                      {section.title}
                    </h3>
                  </div>
                  <ul className="space-y-3">
                    {section.content.map((item, itemIndex) => (
                      <li
                        key={itemIndex}
                        className="flex items-start space-x-3"
                      >
                        <div className="w-2 h-2 bg-black rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-gray-700 text-sm leading-relaxed">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Eligibility Criteria */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-black mb-8 text-center">
              Eligibility Criteria
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white border border-gray-300 p-6 rounded-xl hover:border-black transition-all duration-300">
                <h3 className="text-xl font-semibold text-black mb-4">
                  Individual Users
                </h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 flex-shrink-0 text-gray-600" />
                    <span>Must be 18 years or older</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 flex-shrink-0 text-gray-600" />
                    <span>Valid government-issued ID</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 flex-shrink-0 text-gray-600" />
                    <span>Proof of income and residence</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 flex-shrink-0 text-gray-600" />
                    <span>Active bank account</span>
                  </li>
                </ul>
              </div>
              <div className="bg-white border border-gray-300 p-6 rounded-xl hover:border-black transition-all duration-300">
                <h3 className="text-xl font-semibold text-black mb-4">
                  Business Users
                </h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 flex-shrink-0 text-gray-600" />
                    <span>Valid business registration</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 flex-shrink-0 text-gray-600" />
                    <span>Tax identification number</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 flex-shrink-0 text-gray-600" />
                    <span>Business bank account</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 flex-shrink-0 text-gray-600" />
                    <span>Financial statements</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Prohibited Activities */}
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-gray-50 border-2 border-gray-300 rounded-2xl p-8 hover:border-black transition-all duration-300">
              <div className="flex items-center space-x-4 mb-6">
                <XCircle className="w-8 h-8 text-gray-700" />
                <h2 className="text-3xl font-bold text-black">
                  Prohibited Activities
                </h2>
              </div>
              <p className="text-gray-700 mb-6">
                The following activities are strictly prohibited when using
                Rural-Fin services:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {prohibitedActivities.map((activity, index) => (
                  <div
                    key={index}
                    className="flex items-start space-x-3 bg-white p-4 rounded-lg border border-gray-300"
                  >
                    <XCircle className="w-5 h-5 text-gray-600 mt-0.5 flex-shrink-0" />
                    <span className="text-black text-sm">{activity}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Loan Terms */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-black mb-8 text-center">
              Loan Terms & Conditions
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white border border-gray-300 p-6 rounded-xl hover:border-black transition-all duration-300">
                <h3 className="text-xl font-semibold text-black mb-4">
                  Interest Rates
                </h3>
                <ul className="space-y-2 text-gray-700 text-sm">
                  <li>• Rates vary from 12% to 24% per annum</li>
                  <li>• Based on credit profile and loan type</li>
                  <li>• Fixed rates for the loan tenure</li>
                  <li>• No hidden charges or fees</li>
                </ul>
              </div>
              <div className="bg-white border border-gray-300 p-6 rounded-xl hover:border-black transition-all duration-300">
                <h3 className="text-xl font-semibold text-black mb-4">
                  Repayment Terms
                </h3>
                <ul className="space-y-2 text-gray-700 text-sm">
                  <li>• Flexible tenure from 6 to 60 months</li>
                  <li>• Monthly EMI payments</li>
                  <li>• Grace period of 7 days</li>
                  <li>• Prepayment allowed with minimal charges</li>
                </ul>
              </div>
              <div className="bg-white border border-gray-300 p-6 rounded-xl hover:border-black transition-all duration-300">
                <h3 className="text-xl font-semibold text-black mb-4">
                  Default & Recovery
                </h3>
                <ul className="space-y-2 text-gray-700 text-sm">
                  <li>• Late payment charges: 2% per month</li>
                  <li>• Credit bureau reporting for defaults</li>
                  <li>• Legal action for non-payment</li>
                  <li>• Asset recovery as per agreement</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Account Termination */}
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-gray-50 border-2 border-gray-300 rounded-2xl p-8 hover:border-black transition-all duration-300">
              <div className="flex items-center space-x-4 mb-6">
                <AlertCircle className="w-8 h-8 text-gray-700" />
                <h2 className="text-3xl font-bold text-black">
                  Account Termination
                </h2>
              </div>
              <p className="text-gray-700 mb-6">
                We reserve the right to suspend or terminate your account under
                the following circumstances:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {terminationReasons.map((reason, index) => (
                  <div
                    key={index}
                    className="flex items-start space-x-3 bg-white p-4 rounded-lg border border-gray-300"
                  >
                    <AlertCircle className="w-5 h-5 text-gray-600 mt-0.5 flex-shrink-0" />
                    <span className="text-black text-sm">{reason}</span>
                  </div>
                ))}
              </div>
              <div className="mt-6 p-4 bg-white border border-gray-300 rounded-lg">
                <p className="text-black text-sm">
                  <strong>Notice:</strong> We will provide reasonable notice
                  before termination unless immediate action is required for
                  security or legal reasons. Outstanding dues must be settled
                  before account closure.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Limitation of Liability */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-black mb-8 text-center">
              Limitation of Liability
            </h2>
            <div className="bg-white  border-gray-300 p-8 rounded-xl border-2 hover:border-black transition-all duration-300">
              <div className="space-y-6 text-gray-700">
                <p className="text-lg">
                  Rural-Fin's liability is limited to the maximum extent
                  permitted by law. We are not liable for:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-black mb-3">
                      Direct Damages
                    </h4>
                    <ul className="space-y-2 text-sm">
                      <li>• Service interruptions or downtime</li>
                      <li>• Data loss or corruption</li>
                      <li>• Unauthorized access to accounts</li>
                      <li>• Third-party service failures</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-black mb-3">
                      Indirect Damages
                    </h4>
                    <ul className="space-y-2 text-sm">
                      <li>• Loss of profits or business</li>
                      <li>• Consequential damages</li>
                      <li>• Punitive damages</li>
                      <li>• Opportunity costs</li>
                    </ul>
                  </div>
                </div>
                <div className="bg-gray-50 border border-gray-300 p-4 rounded-lg">
                  <p className="text-black text-sm">
                    <strong>Maximum Liability:</strong> Our total liability
                    shall not exceed the amount of fees paid by you in the 12
                    months preceding the claim.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Governing Law */}
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white border-2 border-gray-300 rounded-2xl shadow-lg p-8 hover:border-black transition-all duration-300">
              <h2 className="text-3xl font-bold text-black mb-6">
                Governing Law & Dispute Resolution
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold text-black mb-4">
                    Applicable Law
                  </h3>
                  <div className="space-y-3 text-gray-700">
                    <p>
                      These terms are governed by the laws of India, including:
                    </p>
                    <ul className="space-y-2 text-sm">
                      <li>• Reserve Bank of India (RBI) regulations</li>
                      <li>• Information Technology Act, 2000</li>
                      <li>• Consumer Protection Act, 2019</li>
                      <li>• Indian Contract Act, 1872</li>
                    </ul>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-black mb-4">
                    Dispute Resolution
                  </h3>
                  <div className="space-y-3 text-gray-700">
                    <p>Disputes will be resolved through:</p>
                    <ol className="space-y-2 text-sm">
                      <li>1. Direct negotiation and mediation</li>
                      <li>2. RBI Ombudsman (for banking disputes)</li>
                      <li>3. Arbitration under Indian Arbitration Act</li>
                      <li>4. Courts in New Delhi, India</li>
                    </ol>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Information */}
        <section className="py-16 bg-black text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-6">
              Questions About These Terms?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Contact our legal team for clarification on any aspect of these
              Terms of Service
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white/10 border border-white/20 p-6 rounded-xl hover:bg-white/20 transition-all duration-300">
                <h3 className="font-semibold mb-2">Email</h3>
                <p className="text-sm opacity-90">ruralfin@gmail.com</p>
              </div>
              <div className="bg-white/10 border border-white/20 p-6 rounded-xl hover:bg-white/20 transition-all duration-300">
                <h3 className="font-semibold mb-2">Phone</h3>
                <p className="text-sm opacity-90">+91 98765 43210</p>
              </div>
              <div className="bg-white/10 border border-white/20 p-6 rounded-xl hover:bg-white/20 transition-all duration-300">
                <h3 className="font-semibold mb-2">Address</h3>
                <p className="text-sm opacity-90">123 Financial Dist., Mumbai, India</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default TermsOfService;
