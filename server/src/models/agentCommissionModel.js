const mongoose = require('mongoose');
const { Schema } = mongoose;

const agentCommissionSchema = new Schema({
  agentId: { type: Schema.Types.ObjectId, ref: 'Agent', required: true },
  month:{type:Number, required: true},
  year: { type: Number, required: true },
  totalCommissionEarned: { type: Number, default: 0 },
  lastUpdated: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('AgentCommission', agentCommissionSchema);