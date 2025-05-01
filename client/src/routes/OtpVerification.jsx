import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ArrowRight, Lock } from "lucide-react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Header from "../components/Header";

const OtpVerification = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const phoneNumber = location.state?.phoneNumber;

  const validationSchema = Yup.object({
    otpNumber: Yup.string()
      .required("OTP is required")
      .matches(/^\d{6}$/, "Please enter a valid 6-digit OTP"),
  });

  const initialValues = {
    otpNumber: "",
  };

  const handleSubmit = (values) => {
    // Simulate successful OTP verification
    console.log("Verifying OTP for:", phoneNumber);
    navigate("/dashboard"); // or wherever the app routes after login
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex flex-col">
      <Header />

      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Enter OTP
            </h1>
            <p className="text-gray-600 text-base">
              We've sent a 6-digit OTP to <span className="font-semibold">{phoneNumber}</span>
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
                    <label
                      htmlFor="otpNumber"
                      className="block text-sm font-medium text-gray-700"
                    >
                      OTP
                    </label>
                    <div className="relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Lock className="h-5 w-5 text-gray-400" />
                      </div>
                      <Field
                        type="tel"
                        id="otpNumber"
                        name="otpNumber"
                        className="block w-full pl-10 pr-3 py-3 border-gray-300 bg-gray-50 focus:ring-black focus:border-black rounded-lg transition-all duration-200 outline-none focus:bg-white text-gray-900"
                        placeholder="Enter 6-digit OTP"
                        value={values.otpNumber}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        required
                        maxLength={6}
                      />
                    </div>
                    <ErrorMessage
                      name="otpNumber"
                      component="div"
                      className="text-sm text-red-600 mt-1"
                    />
                  </div>

                  <div className="pt-0">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full cursor-pointer flex justify-center items-center px-4 py-3 border border-transparent text-base font-medium rounded-lg shadow-sm text-white bg-black hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition-all duration-200"
                    >
                      {isSubmitting ? "Verifying..." : "Verify OTP"}
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </button>
                  </div>
                </Form>
              )}
            </Formik>

            <div className="mt-8 text-center">
              <p className="text-sm text-gray-600">
                Didn't receive the code?{" "}
                <button className="text-black font-semibold cursor-pointer">Resend OTP</button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OtpVerification;
