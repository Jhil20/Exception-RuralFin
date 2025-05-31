const express = require('express');
const { getAdminOverviewCardData } = require('../controllers/adminController');
const router = express.Router();


router.get("/OverviewCardData",getAdminOverviewCardData)

module.exports = router;