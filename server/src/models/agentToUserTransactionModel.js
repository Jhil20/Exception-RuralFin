const mongoose = require("mongoose");
const { Schema } = mongoose;

// AgentTransaction Model
const userToAgentTransactionSchema = new Schema(
  {
    agentId: { type: Schema.Types.ObjectId, ref: "Agent", required: true },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    amount: { type: Number, required: true },
    commission: { type: Number, default: 0 },
    status: {
      type: String,
      enum: ["pending", "completed", "failed"],
      default: "pending",
    },
    transactionDate: { type: Date, default: Date.now },
    // remarks: { type: String },
    method: {
      type: String,
      enum: ["cash", "bankTransfer", "mobileWallet"],
      default: "cash",
    },
    conversionType: {
      type: String,
      enum: ["cashToERupees", "eRupeesToCash"],
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model(
  "UserToAgentTransaction",
  userToAgentTransactionSchema
);
