import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { ArrowRight, User, Phone, Mail, Calendar, MapPin, Lock, CreditCard, Building, Briefcase } from 'lucide-react';
import { agentValidationSchema } from '../yupValidators/validationSchema';
const AgentForm = ({ onSubmit, resetRole }) => {
  const initialValues = {
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    age: '',
    aadharNumber: '',
    dob: '',
    gender: '',
    password: '',
    confirmPassword: '',
    address: '',
    securityDeposit: '',
    accountNumber: '',
    ifscCode: '',
    bankName: '',
    experience: '',
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center mb-6">
        <button 
          onClick={resetRole}
          className="text-sm text-gray-600 hover:text-black flex items-center mr-2"
        >
          <ArrowRight className="h-4 w-4 mr-1 transform rotate-180" />
          Back
        </button>
        <h2 className="text-2xl font-bold text-gray-900">Create Agent Account</h2>
      </div>

      <Formik
        initialValues={initialValues}
        validationSchema={agentValidationSchema}
        onSubmit={onSubmit}
      >
        {({ isSubmitting, values }) => (
          <Form className="space-y-5">
            {/* Personal Information */}
            <div className="bg-gray-50 p-4 rounded-lg mb-4">
              <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                <User className="mr-2 h-5 w-5" />
                Personal Information
              </h3>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                    First Name
                  </label>
                  <Field
                    type="text"
                    id="firstName"
                    name="firstName"
                    className="block w-full px-3 py-3 placeholder:text-gray-600 border-gray-300 border-[1px] bg-white focus:ring-black focus:border-black rounded-lg transition-all duration-200 outline-none text-gray-900"
                    placeholder="First Name"
                  />
                  <ErrorMessage name="firstName" component="div" className="text-sm text-red-600 mt-1" />
                </div>

                <div className="space-y-2">
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                    Last Name
                  </label>
                  <Field
                    type="text"
                    id="lastName"
                    name="lastName"
                    className="block w-full px-3 py-3 placeholder:text-gray-600 border-gray-300 border-[1px] bg-white focus:ring-black focus:border-black rounded-lg transition-all duration-200 outline-none text-gray-900"
                    placeholder="Last Name"
                  />
                  <ErrorMessage name="lastName" component="div" className="text-sm text-red-600 mt-1" />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4 mt-4">
                <div className="space-y-2">
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                    Phone Number
                  </label>
                  <div className="relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Phone className="h-5 w-5 text-gray-600" />
                    </div>
                    <Field
                      type="tel"
                      id="phone"
                      name="phone"
                      className="block w-full pl-10 pr-3 py-3 placeholder:text-gray-600 border-gray-300 border-[1px] bg-white focus:ring-black focus:border-black rounded-lg transition-all duration-200 outline-none text-gray-900"
                      placeholder="10-digit phone number"
                    />
                  </div>
                  <ErrorMessage name="phone" component="div" className="text-sm text-red-600 mt-1" />
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <div className="relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-gray-600" />
                    </div>
                    <Field
                      type="email"
                      id="email"
                      name="email"
                      className="block w-full pl-10 pr-3 py-3 placeholder:text-gray-600 border-gray-300 border-[1px] bg-white focus:ring-black focus:border-black rounded-lg transition-all duration-200 outline-none text-gray-900"
                      placeholder="Email address"
                    />
                  </div>
                  <ErrorMessage name="email" component="div" className="text-sm text-red-600 mt-1" />
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-4 mt-4">
                <div className="space-y-2">
                  <label htmlFor="age" className="block text-sm font-medium text-gray-700">
                    Age
                  </label>
                  <Field
                    type="number"
                    id="age"
                    name="age"
                    className="block w-full px-3 py-3 placeholder:text-gray-600 border-gray-300 border-[1px] bg-white focus:ring-black focus:border-black rounded-lg transition-all duration-200 outline-none text-gray-900"
                    placeholder="Your age"
                  />
                  <ErrorMessage name="age" component="div" className="text-sm text-red-600 mt-1" />
                </div>

                <div className="space-y-2">
                  <label htmlFor="aadharNumber" className="block text-sm font-medium text-gray-700">
                    Aadhar Number
                  </label>
                  <Field
                    type="text"
                    id="aadharNumber"
                    name="aadharNumber"
                    className="block w-full px-3 py-3 placeholder:text-gray-600 border-gray-300 border-[1px] bg-white focus:ring-black focus:border-black rounded-lg transition-all duration-200 outline-none text-gray-900"
                    placeholder="12-digit Aadhar number"
                  />
                  <ErrorMessage name="aadharNumber" component="div" className="text-sm text-red-600 mt-1" />
                </div>

                <div className="space-y-2">
                  <label htmlFor="dob" className="block text-sm font-medium text-gray-700">
                    Date of Birth
                  </label>
                  <div className="relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Calendar className="h-5 w-5 text-gray-600" />
                    </div>
                    <Field
                      type="date"
                      id="dob"
                      name="dob"
                      className="block w-full pl-10 pr-3 py-3 placeholder:text-gray-600 border-gray-300 border-[1px] bg-white focus:ring-black focus:border-black rounded-lg transition-all duration-200 outline-none text-gray-900"
                    />
                  </div>
                  <ErrorMessage name="dob" component="div" className="text-sm text-red-600 mt-1" />
                </div>
              </div>

              <div className="space-y-2 mt-4">
                <label htmlFor="gender" className="block text-sm font-medium text-gray-700">
                  Gender
                </label>
                <div className="flex space-x-4">
                  <label className="inline-flex items-center">
                    <Field 
                      type="radio" 
                      name="gender" 
                      value="male" 
                      className="form-radio h-5 w-5 text-black border-gray-300 focus:ring-black" 
                    />
                    <span className="ml-2 text-gray-700">Male</span>
                  </label>
                  <label className="inline-flex items-center">
                    <Field 
                      type="radio" 
                      name="gender" 
                      value="female" 
                      className="form-radio h-5 w-5 text-black border-gray-300 focus:ring-black" 
                    />
                    <span className="ml-2 text-gray-700">Female</span>
                  </label>
                  <label className="inline-flex items-center">
                    <Field 
                      type="radio" 
                      name="gender" 
                      value="other" 
                      className="form-radio h-5 w-5 text-black border-gray-300 focus:ring-black" 
                    />
                    <span className="ml-2 text-gray-700">Other</span>
                  </label>
                </div>
                <ErrorMessage name="gender" component="div" className="text-sm text-red-600 mt-1" />
              </div>

              <div className="space-y-2 mt-4">
                <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                  Address
                </label>
                <div className="relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <MapPin className="h-5 w-5 text-gray-600" />
                  </div>
                  <Field
                    as="textarea"
                    id="address"
                    name="address"
                    rows={3}
                    className="block w-full pl-10 pr-3 py-3 placeholder:text-gray-600 border-gray-300 border-[1px] bg-white focus:ring-black focus:border-black rounded-lg transition-all duration-200 outline-none text-gray-900"
                    placeholder="Your full address"
                  />
                </div>
                <ErrorMessage name="address" component="div" className="text-sm text-red-600 mt-1" />
              </div>
            </div>

            {/* Professional Information */}
            <div className="bg-gray-50 p-4 rounded-lg mb-4">
              <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                <Building className="mr-2 h-5 w-5" />
                Professional Information
              </h3>

              <div className="space-y-2">
                <label htmlFor="experience" className="block text-sm font-medium text-gray-700">
                  Years of Experience
                </label>
                <div className="relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Briefcase className="h-5 w-5 text-gray-600" />
                  </div>
                  <Field
                    type="number"
                    id="experience"
                    name="experience"
                    className="block w-full pl-10 pr-3 py-3 placeholder:text-gray-600 border-gray-300 border-[1px] bg-white focus:ring-black focus:border-black rounded-lg transition-all duration-200 outline-none text-gray-900"
                    placeholder="Years of experience in real estate"
                  />
                </div>
                <ErrorMessage name="experience" component="div" className="text-sm text-red-600 mt-1" />
              </div>
            </div>

            {/* Banking Information */}
            <div className="bg-gray-50 p-4 rounded-lg mb-4">
              <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                <CreditCard className="mr-2 h-5 w-5" />
                Banking Information
              </h3>

              <div className="space-y-2">
                <label htmlFor="accountNumber" className="block text-sm font-medium text-gray-700">
                  Account Number
                </label>
                <Field
                  type="text"
                  id="accountNumber"
                  name="accountNumber"
                  className="block w-full px-3 py-3 placeholder:text-gray-600 border-gray-300 border-[1px] bg-white focus:ring-black focus:border-black rounded-lg transition-all duration-200 outline-none text-gray-900"
                  placeholder="Account number"
                />
                <ErrorMessage name="accountNumber" component="div" className="text-sm text-red-600 mt-1" />
              </div>

              <div className="space-y-2 mt-4">
                <label htmlFor="ifscCode" className="block text-sm font-medium text-gray-700">
                  IFSC Code
                </label>
                <Field
                  type="text"
                  id="ifscCode"
                  name="ifscCode"
                  className="block w-full px-3 py-3 placeholder:text-gray-600 border-gray-300 border-[1px] bg-white focus:ring-black focus:border-black rounded-lg transition-all duration-200 outline-none text-gray-900"
                  placeholder="IFSC code"
                />
                <ErrorMessage name="ifscCode" component="div" className="text-sm text-red-600 mt-1" />
              </div>

              <div className="space-y-2 mt-4">
                <label htmlFor="bankName" className="block text-sm font-medium text-gray-700">
                  Bank Name
                </label>
                <Field
                  type="text"
                  id="bankName"
                  name="bankName"
                  className="block w-full px-3 py-3 placeholder:text-gray-600 border-gray-300 border-[1px] bg-white focus:ring-black focus:border-black rounded-lg transition-all duration-200 outline-none text-gray-900"
                  placeholder="Bank name"
                />
                <ErrorMessage name="bankName" component="div" className="text-sm text-red-600 mt-1" />
              </div>
            </div>

            {/* Submit Button */}
            <div className="mt-6">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 px-4 bg-blue-600 text-white rounded-lg disabled:bg-gray-400"
              >
                {isSubmitting ? 'Submitting...' : 'Create Agent Account'}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AgentForm;
