import * as Yup from "yup";

// Validation Schema
export const loginValidationSchema = Yup.object().shape({
  phone_number: Yup.string()
    .matches(/^\d{10}$/, "Phone number must be 10 digits")
    .required("Phone number is required"),
    password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
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
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),

  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm password is required"),
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
  full_name: Yup.string().required("Agent Name is required"),
  phone_num: Yup.string()
    .required("Phone Number is required")
    .matches(/^[0-9]+$/, "Phone Number must be digits only")
    .min(10, "Phone Number must be at least 10 digits"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  bank_details: Yup.string()
    .matches(/^\d{6,18}$/, "Bank acc. no. should be between 6-18 digits.")
    .required("Bank acc. number is required"),
  security_deposit: Yup.number()
    .min(10000, "Deposit must be greater than 10000")
    .typeError("Security deposit must be a number")
    .required("Security deposit is required"),
  payment_mode: Yup.string()
    .oneOf(["CASH", "DIGITAL"], "Enter a valid payment mode (CASH or DIGITAL)")
    .required("Payment mode is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm password is required"),
});

export const agentSignupValidationSchema2 = Yup.object().shape({
  address: Yup.string()
    .trim()
    .required("Street Address is required")
    .min(5, "Address must be at least 5 characters long"),
  city: Yup.string().trim().required("City is required"),
  state: Yup.string().trim().required("State is required"),
  pincode: Yup.string().required("Pincode is required"),
  agent_pin: Yup.string()
    .matches(/^\d{4}$/, "PIN must be exactly 4 digits") // Ensures exactly 4 digits
    .required("PIN is required"),
});
