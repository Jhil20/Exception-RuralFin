const mongoose = require('mongoose');
const { Schema } = mongoose;

const financeSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  balance: { type: Number, default: 0 },
  financialStatus: {
    type: String,
    enum: ['stable', 'overBudget', 'underBudget'],
    default: 'stable',
  },
  transactions: [{ type: Schema.Types.ObjectId, ref: 'Transaction' }],
  lastTransactionDate: { type: Date },
  budgetAlerts: { type: Boolean, default: false },
  isBudgetPlanningEnabled: { type: Boolean, default: false },
  income: { type: Number, default: 0 },
  budget: { type: Number, default: 0 },
  spendingLimit: { type: Number, default: 0 },
  currentSpending: { type: Number, default: 0 },
  savingsGoal: { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model('Finance', financeSchema);
