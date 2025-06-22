const express = require('express');
const { getAllAdminCommissions } = require('../controllers/adminCommissionController');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

router.get("/allCommissions",authMiddleware,getAllAdminCommissions);

module.exports=router;