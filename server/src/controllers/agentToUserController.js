const AgentToUserTransaction = require('../models/agentToUserTransactionModel');

const getAllTransactionsByAgentId = async (req, res) => {
    try {
        const { id } = req.params;
        const transactions = await AgentToUserTransaction.find({ id }).populate('userId');
        if (!transactions) {
        return res.status(404).json({ message: "No transactions found", success: false });
        }
        return res.status(200).json({ transactions, message: "Transactions found", success: true });
    } catch (error) {
        return res.status(500).json({ message: "Error fetching transactions", error, success: false });
    }
}

module.exports = {
getAllTransactionsByAgentId,
};