const express= require('express');
const { createBudget } = require('../controllers/budgetController');
const router= express.Router();

router.post('/',createBudget);

module.exports= router;