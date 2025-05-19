import { ErrorMessage, Field, Form, Formik } from "formik";
import { useState } from "react";
import {
  budgetPlanningValidationSchemaStep1,
  budgetPlanningValidationSchemaStep2,
} from "../yupValidators/validationSchema";
import { BACKEND_URL } from "../utils/constants";
import Cookies from "js-cookie";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const BudgetPlanningForm = ({ setBudgetPlanningForm ,setBudgetPlanningEnabled}) => {
  const budgetPlanningInitialValuesStep1 = {
    budget: "",
    income: "",
    savingsGoal: "",
    alertsEnabled: "",
  };

  const budgetPlanningInitialValuesStep2 = {
    CBHousing: "",
    CBFood: "",
    CBHealthcare: "",
    CBEducation: "",
    CBUtilities: "",
    CBEntertainment: "",
    CBTransport: "",
    CBOthers: "",
  };

  const [step, setStep] = useState(1);
  const [step1Data, setStep1Data] = useState({});
  const [budgetStep1Error, setBudgetStep1Error] = useState(false);
  const [budgetStep2Error, setBudgetStep2Error] = useState(false);

  const handleStep1Submit = async (values) => {
    const { budget, income, savingsGoal } = values;
    if (budget + savingsGoal > income) {
      setBudgetStep1Error(true);
      return;
    }else if(budget + savingsGoal < income){
      values.savingsGoal = income - budget;
    }
    setBudgetStep1Error(false);
    setStep1Data(values);
    setStep(2);
    console.log("Step 1 Data", values);
    // console.log("Step 1 Data", step1Data);
  };

  const handleStep2Submit = async (values) => {
    if (
      values.CBHousing +
        values.CBFood +
        values.CBHealthcare +
        values.CBEducation +
        values.CBUtilities +
        values.CBEntertainment +
        values.CBTransport +
        values.CBOthers >
      step1Data.budget
    ) {
      setBudgetStep2Error(true);
      return;
    }

    if (
      values.CBHousing +
        values.CBFood +
        values.CBHealthcare +
        values.CBEducation +
        values.CBUtilities +
        values.CBEntertainment +
        values.CBTransport +
        values.CBOthers <
      step1Data.budget
    ) {
      values.CBOthers =
        step1Data.budget -
        (values.CBHousing +
          values.CBFood +
          values.CBHealthcare +
          values.CBEducation +
          values.CBUtilities +
          values.CBEntertainment +
          values.CBTransport);
    }
    setBudgetStep2Error(false);
    const token = Cookies.get("token");
    const decoded = jwtDecode(token);
    const allvalues = { ...values, ...step1Data, userId: decoded.id };
    try {
      const result = await axios.post(`${BACKEND_URL}/api/budget/`, allvalues);
      console.log("Budget Created", result);
      setStep(1);
      setBudgetPlanningForm(false);
      setBudgetPlanningEnabled(true);
      setStep1Data({});
      setBudgetStep1Error(false);
      setBudgetStep2Error(false);
      console.log("Step 2 Data", values);
    } catch (err) {
      console.log("error in creating budget", err);
    }
  };

  return (
    <div className="bg-white h-fit w-2/3 rounded-2xl p-6 shadow-sm">
      <div className="flex h-1/12 justify-start items-start mb-6">
        <h1 className="text-xl font-semibold">
          {step == 1
            ? "Budget Planning Details - Monthly Basis Information"
            : step == 2
            ? "Budget Planning Details - Category Wise Budgeting"
            : "Budget Planning Details - Category Wise Spending"}
        </h1>
      </div>
      <div className="h-11/12">
        {step == 1 && (
          <>
            <Formik
              initialValues={budgetPlanningInitialValuesStep1}
              validationSchema={budgetPlanningValidationSchemaStep1}
              onSubmit={handleStep1Submit}
            >
              {({ isSubmitting }) => (
                <Form className="space-y-5">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label
                        htmlFor="income"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Income Amount
                      </label>
                      <Field
                        type="number"
                        id="income"
                        name="income"
                        className="block w-full px-3 py-3 placeholder:text-gray-600 border-gray-300 border-[1px] bg-gray-50 focus:ring-black focus:border-black rounded-lg transition-all duration-200 outline-none focus:bg-white text-gray-900"
                        placeholder="Enter your Income Amount"
                      />
                      <ErrorMessage
                        name="income"
                        component="div"
                        className="text-sm text-red-600 mt-1"
                      />
                    </div>
                    <div className="space-y-2">
                      <label
                        htmlFor="alertsEnabled"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Enable Alerts
                      </label>
                      <Field
                        as="select"
                        id="alertsEnabled"
                        name="alertsEnabled"
                        className="block w-full px-3 py-3 placeholder:text-gray-600 border-gray-300 border-[1px] bg-gray-50 focus:ring-black focus:border-black rounded-lg transition-all duration-200 outline-none focus:bg-white text-gray-900"
                        placeholder="Enter your Spending Limit Amount"
                      >
                        <option value="" disabled>
                          Select an option
                        </option>
                        <option value="true">Yes</option>
                        <option value="false">No</option>
                      </Field>
                      <ErrorMessage
                        name="alertsEnabled"
                        component="div"
                        className="text-sm text-red-600 mt-1"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label
                        htmlFor="budget"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Budget Amount
                      </label>
                      <Field
                        type="number"
                        id="budget"
                        name="budget"
                        className="block w-full px-3 py-3 placeholder:text-gray-600 border-gray-300 border-[1px] bg-gray-50 focus:ring-black focus:border-black rounded-lg transition-all duration-200 outline-none focus:bg-white text-gray-900"
                        placeholder="Enter your Budget Amount"
                      />
                      <ErrorMessage
                        name="budget"
                        component="div"
                        className="text-sm text-red-600 mt-1"
                      />
                    </div>
                    <div className="space-y-2">
                      <label
                        htmlFor="savingsGoal"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Savings Goal Amount
                      </label>
                      <Field
                        type="number"
                        id="savingsGoal"
                        name="savingsGoal"
                        className="block w-full px-3 py-3 placeholder:text-gray-600 border-gray-300 border-[1px] bg-gray-50 focus:ring-black focus:border-black rounded-lg transition-all duration-200 outline-none focus:bg-white text-gray-900"
                        placeholder="Enter your Savings Goal Amount"
                      />
                      <ErrorMessage
                        name="savingsGoal"
                        component="div"
                        className="text-sm text-red-600 mt-1"
                      />
                    </div>
                  </div>
                  {budgetStep1Error && (
                    <div>
                      <h1 className="text-sm text-red-600 ">
                        Budget + Savings Goal must not exceed Income
                      </h1>
                    </div>
                  )}
                  <div className="flex justify-between items-center">
                    <button
                      onClick={() => setBudgetPlanningForm(false)}
                      className="mt-4 w-52 px-4 py-3 bg-black  text-white font-semibold rounded-lg shadow-lg shadow-gray-400 hover:shadow-black/60 hover:bg-gray-800 transition-all duration-300 cursor-pointer disabled:bg-gray-400"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      className="mt-4 w-52 px-4 py-3 bg-black  text-white font-semibold rounded-lg shadow-lg shadow-gray-400 hover:shadow-black/60 hover:bg-gray-800 transition-all duration-300 cursor-pointer disabled:bg-gray-400"
                      disabled={isSubmitting}
                    >
                      Next
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </>
        )}
        {step == 2 && (
          <>
            <Formik
              initialValues={budgetPlanningInitialValuesStep2}
              validationSchema={budgetPlanningValidationSchemaStep2}
              onSubmit={handleStep2Submit}
            >
              {({ isSubmitting }) => (
                <Form className="space-y-5">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label
                        htmlFor="CBHousing"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Housing Amount
                      </label>
                      <Field
                        type="number"
                        id="CBHousing"
                        name="CBHousing"
                        className="block w-full px-3 py-3 placeholder:text-gray-600 border-gray-300 border-[1px] bg-gray-50 focus:ring-black focus:border-black rounded-lg transition-all duration-200 outline-none focus:bg-white text-gray-900"
                        placeholder="Enter your Category Budget Amount For Housing"
                      />
                      <ErrorMessage
                        name="CBHousing"
                        component="div"
                        className="text-sm text-red-600 mt-1"
                      />
                    </div>
                    <div className="space-y-2">
                      <label
                        htmlFor="CBFood"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Food & Dining Amount
                      </label>
                      <Field
                        type="number"
                        id="CBFood"
                        name="CBFood"
                        className="block w-full px-3 py-3 placeholder:text-gray-600 border-gray-300 border-[1px] bg-gray-50 focus:ring-black focus:border-black rounded-lg transition-all duration-200 outline-none focus:bg-white text-gray-900"
                        placeholder="Enter your Category Budget Amount For Food & Dining"
                      />
                      <ErrorMessage
                        name="CBFood"
                        component="div"
                        className="text-sm text-red-600 mt-1"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label
                        htmlFor="CBHealthcare"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Healthcare Amount
                      </label>
                      <Field
                        type="number"
                        id="CBHealthcare"
                        name="CBHealthcare"
                        className="block w-full px-3 py-3 placeholder:text-gray-600 border-gray-300 border-[1px] bg-gray-50 focus:ring-black focus:border-black rounded-lg transition-all duration-200 outline-none focus:bg-white text-gray-900"
                        placeholder="Enter your Category Budget Amount For Healthcare"
                      />
                      <ErrorMessage
                        name="CBHealthcare"
                        component="div"
                        className="text-sm text-red-600 mt-1"
                      />
                    </div>

                    <div className="space-y-2">
                      <label
                        htmlFor="CBEducation"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Education Amount
                      </label>
                      <Field
                        type="number"
                        id="CBEducation"
                        name="CBEducation"
                        className="block w-full px-3 py-3 placeholder:text-gray-600 border-gray-300 border-[1px] bg-gray-50 focus:ring-black focus:border-black rounded-lg transition-all duration-200 outline-none focus:bg-white text-gray-900"
                        placeholder="Enter your Category Budget Amount For Education"
                      />
                      <ErrorMessage
                        name="CBEducation"
                        component="div"
                        className="text-sm text-red-600 mt-1"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label
                        htmlFor="CBUtilities"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Utilities Amount
                      </label>
                      <Field
                        type="number"
                        id="CBUtilities"
                        name="CBUtilities"
                        className="block w-full px-3 py-3 placeholder:text-gray-600 border-gray-300 border-[1px] bg-gray-50 focus:ring-black focus:border-black rounded-lg transition-all duration-200 outline-none focus:bg-white text-gray-900"
                        placeholder="Enter your Category Budget Amount For Utilities"
                      />
                      <ErrorMessage
                        name="CBUtilities"
                        component="div"
                        className="text-sm text-red-600 mt-1"
                      />
                    </div>
                    <div className="space-y-2">
                      <label
                        htmlFor="CBEntertainment"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Entertainment Amount
                      </label>
                      <Field
                        type="number"
                        id="CBEntertainment"
                        name="CBEntertainment"
                        className="block w-full px-3 py-3 placeholder:text-gray-600 border-gray-300 border-[1px] bg-gray-50 focus:ring-black focus:border-black rounded-lg transition-all duration-200 outline-none focus:bg-white text-gray-900"
                        placeholder="Enter your Category Budget Amount For Entertainment"
                      />
                      <ErrorMessage
                        name="CBEntertainment"
                        component="div"
                        className="text-sm text-red-600 mt-1"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label
                        htmlFor="CBTransport"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Transport Amount
                      </label>
                      <Field
                        type="number"
                        id="CBTransport"
                        name="CBTransport"
                        className="block w-full px-3 py-3 placeholder:text-gray-600 border-gray-300 border-[1px] bg-gray-50 focus:ring-black focus:border-black rounded-lg transition-all duration-200 outline-none focus:bg-white text-gray-900"
                        placeholder="Enter your Category Budget Amount For Transport"
                      />
                      <ErrorMessage
                        name="CBTransport"
                        component="div"
                        className="text-sm text-red-600 mt-1"
                      />
                    </div>
                    <div className="space-y-2">
                      <label
                        htmlFor="CBOthers"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Others Amount
                      </label>
                      <Field
                        type="number"
                        id="CBOthers"
                        name="CBOthers"
                        className="block w-full px-3 py-3 placeholder:text-gray-600 border-gray-300 border-[1px] bg-gray-50 focus:ring-black focus:border-black rounded-lg transition-all duration-200 outline-none focus:bg-white text-gray-900"
                        placeholder="Enter your Category Budget Amount For Others"
                      />
                      <ErrorMessage
                        name="CBOthers"
                        component="div"
                        className="text-sm text-red-600 mt-1"
                      />
                    </div>
                  </div>
                  {budgetStep2Error && (
                    <div>
                      <h1 className="text-sm text-red-600 ">
                        Addition of All Category Budgets must not exceed Budget
                        Amount - Rs.{step1Data.budget}
                      </h1>
                    </div>
                  )}
                  <div className="flex justify-between items-center">
                    <button
                      onClick={() => setStep(1)}
                      className="mt-4 w-52 px-4 py-3 bg-black  text-white font-semibold rounded-lg shadow-lg shadow-gray-400 hover:shadow-black/60 hover:bg-gray-800 transition-all duration-300 cursor-pointer disabled:bg-gray-400"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      className="mt-4 w-52 px-4 py-3 bg-black  text-white font-semibold rounded-lg shadow-lg shadow-gray-400 hover:shadow-black/60 hover:bg-gray-800 transition-all duration-300 cursor-pointer disabled:bg-gray-400"
                      disabled={isSubmitting}
                    >
                      Next
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </>
        )}
      </div>
    </div>
  );
};

export default BudgetPlanningForm;
