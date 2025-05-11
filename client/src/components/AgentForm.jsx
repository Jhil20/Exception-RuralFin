import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { ArrowRight, User, Phone, Mail, Calendar, MapPin, Lock, CreditCard, Building, Briefcase } from 'lucide-react';
import { agentValidationSchema } from '../yupValidators/validationSchema';

const AgentForm = ({ onSubmit, resetRole }) => {
  const [step, setStep] = useState(1);
  const totalSteps = 4;

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

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const renderProgressBar = () => (
    <div className="w-full mb-8">
      <div className="flex justify-between mb-2">
        {[...Array(totalSteps)].map((_, index) => (
          <div
            key={index}
            className={`w-8 h-8 rounded-full flex items-center justify-center ${
              step > index + 1
                ? 'bg-blue-600 text-white'
                : step === index + 1
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-600'
            }`}
          >
            {index + 1}
          </div>
        ))}
      </div>
      <div className="h-2 bg-gray-200 rounded-full">
        <div
          className="h-full bg-blue-600 rounded-full transition-all duration-300"
          style={{ width: `${((step - 1) / (totalSteps - 1)) * 100}%` }}
        ></div>
      </div>
    </div>
  );

  const renderStepTitle = () => {
    switch (step) {
      case 1:
        return 'Personal Information';
      case 2:
        return 'Contact Details';
      case 3:
        return 'Professional Information';
      case 4:
        return 'Banking Details';
      default:
        return '';
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center mb-8">
        <button 
          onClick={resetRole}
          className="text-sm text-gray-600 hover:text-black flex items-center mr-4"
        >
          <ArrowRight className="h-4 w-4 mr-1 transform rotate-180" />
          Back
        </button>
        <h2 className="text-2xl font-bold text-gray-900">Create Agent Account</h2>
      </div>

      {renderProgressBar()}

      <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100">
        <h3 className="text-xl font-semibold mb-6">{renderStepTitle()}</h3>

        <Formik
          initialValues={initialValues}
          validationSchema={agentValidationSchema}
          onSubmit={onSubmit}
        >
          {({ isSubmitting, values, isValid, dirty }) => (
            <Form className="space-y-6">
              {step === 1 && (
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                        First Name
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <User className="h-5 w-5 text-gray-400" />
                        </div>
                        <Field
                          type="text"
                          id="firstName"
                          name="firstName"
                          className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                          placeholder="First Name"
                        />
                      </div>
                      <ErrorMessage name="firstName" component="div" className="text-red-500 text-sm" />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                        Last Name
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <User className="h-5 w-5 text-gray-400" />
                        </div>
                        <Field
                          type="text"
                          id="lastName"
                          name="lastName"
                          className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                          placeholder="Last Name"
                        />
                      </div>
                      <ErrorMessage name="lastName" component="div" className="text-red-500 text-sm" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="gender" className="block text-sm font-medium text-gray-700">
                      Gender
                    </label>
                    <div className="flex space-x-4">
                      <label className="inline-flex items-center">
                        <Field 
                          type="radio" 
                          name="gender" 
                          value="male" 
                          className="form-radio h-5 w-5 text-blue-600" 
                        />
                        <span className="ml-2 text-gray-700">Male</span>
                      </label>
                      <label className="inline-flex items-center">
                        <Field 
                          type="radio" 
                          name="gender" 
                          value="female" 
                          className="form-radio h-5 w-5 text-blue-600" 
                        />
                        <span className="ml-2 text-gray-700">Female</span>
                      </label>
                      <label className="inline-flex items-center">
                        <Field 
                          type="radio" 
                          name="gender" 
                          value="other" 
                          className="form-radio h-5 w-5 text-blue-600" 
                        />
                        <span className="ml-2 text-gray-700">Other</span>
                      </label>
                    </div>
                    <ErrorMessage name="gender" component="div" className="text-red-500 text-sm" />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="age" className="block text-sm font-medium text-gray-700">
                        Age
                      </label>
                      <Field
                        type="number"
                        id="age"
                        name="age"
                        className="block w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                        placeholder="Your age"
                      />
                      <ErrorMessage name="age" component="div" className="text-red-500 text-sm" />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="dob" className="block text-sm font-medium text-gray-700">
                        Date of Birth
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Calendar className="h-5 w-5 text-gray-400" />
                        </div>
                        <Field
                          type="date"
                          id="dob"
                          name="dob"
                          className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                        />
                      </div>
                      <ErrorMessage name="dob" component="div" className="text-red-500 text-sm" />
                    </div>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                        Phone Number
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Phone className="h-5 w-5 text-gray-400" />
                        </div>
                        <Field
                          type="tel"
                          id="phone"
                          name="phone"
                          className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                          placeholder="10-digit phone number"
                        />
                      </div>
                      <ErrorMessage name="phone" component="div" className="text-red-500 text-sm" />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        Email
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Mail className="h-5 w-5 text-gray-400" />
                        </div>
                        <Field
                          type="email"
                          id="email"
                          name="email"
                          className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                          placeholder="Email address"
                        />
                      </div>
                      <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="aadharNumber" className="block text-sm font-medium text-gray-700">
                      Aadhar Number
                    </label>
                    <Field
                      type="text"
                      id="aadharNumber"
                      name="aadharNumber"
                      className="block w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                      placeholder="12-digit Aadhar number"
                    />
                    <ErrorMessage name="aadharNumber" component="div" className="text-red-500 text-sm" />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                      Address
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <MapPin className="h-5 w-5 text-gray-400" />
                      </div>
                      <Field
                        as="textarea"
                        id="address"
                        name="address"
                        rows={3}
                        className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                        placeholder="Your full address"
                      />
                    </div>
                    <ErrorMessage name="address" component="div" className="text-red-500 text-sm" />
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-6">
                  <div className="space-y-2">
                    <label htmlFor="experience" className="block text-sm font-medium text-gray-700">
                      Years of Experience
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Briefcase className="h-5 w-5 text-gray-400" />
                      </div>
                      <Field
                        type="number"
                        id="experience"
                        name="experience"
                        className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                        placeholder="Years of experience in real estate"
                      />
                    </div>
                    <ErrorMessage name="experience" component="div" className="text-red-500 text-sm" />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="securityDeposit" className="block text-sm font-medium text-gray-700">
                      Security Deposit Amount
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <CreditCard className="h-5 w-5 text-gray-400" />
                      </div>
                      <Field
                        type="number"
                        id="securityDeposit"
                        name="securityDeposit"
                        className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                        placeholder="Minimum ₹5,000"
                      />
                    </div>
                    <ErrorMessage name="securityDeposit" component="div" className="text-red-500 text-sm" />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                      Password
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Lock className="h-5 w-5 text-gray-400" />
                      </div>
                      <Field
                        type="password"
                        id="password"
                        name="password"
                        className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                        placeholder="Create a strong password"
                      />
                    </div>
                    <ErrorMessage name="password" component="div" className="text-red-500 text-sm" />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                      Confirm Password
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Lock className="h-5 w-5 text-gray-400" />
                      </div>
                      <Field
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                        placeholder="Confirm your password"
                      />
                    </div>
                    <ErrorMessage name="confirmPassword" component="div" className="text-red-500 text-sm" />
                  </div>
                </div>
              )}

              {step === 4 && (
                <div className="space-y-6">
                  <div className="space-y-2">
                    <label htmlFor="accountNumber" className="block text-sm font-medium text-gray-700">
                      Account Number
                    </label>
                    <Field
                      type="text"
                      id="accountNumber"
                      name="accountNumber"
                      className="block w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                      placeholder="Account number"
                    />
                    <ErrorMessage name="accountNumber" component="div" className="text-red-500 text-sm" />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="ifscCode" className="block text-sm font-medium text-gray-700">
                      IFSC Code
                    </label>
                    <Field
                      type="text"
                      id="ifscCode"
                      name="ifscCode"
                      className="block w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                      placeholder="IFSC code"
                    />
                    <ErrorMessage name="ifscCode" component="div" className="text-red-500 text-sm" />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="bankName" className="block text-sm font-medium text-gray-700">
                      Bank Name
                    </label>
                    <Field
                      type="text"
                      id="bankName"
                      name="bankName"
                      className="block w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                      placeholder="Bank name"
                    />
                    <ErrorMessage name="bankName" component="div" className="text-red-500 text-sm" />
                  </div>
                </div>
              )}

              <div className="flex justify-between mt-8">
                {step > 1 && (
                  <button
                    type="button"
                    onClick={prevStep}
                    className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-200"
                  >
                    Previous
                  </button>
                )}
                {step < totalSteps ? (
                  <button
                    type="button"
                    onClick={nextStep}
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 ml-auto"
                  >
                    Next
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={isSubmitting || !isValid || !dirty}
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed ml-auto"
                  >
                    {isSubmitting ? 'Creating Account...' : 'Create Account'}
                  </button>
                )}
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default AgentForm;