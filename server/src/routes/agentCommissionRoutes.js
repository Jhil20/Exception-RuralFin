const express= require('express');
const router = express.Router();
const { getThisMonthCommission, getAllCommissions } = require('../controllers/agentCommissionsController');

router.post("/getThisMonthCommission",getThisMonthCommission);
router.post("/getAllCommissions",getAllCommissions)

module.exports = router;