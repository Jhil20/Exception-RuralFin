import React, { useState } from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { ErrorMessage, Field, Form, Formik } from "formik";
import {
  signupValidationSchema,
  signupValidationSchema2,
} from "../yupValidators/validationSchema";
import CityAutocomplete from "./CityAutoComplete";
import axios from "axios";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { userLoggedin } from "../redux/slices/signInSlice";

const UserSignupForm = (props) => {
  const steps = ["Personal Information", "Address Information"];
  const [activeStep, setActiveStep] = useState(0);
  const [profileData, setProfileData] = useState({});

  const dispatch = useDispatch();

  const handleNext = (values) => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    console.log("values", values);
    setProfileData(values);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const handleUserSignupSubmit = async (values) => {
    console.log("hhhhhhh");
    try {
      const formData = { ...profileData, ...values };
      console.log("formData", formData);
      const response = await axios.post(
        "http://localhost:5000/users/register",
        formData
      );
      const token = response?.data?.data?.user?.refresh_token;
      Cookies.set("jwt-token", token);
      dispatch(userLoggedin());
      props.setShowLogin(true);
      // navigate("/");
      console.log("response", response);
    } catch (error) {
      // setError(error?.response?.data?.message || "Something Went Wrong");
      console.log("error", error);
    }
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Stepper activeStep={activeStep} className="mb-6">
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};

          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {activeStep === steps.length ? (
        <>
          <Typography sx={{ mt: 2, mb: 1 }}>
            All steps completed - you&apos;re finished
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Box sx={{ flex: "1 1 auto" }} />
            <Button onClick={handleReset}>Reset</Button>
          </Box>
        </>
      ) : (
        <>
          {!props.showAgent && activeStep == 0 && (
            <Formik
              initialValues={{
                full_name: profileData.full_name || "",
                phone_number: profileData.phone_number || "",
                email: profileData.email || "",
                gender: profileData.gender || "",
                age: profileData.age || "",
                income: profileData.income || "",
                budget_limit: profileData.budget_limit || "",
                password: profileData.password || "",
                confirmPassword: profileData.confirmPassword || "",
              }}
              validationSchema={signupValidationSchema}
              onSubmit={handleNext}
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
                  <label className="block text-gray-700 mb-1 ml-1 mr-2">
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
                  <label className="block text-gray-700 mb-1 ml-1 mr-2">Age*</label>
                  <Field
                    type="text"
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

                <div className="flex-auto mr-3">
                  <label className="block text-gray-700 mb-1 ml-1">
                    Password*
                  </label>
                  <Field
                    type="text"
                    name="password"
                    className="w-full p-2 border hover:ring-[1px] ring-gray-700 transition-all duration-500 border-gray-300 rounded-md no-spinner"
                  />
                  <ErrorMessage
                    name="password"
                    component="p"
                    className="text-red-500 text-sm"
                  />
                </div>

                <div className="flex-auto">
                  <label className="block text-gray-700 mb-1 ml-1">
                    Confirm Password*
                  </label>
                  <Field
                    type="text"
                    name="confirmPassword"
                    className="w-full p-2 border hover:ring-[1px] ring-gray-700 transition-all duration-500 border-gray-300 rounded-md no-spinner"
                  />
                  <ErrorMessage
                    name="confirmPassword"
                    component="p"
                    className="text-red-500 text-sm"
                  />
                </div>

                {props.error && (
                  <h1 className="text-md text-red-500 font-bold">
                    {error || "Something Went Wrong. Please Try Again"}
                  </h1>
                )}

                {/* Submit Button */}
                {/* <button
                  type="submit"
                  className="w-full bg-blue-700 text-white cursor-pointer py-2 rounded-md hover:bg-blue-800 transition-all duration-500"
                >
                  Sign Up
                </button> */}
                <Box
                  sx={{ display: "flex", flexDirection: "row", }}
                  className="w-full"
                >
                  <Button
                    color="inherit"
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    sx={{ mr: 1 }}
                  >
                    Back
                  </Button>

                  <Box sx={{ flex: "1 1 auto" }} />

                  <button type="submit" className="cursor-pointer w-20 py-2 bg-gradient-to-tr from-blue-600 to-blue-950 text-white rounded-lg shadow-lg hover:from-blue-950 hover:to-blue-600 transition duration-700 hover:shadow-black/40">
                    {activeStep === steps.length - 1 ? "Finish" : "Next"}
                  </button>
                </Box>
              </Form>
            </Formik>
          )}

          {!props.showAgent && activeStep == 1 && (
            <Formik
              initialValues={{
                address: "",
                city: "",
                pincode: "",
                state: "",
                user_pin: "",
              }}
              validationSchema={signupValidationSchema2}
              onSubmit={handleUserSignupSubmit}
            >
              <Form className="space-y-4 flex flex-wrap w-full">
                {/* Address */}
                <div className="flex-auto mr-3">
                  <label className="block text-gray-700 mb-1 ml-1">
                    Street Address*
                  </label>
                  <Field
                    name="address"
                    className="w-full p-2 border hover:ring-[1px] ring-gray-700 transition-all duration-500 border-gray-300 rounded-md"
                  />
                  <ErrorMessage
                    name="address"
                    component="p"
                    className="text-red-500 text-sm"
                  />
                </div>
                <CityAutocomplete />

                {props.error && (
                  <h1 className="text-md text-red-500 font-bold">
                    {error || "Something Went Wrong. Please Try Again"}
                  </h1>
                )}

                {/* Submit Button */}
                {/* <button
                  type="submit"
                  className="w-full bg-blue-700 text-white cursor-pointer py-2 rounded-md hover:bg-blue-800 transition-all duration-500"
                >
                  Sign Up
                </button> */}
                <Box
                  sx={{ display: "flex", flexDirection: "row", pt: 2 }}
                  className="w-full"
                >
                  <Button
                    color="inherit"
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    sx={{ mr: 1 }}
                  >
                    Back
                  </Button>

                  <Box sx={{ flex: "1 1 auto" }} className="cursor-pointer" />

                  <button type="submit" className="cursor-pointer bg-gradient-to-tr from-blue-600 to-blue-950 hover:from-blue-950 hover:to-blue-600 duration-700 bg-blue-700 text-white py-2 px-6 rounded-md hover:bg-blue-800 transition shadow-lg shadow-black/30 hover:shadow-black/50">Sign Up</button>
                </Box>
              </Form>
            </Formik>
          )}

          <div className="w-full flex justify-center h-fit">
            <h1
              className="cursor-pointer w-fit text-center text-gray-700"
              onClick={() => {
                props.setShowLogin(true);
              }}
            >
              Already have an account? Signin!!
            </h1>
          </div>
        </>
      )}
    </Box>
  );
};

export default UserSignupForm;
