const express = require('express');
const { getAdminOverviewCardData, createAdmin, getAdminByPhone, checkAdminPassword, getRecentActivityData } = require('../controllers/adminController');
const router = express.Router();


router.get("/OverviewCardData",getAdminOverviewCardData);
router.get("/recentActivity",getRecentActivityData)
router.post("/getAdminByPhone",getAdminByPhone)
router.post("/insertAdmin",createAdmin);
router.post("/checkPassword",checkAdminPassword)
module.exports = router;