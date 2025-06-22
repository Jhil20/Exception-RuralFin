const express = require('express');
const { getAdminOverviewCardData, createAdmin, getAdminByPhone, checkAdminPassword, getRecentActivityData, getTransactionVolumeData, getAllUserRelatedTransactions, commissionData, createSystemSettings, getSystemSettings, updateSystemSettings } = require('../controllers/adminController');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

router.get("/commssionData",authMiddleware,commissionData);
router.get("/getSystemSettings",authMiddleware,getSystemSettings);
router.post("/updateSystemSettings",authMiddleware,updateSystemSettings);
router.post("/createSystem",authMiddleware,createSystemSettings);
router.get("/OverviewCardData",authMiddleware,getAdminOverviewCardData);
router.get("/allTransactionsForUser/:id",authMiddleware,getAllUserRelatedTransactions)
router.get("/transactionVolume",authMiddleware,getTransactionVolumeData);
router.get("/recentActivity",authMiddleware,getRecentActivityData)
router.post("/getAdminByPhone",getAdminByPhone)
router.post("/insertAdmin",createAdmin);
router.post("/checkPassword",checkAdminPassword)
module.exports = router;