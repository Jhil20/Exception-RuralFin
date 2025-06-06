const express=require("express");
const { createNotification, getNotificationsById, updateNotificationReadStatus, markAllNotificationsAsRead } = require("../controllers/notificationController");
const router=express.Router();

router.post("/getNotifications",getNotificationsById);
router.post("/updateNotificationRead",updateNotificationReadStatus);
router.post("/markAllAsRead",markAllNotificationsAsRead);
module.exports=router;