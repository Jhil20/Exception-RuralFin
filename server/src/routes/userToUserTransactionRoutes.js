const express=require('express');
const { createUserToUserTransaction, updateStatus, deleteUserToUserTransaction, getTransactionsByUserId, getTotalTransactionsThisMonthByUserId, getTotalTransactionsLastMonthByUserId } = require('../controllers/userToUserTransactionController');

const router=express.Router();

router.post("/",createUserToUserTransaction);
router.post("/updateStatus",updateStatus);
router.get("/getTransactions/:id",getTransactionsByUserId);
router.post("/transactionsTotal/:id",getTotalTransactionsThisMonthByUserId);
router.get("/lastMonthTransactionsTotal/:id",getTotalTransactionsLastMonthByUserId);
router.delete("/:id",deleteUserToUserTransaction);
module.exports = router;