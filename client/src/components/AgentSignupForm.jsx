import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import {
  agentSignupValidationSchema2,
  agentValidationSchema,
} from "../yupValidators/validationSchema";
import axios from "axios";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import CityAutocomplete from "./CityAutoComplete";

const AgentSignupForm = (props) => {
  const steps = ["Personal Information", "Address Information"];
  const [activeStep, setActiveStep] = useState(0);
  const [profileData, setProfileData] = useState({});

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

  const handleAgentSignupSubmit = async (values) => {
    console.log("in agent sigunp", values);
    try {
      const formData = { ...profileData, ...values };
      console.log("formData", formData);
      const response = await axios.post(
        "http://localhost:5000/agent/register",
        formData
      ); /// backend not working for create agent
      console.log("response", response);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
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
        {props.showAgent && activeStep == 0 && (
          <Formik
            initialValues={{
              full_name: profileData.full_name || "",
              phone_num: profileData.phone_num || "",
              email: profileData.email || "",   
              bank_details: profileData.bank_details || "",
              security_deposit: profileData.security_deposit || "",
              payment_mode: profileData.payment_mode || "",
            }}
            validationSchema={agentValidationSchema}
            onSubmit={handleNext}
          >
            <Form className="space-y-4 flex flex-wrap">
              {/* Agent Name */}
              <div className="flex-auto mr-3">
                <label className="block text-gray-700 mb-1 ml-1">
                  Agent Name*
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

              {/* Agent Phone */}
              <div className="flex-auto">
                <label className="block text-gray-700 mb-1 ml-1">
                  Agent Phone*
                </label>
                <Field
                  name="phone_num"
                  className="w-full p-2 border hover:ring-[1px] ring-gray-700 transition-all duration-500 border-gray-300 rounded-md"
                />
                <ErrorMessage
                  name="phone_num"
                  component="p"
                  className="text-red-500 text-sm"
                />
              </div>

              {/* Email */}
              <div className="flex-auto mr-3">
                <label className="block text-gray-700 mb-1 ml-1">Email*</label>
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
                  Bank Acc. Number*
                </label>
                <Field
                  type="number"
                  name="bank_details"
                  className="w-full no-spinner p-2 border hover:ring-[1px] ring-gray-700 transition-all duration-500 border-gray-300 rounded-md"
                />
                <ErrorMessage
                  name="bank_details"
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
                  name="security_deposit"
                  className="w-full p-2 border hover:ring-[1px] ring-gray-700 transition-all duration-500 border-gray-300 rounded-md no-spinner"
                />
                <ErrorMessage
                  name="security_deposit"
                  component="p"
                  className="text-red-500 text-sm"
                />
              </div>

              <div className="flex-auto">
                <label className="block text-gray-700 mb-1 ml-1">
                  Payment Mode*
                </label>
                <Field
                  as="select"
                  name="payment_mode"
                  className="w-full p-2 border hover:ring-[1px] ring-gray-700 transition-all duration-500 border-gray-300 rounded-md"
                >
                  <option value="" label="Select payment mode" />
                  <option value="CASH" label="Cash" />
                  <option value="DIGITAL" label="Digital" />
                </Field>
                <ErrorMessage
                  name="payment_mode"
                  component="p"
                  className="text-red-500 text-sm"
                />
              </div>

              {props?.error && (
                <h1 className="text-md text-red-500 font-bold">
                  {error || "Something Went Wrong. Please Try Again"}
                </h1>
              )}

              {/* Submit Button */}
              {/* <button
                type="submit"
                className="w-full bg-blue-700 text-white cursor-pointer py-2 rounded-md hover:bg-blue-800 transition-all duration-500"
              >
                Submit
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
                  className={` ${
                    activeStep === 0
                      ? "cursor-pointer text-3xl bg-gray-500 border-2 border-black py-2 px-6 w-20 rounded-md  transition shadow-lg "
                      : "cursor-pointer w-20 text-white bg-gradient-to-tr from-blue-600 to-blue-950 hover:from-blue-950 hover:to-blue-600 duration-700 bg-blue-700  py-2 px-6 rounded-md hover:bg-blue-800 transition shadow-lg shadow-black/20 hover:shadow-black/50"
                  }`}
                >
                  Back
                </Button>

                <Box sx={{ flex: "1 1 auto" }} />

                <button
                  type="submit"
                  className="cursor-pointer bg-gradient-to-tr from-blue-600 to-blue-950 hover:from-blue-950 hover:to-blue-600 duration-700 bg-blue-700 text-white py-2 px-6 rounded-md hover:bg-blue-800 transition shadow-lg shadow-black/30 hover:shadow-black/50"
                >
                  {activeStep === steps.length - 1 ? "Finish" : "Next"}
                </button>
              </Box>

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

        {props.showAgent && activeStep == 1 && (
          <Formik
            initialValues={{
              address: "",
              city: "",
              pincode: "",
              state: "",
            }}
            validationSchema={agentSignupValidationSchema2}
            onSubmit={handleAgentSignupSubmit}
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
              <CityAutocomplete showAgent={props.showAgent} />

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

                <button type="submit">Sign Up</button>
              </Box>
            </Form>
          </Formik>
        )}
      </Box>
    </div>
  );
};

export default AgentSignupForm;
