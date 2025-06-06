const AgentToUserTransaction = require("../models/userToAgentTransactionModel");

const getAllTransactionsByAgentId = async (req, res) => {
  try {
    const { id } = req.params;
    const transactions = await AgentToUserTransaction.find({
      agentId: id,
    }).populate("userId").populate("agentId");
    if (!transactions) {
      return res
        .status(404)
        .json({ message: "No transactions found", success: false });
    }
    return res
      .status(200)
      .json({ transactions, message: "Transactions found", success: true });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error fetching transactions", error, success: false });
  }
};

const getAllUserAgentTransactions = async (req, res) => {
  try {
    // console.log("Fetching all user agent transactions");
    const transactions = await AgentToUserTransaction.find({status:"completed"}).populate(
      "agentId"
    );
    // console.log("transactions", transactions);
    if (!transactions || transactions.length === 0) {
      return res.status(404).json({
        message: "No transactions found for this user",
        success: false,
      });
    }
    return res.status(200).json({
      data: transactions,
      message: "User agent transactions found",
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error fetching user agent transactions",
      error,
      success: false,
    });
  }
};

const getAllCompleteTransactionsByUserId = async (req, res) => {
  try {
    const { id } = req.params;
    const transactions = await AgentToUserTransaction.find({
      userId: id,
      status: "completed",
    }).populate("agentId");
    if (!transactions) {
      return res
        .status(404)
        .json({ message: "No completed transactions found", success: false });
    }
    return res.status(200).json({
      transactions,
      message: "Completed transactions found",
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error fetching completed transactions",
      error,
      success: false,
    });
  }
};

const createAgentToUserTransaction = async (req, res) => {
  try {
    const { agentId, userId, amount, commission, conversionType, notes } =
      req.body;
    const transactionCreated = await AgentToUserTransaction.create({
      agentId,
      userId,
      amount,
      commission,
      conversionType,
      notes,
    });
    const transaction = await AgentToUserTransaction.findById(
      transactionCreated._id
    ).populate("agentId").populate("userId");
    if (!transaction) {
      return res
        .status(400)
        .json({ message: "Transaction creation failed", success: false });
    }
    // console.log("Transaction created successfully", transaction);

    return res.status(201).json({
      message: "Transaction created successfully",
      success: true,
      transaction,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error creating transaction", error, success: false });
  }
};

const updateAgentToUserTransactionStatus = async (req, res) => {
  try {
    const { status, trId } = req.body;
    const transaction = await AgentToUserTransaction.findByIdAndUpdate(
      trId,
      { status },
      { new: true }
    ).populate("agentId").populate("userId");
    if (!transaction) {
      return res
        .status(404)
        .json({ message: "Transaction not found", success: false });
    }
    return res.status(200).json({
      message: "Transaction status updated successfully",
      success: true,
      transaction,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error updating transaction status",
      error,
      success: false,
    });
  }
};

module.exports = {
  getAllUserAgentTransactions,
  getAllTransactionsByAgentId,
  createAgentToUserTransaction,
  updateAgentToUserTransactionStatus,
  getAllCompleteTransactionsByUserId,
};
