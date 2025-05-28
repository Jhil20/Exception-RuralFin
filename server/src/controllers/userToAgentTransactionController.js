const AgentToUserTransaction = require('../models/userToAgentTransactionModel');

const getAllTransactionsByAgentId = async (req, res) => {
    try {
        const { id } = req.params;
        const transactions = await AgentToUserTransaction.find({ agentId:id }).populate('userId');
        if (!transactions) {
        return res.status(404).json({ message: "No transactions found", success: false });
        }
        return res.status(200).json({ transactions, message: "Transactions found", success: true });
    } catch (error) {
        return res.status(500).json({ message: "Error fetching transactions", error, success: false });
    }
}

const getAllCompleteTransactionsByUserId= async (req, res) => {
    try {
        const { id } = req.params;
        const transactions = await AgentToUserTransaction.find({ userId:id, status: "completed" }).populate('agentId');
        if (!transactions) {
            return res.status(404).json({ message: "No completed transactions found", success: false });
        }
        return res.status(200).json({ transactions, message: "Completed transactions found", success: true });
    } catch (error) {
        return res.status(500).json({ message: "Error fetching completed transactions", error, success: false });
    }
}

const createAgentToUserTransaction = async (req, res) => {
    try {
        const {agentId,userId,amount,commission,conversionType,notes} = req.body;
        const transaction=await AgentToUserTransaction.create({
            agentId,
            userId,
            amount,
            commission,
            conversionType,
            notes
        });
        if (!transaction) {
            return res.status(400).json({ message: "Transaction creation failed", success: false });
        }
        // console.log("Transaction created successfully", transaction);
        
        return res.status(201).json({ message: "Transaction created successfully", success: true,  transaction });
    } catch (error) {
        return res.status(500).json({ message: "Error creating transaction", error, success: false });
    }
}

const updateAgentToUserTransactionStatus = async (req, res) => {
    try{
        const {status,trId}=req.body;
        console.log("Updating transaction status", {status, trId});
        const transaction = await AgentToUserTransaction.findByIdAndUpdate(
            trId,
            { status },
            { new: true }
        );
        if (!transaction) {
            return res.status(404).json({ message: "Transaction not found", success: false });
        }
        return res.status(200).json({ message: "Transaction status updated successfully", success: true, transaction });
    }catch(error){
        return res.status(500).json({ message: "Error updating transaction status", error, success: false });
    }
}

module.exports = {
getAllTransactionsByAgentId,
createAgentToUserTransaction,
updateAgentToUserTransactionStatus,
getAllCompleteTransactionsByUserId,
};