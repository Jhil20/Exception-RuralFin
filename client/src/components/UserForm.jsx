import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { ArrowRight, User, Phone, Calendar, MapPin, Lock } from "lucide-react";
import {
  userValidationSchemaStep1,
  userValidationSchemaStep2,
} from "../yupValidators/validationSchema";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const UserForm = ({ isSubmitted, resetRole, setUserFormStep2 }) => {
  const initialValuesStep2 = {
    aadharNumber: "",
    password: "",
    confirmPassword: "",
  };
  const navigate=useNavigate();

  const [userData, setUserData] = useState(null);
  const initialValuesStep1 = {
    firstName: "",
    lastName: "",
    phone: "",
    age: "",
    dob: "",
    gender: "",
    address: "",
  };

  const handleSubmitStep1 = (values) => {
    setStep(2);
    setUserData(values);
    setUserFormStep2(true);
  };

  const [step, setStep] = useState(1);


  const handleSubmitStep2 = (values) => {
    const allValues={
        ...userData,
        ...values,
    }
    console.log("Final Values:", allValues);
    setUserFormStep2(false);
    setUserData(null);
    setStep(1);
    navigate("/dashboard");
  }

  return (
    <div className="space-y-6">
      {step == 1 && (
        <Formik
          initialValues={initialValuesStep1}
          //   validationSchema={userValidationSchemaStep1}
          onSubmit={handleSubmitStep1}
        >
          {({ isSubmitting, values }) => (
            <Form className="space-y-5">
              <div className="grid md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <label
                    htmlFor="firstName"
                    className="block text-sm font-medium text-gray-700"
                  >
                    First Name
                  </label>
                  <div className="relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="h-5 w-5 text-gray-600" />
                    </div>
                    <Field
                      type="text"
                      id="firstName"
                      name="firstName"
                      className="block w-full pl-10 pr-3 py-3 placeholder:text-gray-600 border-gray-300 border-[1px] bg-gray-50 focus:ring-black focus:border-black rounded-lg transition-all duration-200 outline-none focus:bg-white text-gray-900"
                      placeholder="First Name"
                    />
                  </div>
                  <ErrorMessage
                    name="firstName"
                    component="div"
                    className="text-sm text-red-600 mt-1"
                  />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="lastName"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Last Name
                  </label>
                  <div className="relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="h-5 w-5 text-gray-600" />
                    </div>
                    <Field
                      type="text"
                      id="lastName"
                      name="lastName"
                      className="block w-full pl-10 pr-3 py-3 placeholder:text-gray-600 border-gray-300 border-[1px] bg-gray-50 focus:ring-black focus:border-black rounded-lg transition-all duration-200 outline-none focus:bg-white text-gray-900"
                      placeholder="Last Name"
                    />
                  </div>
                  <ErrorMessage
                    name="lastName"
                    component="div"
                    className="text-sm text-red-600 mt-1"
                  />
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-gray-700"
                  >
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
                      className="block w-full pl-10 pr-3 py-3 placeholder:text-gray-600 border-gray-300 border-[1px] bg-gray-50 focus:ring-black focus:border-black rounded-lg transition-all duration-200 outline-none focus:bg-white text-gray-900"
                      placeholder="10-digit phone number"
                    />
                  </div>
                  <ErrorMessage
                    name="phone"
                    component="div"
                    className="text-sm text-red-600 mt-1"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <label
                    htmlFor="age"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Age
                  </label>
                  <Field
                    type="number"
                    id="age"
                    name="age"
                    className="block w-full px-3 py-3 placeholder:text-gray-600 border-gray-300 border-[1px] bg-gray-50 focus:ring-black focus:border-black rounded-lg transition-all duration-200 outline-none focus:bg-white text-gray-900"
                    placeholder="Your age"
                  />
                  <ErrorMessage
                    name="age"
                    component="div"
                    className="text-sm text-red-600 mt-1"
                  />
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="dob"
                    className="block text-sm font-medium text-gray-700"
                  >
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
                      className="block w-full pl-10 pr-3 py-3 placeholder:text-gray-600 border-gray-300 border-[1px] bg-gray-50 focus:ring-black focus:border-black rounded-lg transition-all duration-200 outline-none focus:bg-white text-gray-900"
                    />
                  </div>
                  <ErrorMessage
                    name="dob"
                    component="div"
                    className="text-sm text-red-600 mt-1"
                  />
                </div>
                <div className="space-y-2 ml-2 pt-4">
                  <label
                    htmlFor="gender"
                    className="block text-sm font-medium text-gray-700"
                  >
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
                  <ErrorMessage
                    name="gender"
                    component="div"
                    className="text-sm text-red-600 mt-1"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-1 gap-4">
                <div className="space-y-2">
                  <label
                    htmlFor="address"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Address
                  </label>
                  <div className="relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <MapPin className="h-5 w-5 text-gray-600" />
                    </div>
                    <Field
                      type="text"
                      id="address"
                      name="address"
                      className="block w-full pl-10 pr-3 py-3 placeholder:text-gray-600 border-gray-300 border-[1px] bg-gray-50 focus:ring-black focus:border-black rounded-lg transition-all duration-200 outline-none focus:bg-white text-gray-900"
                      placeholder="Address"
                    />
                  </div>
                  <ErrorMessage
                    name="address"
                    component="div"
                    className="text-sm text-red-600 mt-1"
                  />
                </div>
              </div>

              <div className="flex justify-between items-center">
                <button
                  onClick={resetRole}
                  className="mt-4 flex justify-center items-center w-52 px-4 py-3 shadow-lg hover:shadow-black/50 bg-gray-400 text-white font-semibold rounded-lg transition-all duration-300 cursor-pointer hover:bg-gray-600 disabled:bg-gray-600"
                >
                  Back
                </button>

                <button
                  type="submit"
                  className="mt-4 w-52 px-4 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-black/50 hover:bg-blue-800 transition-all duration-300 cursor-pointer  disabled:bg-gray-400"
                  disabled={isSubmitting}
                >
                  Next
                </button>
              </div>
            </Form>
          )}
        </Formik>
      )}

      {step == 2 && (
        <Formik
          initialValues={initialValuesStep2}
        //   validationSchema={userValidationSchemaStep2}
          onSubmit={handleSubmitStep2}
        >
          {({ isSubmitting, values }) => (
            <Form className="space-y-5">
              <div className="grid md:grid-cols-1 gap-4">
                <div className="space-y-2">
                  <label
                    htmlFor="aadharNumber"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Aadhar Number
                  </label>
                  <Field
                    type="text"
                    id="aadharNumber"
                    name="aadharNumber"
                    className="block w-full px-3 py-3 placeholder:text-gray-600 border-gray-300 border-[1px] bg-gray-50 focus:ring-black focus:border-black rounded-lg transition-all duration-200 outline-none focus:bg-white text-gray-900"
                    placeholder="12-digit Aadhar number"
                  />
                  <ErrorMessage
                    name="aadharNumber"
                    component="div"
                    className="text-sm text-red-600 mt-1"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Password
                  </label>
                  <div className="relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-gray-600" />
                    </div>
                    <Field
                      type="password"
                      id="password"
                      name="password"
                      className="block w-full pl-10 pr-3 py-3 placeholder:text-gray-600 border-gray-300 border-[1px] bg-gray-50 focus:ring-black focus:border-black rounded-lg transition-all duration-200 outline-none focus:bg-white text-gray-900"
                      placeholder="Create a strong password"
                    />
                  </div>
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-sm text-red-600 mt-1"
                  />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="confirmPassword"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Confirm Password
                  </label>
                  <div className="relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-gray-600" />
                    </div>
                    <Field
                      type="password"
                      id="confirmPassword"
                      name="confirmPassword"
                      className="block w-full pl-10 pr-3 py-3 placeholder:text-gray-600 border-gray-300 border-[1px] bg-gray-50 focus:ring-black focus:border-black rounded-lg transition-all duration-200 outline-none focus:bg-white text-gray-900"
                      placeholder="Confirm your password"
                    />
                  </div>
                  <ErrorMessage
                    name="confirmPassword"
                    component="div"
                    className="text-sm text-red-600 mt-1"
                  />
                </div>
              </div>

              <div className="flex justify-between items-center">
                <button
                type="submit"
                className="mt-4 flex justify-center items-center w-52 px-4 py-3 shadow-lg hover:shadow-black/50 bg-gray-400 text-white font-semibold rounded-lg transition-all duration-300 cursor-pointer hover:bg-gray-600 disabled:bg-gray-600"
                disabled={isSubmitting}
              >
                Back
              </button>
                <button
                  type="submit"
                  className="mt-4 w-52 px-4 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-black/50 hover:bg-blue-800 transition-all duration-300 cursor-pointer  disabled:bg-gray-400"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : "Submit"}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      )}
    </div>
  );
};

export default UserForm;
