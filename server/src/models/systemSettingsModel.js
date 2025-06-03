const mongoose = require("mongoose");

const systemSettingsSchema = new mongoose.Schema(
  {
    maxSingleTransaction: {
      type: Number,
      default: 20000,
    },
    maxDailyLimit: {
      type: Number,
      default: 100000,
    },
    maxWeeklyLimit: {
      type: Number,
      default: 500000,
    },
    minTransactionAmount: {
      type: Number,
      default: 1,
    },

    transactionFee500to999: {
      type: Number,
      default: 1,
    },
    transactionFee1000to4999: {
      type: Number,
      default: 1.5,
    },
    transactionFee5000to9999: {
      type: Number,
      default: 2,
    },
    transactionFee10000: {
      type: Number,
      default: 2.5,
    },

    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
    },
  },
  {
    timestamps: true,
  }
);

module.exports= mongoose.model("SystemSettings", systemSettingsSchema);
