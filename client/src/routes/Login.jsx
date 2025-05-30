import React, { useEffect, useState } from "react";
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
import { userLoggedin, userLoggedout } from "../redux/slices/signInSlice";
import UserSignupForm from "../components/UserSignupForm";
import AgentSignupForm from "../components/AgentSignupForm";

const Login = () => {
  const [showLogin, setShowLogin] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState(null);
  const [otpNumber, setOtpNumber] = useState(null);
  const [showOtp, setShowOtp] = useState(false);
  const [showAgent, setShowAgent] = useState(false);
  const [loginAgent, setLoginAgent] = useState(true);
  const [userSignupFirst, setUserSignupFirst] = useState(true);
  const [userSignupSecond, setUserSignupSecond] = useState(false);
  dispatch(userLoggedout());

  const handleLogin = async (values) => {
    try {
      if(loginAgent){
        const response = await axios.post(
          "http://localhost:5000/users/login",
          values
        );
        const token = response?.data?.data?.user?.refresh_token;
        
        if (response?.data?.message == "User logged in successfully") {
          setOtpNumber(values.phone_number);
          setShowOtp(true);
          dispatch(userLoggedin());
        }
        Cookies.set("jwt-token", token);
        dispatch(userLoggedin());
        navigate("/userDashboard");
      } else {
        const formData={phone_num:values.phone_number,password:values.password}
        const response = await axios.post(
          "http://localhost:5000/agent/login",
          formData
        );
        const token = response?.data?.data?.agent?.refresh_token;
        Cookies.set("jwt-token", token);
        dispatch(userLoggedin());
        navigate("/agentDashboard");
      }
    } catch (error) {
      setError(error?.response?.data?.message || "Something Went Wrong");
    }
  };

  const handleGoogleLogin = () => {
    console.log("Google login clicked");
  };

  if (showLogin) {
    return (
      <div className="h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center overflow-hidden">
        <div className="w-full max-w-7xl mx-auto px-4">
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden" style={{ maxHeight: '90vh' }}>
            <div className="flex flex-col lg:flex-row">
              {/* Left Side - Branding */}
              <div className="lg:w-1/2 bg-gradient-to-br from-indigo-600 to-purple-600 p-8">
                <div className="h-full flex flex-col justify-center">
                  <div className="mb-6">
                    <h1 className="text-3xl font-bold text-white mb-3">Welcome to RuralFin</h1>
                    <p className="text-indigo-100 text-base leading-relaxed">
                      Empowering rural communities through accessible financial services
                    </p>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center flex-shrink-0">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-white font-semibold text-base mb-0.5">Secure Banking</h3>
                        <p className="text-indigo-100 text-sm leading-relaxed">Bank-grade security for all transactions</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3">
                      <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center flex-shrink-0">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-white font-semibold text-base mb-0.5">Quick Access</h3>
                        <p className="text-indigo-100 text-sm leading-relaxed">Instant access to financial services</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3">
                      <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center flex-shrink-0">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-white font-semibold text-base mb-0.5">Community Support</h3>
                        <p className="text-indigo-100 text-sm leading-relaxed">24/7 dedicated customer service</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Side - Login Form */}
              <div className="lg:w-1/2 p-8">
                <div className="h-full flex flex-col justify-center max-w-md mx-auto">
                  <div className="text-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">Welcome Back</h2>
                    <p className="text-gray-600 text-sm">Sign in to your account</p>
                  </div>

                  {/* User/Agent Toggle */}
                  <div className="flex bg-gray-100 rounded-xl p-1 mb-6">
                    <button
                      onClick={() => setLoginAgent(true)}
                      className={`flex-1 py-2 px-4 rounded-lg transition-all duration-300 ${
                        loginAgent
                          ? "bg-white shadow-md text-indigo-600"
                          : "text-gray-600 hover:text-indigo-600"
                      }`}
                    >
                      User
                    </button>
                    <button
                      onClick={() => setLoginAgent(false)}
                      className={`flex-1 py-2 px-4 rounded-lg transition-all duration-300 ${
                        !loginAgent
                          ? "bg-white shadow-md text-indigo-600"
                          : "text-gray-600 hover:text-indigo-600"
                      }`}
                    >
                      Agent
                    </button>
                  </div>

                  <Formik
                    initialValues={{ phone_number: "", password: "" }}
                    validationSchema={loginValidationSchema}
                    onSubmit={handleLogin}
                  >
                    <Form className="space-y-4">
                      <div className="h-20">
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                          Phone Number
                        </label>
                        <Field
                          name="phone_number"
                          className="w-full px-3 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300"
                          placeholder="Enter your phone number"
                        />
                        <div className="h-4 mt-1">
                          <ErrorMessage
                            name="phone_number"
                            component="p"
                            className="text-xs text-red-600"
                          />
                        </div>
                      </div>

                      <div className="h-20">
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                          Password
                        </label>
                        <Field
                          type="password"
                          name="password"
                          className="w-full px-3 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300"
                          placeholder="Enter your password"
                        />
                        <div className="h-4 mt-1">
                          <ErrorMessage
                            name="password"
                            component="p"
                            className="text-xs text-red-600"
                          />
                        </div>
                      </div>

                      <div>
                        {error && (
                          <div className="bg-red-50 border-l-4 border-red-500 p-3 rounded-lg mb-2">
                            <p className="text-xs text-red-600">{error}</p>
                          </div>
                        )}
                      </div>

                      <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-2.5 rounded-xl font-medium hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all duration-300 mt-0"
                      >
                        Sign In
                      </button>

                      <div className="relative my-2">
                        <div className="absolute inset-0 flex items-center">
                          <div className="w-full border-t border-gray-300"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                          <span className="px-2 bg-white text-gray-500">Or continue with</span>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={handleGoogleLogin}
                        className="w-full flex items-center justify-center gap-3 px-4 py-2.5 border border-gray-300 rounded-xl font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-300"
                      >
                        <svg className="w-5 h-5" viewBox="0 0 24 24">
                          <path
                            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                            fill="#4285F4"
                          />
                          <path
                            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                            fill="#34A853"
                          />
                          <path
                            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                            fill="#FBBC05"
                          />
                          <path
                            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                            fill="#EA4335"
                          />
                        </svg>
                        Sign in with Google
                      </button>

                      <div className="text-center">
                        <p className="text-xs text-gray-600">
                          Don't have an account?{" "}
                          <button
                            type="button"
                            onClick={() => setShowLogin(false)}
                            className="text-indigo-600 hover:text-indigo-700 font-medium transition-colors duration-300"
                          >
                            Create Account
                          </button>
                        </p>
                      </div>
                    </Form>
                  </Formik>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center overflow-hidden">
        <div className="w-full max-w-7xl mx-auto px-4">
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden" style={{ maxHeight: '90vh' }}>
            <div className="flex flex-col lg:flex-row">
              {/* Left Side - Branding */}
              <div className="lg:w-1/2 bg-gradient-to-br from-indigo-600 to-purple-600 p-8">
                <div className="h-full flex flex-col justify-center">
                  <div className="mb-6">
                    <h1 className="text-3xl font-bold text-white mb-3">Join RuralFin</h1>
                    <p className="text-indigo-100 text-base leading-relaxed">
                      Start your journey towards financial empowerment
                    </p>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center flex-shrink-0">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-white font-semibold text-base mb-0.5">Easy Registration</h3>
                        <p className="text-indigo-100 text-sm leading-relaxed">Quick and simple sign-up process</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3">
                      <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center flex-shrink-0">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-white font-semibold text-base mb-0.5">Instant Access</h3>
                        <p className="text-indigo-100 text-sm leading-relaxed">Get started with your account immediately</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3">
                      <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center flex-shrink-0">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-white font-semibold text-base mb-0.5">Quick Setup</h3>
                        <p className="text-indigo-100 text-sm leading-relaxed">Set up your account in minutes</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Side - Signup Form */}
              <div className="lg:w-1/2 p-8">
                <div className="h-full flex flex-col justify-center max-w-md mx-auto">
                  <div className="text-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">Create Account</h2>
                    <p className="text-gray-600 text-sm">Join our community today</p>
                  </div>

                  {/* User/Agent Toggle */}
                  <div className="flex bg-gray-100 rounded-xl p-1 mb-6">
                    <button
                      onClick={() => setShowAgent(false)}
                      className={`flex-1 py-2 px-4 rounded-lg transition-all duration-300 ${
                        !showAgent
                          ? "bg-white shadow-md text-indigo-600"
                          : "text-gray-600 hover:text-indigo-600"
                      }`}
                    >
                      User
                    </button>
                    <button
                      onClick={() => setShowAgent(true)}
                      className={`flex-1 py-2 px-4 rounded-lg transition-all duration-300 ${
                        showAgent
                          ? "bg-white shadow-md text-indigo-600"
                          : "text-gray-600 hover:text-indigo-600"
                      }`}
                    >
                      Agent
                    </button>
                  </div>

                  {!showAgent ? (
                    <UserSignupForm
                      showAgent={showAgent}
                      error={error}
                      setShowLogin={setShowLogin}
                    />
                  ) : (
                    <AgentSignupForm
                      showAgent={showAgent}
                      error={error}
                      setShowLogin={setShowLogin}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default Login;
