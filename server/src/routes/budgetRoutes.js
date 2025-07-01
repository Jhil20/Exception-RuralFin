const express= require('express');
const { createBudget, getBudgetByUserId, getAllBudgetsOfThisYearByUserId, updateBudgetSpending, createBudgetForNewMonth, getLastMonthBudget } = require('../controllers/budgetController');
const authMiddleware = require('../middlewares/authMiddleware');
const router= express.Router();

router.post('/',authMiddleware,createBudget);
router.post("/newMonthBudget",authMiddleware,createBudgetForNewMonth);
router.put("/updateBudgetSpending",authMiddleware,updateBudgetSpending);
router.get('/allBudgetsOfThisYear/:id',authMiddleware,getAllBudgetsOfThisYearByUserId);
router.get("/lastMonthBudget/:id",authMiddleware,getLastMonthBudget)
router.get('/:id',authMiddleware,getBudgetByUserId);

module.exports= router;