const UserToUserTransaction = require("../models/userToUserTransactionModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Finance = require("../models/financeModel");
const User=require("../models/userModel");

const createUserToUserTransaction = async (req, res) => {
    try{

        const {senderId, receiverRuralId, amount, remarks,password} = req.body;

        const user=await User.findById({
            _id: senderId
        })

        console.log("user", user);
        const userPassword = user.transactionPin;
        const isMatch = await bcrypt.compare(password, userPassword);
        if(!isMatch){
            return res.status(400).json({message: "Transaction PIN is incorrect", success: false});
        }

        const receiver=await User.findOne({ruralFinId: receiverRuralId});
        if(!receiver){
            return res.status(400).json({message: "Receiver not found", success: false});
        }

        const transaction = await UserToUserTransaction.create({
            senderId,
            receiverId: receiver._id,
            amount,
            remarks
        });
        if(!transaction){
            return res.status(400).json({message: "Transaction not created",success: false});
        }
        console.log("Transaction created", transaction);
        return res.status(200).json({message: "Transaction created", success: true, transaction});
    }catch(err){
        console.log(err);
        res.status(500).json({message: "Error creating transaction", error: err});
    }
}


module.exports = {
createUserToUserTransaction,
}