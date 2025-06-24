const mongoose = require('mongoose');
const { Schema } = mongoose;

// Admin Model
const adminSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  phone: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String,  default: 'admin' },
}, { timestamps: true });

module.exports = mongoose.model('Admin', adminSchema);
