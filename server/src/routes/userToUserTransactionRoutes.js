const express=require('express');
const { createUserToUserTransaction, updateStatus, deleteUserToUserTransaction, getTransactionsByUserId, getTotalTransactionsThisMonthByUserId } = require('../controllers/userToUserTransactionController');

const router=express.Router();

router.post("/",createUserToUserTransaction);
router.post("/updateStatus",updateStatus);
router.get("/getTransactions/:id",getTransactionsByUserId);
router.get("/transactionsTotal/:id",getTotalTransactionsThisMonthByUserId);
router.delete("/:id",deleteUserToUserTransaction);
module.exports = router;