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
  aadhar: Yup.string()
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
  transactionPin: Yup.string()
    .matches(/^[0-9]{4}$/, "Transaction PIN must be 4 digits")
    .required("Transaction PIN is required"),
  confirmTransactionPin: Yup.string()
    .oneOf([Yup.ref("transactionPin")], "Transaction PINs must match")
    .required("Confirm transaction PIN is required"),
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
  aadhar: Yup.string()
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
    .min(10000, "Security deposit must be at least ₹10000")
    .required("Security deposit is required"),
  accountNumber: Yup.string()
    .matches(/^[0-9]{9,18}$/, "Please enter a valid account number")
    .required("Account number is required"),
  ifscCode: Yup.string()
    .matches(/^[A-Z]{4}0[A-Z0-9]{6}$/, "Please enter a valid IFSC code")
    .required("IFSC code is required"),
  bankName: Yup.string().required("Bank name is required"),
});

export const SendMoneySchema = Yup.object().shape({
  ruralfinId: Yup.string()
    .matches(
      /^[a-zA-Z0-9]+@RURALFIN$/i,
      "RuralFin ID must contain only letters, numbers, and end with '@RURALFIN'"
    )
    .required("RuralFin ID is required"),
  amount: Yup.number()
    .typeError("Amount must be a number")
    .positive("Amount must be positive")
    .required("Amount is required"),
  password: Yup.string()
    .matches(/^[0-9]{4}$/, "Password must be 4 digits")
    .required("Password is required"),
  remarks: Yup.string()
    .oneOf(
      [
        "Housing",
        "Food & Dining",
        "Entertainment",
        "Transport",
        "Healthcare",
        "Utilities",
        "Education",
        "Others",
      ],
      "Invalid remark"
    )
    .required("Remark is required"),
});

export const budgetPlanningValidationSchemaStep1 = Yup.object().shape({
  budget: Yup.number()
    .typeError("Budget must be a number")
    .min(0, "Budget cannot be negative")
    .required("Budget is required"),

  income: Yup.number()
    .typeError("Income must be a number")
    .min(0, "Income cannot be negative")
    .required("Income is required"),

  savingsGoal: Yup.number()
    .typeError("Savings goal must be a number")
    .min(0, "Savings goal cannot be negative")
    .required("Savings goal is required"),

  alertsEnabled: Yup.string().required(
    "Please select if alerts should be enabled"
  ),
});

export const budgetPlanningValidationSchemaStep2 = Yup.object().shape({
  CBHousing: Yup.number()
    .typeError('Housing must be a number')
    .min(0, 'Housing cannot be negative')
    .required('Housing is required'),

  CBFood: Yup.number()
    .typeError('Food must be a number')
    .min(0, 'Food cannot be negative')
    .required('Food is required'),

  CBHealthcare: Yup.number()
    .typeError('Healthcare must be a number')
    .min(0, 'Healthcare cannot be negative')
    .required('Healthcare is required'),

  CBEducation: Yup.number()
    .typeError('Education must be a number')
    .min(0, 'Education cannot be negative')
    .required('Education is required'),

  CBUtilities: Yup.number()
    .typeError('Utilities must be a number')
    .min(0, 'Utilities cannot be negative')
    .required('Utilities is required'),

  CBEntertainment: Yup.number()
    .typeError('Entertainment must be a number')
    .min(0, 'Entertainment cannot be negative')
    .required('Entertainment is required'),

  CBTransport: Yup.number()
    .typeError('Transport must be a number')
    .min(0, 'Transport cannot be negative')
    .required('Transport is required'),

  CBOthers: Yup.number()
    .typeError('Others must be a number')
    .min(0, 'Others cannot be negative')
    .required('Others is required'),
});

export const AgentToUserSchema = Yup.object().shape({
  amount: Yup.number().positive("Amount must be positive").required("Amount is required"),
  notes: Yup.string(),
});