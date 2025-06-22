const express=require("express");
const { createNotification, getNotificationsById, updateNotificationReadStatus, markAllNotificationsAsRead } = require("../controllers/notificationController");
const authMiddleware = require("../middlewares/authMiddleware");
const router=express.Router();

router.post("/getNotifications",authMiddleware,getNotificationsById);
router.post("/updateNotificationRead",authMiddleware,updateNotificationReadStatus);
router.post("/markAllAsRead",authMiddleware,markAllNotificationsAsRead);
module.exports=router;