const UserToUserTransaction = require("../models/userToUserTransactionModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Finance = require("../models/financeModel");
const User = require("../models/userModel");
const mongoose = require("mongoose");

const createUserToUserTransaction = async (req, res) => {
  try {
    const { senderId, receiverRuralId, amount, remarks, password } = req.body;

    const user = await User.findById({
      _id: senderId,
    });

    // console.log("user", user);
    const userPassword = user.transactionPin;
    const isMatch = await bcrypt.compare(password, userPassword);
    if (!isMatch) {
      return res
        .status(400)
        .json({ message: "Transaction PIN is incorrect", success: false });
    }

    const receiver = await User.findOne({ ruralFinId: receiverRuralId });
    if (!receiver) {
      return res
        .status(400)
        .json({ message: "Receiver not found", success: false });
    }

    const transactionCreated = await UserToUserTransaction.create({
      senderId,
      receiverId: receiver._id,
      amount,
      remarks,
    });

    const transaction = await UserToUserTransaction.findById(
      transactionCreated._id
    )
      .populate("senderId")
      .populate("receiverId");

    if (!transaction) {
      return res
        .status(400)
        .json({ message: "Transaction not created", success: false });
    }
    // console.log("first the transaction is created",transaction)
    // console.log("Transaction created", transaction);
    return res.status(200).json({
      message: "Transaction created",
      success: true,
      transaction,
      receiver,
    });
  } catch (err) {
    // console.log(err);
    res.status(500).json({ message: "Error creating transaction", error: err });
  }
};

const updateStatus = async (req, res) => {
  try {
    const { transactionId, status } = req.body;
    const transaction = await UserToUserTransaction.findById(transactionId);
    if (!transaction) {
      return res
        .status(400)
        .json({ message: "Transaction not found", success: false });
    }
    transaction.status = status;
    await transaction.save();
    // console.log("Transaction updated", transaction);
    return res
      .status(200)
      .json({ message: "Transaction updated", success: true, transaction });
  } catch (err) {
    // console.log(err);
    res.status(500).json({
      message: "Error updating transaction",
      error: err,
      success: false,
    });
  }
};

const getTransactionsByUserId = async (req, res) => {
  try {
    const userId = req.params.id;
    const creditTransactions = await UserToUserTransaction.find({
      receiverId: userId,
      status: "completed",
    }).populate("senderId");

    if (!creditTransactions) {
      return res
        .status(400)
        .json({ message: "No credit transactions found", success: false });
    }
    const debitTransactions = await UserToUserTransaction.find({
      senderId: userId,
      status: "completed",
    }).populate("receiverId");

    if (!debitTransactions) {
      return res
        .status(400)
        .json({ message: "No debit transactions found", success: false });
    }

    const transactions = [...creditTransactions, ...debitTransactions];
    transactions.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    // console.log("Transactions fetched", transactions);
    return res
      .status(200)
      .json({ message: "Transactions fetched", success: true, transactions });
  } catch (err) {
    res.status(500).json({
      message: "Error fetching transactions",
      error: err,
      success: false,
    });
  }
};

const getTotalTransactionsThisMonthByUserId = async (req, res) => {
  try {
    const now = new Date();
    const month = req.body.selectedMonth;
    // console.log("month", req.body);
    const startOfMonth = new Date(now.getFullYear(), month - 1, 1);
    const startOfNextMonth = new Date(now.getFullYear(), month, 1);
    const userId = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ error: "Invalid user ID" });
    }

    // console.log("User ID", userId);

    const result = await UserToUserTransaction.aggregate([
      {
        $match: {
          senderId: new mongoose.Types.ObjectId(userId), // make sure this is ObjectId
          status: "completed",
          transactionDate: { $gte: startOfMonth, $lt: startOfNextMonth },
        },
      },
      {
        $group: {
          _id: null,
          totalSpent: { $sum: "$amount" },
        },
      },
    ]);

    // console.log("Total transactions this month", result);

    const totalSpent = result.length > 0 ? result[0].totalSpent : 0;

    return res.status(200).json({ totalSpent: totalSpent, success: true });
  } catch (err) {
    res.status(500).json({
      message: "Error fetching transactions total",
      error: err,
      success: false,
    });
  }
};

