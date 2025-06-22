const express= require('express');
const router = express.Router();
const AdminToAgentTransaction = require('../models/adminToAgentTransactionModel');
const { createAdminToAgentTransaction } = require('../controllers/adminToAgentTransactionController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post("/",authMiddleware,createAdminToAgentTransaction);

module.exports = router;