const express = require('express');
const { getFinanceById, transferFunds, depositFunds } = require('../controllers/financeController');
const router = express.Router();


router.get("/:id",getFinanceById);
router.post("/transfer",transferFunds);
router.post("/depositFunds",depositFunds);


module.exports = router;