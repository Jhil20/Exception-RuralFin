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
      .required("Income is required"),
    budget_limit: Yup.number()
      .min(0, "Budget cannot be negative")
      .required("Budget Limit is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });
