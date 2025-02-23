import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  agentValidationSchema,
  loginValidationSchema,
  otpValidationSchema,
  signupValidationSchema,
} from "../yupValidators/validationSchema";
import { userLoggedin } from "../redux/slices/signInSlice";

const Login = () => {
  const [showLogin, setShowLogin] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState(null);
  const [otpNumber, setOtpNumber] = useState(null);
  const [showOtp, setShowOtp] = useState(false);
  const [showAgent, setShowAgent] = useState(false);

  const handleLogin = async (values) => {
    console.log("values", values);
    try {
      const response = await axios.post(
        "http://localhost:5000/users/login",
        values
      );
      console.log("response", response);
      const token = response?.data?.data?.user?.refresh_token;

      console.log(response?.data?.message);
      if (response?.data?.message == "User logged in successfully") {
        setOtpNumber(values.phone_number);
        setShowOtp(true);
        console.log("in ifcondition");
      }
      // Cookies.set("jwt-token", token);
      // dispatch(userLoggedin());
      // navigate("/");
    } catch (error) {
      setError(error?.response?.data?.message || "Something Went Wrong");
      console.log("error", error);
    }
  };

  const handleOtpLogin = () => {
    console.log("otp login");
  };

  const handleAgentSubmit = async (values) => {
    console.log("in agent sigunp", values);
    try {
      const response = await axios.post(
        "http://localhost:5000/agent/register",
        values
      ); /// backend not working for create agent
      console.log("response", response);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSignupSubmit = async (values) => {
    try {
      // console.log("hhhhhhh")
      const response = await axios.post(
        "http://localhost:5000/users/register",
        values
      );
      const token = response?.data?.data?.user?.refresh_token;
      Cookies.set("jwt-token", token);
      dispatch(userLoggedin());
      setShowLogin(true);
      // navigate("/");
      console.log("response", response);
    } catch (error) {
      // setError(error?.response?.data?.message || "Something Went Wrong");
      console.log("error", error);
    }
  };

  if (showLogin) {
    return (
      <div className="flex justify-center items-center h-[90.7vh] bg-gray-300">
        {showOtp && (
          <div className="bg-white p-6 min-h-80 h-fit rounded-lg hover:shadow-2xl transition-all duration-500 hover:ring-[906px] overflow-clip z-1 relative ring-gray-400 shadow-lg w-96">
            <h2 className="text-2xl font-bold text-center text-gray-700 mb-4">
              Enter OTP sent to {otpNumber}
            </h2>

            <Formik
              initialValues={{ otp: "" }}
              validationSchema={otpValidationSchema}
              onSubmit={handleOtpLogin}
            >
              <Form className="space-y-4">
                {/* OTP Number Field */}
                <div>
                  <p className="text-gray-700 mb-1">OTP*</p>
                  <Field
                    name="otp"
                    className="w-full p-2 border hover:ring-[1px] ring-gray-700 transition-all duration-500 border-gray-300 rounded-md focus:ring focus:ring-blue-200"
                  />
                  <ErrorMessage
                    name="otp"
                    component="p"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                {/* Error Message */}
                {error && (
                  <p className="text-sm text-red-500 font-bold">
                    {error || "Something went wrong. Please try again."}
                  </p>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full bg-blue-700 cursor-pointer text-white py-2 rounded-md hover:bg-blue-800 transition-all duration-500"
                >
                  Enter OTP
                </button>
              </Form>
            </Formik>
          </div>
        )}

        {!showOtp && (
          <div className="bg-white min-h-80 h-fit  p-6 rounded-lg hover:shadow-2xl transition-all duration-500 hover:ring-[906px] overflow-clip z-1 relative ring-gray-400 shadow-lg w-96">
            <h2 className="text-2xl font-bold text-center text-gray-700 mb-4">
              Login to your RuralFin account
            </h2>

            <Formik
              initialValues={{ phone_number: "" }}
              validationSchema={loginValidationSchema}
              onSubmit={handleLogin}
            >
              <Form className="space-y-4">
                {/* Phone Number Field */}
                <div>
                  <p className="text-gray-700 m-1">Phone Number*</p>
                  <Field
                    name="phone_number"
                    className="w-full p-2 border hover:ring-[1px] ring-gray-700 transition-all duration-500 border-gray-300 rounded-md focus:ring focus:ring-blue-200"
                  />
                  <ErrorMessage
                    name="phone_number"
                    component="p"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                {/* Error Message */}
                {error && (
                  <p className="text-sm text-red-500 font-bold">
                    {error || "Something went wrong. Please try again."}
                  </p>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full bg-blue-700 cursor-pointer text-white py-2 rounded-md hover:bg-blue-800 transition-all duration-500"
                >
                  Login
                </button>
                {/* Signup Link */}
                <p
                  className="text-center text-gray-700 cursor-pointer"
                  onClick={() => {
                    setShowLogin(false);
                  }}
                >
                  Don't have an account? Signup!
                </p>
              </Form>
            </Formik>
          </div>
        )}
      </div>
    );
  } else {
    return (
      <div className="flex justify-center items-center h-[90.7vh] bg-gray-100">
        <div className="bg-white hover:ring-[960px] content-start ring-gray-400 min-h-9/12 h-fit transition-all duration-600 relative z-1 flex flex-wrap justify-center items-center p-8 rounded-lg shadow-lg w-5/12">
          <h2 className="text-2xl text-gray-800 w-full font-bold text-center mb-4 h-fit">
            Create your RuralFin account
          </h2>
          <div className="w-5/12 flex h-10 mb-4">
            <div
              onClick={() => setShowAgent(false)}
              className={`w-1/2 cursor-pointer ${showAgent?'bg-gray-300 text-gray-800':'bg-gray-800 text-gray-200'} hover:ring-2 ring-gray-800 transition-all duration-600 flex mr-2 bg-gray-300 rounded-l-2xl justify-center items-center`}
            >
              <h2 className="text-md  font-semibold">User</h2>
            </div>
            <div
              onClick={() => setShowAgent(true)}
              className={`w-1/2 cursor-pointer ${showAgent?'bg-gray-800 text-gray-200':'bg-gray-300 text-gray-800'} hover:ring-2 ring-gray-800 transition-all duration-600 flex mr-2 bg-gray-300 rounded-r-2xl justify-center items-center`}
            >
              <h2 className="text-md  font-semibold">Agent</h2>
            </div>
          </div>

          {showAgent && (
            <Formik
              initialValues={{
                agent_name: "",
                agent_phone: "",
                email: "",
                location: "",
                securityDeposit: "",
                balance: "",
              }}
              validationSchema={agentValidationSchema}
              onSubmit={handleAgentSubmit}
            >
              <Form className="space-y-4 flex flex-wrap">
                {/* Agent Name */}
                <div className="flex-auto mr-3">
                  <label className="block text-gray-700 mb-1 ml-1">
                    Agent Name*
                  </label>
                  <Field
                    name="agent_name"
                    className="w-full p-2 border hover:ring-[1px] ring-gray-700 transition-all duration-500 border-gray-300 rounded-md"
                  />
                  <ErrorMessage
                    name="agent_name"
                    component="p"
                    className="text-red-500 text-sm"
                  />
                </div>

                {/* Agent Phone */}
                <div className="flex-auto">
                  <label className="block text-gray-700 mb-1 ml-1">
                    Agent Phone*
                  </label>
                  <Field
                    name="agent_phone"
                    className="w-full p-2 border hover:ring-[1px] ring-gray-700 transition-all duration-500 border-gray-300 rounded-md"
                  />
                  <ErrorMessage
                    name="agent_phone"
                    component="p"
                    className="text-red-500 text-sm"
                  />
                </div>

                {/* Email */}
                <div className="flex-auto mr-3">
                  <label className="block text-gray-700 mb-1 ml-1">
                    Email*
                  </label>
                  <Field
                    type="email"
                    name="email"
                    className="w-full p-2 border hover:ring-[1px] ring-gray-700 transition-all duration-500 border-gray-300 rounded-md"
                  />
                  <ErrorMessage
                    name="email"
                    component="p"
                    className="text-red-500 text-sm"
                  />
                </div>

                {/* Location */}
                <div className="flex-auto mr-3">
                  <label className="block text-gray-700 mb-1 ml-1">
                    Location*
                  </label>
                  <Field
                    name="location"
                    className="w-full p-2 border hover:ring-[1px] ring-gray-700 transition-all duration-500 border-gray-300 rounded-md"
                  />
                  <ErrorMessage
                    name="location"
                    component="p"
                    className="text-red-500 text-sm"
                  />
                </div>

                {/* Security Deposit */}
                <div className="flex-auto mr-3">
                  <label className="block text-gray-700 mb-1 ml-1">
                    Security Deposit*
                  </label>
                  <Field
                    type="number"
                    name="securityDeposit"
                    className="w-full p-2 border hover:ring-[1px] ring-gray-700 transition-all duration-500 border-gray-300 rounded-md no-spinner"
                  />
                  <ErrorMessage
                    name="securityDeposit"
                    component="p"
                    className="text-red-500 text-sm"
                  />
                </div>

                {/* Balance */}
                <div className="flex-auto">
                  <label className="block text-gray-700 mb-1 ml-1">
                    Balance*
                  </label>
                  <Field
                    type="number"
                    name="balance"
                    className="w-full p-2 border hover:ring-[1px] ring-gray-700 transition-all duration-500 border-gray-300 rounded-md no-spinner"
                  />
                  <ErrorMessage
                    name="balance"
                    component="p"
                    className="text-red-500 text-sm"
                  />
                </div>

                {error && (
                  <h1 className="text-md text-red-500 font-bold">
                    {error || "Something Went Wrong. Please Try Again"}
                  </h1>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full bg-blue-700 text-white cursor-pointer py-2 rounded-md hover:bg-blue-800 transition-all duration-500"
                >
                  Submit
                </button>

                {/* Redirect to Login */}
                <div className="w-full h-fit">
                  <h1
                    className="cursor-pointer text-center text-gray-700"
                    onClick={() => {
                      setShowLogin(true);
                    }}
                  >
                    Already have an account? Sign in!!
                  </h1>
                </div>
              </Form>
            </Formik>
          )}

          {!showAgent && (
            <Formik
              initialValues={{
                full_name: "",
                phone_number: "",
                email: "",
                gender: "",
                age: "",
                income: "",
                budget_limit: "",
              }}
              validationSchema={signupValidationSchema}
              onSubmit={handleSignupSubmit}
            >
              <Form className="space-y-4 flex flex-wrap ">
                {/* Full Name */}
                <div className="flex-auto mr-3">
                  <label className="block text-gray-700 mb-1 ml-1">
                    Full Name*
                  </label>
                  <Field
                    name="full_name"
                    className="w-full p-2 border hover:ring-[1px] ring-gray-700 transition-all duration-500 border-gray-300 rounded-md"
                  />
                  <ErrorMessage
                    name="full_name"
                    component="p"
                    className="text-red-500 text-sm"
                  />
                </div>

                {/* Phone Number */}
                <div className="flex-auto">
                  <label className="block text-gray-700 mb-1 ml-1">
                    Phone Number*
                  </label>
                  <Field
                    name="phone_number"
                    className="w-full p-2 border hover:ring-[1px] ring-gray-700 transition-all duration-500 border-gray-300 rounded-md"
                  />
                  <ErrorMessage
                    name="phone_number"
                    component="p"
                    className="text-red-500 text-sm"
                  />
                </div>

                {/* Email */}
                <div className="flex-auto mr-3">
                  <label className="block text-gray-700 mb-1 ml-1">
                    Email*
                  </label>
                  <Field
                    type="email"
                    name="email"
                    className="w-full p-2 border hover:ring-[1px] ring-gray-700 transition-all duration-500 border-gray-300 rounded-md"
                  />
                  <ErrorMessage
                    name="email"
                    component="p"
                    className="text-red-500 text-sm"
                  />
                </div>

                {/* Gender */}
                <div className="flex-auto mr-3">
                  <label className="block text-gray-700 mb-1 ml-1">
                    Gender*
                  </label>
                  <Field
                    as="select"
                    name="gender"
                    className="w-full p-2 border hover:ring-[1px] ring-gray-700 transition-all duration-500 border-gray-300 rounded-md custom-select"
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </Field>
                  <ErrorMessage
                    name="gender"
                    component="p"
                    className="text-red-500 text-sm"
                  />
                </div>

                {/* Age */}
                <div className="flex-2/12">
                  <label className="block text-gray-700 mb-1 ml-1">Age*</label>
                  <Field
                    type="number"
                    name="age"
                    className="w-full p-2 border hover:ring-[1px] ring-gray-700 transition-all duration-500 border-gray-300 rounded-md no-spinner"
                  />
                  <ErrorMessage
                    name="age"
                    component="p"
                    className="text-red-500 text-sm"
                  />
                </div>

                {/* Income */}
                <div className="flex-auto mr-3">
                  <label className="block text-gray-700 mb-1 ml-1">
                    Income*
                  </label>
                  <Field
                    type="number"
                    name="income"
                    className="w-full p-2 border hover:ring-[1px] ring-gray-700 transition-all duration-500 border-gray-300 rounded-md no-spinner"
                  />
                  <ErrorMessage
                    name="income"
                    component="p"
                    className="text-red-500 text-sm"
                  />
                </div>

                {/* Budget Limit */}
                <div className="flex-auto">
                  <label className="block text-gray-700 mb-1 ml-1">
                    Budget Limit*
                  </label>
                  <Field
                    type="number"
                    name="budget_limit"
                    className="w-full p-2 border hover:ring-[1px] ring-gray-700 transition-all duration-500 border-gray-300 rounded-md no-spinner"
                  />
                  <ErrorMessage
                    name="budget_limit"
                    component="p"
                    className="text-red-500 text-sm"
                  />
                </div>

                {error && (
                  <h1 className="text-md text-red-500 font-bold">
                    {error || "Something Went Wrong. Please Try Again"}
                  </h1>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full bg-blue-700 text-white cursor-pointer py-2 rounded-md hover:bg-blue-800 transition-all duration-500"
                >
                  Sign Up
                </button>
                <div className="w-full h-fit">
                  <h1
                    className="cursor-pointer text-center text-gray-700"
                    onClick={() => {
                      setShowLogin(true);
                    }}
                  >
                    Already have an account? Signin!!
                  </h1>
                </div>
              </Form>
            </Formik>
          )}
        </div>
      </div>
    );
  }
};

export default Login;
