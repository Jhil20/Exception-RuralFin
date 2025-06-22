const express= require('express');
const router = express.Router();
const { getThisMonthCommission, getAllCommissions } = require('../controllers/agentCommissionsController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post("/getThisMonthCommission",authMiddleware,getThisMonthCommission);
router.post("/getAllCommissions",authMiddleware,getAllCommissions)

module.exports = router;