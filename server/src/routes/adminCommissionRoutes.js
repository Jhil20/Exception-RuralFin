const express = require('express');
const { getAllAdminCommissions } = require('../controllers/adminCommissionController');
const router = express.Router();

router.get("/allCommissions",getAllAdminCommissions);

module.exports=router;