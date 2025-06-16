const mongoose = require('mongoose');
const { Schema } = mongoose;

const adminCommissionSchema = new Schema({
  adminId: { type: Schema.Types.ObjectId, ref: 'Admin', required: true },
  month:{type:Number, required: true},
  year: { type: Number, required: true },
  totalCommissionEarned: { type: Number, default: 0 },
  lastUpdated: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('AdminCommission', adminCommissionSchema);