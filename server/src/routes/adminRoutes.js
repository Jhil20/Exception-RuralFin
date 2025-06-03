const express = require('express');
const { getAdminOverviewCardData, createAdmin, getAdminByPhone, checkAdminPassword, getRecentActivityData, getTransactionVolumeData, getAllUserRelatedTransactions, commissionData, createSystemSettings, getSystemSettings, updateSystemSettings } = require('../controllers/adminController');
const router = express.Router();

router.get("/commssionData",commissionData);
router.get("/getSystemSettings",getSystemSettings);
router.post("/updateSystemSettings",updateSystemSettings);
router.post("/createSystem",createSystemSettings);
router.get("/OverviewCardData",getAdminOverviewCardData);
router.get("/allTransactionsForUser/:id",getAllUserRelatedTransactions)
router.get("/transactionVolume",getTransactionVolumeData);
router.get("/recentActivity",getRecentActivityData)
router.post("/getAdminByPhone",getAdminByPhone)
router.post("/insertAdmin",createAdmin);
router.post("/checkPassword",checkAdminPassword)
module.exports = router;