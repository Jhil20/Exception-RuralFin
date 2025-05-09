import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Phone } from "lucide-react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Header from "../components/Header";
import { auth, RecaptchaVerifier, signInWithPhoneNumber } from "../firebase";

const Login = () => {
  const navigate = useNavigate();
  const [firebaseError, setFirebaseError] = useState("");

  const validationSchema = Yup.object({
    phoneNumber: Yup.string()
      .required("Phone number is required")
      .matches(/^\d{10}$/, "Please enter a valid 10-digit phone number"),
  });

  const initialValues = {
    phoneNumber: "",
  };

  // Setup reCAPTCHA
  const setupRecaptcha = () => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        "recaptcha-container",
        {
          size: "invisible",
          callback: (response) => {
            // reCAPTCHA solved
          },
          "expired-callback": () => {
            console.warn("reCAPTCHA expired. Please try again.");
          },
        },
        auth
      );
    }
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    setFirebaseError("");
    setupRecaptcha();

    const appVerifier = window.recaptchaVerifier;
    const fullPhone = `+91${values.phoneNumber}`;

    try {
      const confirmationResult = await signInWithPhoneNumber(auth, fullPhone, appVerifier);
      window.confirmationResult = confirmationResult;
      navigate("/verifyotp", { state: { phoneNumber: fullPhone } });
    } catch (error) {
      console.error("SMS not sent:", error);
      setFirebaseError(error.message);
      window.recaptchaVerifier.clear();
    }

    setSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex flex-col">
      <Header />

      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-extrabold text-gray-900 mb-2">
              Welcome Back
            </h1>
            <p className="text-gray-600 text-lg">
              Sign in with your phone number
            </p>
          </div>

          <div className="bg-white shadow-2xl rounded-2xl p-8 border border-gray-100 transition-all duration-300 hover:shadow-xl">
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ values, handleChange, handleBlur, isSubmitting }) => (
                <Form className="space-y-6">
                  <div className="space-y-2">
                    <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">
                      Phone Number
                    </label>
                    <div className="relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Phone className="h-5 w-5 text-gray-400" />
                      </div>
                      <Field
                        type="tel"
                        id="phoneNumber"
                        name="phoneNumber"
                        className="block w-full pl-10 pr-3 py-3 border-gray-300 bg-gray-50 focus:ring-black focus:border-black rounded-lg transition-all duration-200 outline-none focus:bg-white text-gray-900"
                        placeholder="Enter your 10-digit phone number"
                        value={values.phoneNumber}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        required
                        maxLength={10}
                      />
                    </div>
                    <ErrorMessage name="phoneNumber" component="div" className="text-sm text-red-600 mt-1" />
                    {firebaseError && <div className="text-sm text-red-600 mt-1">{firebaseError}</div>}
                  </div>

                  <div className="pt-0">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full cursor-pointer flex justify-center items-center px-4 py-3 border border-transparent text-base font-medium rounded-lg shadow-sm text-white bg-black hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition-all duration-200"
                    >
                      {isSubmitting ? "Sending OTP..." : "Continue"}
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </button>
                  </div>

                  <div id="recaptcha-container"></div>
                </Form>
              )}
            </Formik>

            <div className="mt-8 text-center">
              <p className="text-sm text-gray-600">
                Don't have an account?{" "}
                <a href="/register" className="font-medium text-gray-900 hover:text-black transition-colors border-b border-gray-900">
                  Register Now
                </a>
              </p>
            </div>
          </div>

          <div className="text-center mt-8">
            <p className="text-xs text-gray-500">
              By signing in, you agree to our{" "}
              <a href="/terms" className="text-gray-700 hover:text-black transition-colors">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="/privacy" className="text-gray-700 hover:text-black transition-colors">
                Privacy Policy
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
