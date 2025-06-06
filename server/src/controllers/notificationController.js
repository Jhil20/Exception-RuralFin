const Notification = require("../models/notificationModel");

const createNotification = async (data) => {
  try {
    const { userType, userId, message, type } = data;

    // Validate input
    if (!userType || !userId || !message || !type) {
      return { message: "All fields are required" };
    }

    // Create a new notification
    const notification = new Notification({
      userType,
      userId,
      message,
      type,
    });

    // Save the notification to the database
    await notification.save();

    return {
      message: "Notification created successfully",
      data: notification,
      success: true,
    };
  } catch (error) {
    return { message: "Internal server error" };
  }
};

const getNotificationsById = async (req, res) => {
  try {
    const { userType, userId } = req.body;
    console.log("Fetching notifications for:", userType, userId);
    // Validate input
    if (!userType || !userId) {
      return res.status(400).json({ message: "User type and ID are required" });
    }

    // Fetch notifications for the user
    const notifications = await Notification.find({ userType, userId })
      .sort({ createdAt: -1 }) // Sort by creation date, most recent first
      .exec();

    return res
      .status(200)
      .json({
        data: notifications,
        message: "Notifications fetched successfully",
        success: true,
      });
  } catch (error) {
    console.error("Error fetching notifications:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { createNotification, getNotificationsById };
