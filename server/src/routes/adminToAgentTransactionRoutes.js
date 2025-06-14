const express= require('express');
const router = express.Router();
const AdminToAgentTransaction = require('../models/adminToAgentTransactionModel');
const { createAdminToAgentTransaction } = require('../controllers/adminToAgentTransactionController');

router.post("/",createAdminToAgentTransaction);

module.exports = router;