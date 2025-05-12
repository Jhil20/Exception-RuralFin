const mongoose = require('mongoose');
const { Schema } = mongoose;

// Notification Model
const notificationSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User' },
  message: { type: String, required: true },
  type: { type: String, enum: ['budget', 'security', 'transaction', 'lesson'] },
  read: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('Notification', notificationSchema);
