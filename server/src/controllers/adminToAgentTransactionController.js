const AdminToAgentTransaction = require("../models/adminToAgentTransactionModel");

const createAdminToAgentTransaction = async (req, res) => {
  try {
    const { agentId, amount, conversionType } = req.body;
    if (!agentId || !amount || !conversionType) {
      return res
        .status(400)
        .json({ message: "All fields are required", success: false });
    }
    const newTransaction = await AdminToAgentTransaction.create({
      agentId,
      amount,
      conversionType,
      status: "completed",
    });
    if (!newTransaction) {
      return res
        .status(500)
        .json({ message: "Failed to create transaction", success: false });
    }
    const transaction=await AdminToAgentTransaction.findById(newTransaction._id)
      .populate("agentId"); 
    res.status(201).json({
      message: "Transaction created successfully",
      success: true,
      transaction: transaction,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", success: false });
  }
};

module.exports = {
  createAdminToAgentTransaction,
};
