const mongoose = require('mongoose');
const { Schema } = mongoose;

// Log Model
const logSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User' },
  transactionId: { type: Schema.Types.ObjectId, ref: 'Transaction' },
  action: { type: String, required: true },
  status: { type: String, enum: ['success', 'failure'], required: true },
  errorDetails: { type: String },
  ipAddress: { type: String },
  timestamp: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('Log', logSchema);
