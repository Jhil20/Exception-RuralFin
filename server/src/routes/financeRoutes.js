const express = require('express');
const { getFinanceById } = require('../controllers/financeController');
const router = express.Router();


router.get("/:id",getFinanceById);


module.exports = router;