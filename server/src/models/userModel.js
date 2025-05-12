const mongoose = require("mongoose");
const { Schema } = mongoose;

// User Model
const userSchema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    age: { type: Number, required: true },
    dob: { type: Date, required: true },
    gender: { type: String, enum: ["male", "female", "other"], required: true },
    address: { type: String, required: true },
    phone: { type: String, required: true },
    aadhar: { type: String, required: true },
    password: { type: String, required: true },
    balance: { type: Number, default: 0 },
    budget: { type: Number, default: 0 },
    budgetAlerts: { type: Boolean, default: false },
    financialStatus: {
      type: String,
      enum: ["stable", "overBudget", "underBudget"],
      default: "stable",
    },
    lastTransactionDate: { type: Date },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
