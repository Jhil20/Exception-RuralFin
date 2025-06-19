const mongoose = require('mongoose');
const { Schema } = mongoose;

const financeSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User'},
  balance: { type: Number, default: 0 },
  isBudgetPlanningEnabled: { type: Boolean, default: false },
  budget: { type: Schema.Types.ObjectId, ref:'Budget',default: null },
}, { timestamps: true });

module.exports = mongoose.model('Finance', financeSchema);