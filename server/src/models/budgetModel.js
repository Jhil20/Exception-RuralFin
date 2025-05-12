const mongoose = require('mongoose');
const { Schema } = mongoose;

// Budget Model
const budgetSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  income: { type: Number, required: true },
  spendingLimit: { type: Number, required: true },
  currentSpending: { type: Number, default: 0 },
  savingsGoal: { type: Number, default: 0 },
  alertsEnabled: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Budget', budgetSchema);
