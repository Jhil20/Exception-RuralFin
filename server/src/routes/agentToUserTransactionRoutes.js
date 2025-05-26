const express = require('express');
const { getAllTransactionsByAgentId } = require('../controllers/agentToUserController');
const router = express.Router();


router.get('/:id',getAllTransactionsByAgentId)
module.exports = router;    