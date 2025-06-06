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
    phone: { type: String, required: true ,unique: true},
    aadhar: { type: String, required: true ,unique: true},
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["user"],
      default: "user",
      required: true,
    },
    favourites:[{type: Schema.Types.ObjectId,ref:"User"}],
    isActive: { type: Boolean, default: true },
    finance: { type: Schema.Types.ObjectId, ref: "Finance"},
    ruralFinId: { type: String, unique: true,sparse:true },
    transactionPin: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
