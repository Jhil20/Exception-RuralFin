const mongoose = require('mongoose');
const { Schema } = mongoose;

// Transaction Model
const transactionSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  agentId: { type: Schema.Types.ObjectId, ref: 'Agent' },
  amount: { type: Number, required: true },
  type: { type: String, enum: ['deposit', 'withdrawal', 'transfer'], required: true },
  status: { type: String, enum: ['pending', 'completed', 'failed'], default: 'pending' },
  commission: { type: Number, default: 0 },
  transactionDate: { type: Date, default: Date.now },
  remarks: { type: String },
  method: { type: String, enum: ['cash', 'bankTransfer', 'mobileWallet'], default: 'cash' }
}, { timestamps: true });

module.exports = mongoose.model('Transaction', transactionSchema);
