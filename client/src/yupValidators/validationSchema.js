import * as Yup from "yup";

// Validation Schema
export const loginValidationSchema = Yup.object().shape({
  phone_number: Yup.string()
    .matches(/^\d{10}$/, "Phone number must be 10 digits")
    .required("Phone number is required"),
});

// Validation Schema
export const signupValidationSchema = Yup.object().shape({
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
    .max(10000000, "Income cannot be more than 10,000,000")
    .required("Income is required"),
  budget_limit: Yup.number()
    .min(0, "Budget cannot be negative")
    .required("Budget Limit is required")
    .when("income", (income, schema) =>
      income
        ? schema.max(income, "Budget Limit cannot be more than Income")
        : schema
    ),
});

export const signupValidationSchema2 = Yup.object().shape({
  address: Yup.string()
    .trim()
    .required("Street Address is required")
    .min(5, "Address must be at least 5 characters long"),
  city: Yup.string().trim().required("City is required"),
  state: Yup.string().trim().required("State is required"),
  pincode: Yup.string().required("Pincode is required"),
  user_pin: Yup.string()
    .matches(/^\d{4}$/, "PIN must be exactly 4 digits") // Ensures exactly 4 digits
    .required("PIN is required"),
});

export const PTPvalidationSchema = Yup.object().shape({
  amount: Yup.number()
    .moreThan(0, "Amount must be greater than zero")
    .required("Amount is required"),
    user_pin: Yup.string()
    .matches(/^\d{4}$/, "PIN must be exactly 4 digits") // Ensures exactly 4 digits
    .required("PIN is required"),
});

export const otpValidationSchema = Yup.object().shape({
  otp: Yup.string()
    .required("OTP is required")
    .matches(/^\d{6}$/, "OTP must be a 6-digit number"),
});

export const agentValidationSchema = Yup.object().shape({
  agent_name: Yup.string().required("Agent Name is required"),
  agent_phone: Yup.string()
    .required("Phone Number is required")
    .matches(/^[0-9]+$/, "Phone Number must be digits only")
    .min(10, "Phone Number must be at least 10 digits"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  location: Yup.string().required("Location is required"),
  securityDeposit: Yup.number()
    .required("Security Deposit is required")
    .positive("Must be a positive number"),
  balance: Yup.number()
    .required("Balance is required")
    .positive("Must be a positive number"),
});