const getTotalTransactionsLastMonthByUserId = async (req, res) => {
  try {
    const date = new Date();
    const thisMonth = date.getMonth() + 1;
    const thisYear = date.getFullYear();
    const lastMonth = thisMonth - 1 == 0 ? 12 : thisMonth - 1;
    const lastYear = thisMonth - 1 == 0 ? thisYear - 1 : thisYear;
    const startOfLastMonth = new Date(lastYear, lastMonth - 1, 1);
    const startOfThisMonth = new Date(thisYear, thisMonth - 1, 1);
    const userId = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ error: "Invalid user ID" });
    }
    const result = await UserToUserTransaction.aggregate([
      {
        $match: {
          senderId: new mongoose.Types.ObjectId(userId), // make sure this is ObjectId
          status: "completed",
          transactionDate: { $gte: startOfLastMonth, $lt: startOfThisMonth },
        },
      },
      {
        $group: {
          _id: null,
          totalSpent: { $sum: "$amount" },
        },
      },
    ]);
    const totalSpent = result.length > 0 ? result[0].totalSpent : 0;
    return res.status(200).json({ totalSpent: totalSpent, success: true });
  } catch (err) {
    // console.log("error fetching last month transactions", err);
    res.status(500).json({
      message: "Error fetching transactions total",
      error: err,
      success: false,
    });
  }
};

const getAllTransactionsByCategory = async (req, res) => {
  try {
    const userId = req.body.userId;
    const category = req.body.category;
    const selectedMonth = req.body.selectedMonth - 1;
    const selectedYear = req.body.selectedYear;
    const startOfMonth = new Date(selectedYear, selectedMonth, 1);
    const startOfNextMonth = new Date(selectedYear, selectedMonth + 1, 1);
    // console.log(
    //   "startOfMonth",
    //   startOfMonth,
    //   "startOfNextMonth",
    //   userId,
    //   startOfNextMonth,
    //   selectedMonth
    // );
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ error: "Invalid user ID" });
    }
    const transactions = await UserToUserTransaction.find({
      senderId: userId,
      status: "completed",
      transactionDate: { $gte: startOfMonth, $lt: startOfNextMonth },
      remarks: category,
    }).populate("receiverId");
    // console.log("transactions", transactions);

    if (!transactions) {
      return res
        .status(400)
        .json({ message: "No transactions found", success: false });
    }
    transactions.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    // console.log("Transactions fetched", transactions);
    return res
      .status(200)
      .json({ message: "Transactions fetched", success: true, transactions });
  } catch (err) {
    // console.log("error fetching transactions by category", err);
    res.status(500).json({
      message: "Error fetching transactions by category",
      error: err,
      success: false,
    });
  }
};

const deleteUserToUserTransaction = async (req, res) => {
  try {
    const transactionId = req.params.id;
    const transaction = await UserToUserTransaction.findByIdAndDelete(
      transactionId
    );
    if (!transaction) {
      return res
        .status(400)
        .json({ message: "Transaction not found", success: false });
    }
    // console.log("Transaction deleted", transaction);
    return res
      .status(200)
      .json({ message: "Transaction deleted", success: true });
  } catch (err) {
    // console.log(err);
    res.status(500).json({
      message: "Error deleting transaction",
      error: err,
      success: false,
    });
  }
};

module.exports = {
  createUserToUserTransaction,
  updateStatus,
  getTransactionsByUserId,
  deleteUserToUserTransaction,
  getTotalTransactionsThisMonthByUserId,
  getTotalTransactionsLastMonthByUserId,
  getAllTransactionsByCategory,
};
