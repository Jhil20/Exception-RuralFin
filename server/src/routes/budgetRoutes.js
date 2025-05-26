const express= require('express');
const { createBudget, getBudgetByUserId, getAllBudgetsOfThisYearByUserId, updateBudgetSpending } = require('../controllers/budgetController');
const router= express.Router();

router.post('/',createBudget);
router.put("/updateBudgetSpending",updateBudgetSpending);
router.get('/allBudgetsOfThisYear/:id',getAllBudgetsOfThisYearByUserId);
router.get('/:id',getBudgetByUserId);

module.exports= router;