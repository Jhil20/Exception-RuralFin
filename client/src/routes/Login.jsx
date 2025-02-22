import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  loginValidationSchema,
  signupValidationSchema,
} from "../yupValidators/validationSchema";
import { userLoggedin } from "../redux/slices/signInSlice";

const Login = () => {
  const [showLogin, setShowLogin] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState(null);
  const loginValidation = loginValidationSchema;
  const signupValidation = signupValidationSchema;

  const handleLogin = async (values) => {
    console.log("values", values);
    try {
      const response = await axios.post(
        "http://localhost:5000/users/login",
        values
      );
      console.log("response", response);
      const token = response?.data?.data?.user?.refresh_token;
      Cookies.set("jwt-token", token);
      dispatch(userLoggedin());
      navigate("/");
    } catch (error) {
      setError(error?.response?.data?.message || "Something Went Wrong");
      console.log("error", error);
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
      navigate("/");
      console.log("response", response);
    } catch (error) {
      setError(error?.response?.data?.message || "Something Went Wrong");
      console.log("error", error);
    }
  };

  if (showLogin) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-lg w-96">
          <h2 className="text-2xl font-bold text-center mb-6">Login</h2>

          <Formik
            initialValues={{ phone_number: "" }}
            validationSchema={loginValidation}
            onSubmit={handleLogin}
          >
            {({ isSubmitting }) => (
              <Form className="space-y-4">
                {/* Phone_number */}
                <div>
                  <label className="block text-gray-700">Phone Number</label>
                  <Field
                    name="phone_number"
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-200"
                  />
                  <ErrorMessage
                    name="phone_number"
                    component="p"
                    className="text-red-500 text-sm"
                  />
                </div>

                <div className="w-full h-fit">
                  <h1
                    className="cursor-pointer"
                    onClick={() => setShowLogin(false)}
                  >
                    Don't have an account? Signup!!
                  </h1>
                </div>
                {error && (
                  <h1 className="text-md text-red-500 font-bold">
                    {error || "Something Went Wrong. Please Try Again"}
                  </h1>
                )}
                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 disabled:bg-blue-300"
                >
                  {isSubmitting ? "Logging in..." : "Login"}
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold text-center mb-6">Signup</h2>

        <Formik
          initialValues={{
            full_name: "",
            phone_number: "",
            email: "",
            gender: "",
            age: "",
            income: "",
            budget_limit: "",
            password: "",
          }}
          validationSchema={signupValidation}
          onSubmit={handleSignupSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-4">
              {/* Full Name */}
              <div>
                <label className="block text-gray-700">Full Name</label>
                <Field
                  name="full_name"
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
                <ErrorMessage
                  name="full_name"
                  component="p"
                  className="text-red-500 text-sm"
                />
              </div>

              {/* Phone Number */}
              <div>
                <label className="block text-gray-700">Phone Number</label>
                <Field
                  name="phone_number"
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
                <ErrorMessage
                  name="phone_number"
                  component="p"
                  className="text-red-500 text-sm"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-gray-700">Email</label>
                <Field
                  type="email"
                  name="email"
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
                <ErrorMessage
                  name="email"
                  component="p"
                  className="text-red-500 text-sm"
                />
              </div>

              {/* Gender */}
              <div>
                <label className="block text-gray-700">Gender</label>
                <Field
                  as="select"
                  name="gender"
                  className="w-full p-2 border border-gray-300 rounded-md"
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
              <div>
                <label className="block text-gray-700">Age</label>
                <Field
                  type="number"
                  name="age"
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
                <ErrorMessage
                  name="age"
                  component="p"
                  className="text-red-500 text-sm"
                />
              </div>

              {/* Income */}
              <div>
                <label className="block text-gray-700">Income</label>
                <Field
                  type="number"
                  name="income"
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
                <ErrorMessage
                  name="income"
                  component="p"
                  className="text-red-500 text-sm"
                />
              </div>

              {/* Budget Limit */}
              <div>
                <label className="block text-gray-700">Budget Limit</label>
                <Field
                  type="number"
                  name="budget_limit"
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
                <ErrorMessage
                  name="budget_limit"
                  component="p"
                  className="text-red-500 text-sm"
                />
              </div>

              {/* Password */}
              <div>
                <label className="block text-gray-700">Password</label>
                <Field
                  type="password"
                  name="password"
                  autoComplete="password"
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
                <ErrorMessage
                  name="password"
                  component="p"
                  className="text-red-500 text-sm"
                />
              </div>
              <div className="w-full h-fit">
                <h1
                  className="cursor-pointer"
                  onClick={() => setShowLogin(true)}
                >
                  Already have an account? Signin!!
                </h1>
              </div>

              {error && (
                <h1 className="text-md text-red-500 font-bold">
                  {error || "Something Went Wrong. Please Try Again"}
                </h1>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 disabled:bg-blue-300"
              >
                {isSubmitting ? "Signing up..." : "Signup"}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Login;
