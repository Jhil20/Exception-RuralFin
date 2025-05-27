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
      enum: ["pending", "completed", "failed", "rejected"],
      default: "pending",
    },
    transactionDate: { type: Date, default: Date.now },
    conversionType: {
      type: String,
      enum: ["cashToERupees", "eRupeesToCash"],
      required: true,
    },
    notes: { type: String, default: "" },
  },
  { timestamps: true }
);

module.exports = mongoose.model(
  "UserToAgentTransaction",
  userToAgentTransactionSchema
);
