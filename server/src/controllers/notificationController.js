const Notification = require("../models/notificationModel");

const createNotification = async (data) => {
  try {
    const { userType, userId, message, type,read } = data;

    // Validate input
    if (!userType || !userId || !message || !type || read==undefined) {
      return { message: "All fields are required" };
    }

    // Create a new notification
    const notification = new Notification({
      userType,
      userId,
      message,
      type,
      read,
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
    // console.log("Fetching notifications for:", userType, userId);
    // Validate input
    if (!userType || !userId) {
      return res.status(400).json({ message: "User type and ID are required" });
    }

    // Fetch notifications for the user
    const notifications = await Notification.find({ userType, userId }).sort({
      createdAt: -1,
    }); // Sort by creation date, most recent first

    return res.status(200).json({
      data: notifications,
      message: "Notifications fetched successfully",
      success: true,
    });
  } catch (error) {
    console.error("Error fetching notifications:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const updateNotificationReadStatus = async (req, res) => {
  try {
    const { notificationId } = req.body;

    // Validate input
    if (!notificationId) {
      return res.status(400).json({ message: "Notification ID is required" });
    }

    // Update the read status of the notification
    const updatedNotification = await Notification.findByIdAndUpdate(
      notificationId,
      { read: true },
      { new: true }
    );

    if (!updatedNotification) {
      return res.status(404).json({ message: "Notification not found" });
    }

    return res.status(200).json({
      data: updatedNotification,
      message: "Notification read status updated successfully",
      success: true,
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

const markAllNotificationsAsRead = async (req, res) => {
  try {
    const { userType, userId } = req.body;

    // Validate input
    if (!userType || !userId) {
      return res.status(400).json({ message: "User type and ID are required" });
    }

    // Update all notifications for the user to read
    const result = await Notification.updateMany(
      { userType, userId, read: false },
      { read: true }
    );

    return res.status(200).json({
      message: "All notifications marked as read successfully",
      data: result,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  createNotification,
  getNotificationsById,
  updateNotificationReadStatus,
  markAllNotificationsAsRead,
};
