const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const connectMongo = require("./config");
const userRoutes = require("./routes/userRoutes");
const agentRoutes = require("./routes/agentRoutes");
const userToUserTransactionRoutes = require("./routes/userToUserTransactionRoutes");
const budgetRoutes = require("./routes/budgetRoutes");
const financeRoutes = require("./routes/financeRoutes");
const agentToUserTransactionRoutes = require("./routes/userToAgentTransactionRoutes");
const adminRoutes = require("./routes/adminRoutes");
const { createServer } = require("http");
const { Server } = require("socket.io");
const { createNotification } = require("./controllers/notificationController");
const notificationRoutes = require("./routes/notificationRoutes");
const razorpayRoutes = require("./routes/razorpayRoutes");
const agentCommissionRoutes = require("./routes/agentCommissionRoutes");
const adminToAgentTransactionRoutes = require("./routes/adminToAgentTransactionRoutes");
const { getAdminId } = require("./controllers/adminController");

const app = express();
connectMongo();
const httpServer = createServer(app);

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  },
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

let onlineUsers = {};

io.on("connection", (socket) => {
  socket.on("join", (userId) => {
    if (!userId) return console.error("User ID is required to join the socket");
    onlineUsers[userId] = socket.id;
    io.emit("activeUsers", Object.keys(onlineUsers));
    console.log(`User ${userId} connected with socket id: ${socket.id}`);
    console.log("Online users after connection:", onlineUsers);
  });

  socket.on("money-sent-by-sender", async (data) => {
    const receiverId = data.transaction.receiverId._id;
    const senderId = data.transaction.senderId._id;
    console.log("Money sent by sender:", receiverId, senderId);

    const receiverSocketId = onlineUsers[receiverId];
    const senderSocketId = onlineUsers[senderId];
    const adminId = await getAdminId();
    const adminSocketId = onlineUsers[adminId];
    if (adminSocketId) {
      io.to(adminSocketId).emit("newTransactionMade", data);
    }
    if (receiverSocketId && senderSocketId) {
      io.to([receiverSocketId, senderSocketId]).emit(
        "money-received-by-receiver",
        data
      );
      if (receiverSocketId) {
        const notificationObj = await createNotification({
          userType: "User",
          userId: data.transaction.receiverId._id,
          message: `You have received ₹${data.transaction.amount} from ${data.transaction.senderId.firstName} ${data.transaction.senderId.lastName}`,
          type: "transaction",
          read: false,
        });

        console.log("notificationObj", notificationObj);
        const socketToSend = receiverSocketId;
        console.log("notifiaction socket called", socketToSend);
        if (socketToSend) {
          io.to(socketToSend).emit("newNotificationSend", [
            notificationObj.data,
          ]);
          console.log("io sent newNotificationSend");
        }
      }
    } else {
      console.error("Receiver or Sender ID is missing in the transaction data");
      createNotification({
        userType: "User",
        userId: data.transaction.receiverId._id,
        message: `You have received ₹${data.transaction.amount} from ${data.transaction.senderId.firstName} ${data.transaction.senderId.lastName}`,
        type: "transaction",
        read: false,
      });
    }
  });

  socket.on("newUserAgentTransactionRequest", async (data) => {
    const userIdSocketId = onlineUsers[data.transaction.userId._id];
    const agentIdSocketId = onlineUsers[data.transaction.agentId._id];
    if (agentIdSocketId && userIdSocketId) {
      io.to([userIdSocketId, agentIdSocketId]).emit(
        "newUserAgentTransactionSent",
        data
      );
      if (agentIdSocketId) {
        const notificationObj = await createNotification({
          userType: "Agent",
          userId: data.transaction.agentId._id,
          message: `You have received a new ${
            data.conversionType == "cashToERupees" ? "deposit" : "withdrawal"
          } request of ₹${data.transaction.amount} from ${
            data.transaction.userId.firstName
          } ${data.transaction.userId.lastName}`,
          type: "transaction",
          read: false,
        });

        console.log("notificationObj", notificationObj);
        const socketToSend = agentIdSocketId;
        console.log("notifiaction socket called", socketToSend);
        if (socketToSend) {
          io.to(socketToSend).emit("newNotificationSend", [
            notificationObj.data,
          ]);
          console.log("io sent newNotificationSend");
        }
      }
    } else {
      console.error("User or Agent ID is missing in the transaction data");
      createNotification({
        userType: "Agent",
        userId: data.transaction.agentId._id,
        message: `You have received a new ${
          data.conversionType == "cashToERupees" ? "deposit" : "withdrawal"
        } request of ₹${data.transaction.amount} from ${
          data.transaction.userId.firstName
        } ${data.transaction.userId.lastName}`,
        type: "transaction",
        read: false,
      });
    }
  });

  socket.on("UserAgentRequestAccepted", async (data) => {
    // console.log("User Agent Request Accepted:");
    const userIdSocketId = onlineUsers[data.userId._id];
    // console.log(
    // "User Agent Request Accepted:",
    // userIdSocketId
    // );
    if (userIdSocketId) {
      io.to(userIdSocketId).emit("UserAgentRequestAcceptedBackend", data);
      console.log("io sent");
      const notificationObj = await createNotification({
        userType: "User",
        userId: data.userId._id,
        message: `Your ${
          data.conversionType == "cashToERupees"
            ? "cash to eRupees"
            : "eRupees to cash"
        } request of ₹${data.amount} has been accepted by ${
          data.agentId.firstName
        } ${data.agentId.lastName}`,
        type: "transaction",
        read: false,
      });
      console.log("notificationObj", notificationObj);
      const socketToSend = userIdSocketId;
      console.log("notifiaction socket called", socketToSend);
      if (socketToSend) {
        io.to(socketToSend).emit("newNotificationSend", [notificationObj.data]);
        console.log("io sent newNotificationSend");
      }
    } else {
      console.error("User ID is missing in the request data");
      createNotification({
        userType: "User",
        userId: data.userId._id,
        message: `Your ${
          data.conversionType == "cashToERupees"
            ? "cash to eRupees"
            : "eRupees to cash"
        } request of ₹${data.amount} has been accepted by ${
          data.agentId.firstName
        } ${data.agentId.lastName}`,
        type: "transaction",
        read: false,
      });
    }
  });

  socket.on("UserAgentRequestRejected", async (data) => {
    const userIdSocketId = onlineUsers[data.userId._id];
    // console.log("User Agent Request Rejected:", data);
    if (userIdSocketId) {
      io.to(userIdSocketId).emit("UserAgentRequestRejectedBackend", data);
      const notificationObj = await createNotification({
        userType: "User",
        userId: data.userId._id,
        message: `Your ${
          data.conversionType == "cashToERupees"
            ? "cash to eRupees"
            : "eRupees to cash"
        } request of ₹${data.amount} has been rejected by ${
          data.agentId.firstName
        } ${data.agentId.lastName}`,
        type: "transaction",
        read: false,
      });
      console.log("notificationObj", notificationObj);
      const socketToSend = onlineUsers[data.userId._id];
      console.log("notifiaction socket called", socketToSend);
      if (socketToSend) {
        io.to(socketToSend).emit("newNotificationSend", [notificationObj.data]);
        console.log("io sent newNotificationSend");
      }
    } else {
      console.error("User ID is missing in the request data");
      createNotification({
        userType: "User",
        userId: data.userId._id,
        message: `Your ${
          data.conversionType == "cashToERupees"
            ? "cash to eRupees"
            : "eRupees to cash"
        } request of ₹${data.amount} has been rejected by ${
          data.agentId.firstName
        } ${data.agentId.lastName}`,
        type: "transaction",
        read: false,
      });
    }
  });
  socket.on("UserAgentDepositCompleted", async (data) => {
    console.log("in UserAgentDepositCompleted");
    const userIdSocketId = onlineUsers[data.userId._id];
    console.log("User Agent Deposit Completed:", userIdSocketId);
    if (userIdSocketId) {
      io.to(userIdSocketId).emit("UserAgentDepositCompletedBackend", data);
      console.log("io emitted for data", data);
      const notificationObj = await createNotification({
        userType: "User",
        userId: data.userId._id,
        message: `Your ${
          data.conversionType == "cashToERupees"
            ? "cash to eRupees"
            : "eRupees to cash"
        } request of ₹${data.amount} has been completed by ${
          data.agentId.firstName
        } ${data.agentId.lastName}`,
        type: "transaction",
        read: false,
      });

      const notificationObj2 = await createNotification({
        userType: "User",
        userId: data.userId._id,
        message: `₹${
          data.amount - data.commission
        } has been deposited successfully`,
        type: "transaction",
        read: false,
      });

      console.log("notificationObj", notificationObj, notificationObj2);
      const socketToSend = userIdSocketId;
      console.log("notifiaction socket called", socketToSend);
      if (socketToSend) {
        io.to(socketToSend).emit("newNotificationSend", [
          notificationObj.data,
          notificationObj2.data,
        ]);
        console.log("io sent newNotificationSend");
      }
    } else {
      console.error("User ID is missing in the deposit data");
      createNotification({
        userType: "User",
        userId: data.userId._id,
        message: `Your ${
          data.conversionType == "cashToERupees"
            ? "cash to eRupees"
            : "eRupees to cash"
        } request of ₹${data.amount} has been completed by ${
          data.agentId.firstName
        } ${data.agentId.lastName}`,
        type: "transaction",
        read: false,
      });
      createNotification({
        userType: "User",
        userId: data.userId._id,
        message: `₹${
          data.amount - data.commission
        } has been deposited successfully`,
        type: "transaction",
        read: false,
      });
    }
    // console.log("io sent UserAgentDepositCompletedBackend");
  });

  socket.on("UserAgentWithdrawCompleted", async (data) => {
    const userIdSocketId = onlineUsers[data.userId._id];
    // console.log("User Agent Withdraw Completed:", userIdSocketId);
    if (userIdSocketId) {
      io.to(userIdSocketId).emit("UserAgentWithdrawCompletedBackend", data);
      const notificationObj = await createNotification({
        userType: "User",
        userId: data.userId._id,
        message: `Your ${
          data.conversionType == "cashToERupees"
            ? "cash to eRupees"
            : "eRupees to cash"
        } request of ₹${data.amount} has been completed by ${
          data.agentId.firstName
        } ${data.agentId.lastName}`,
        type: "transaction",
        read: false,
      });

      const notificationObj2 = await createNotification({
        userType: "User",
        userId: data.userId._id,
        message: `₹${
          data.amount + data.commission
        } has been withdrawn successfully`,
        type: "transaction",
        read: false,
      });

      // console.log("notificationObj", notificationObj, notificationObj2);
      const socketToSend = userIdSocketId;
      // console.log("notifiaction socket called", socketToSend);
      if (socketToSend) {
        io.to(socketToSend).emit("newNotificationSend", [
          notificationObj.data,
          notificationObj2.data,
        ]);
        // console.log("io sent newNotificationSend");
      }
    } else {
      console.error("User ID is missing in the withdraw data");
      createNotification({
        userType: "User",
        userId: data.userId._id,
        message: `Your ${
          data.conversionType == "cashToERupees"
            ? "cash to eRupees"
            : "eRupees to cash"
        } request of ₹${data.amount} has been completed by ${
          data.agentId.firstName
        } ${data.agentId.lastName}`,
        type: "transaction",
        read: false,
      });
      createNotification({
        userType: "User",
        userId: data.userId._id,
        message: `₹${
          data.amount + data.commission
        } has been withdrawn successfully`,
        type: "transaction",
        read: false,
      });
    }
    // console.log("io sent UserAgentWithdrawCompletedBackend");
  });

  socket.on("updateSystemSettings", async (data) => {
    const notificationObj = await createNotification({
      userType: "Admin",
      userId: data,
      message: `System settings have been updated`,
      type: "system",
      read: false,
    });
    socket.emit("updateSystemSettingsBackend", notificationObj);
    // console.log(
    //   "System settings updated and notification sent to admin",
    //   notificationObj
    // );
  });

  socket.on("newRecentActivity",async(data)=>{
    console.log("newRecentActivity data:", data);
    const adminId = await getAdminId();
    const adminIdSocketId = onlineUsers[adminId];
    if (adminIdSocketId) {
      io.to(adminIdSocketId).emit("newRecentActivityBackend", data);
      console.log("io sent newRecentActivityBackend to admin");
    }
  })

  socket.on("newAccountCreated", async (data) => {
    const adminId = await getAdminId();
    const adminIdSocketId = onlineUsers[adminId];
    // console.log(
    //   "Admin ID: in admin create user socket",
    //   adminId,
    //   adminIdSocketId,
    //   data
    // );
    if (adminIdSocketId) {
      io.to(adminIdSocketId).emit("newAccountCreatedBackend", data);
    } else {
      console.error("Admin Socket is missing in the new account data");
    }
  });

  socket.on("disconnect", () => {
    // console.log(`Client disconnected: ${socket.id}`);
    for (const userId in onlineUsers) {
      if (onlineUsers[userId] === socket.id) {
        delete onlineUsers[userId];
        io.emit("activeUsers", Object.keys(onlineUsers));
        console.log(`User ${userId} disconnected`);
        break;
      }
    }
    console.log("Online users after disconnect:", onlineUsers);
  });
});

app.get("/api/getActiveUsers", async (req, res) => {
  try {
    const activeUsers = Object.keys(onlineUsers);
    console.log("Active users:", activeUsers);
    res.status(200).json({
      data: activeUsers,
      message: "Active users fetched successfully",
    });
  } catch (error) {
    console.error("Error fetching active users:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.use("/api/razorpay", razorpayRoutes);
app.use("/api/user", userRoutes);
app.use("/api/agent", agentRoutes);
app.use("/api/finance", financeRoutes);
app.use("/api/userToUserTransaction", userToUserTransactionRoutes);
app.use("/api/budget", budgetRoutes);
app.use("/api/agentToUserTransaction", agentToUserTransactionRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/notification", notificationRoutes);
app.use("/api/agentCommission", agentCommissionRoutes);
app.use("/api/adminToAgentTransaction", adminToAgentTransactionRoutes);
const serverStartTime = new Date();

app.use("/api/uptime", (req, res) => {
  res.json({ startTime: serverStartTime });
});

httpServer.listen(5000, () => {
  try {
    console.log(`App running on Port 5000`);
  } catch (error) {
    console.log(`error in running`, error);
  }
});
