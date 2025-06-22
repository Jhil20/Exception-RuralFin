const express=require('express');
const { createUserToUserTransaction, updateStatus, deleteUserToUserTransaction, getTransactionsByUserId, getTotalTransactionsThisMonthByUserId, getTotalTransactionsLastMonthByUserId, getAllTransactionsByCategory } = require('../controllers/userToUserTransactionController');
const authMiddleware = require('../middlewares/authMiddleware');

const router=express.Router();

router.post("/",authMiddleware,createUserToUserTransaction);
router.post("/updateStatus",authMiddleware,updateStatus);
router.get("/getTransactions/:id",authMiddleware,getTransactionsByUserId);
router.post("/transactionsByCategory",authMiddleware,getAllTransactionsByCategory);
router.post("/transactionsTotal/:id",authMiddleware,getTotalTransactionsThisMonthByUserId);
router.get("/lastMonthTransactionsTotal/:id",authMiddleware,getTotalTransactionsLastMonthByUserId);
router.delete("/:id",authMiddleware,deleteUserToUserTransaction);
module.exports = router;