const mongoose = require("mongoose");
const { Schema } = mongoose;

// UserTransaction Model
const userToUserTransactionSchema = new Schema(
  {
    senderId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    receiverId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    amount: { type: Number, required: true },
    status: {
      type: String,
      enum: ["pending", "completed", "failed"], 
      default: "pending",
    },
    transactionDate: { type: Date, default: Date.now },
    remarks: { type: String ,
        enum: ["Housing", "Food & Dining","Healthcare","Education","Utilities", "Entertainment","Transport", "Others"],
        default: "Others",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("UserToUserTransaction", userToUserTransactionSchema);
