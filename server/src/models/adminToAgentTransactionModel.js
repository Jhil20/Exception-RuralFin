const mongoose = require("mongoose");
const { Schema } = mongoose;

// AgentTransaction Model
const adminToAgentTransactionSchema = new Schema(
  {
    agentId: { type: Schema.Types.ObjectId, ref: "Agent", required: true },
    amount: { type: Number, required: true },
    status: {
      type: String,
      enum: ["pending", "completed", "failed"],
      default: "pending",
    },
    transactionDate: { type: Date, default: Date.now },
    conversionType: {
      type: String,
      enum: ["cashToERupees", "eRupeesToCash"],
      required: true,
    },
    type: {
      type: String,
      default: "adminToAgent",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model(
  "AdminToAgentTransaction",
  adminToAgentTransactionSchema
);
