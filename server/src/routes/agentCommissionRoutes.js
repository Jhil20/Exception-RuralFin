const express= require('express');
const router = express.Router();
const { getThisMonthCommission } = require('../controllers/agentCommissionsController');

router.post("/getThisMonthCommission",getThisMonthCommission);

module.exports = router;