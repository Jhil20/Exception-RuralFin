const express = require('express');
const { getFinanceById, transferFunds, depositFunds, withdrawFunds, getfinanceByUserId } = require('../controllers/financeController');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();


router.get("/:id",authMiddleware,getFinanceById);
router.get("/getFinance/:userId",authMiddleware,getfinanceByUserId);
router.post("/transfer",authMiddleware,transferFunds);
router.post("/depositFunds",authMiddleware,depositFunds);
router.post("/withdrawFunds",authMiddleware,withdrawFunds);

module.exports = router;