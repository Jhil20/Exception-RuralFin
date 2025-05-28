const express = require('express');
const { getAllTransactionsByAgentId, createAgentToUserTransaction, updateAgentToUserTransactionStatus } = require('../controllers/userToAgentTransactionController');
const router = express.Router();

router.post("/",createAgentToUserTransaction);
router.post("/updateStatus", updateAgentToUserTransactionStatus);
router.get('/:id',getAllTransactionsByAgentId)
module.exports = router;    