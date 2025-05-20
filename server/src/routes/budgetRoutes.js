const express= require('express');
const { createBudget, getBudgetByUserId, getAllBudgetsOfThisYearByUserId } = require('../controllers/budgetController');
const router= express.Router();

router.post('/',createBudget);
router.get('/allBudgetsOfThisYear/:id',getAllBudgetsOfThisYearByUserId);
router.get('/:id',getBudgetByUserId);

module.exports= router;