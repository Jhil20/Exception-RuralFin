const express = require('express');
const { getAllTransactionsByAgentId, createAgentToUserTransaction, updateAgentToUserTransactionStatus, getAllCompleteTransactionsByUserId, getAllUserAgentTransactions } = require('../controllers/userToAgentTransactionController');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

router.post("/",authMiddleware,createAgentToUserTransaction);
router.get("/getAllTransactions",authMiddleware, getAllUserAgentTransactions);
router.post("/updateStatus",authMiddleware, updateAgentToUserTransactionStatus);
router.get('/byUser/:id',authMiddleware, getAllCompleteTransactionsByUserId);
router.get('/:id',authMiddleware,getAllTransactionsByAgentId)
module.exports = router;    