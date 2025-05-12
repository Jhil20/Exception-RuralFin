const mongoose = require("mongoose");
const { Schema } = mongoose;

// Agent Model
const agentSchema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    phone: { type: String, required: true },
    age : { type: Number, required: true },
    dob: { type: Date, required: true },
    gender: { type: String, enum: ["Male", "Female", "Other"], required: true },
    address: { type: String, required: true },
    aadhar: { type: String, required: true },
    bankAccount: { type: String, required: true },
    password: { type: String, required: true },
    securityDeposit: { type: Number, default: 0 },
    ifsc: { type: String, required: true },
    bankName: { type: String, required: true },
    commissionEarned: { type: Number, default: 0 },
    transactionCount: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Agent", agentSchema);
