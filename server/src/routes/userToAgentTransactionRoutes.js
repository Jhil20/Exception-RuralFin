const express = require('express');
const { getAllTransactionsByAgentId, createAgentToUserTransaction, updateAgentToUserTransactionStatus, getAllCompleteTransactionsByUserId, getAllUserAgentTransactions } = require('../controllers/userToAgentTransactionController');
const router = express.Router();

router.post("/",createAgentToUserTransaction);
router.get("/getAllTransactions", getAllUserAgentTransactions);
router.post("/updateStatus", updateAgentToUserTransactionStatus);
router.get('/byUser/:id', getAllCompleteTransactionsByUserId);
router.get('/:id',getAllTransactionsByAgentId)
module.exports = router;    