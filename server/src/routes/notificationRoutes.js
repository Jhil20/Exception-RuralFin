const express=require("express");
const { createNotification, getNotificationsById } = require("../controllers/notificationController");
const router=express.Router();

router.post("/getNotifications",getNotificationsById);
module.exports=router;