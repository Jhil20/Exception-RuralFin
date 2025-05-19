const mongoose = require("mongoose");
const { Schema } = mongoose;

// Budget Model
const budgetSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    month: { type: Number, required: true }, 
    year: { type: Number, required: true },
    income: { type: Number, required: true },
    budget: { type: Number, default: 0 },
    savingsGoal: { type: Number, default: 0 },
    alertsEnabled: { type: Boolean, default: true },
    categoryBudgets: {
      Housing: { type: Number, default: 0 },
      Food: { type: Number, default: 0 },
      Healthcare: { type: Number, default: 0 },
      Education: { type: Number, default: 0 },
      Utilities: { type: Number, default: 0 },
      Entertainment: { type: Number, default: 0 },
      Transport: { type: Number, default: 0 },
      Others: { type: Number, default: 0 },
    },
    categorySpending: {
      Housing: { type: Number, default: 0 },
      Food: { type: Number, default: 0 },
      Healthcare: { type: Number, default: 0 },
      Education: { type: Number, default: 0 },
      Utilities: { type: Number, default: 0 },
      Entertainment: { type: Number, default: 0 },
      Transport: { type: Number, default: 0 },
      Others: { type: Number, default: 0 },
    },
  },
  { timestamps: true }
);

budgetSchema.index({ userId: 1, month: 1, year: 1 }, { unique: true });

module.exports = mongoose.model("Budget", budgetSchema);
