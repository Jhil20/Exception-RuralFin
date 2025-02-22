import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
// Validation Schema
const loginValidationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

// Validation Schema
const signupValidationSchema = Yup.object().shape({
  full_name: Yup.string().required("Full Name is required"),
  phone_number: Yup.string()
    .matches(/^\d{10}$/, "Phone number must be 10 digits")
    .required("Phone Number is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  gender: Yup.string()
    .oneOf(["Male", "Female", "Other"], "Select a valid gender")
    .required("Gender is required"),
  age: Yup.number()
    .min(18, "Must be at least 18")
    .max(100, "Must be under 100")
    .required("Age is required"),
  income: Yup.number()
    .min(0, "Income cannot be negative")
    .required("Income is required"),
  budget_limit: Yup.number()
    .min(0, "Budget cannot be negative")
    .required("Budget Limit is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const handleSignupSubmit = async (values) => {
//   console.log("values", values);
  try {
    console.log("hhhhhhh")
    const response = await axios.post(
      "http://localhost:5000/users/register",
      values
    );
    console.log("response",response);
  } catch (error) {
    console.log("error", error);
  }
};

const Login = () => {
  const [showLogin, setShowLogin] = useState(true);

  if (showLogin) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-lg w-96">
          <h2 className="text-2xl font-bold text-center mb-6">Login</h2>

          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={loginValidationSchema}
            onSubmit={(values) => {
              console.log("Login Data:", values);
              // Handle login logic here
            }}
          >
            {({ isSubmitting }) => (
              <Form className="space-y-4">
                {/* Email Field */}
                <div>
                  <label className="block text-gray-700">Email</label>
                  <Field
                    type="email"
                    name="email"
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-200"
                  />
                  <ErrorMessage
                    name="email"
                    component="p"
                    className="text-red-500 text-sm"
                  />
                </div>

                {/* Password Field */}
                <div>
                  <label className="block text-gray-700">Password</label>
                  <Field
                    type="password"
                    name="password"
                    autoComplete="password"
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-200"
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
                    onClick={() => setShowLogin(false)}
                  >
                    Don't have an account? Signup!!
                  </h1>
                </div>

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
          validationSchema={signupValidationSchema}
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
