import React from "react";
import {
  Award,
  FileText,
  CheckCircle,
  Calendar,
  Building,
  Globe,
} from "lucide-react";

const Licenses = () => {
  const primaryLicenses = [
    {
      name: "Non-Banking Financial Company (NBFC) License",
      authority: "Reserve Bank of India (RBI)",
      licenseNumber: "N-14.03268",
      issueDate: "March 15, 2018",
      validUntil: "Perpetual (Subject to compliance)",
      description:
        "Authorizes Rural-Fin to conduct non-banking financial activities including lending, investment, and other financial services.",
      scope: [
        "Microfinance operations",
        "Small business lending",
        "Agricultural finance",
        "Digital payment services",
        "Investment advisory services",
      ],
      status: "Active",
    },
    {
      name: "Certificate of Registration",
      authority: "Ministry of Corporate Affairs",
      licenseNumber: "U65923DL2018PTC331234",
      issueDate: "February 10, 2018",
      validUntil: "Perpetual",
      description:
        "Corporate registration certificate establishing Rural-Fin as a legal entity under the Companies Act, 2013.",
      scope: [
        "Corporate entity establishment",
        "Business operations authorization",
        "Legal compliance framework",
        "Regulatory reporting requirements",
      ],
      status: "Active",
    },
  ];

  const operationalLicenses = [
    {
      name: "GST Registration",
      authority: "Goods and Services Tax Network",
      number: "07AABCR1234M1Z5",
      validUntil: "March 2025",
      status: "Active",
    },
    {
      name: "Professional Tax Registration",
      authority: "Delhi Government",
      number: "PT-DL-2018-001234",
      validUntil: "March 2025",
      status: "Active",
    },
    {
      name: "Shops & Establishment License",
      authority: "Municipal Corporation of Delhi",
      number: "SE-DL-2018-005678",
      validUntil: "February 2025",
      status: "Active",
    },
    {
      name: "Fire Safety Certificate",
      authority: "Delhi Fire Service",
      number: "FS-DL-2024-001122",
      validUntil: "January 2026",
      status: "Active",
    },
  ];

  const digitalLicenses = [
    {
      name: "Digital Signature Certificate",
      authority: "Controller of Certifying Authorities",
      type: "Class 3 Organization Certificate",
      validUntil: "December 2025",
      usage: "Digital document signing and authentication",
    },
    {
      name: "SSL Certificate",
      authority: "DigiCert Inc.",
      type: "Extended Validation SSL",
      validUntil: "November 2025",
      usage: "Website security and data encryption",
    },
    {
      name: "API Security Certificate",
      authority: "Verisign",
      type: "Code Signing Certificate",
      validUntil: "October 2025",
      usage: "Mobile app and API security",
    },
  ];

  const complianceCertificates = [
    {
      name: "ISO 27001:2013",
      description: "Information Security Management System",
      issuer: "Bureau Veritas Certification",
      certificateNumber: "IN-2023-ISO27001-001234",
      issueDate: "June 15, 2023",
      validUntil: "June 14, 2026",
      scope: "Information security management for financial services",
    },
    {
      name: "PCI DSS Compliance",
      description: "Payment Card Industry Data Security Standard",
      issuer: "Trustwave",
      certificateNumber: "PCI-2024-001234",
      issueDate: "January 10, 2024",
      validUntil: "January 9, 2025",
      scope: "Secure handling of payment card information",
    },
    {
      name: "SOC 2 Type II",
      description: "Service Organization Control 2",
      issuer: "KPMG India",
      certificateNumber: "SOC2-2024-001234",
      issueDate: "March 20, 2024",
      validUntil: "March 19, 2025",
      scope: "Security, availability, and confidentiality controls",
    },
  ];

  const partnerships = [
    {
      name: "Banking Partner Authorization",
      partner: "State Bank of India",
      type: "Business Correspondent Agreement",
      services: "Banking services in rural areas",
      validUntil: "December 2025",
    },
    {
      name: "Insurance Partner License",
      partner: "HDFC ERGO General Insurance",
      type: "Corporate Agent License",
      services: "General insurance products distribution",
      validUntil: "March 2026",
    },
    {
      name: "Mutual Fund Distributor",
      partner: "Association of Mutual Funds in India",
      type: "AMFI Registration",
      services: "Mutual fund distribution services",
      validUntil: "April 2025",
    },
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
            <Award className="w-16 h-16 mx-auto mb-6 opacity-90" />
            <h1 className="text-5xl font-bold mb-6 animate-fadeIn">
              Licenses & Certifications
            </h1>
            <p className="text-xl max-w-4xl mx-auto leading-relaxed opacity-90">
              Comprehensive overview of our regulatory licenses, certifications,
              and authorizations that enable us to serve rural communities
              across India.
            </p>
          </div>
        </section>

        {/* Primary Licenses */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-black mb-4">
                Primary Operating Licenses
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Core regulatory approvals that authorize our financial services
                operations
              </p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {primaryLicenses.map((license, index) => (
                <div
                  key={index}
                  className="bg-white border-2 border-gray-300 rounded-2xl shadow-lg p-8 hover:shadow-xl hover:border-black transition-all duration-300"
                >
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex-1">
                      <h3 className="text-2xl font-semibold text-black mb-2">
                        {license.name}
                      </h3>
                      <p className="text-gray-700 font-medium mb-4">
                        {license.authority}
                      </p>
                    </div>
                    <div className="bg-black px-4 py-2 rounded-full">
                      <span className="text-white font-medium text-sm">
                        {license.status}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div className="bg-gray-100 p-4 rounded-lg border border-gray-200">
                      <p className="text-sm text-gray-600 mb-1">
                        License Number
                      </p>
                      <p className="font-semibold text-black">
                        {license.licenseNumber}
                      </p>
                    </div>
                    <div className="bg-gray-100 p-4 rounded-lg border border-gray-200">
                      <p className="text-sm text-gray-600 mb-1">Issue Date</p>
                      <p className="font-semibold text-black">
                        {license.issueDate}
                      </p>
                    </div>
                    <div className="bg-gray-100 p-4 rounded-lg border border-gray-200">
                      <p className="text-sm text-gray-600 mb-1">Valid Until</p>
                      <p className="font-semibold text-black">
                        {license.validUntil}
                      </p>
                    </div>
                    <div className="bg-gray-100 p-4 rounded-lg border border-gray-200">
                      <p className="text-sm text-gray-600 mb-1">Status</p>
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-black" />
                        <span className="font-semibold text-black">Active</span>
                      </div>
                    </div>
                  </div>

                  <p className="text-gray-700 mb-6 leading-relaxed">
                    {license.description}
                  </p>

                  <div>
                    <h4 className="font-semibold text-black mb-3">
                      Authorized Services:
                    </h4>
                    <ul className="space-y-2">
                      {license.scope.map((service, serviceIndex) => (
                        <li
                          key={serviceIndex}
                          className="flex items-start space-x-3"
                        >
                          <CheckCircle className="w-4 h-4 text-gray-600 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700 text-sm">
                            {service}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Operational Licenses */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-black mb-4">
                Operational Licenses
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Additional licenses and registrations required for business
                operations
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {operationalLicenses.map((license, index) => (
                <div
                  key={index}
                  className="bg-gray-50 border-2 hover:border-black border-gray-200 rounded-xl shadow-lg p-6 hover:shadow-xl  transition-all duration-300"
                >
                  <div className="flex items-center justify-between mb-4">
                    <FileText className="w-8 h-8 text-gray-700" />
                    <div className="bg-black px-2 py-1 rounded-full">
                      <span className="text-white text-xs font-medium">
                        {license.status}
                      </span>
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-black mb-2">
                    {license.name}
                  </h3>
                  <p className="text-gray-600 text-sm mb-3">
                    {license.authority}
                  </p>
                  <div className="space-y-2 text-sm text-gray-700">
                    <p>
                      <strong>Number:</strong> {license.number}
                    </p>
                    <p>
                      <strong>Valid until:</strong> {license.validUntil}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Digital Certificates */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-black mb-4">
                Digital Certificates
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Security and authentication certificates for digital operations
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {digitalLicenses.map((cert, index) => (
                <div
                  key={index}
                  className="bg-white border-2 border-gray-300 rounded-xl p-6 hover:border-black transition-all duration-300"
                >
                  <div className="flex items-center space-x-3 mb-4">
                    <Globe className="w-8 h-8 text-gray-700" />
                    <h3 className="text-lg font-semibold text-black">
                      {cert.name}
                    </h3>
                  </div>
                  <div className="space-y-3 text-sm">
                    <div>
                      <p className="text-gray-600 font-medium">Authority</p>
                      <p className="text-black">{cert.authority}</p>
                    </div>
                    <div>
                      <p className="text-gray-600 font-medium">Type</p>
                      <p className="text-black">{cert.type}</p>
                    </div>
                    <div>
                      <p className="text-gray-600 font-medium">Valid Until</p>
                      <p className="text-black">{cert.validUntil}</p>
                    </div>
                    <div>
                      <p className="text-gray-600 font-medium">Usage</p>
                      <p className="text-black">{cert.usage}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Compliance Certificates */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-black mb-4">
                Compliance Certifications
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Industry-standard certifications demonstrating our commitment to
                security and quality
              </p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {complianceCertificates.map((cert, index) => (
                <div
                  key={index}
                  className="bg-gray-50 border-2 border-gray-200  rounded-2xl shadow-lg p-8 hover:shadow-xl hover:border-black transition-all duration-300"
                >
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="bg-black p-3 rounded-xl">
                      <Award className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-black">
                        {cert.name}
                      </h3>
                      <p className="text-gray-600 text-sm">
                        {cert.description}
                      </p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-white border border-gray-200 p-3 rounded-lg">
                        <p className="text-xs text-gray-600 mb-1">
                          Certificate No.
                        </p>
                        <p className="text-sm font-medium text-black">
                          {cert.certificateNumber}
                        </p>
                      </div>
                      <div className="bg-white border border-gray-200 p-3 rounded-lg">
                        <p className="text-xs text-gray-600 mb-1">Issued By</p>
                        <p className="text-sm font-medium text-black">
                          {cert.issuer}
                        </p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-white border border-gray-200 p-3 rounded-lg">
                        <p className="text-xs text-gray-600 mb-1">Issue Date</p>
                        <p className="text-sm font-medium text-black">
                          {cert.issueDate}
                        </p>
                      </div>
                      <div className="bg-white border border-gray-200 p-3 rounded-lg">
                        <p className="text-xs text-gray-600 mb-1">
                          Valid Until
                        </p>
                        <p className="text-sm font-medium text-black">
                          {cert.validUntil}
                        </p>
                      </div>
                    </div>
                    <div className="bg-gray-200 border border-gray-300 p-4 rounded-lg">
                      <p className="text-xs text-gray-700 font-medium mb-1">
                        Scope
                      </p>
                      <p className="text-sm text-black">{cert.scope}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Partnership Authorizations */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-black mb-4">
                Partnership Authorizations
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Authorized partnerships enabling expanded service offerings
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {partnerships.map((partnership, index) => (
                <div
                  key={index}
                  className="bg-white border-2 border-gray-300 rounded-xl p-6 hover:border-black transition-all duration-300"
                >
                  <div className="flex items-center space-x-3 mb-4">
                    <Building className="w-8 h-8 text-gray-700" />
                    <h3 className="text-lg font-semibold text-black">
                      {partnership.name}
                    </h3>
                  </div>
                  <div className="space-y-3 text-sm">
                    <div>
                      <p className="text-gray-600 font-medium">Partner</p>
                      <p className="text-black">{partnership.partner}</p>
                    </div>
                    <div>
                      <p className="text-gray-600 font-medium">
                        Authorization Type
                      </p>
                      <p className="text-black">{partnership.type}</p>
                    </div>
                    <div>
                      <p className="text-gray-600 font-medium">Services</p>
                      <p className="text-black">{partnership.services}</p>
                    </div>
                    <div>
                      <p className="text-gray-600 font-medium">Valid Until</p>
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4 text-gray-700" />
                        <span className="text-black">
                          {partnership.validUntil}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Renewal Schedule */}
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-gray-50 border-2 hover:border-black transition-all duration-300 border-gray-300 rounded-2xl p-8">
              <div className="text-center mb-8">
                <Calendar className="w-12 h-12 text-gray-700 mx-auto mb-4" />
                <h2 className="text-3xl font-bold text-black mb-4">
                  License Renewal Schedule
                </h2>
                <p className="text-gray-700">
                  We maintain a proactive approach to license renewals and
                  compliance updates
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white border border-gray-200 p-6 rounded-xl">
                  <h3 className="text-lg font-semibold text-black mb-4">
                    Upcoming Renewals (2025)
                  </h3>
                  <ul className="space-y-3 text-gray-700 text-sm">
                    <li className="flex justify-between">
                      <span>GST Registration</span>
                      <span className="font-medium text-black">March 2025</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Professional Tax</span>
                      <span className="font-medium text-black">March 2025</span>
                    </li>
                    <li className="flex justify-between">
                      <span>PCI DSS Compliance</span>
                      <span className="font-medium text-black">
                        January 2025
                      </span>
                    </li>
                    <li className="flex justify-between">
                      <span>SOC 2 Certification</span>
                      <span className="font-medium text-black">March 2025</span>
                    </li>
                  </ul>
                </div>
                <div className="bg-white border border-gray-200 p-6 rounded-xl">
                  <h3 className="text-lg font-semibold text-black mb-4">
                    Renewal Process
                  </h3>
                  <ul className="space-y-3 text-gray-700 text-sm">
                    <li className="flex items-start space-x-2">
                      <CheckCircle className="w-4 h-4 text-gray-600 mt-0.5" />
                      <span>90-day advance notification system</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <CheckCircle className="w-4 h-4 text-gray-600 mt-0.5" />
                      <span>Dedicated compliance team oversight</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <CheckCircle className="w-4 h-4 text-gray-600 mt-0.5" />
                      <span>Automated renewal tracking</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <CheckCircle className="w-4 h-4 text-gray-600 mt-0.5" />
                      <span>Regular compliance audits</span>
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
            <h2 className="text-3xl font-bold mb-6">License Verification</h2>
            <p className="text-xl mb-8 opacity-90">
              For verification of any license or certificate, please contact our
              compliance team
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white/10 border border-white/20 p-6 rounded-xl hover:bg-white/20 transition-all duration-300">
                <h3 className="font-semibold mb-2">Licenses Team</h3>
                <p className="text-sm opacity-90">licenses@rural-fin.com</p>
              </div>
              <div className="bg-white/10 border border-white/20 p-6 rounded-xl hover:bg-white/20 transition-all duration-300">
                <h3 className="font-semibold mb-2">Verification Hotline</h3>
                <p className="text-sm opacity-90">+91 98765 43210</p>
              </div>
              <div className="bg-white/10 border border-white/20 p-6 rounded-xl hover:bg-white/20 transition-all duration-300">
                <h3 className="font-semibold mb-2">Business Hours</h3>
                <p className="text-sm opacity-90">Mon-Fri: 9 AM - 6 PM</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Licenses;
