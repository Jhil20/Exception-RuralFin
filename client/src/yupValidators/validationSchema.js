import * as Yup from "yup";

export const userValidationSchemaStep1 = Yup.object({
  firstName: Yup.string()
    .min(2, "Too short")
    .max(50, "Too long")
    .required("Required"),
  lastName: Yup.string()
    .min(2, "Too short")
    .max(50, "Too long")
    .required("Required"),
  phone: Yup.string()
    .matches(/^[0-9]{10}$/, "Phone number must be 10 digits")
    .required("Phone number is required"),
  age: Yup.number()
    .min(18, "You must be at least 18 years old")
    .max(100, "Age must be less than 100")
    .required("Age is required"),
  dob: Yup.date().required("Date of birth is required"),
  gender: Yup.string()
    .oneOf(["male", "female", "other"], "Please select a valid gender")
    .required("Gender is required"),
  address: Yup.string()
    .min(10, "Please enter a valid address")
    .required("Address is required"),
});

export const userValidationSchemaStep2 = Yup.object({
  aadharNumber: Yup.string()
    .matches(/^[0-9]{12}$/, "Aadhar number must be 12 digits")
    .required("Aadhar number is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
    )
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Confirm password is required"),
});

// Agent-specific validation schema
export const agentValidationSchemaStep1 = Yup.object({
  firstName: Yup.string()
    .min(2, "Too short")
    .max(50, "Too long")
    .required("Required"),
  lastName: Yup.string()
    .min(2, "Too short")
    .max(50, "Too long")
    .required("Required"),
  phone: Yup.string()
    .matches(/^[0-9]{10}$/, "Phone number must be 10 digits")
    .required("Phone number is required"),
  age: Yup.number()
    .min(18, "You must be at least 18 years old")
    .max(100, "Age must be less than 100")
    .required("Age is required"),
  dob: Yup.date().required("Date of birth is required"),
  gender: Yup.string()
    .oneOf(["male", "female", "other"], "Please select a valid gender")
    .required("Gender is required"),
  address: Yup.string()
    .min(10, "Please enter a valid address")
    .required("Address is required"),
});



export const agentValidationSchemaStep2 = Yup.object({
  aadharNumber: Yup.string()
    .matches(/^[0-9]{12}$/, "Aadhar number must be 12 digits")
    .required("Aadhar number is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
    )
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Confirm password is required"),
  securityDeposit: Yup.number()
    .min(1000, "Security deposit must be at least ₹1000")
    .required("Security deposit is required"),
  accountNumber: Yup.string()
    .matches(/^[0-9]{9,18}$/, "Please enter a valid account number")
    .required("Account number is required"),
  ifscCode: Yup.string()
    .matches(/^[A-Z]{4}0[A-Z0-9]{6}$/, "Please enter a valid IFSC code")
    .required("IFSC code is required"),
  bankName: Yup.string().required("Bank name is required"),
});
