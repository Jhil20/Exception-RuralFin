const mongoose = require('mongoose');
const { Schema } = mongoose;

// Admin Model
const adminSchema = new Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['superadmin', 'admin'], default: 'admin' }
}, { timestamps: true });

module.exports = mongoose.model('Admin', adminSchema);
