const Notification = require("../models/notificationModel");
const User = require("../models/userModel");
const createNotification = async (data) => {
  try {
    const { userType, userId, message, type, read } = data;

    // Validate input
    if (!userType || !userId || !message || !type || read == undefined) {
      return { message: "All fields are required" };
    }

    console.log(
      "Creating notification for:",
      userType,
      userId,
      message,
      type,
      read
    );

    // Create a new notification
    const notification = new Notification({
      userType,
      userId,
      message,
      type,
      read,
    });

    console.log("Notification object created:", notification);

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

const createAdminNotificationForAll = async () => {
  try {
    const message = "System settings have been updated";
    const type = "system";
    const userType = "User";
    const read = false;
    const allUsers = await User.find({}, "_id");
    if (!allUsers || allUsers.length === 0) {
      return { message: "No users found", success: false };
    }
    const userNotifications = await Promise.all(
      allUsers.map(async (user) => {
        const notificationData = {
          userType,
          userId: user._id,
          message,
          type,
          read,
        };
        return createNotification(notificationData);
      })
    );
    const allAgents = await User.find({ }, "_id");
    const agentNotifications= await Promise.all(
      allAgents.map(async (agent) => {
        const notificationData = {
          userType: "Agent",
          userId: agent._id,
          message,
          type,
          read,
        };
        return createNotification(notificationData);
      })
    );
    const notifications=[...userNotifications, ...agentNotifications];
    
    return {
      message: "Notifications created successfully for all users",
      data: notifications,
      success: true,
    };

  } catch (error) {
    res.status(500).json({ message: "Internal server error", success: false });
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
    const userNotifications = await Notification.find({
      userType,
      userId,
    }).sort({
      createdAt: -1,
    }); // Sort by creation date, most recent first
    const adminNotifications = await Notification.find({
      userType: "Admin",
    }).sort({
      createdAt: -1,
    });

    const notifications = [...userNotifications, ...adminNotifications];

    notifications.sort((a, b) => {
      return new Date(b.createdAt) - new Date(a.createdAt);
    });



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
  createAdminNotificationForAll,
};
