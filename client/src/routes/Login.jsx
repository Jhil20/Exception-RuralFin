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
    console.log("values", values);
    try {
      if(loginAgent){

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
          dispatch(userLoggedin());
          console.log("in ifcondition");
        }
        Cookies.set("jwt-token", token);
        dispatch(userLoggedin());
        navigate("/userDashboard");
      }else{
        console.log("ing agent login",values)
        const formData={phone_num:values.phone_number,password:values.password}
        const response = await axios.post(
          "http://localhost:5000/agent/login",
          formData
        );
        console.log("response", response);
        const token = response?.data?.data?.agent?.refresh_token;
        
        console.log(response?.data?.message);
        // if (response?.data?.message == "User logged in successfully") {
          // setOtpNumber(values.phone_number);
          // setShowOtp(true);
          // console.log("in ifcondition");
        // }
        Cookies.set("jwt-token", token);
        dispatch(userLoggedin());
        navigate("/agentDashboard");
      }
    } catch (error) {
      setError(error?.response?.data?.message || "Something Went Wrong");
      console.log("error", error);
    }
  };

  if (showLogin) {
    return (
      <div className="flex justify-center items-center h-[90.7vh] bg-gray-300">
          <div className="bg-white min-h-9/12 w-3/12 h-fit  p-6 rounded-lg hover:shadow-2xl transition-all duration-500 hover:ring-[906px] overflow-clip z-1 relative ring-gray-400 shadow-lg ">
            <h2 className="text-2xl font-bold text-center text-gray-700 mb-4">
              Login to your RuralFin account
            </h2>

            <div className="w-full justify-center flex h-10 mb-4">
            <div
              onClick={() => setLoginAgent(true)}
              className={`w-28 cursor-pointer ${
                !loginAgent
                  ? "bg-gray-300 text-gray-800"
                  : "bg-gray-800 text-gray-200"
              } hover:ring-2 ring-gray-800 transition-all duration-600 flex mr-2 bg-gray-300 rounded-l-2xl justify-center items-center`}
            >
              <h2 className="text-md  font-semibold">User</h2>
            </div>
            <div
              onClick={() => setLoginAgent(false)}
              className={`w-28 cursor-pointer ${
                !loginAgent
                  ? "bg-gray-800 text-gray-200"
                  : "bg-gray-300 text-gray-800"
              } hover:ring-2 ring-gray-800 transition-all duration-600 flex mr-2 bg-gray-300 rounded-r-2xl justify-center items-center`}
            >
              <h2 className="text-md  font-semibold">Agent</h2>
            </div>
          </div>

            <Formik
              initialValues={{ phone_number: "" ,password:""}}
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

                <div>
                  <p className="text-gray-700 m-1">Password*</p>
                  <Field
                    type="password"
                    name="password"
                    className="w-full p-2 border hover:ring-[1px] ring-gray-700 transition-all duration-500 border-gray-300 rounded-md focus:ring focus:ring-blue-200"
                  />
                  <ErrorMessage
                    name="password"
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
      </div>
    );
  } else {
    return (
      <div className="flex justify-center items-center h-[90.7vh] bg-gray-100">
        <div className="bg-white hover:ring-[960px] content-center ring-gray-400 min-h-11/12 h-fit transition-all duration-600 relative z-1 flex flex-wrap justify-center items-center p-8 pt-4 rounded-lg shadow-lg w-5/12">
          <h2 className="text-2xl text-gray-800 w-full font-bold text-center mb-4 h-fit">
            Create your RuralFin account
          </h2>
          <div className="w-5/12 flex h-10 mb-4">
            <div
              onClick={() => setShowAgent(false)}
              className={`w-1/2 cursor-pointer ${
                showAgent
                  ? "bg-gray-300 text-gray-800"
                  : "bg-gray-800 text-gray-200"
              } hover:ring-2 ring-gray-800 transition-all duration-600 flex mr-2 bg-gray-300 rounded-l-2xl justify-center items-center`}
            >
              <h2 className="text-md  font-semibold">User</h2>
            </div>
            <div
              onClick={() => setShowAgent(true)}
              className={`w-1/2 cursor-pointer ${
                showAgent
                  ? "bg-gray-800 text-gray-200"
                  : "bg-gray-300 text-gray-800"
              } hover:ring-2 ring-gray-800 transition-all duration-600 flex mr-2 bg-gray-300 rounded-r-2xl justify-center items-center`}
            >
              <h2 className="text-md  font-semibold">Agent</h2>
            </div>
          </div>
          {!showAgent && (
            <UserSignupForm
              showAgent={showAgent}
              error={error}
              setShowLogin={setShowLogin}
            />
          )}

          {showAgent && (
            <AgentSignupForm
              showAgent={showAgent}
              error={error}
              setShowLogin={setShowLogin}
            />
          )}
        </div>
      </div>
    );
  }
};

export default Login;
