const express= require('express');
const { createBudget, getBudgetByUserId } = require('../controllers/budgetController');
const router= express.Router();

router.post('/',createBudget);
router.get('/:id',getBudgetByUserId);

module.exports= router;