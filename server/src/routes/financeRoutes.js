const express = require('express');
const { getFinanceById, transferFunds, depositFunds, withdrawFunds } = require('../controllers/financeController');
const router = express.Router();


router.get("/:id",getFinanceById);
router.post("/transfer",transferFunds);
router.post("/depositFunds",depositFunds);
router.post("/withdrawFunds",withdrawFunds);

module.exports = router;