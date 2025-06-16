const mongoose = require("mongoose");
const { Schema } = mongoose;

const notificationSchema = new Schema(
  {
    userType: {
      type: String,
      required: true,
      enum: ["User", "Agent"], 
    },
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      refPath: "userType",
    },
    message: { type: String, required: true },
    type: {
      type: String,
      enum: ["budget", "transaction", "system"],
      required: true,
    },
    read: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Notification", notificationSchema);
