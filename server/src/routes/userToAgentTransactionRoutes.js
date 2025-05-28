const express = require('express');
const { getAllTransactionsByAgentId, createAgentToUserTransaction, updateAgentToUserTransactionStatus, getAllCompleteTransactionsByUserId } = require('../controllers/userToAgentTransactionController');
const router = express.Router();

router.post("/",createAgentToUserTransaction);
router.post("/updateStatus", updateAgentToUserTransactionStatus);
router.get('/byUser/:id', getAllCompleteTransactionsByUserId);
router.get('/:id',getAllTransactionsByAgentId)
module.exports = router;    