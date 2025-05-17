const express = require('express');
const { getFinanceById, transferFunds } = require('../controllers/financeController');
const router = express.Router();


router.get("/:id",getFinanceById);
router.post("/transfer",transferFunds);


module.exports = router;