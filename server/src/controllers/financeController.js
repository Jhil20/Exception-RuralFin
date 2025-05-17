const Finance = require("../models/financeModel");
const mongoose = require("mongoose");
const User = require("../models/userModel");
const UserToUserTransaction = require("../models/userToUserTransactionModel");

const getFinanceById = async (req, res) => {
  try {
    const finance = await Finance.findById(req.params.id);
    if (!finance) {
      return res
        .status(404)
        .json({ message: "Finance record not found", success: false });
    }
    return res
      .status(200)
      .json({ finance, message: "Finance record found", success: true });
  } catch (error) {
    return res.status(500).json({
      message: "Error fetching finance record",
      error,
      success: false,
    });
  }
};

const transferFunds = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { senderId, receiverId, amount, transactionId } = req.body;

    if (!senderId || !receiverId || !amount) {
      return res.status(400).json({ message: "Invalid request", success: false });
    }

    const sender = await User.findById(senderId).session(session);
    const receiver = await User.findById(receiverId).session(session);

    if (!sender || !receiver) {
      return res.status(404).json({ message: "User or Receiver not found", success: false });
    }

    const transaction = await UserToUserTransaction.findById(transactionId).session(session);

    if (!transaction) {
      return res.status(404).json({ message: "Transaction not found", success: false });
    }

    if (transaction.status !== "pending") {
      return res.status(400).json({ message: "Transaction is not pending", success: false });
    }

    // Check sufficient balance
    if (sender.balance < amount) {
      return res.status(400).json({ message: "Insufficient balance", success: false });
    }

    let isDebitSuccessful = false;
    let isCreditSuccessful = false;

    try {
      // Debit sender
      sender.balance -= amount;
      await sender.save({ session });
      isDebitSuccessful = true;

      // Credit receiver
      receiver.balance += amount;
      await receiver.save({ session });
      isCreditSuccessful = true;

      // Mark transaction as completed
      transaction.status = "completed";
      await transaction.save({ session });

      await session.commitTransaction();
      session.endSession();

      return res.status(200).json({ success: true, message: "Transaction completed successfully" });

    } catch (innerError) {
      console.error("Inner transaction error:", innerError.message);

      // Rollback Debit
      if (isDebitSuccessful) {
        sender.balance += amount;
        await sender.save({ session });
        console.log("Debit rolled back");
      }

      // Rollback Credit
      if (isCreditSuccessful) {
        receiver.balance -= amount;
        await receiver.save({ session });
        console.log("Credit rolled back");
      }

      throw innerError; // Propagate the error to the main catch block
    }

  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    console.error("Transaction failed:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};


module.exports = {
  getFinanceById,
  transferFunds,
};
