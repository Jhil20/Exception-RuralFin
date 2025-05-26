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
    console.log("Transfer Funds Request:", req.body);
    console.log("senderId:", senderId);
    console.log("receiverId:", receiverId);
    console.log("amount:", amount);
    console.log("transactionId:", transactionId);

    if (!senderId || !receiverId || !amount || !transactionId) {
      return res.status(400).json({ message: "Invalid request", success: false });
    }

    const sender = await User.findById(senderId).session(session);
    const receiver = await User.findById(receiverId).session(session);
    console.log("sender and receiver found")
    if (!sender || !receiver) {
      return res.status(404).json({ message: "User or Receiver not found", success: false });
    }

    const transaction = await UserToUserTransaction.findById(transactionId).session(session);
    console.log("transaction found")
    if (!transaction) {
      return res.status(404).json({ message: "Transaction not found", success: false });
    }

    if (transaction.status !== "pending") {
      return res.status(400).json({ message: "Transaction is not pending", success: false });
    }
    console.log("Transaction is pending")
    const senderFinance = await Finance.findOne({ userId: senderId }).session(session);
    const receiverFinance = await Finance.findOne({ userId: receiverId }).session(session);

    if (!senderFinance || !receiverFinance) {
      return res.status(404).json({ message: "Finance record not found", success: false });
    }

    // Check sufficient balance
    if (senderFinance.balance < amount) {
      return res.status(400).json({ message: "Insufficient balance", success: false });
    }
    console.log("Sufficient balance found",senderFinance,receiverFinance)
    let isDebitSuccessful = false;
    let isCreditSuccessful = false;

    try {
      // Debit senderFinance
      senderFinance.balance -= amount;
      await senderFinance.save({ session });
      isDebitSuccessful = true;
      console.log("Debit successful");
      // Credit receiverFinance
      receiverFinance.balance += amount;
      await receiverFinance.save({ session });
      isCreditSuccessful = true;
      console.log("Credit successful");
      // Mark transaction as completed
      transaction.status = "completed";
      await transaction.save({ session });
      console.log("Transaction marked as completed");
      await session.commitTransaction();
      session.endSession();
      console.log("Transaction committed successfully");
      return res.status(200).json({ success: true, message: "Transaction completed successfully" });

    } catch (innerError) {
      console.error("Inner transaction error:", innerError.message);

      // Rollback Debit
      if (isDebitSuccessful) {
        senderFinance.balance += amount;
        await senderFinance.save({ session });
        console.log("Debit rolled back");
      }

      // Rollback Credit
      if (isCreditSuccessful) {
        receiverFinance.balance -= amount;
        await receiverFinance.save({ session });
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
