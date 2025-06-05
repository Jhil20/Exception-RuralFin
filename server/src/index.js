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
app.use(express.json({ limit: "16kb" }));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

let onlineUsers = {};

io.on("connection", (socket) => {
  socket.on("join", (userId) => {
    if (!userId) return console.error("User ID is required to join the socket");
    onlineUsers[userId] = socket.id;
    console.log(`User ${userId} connected with socket id: ${socket.id}`);
    console.log("Online users after connection:", onlineUsers);
  });

  socket.on("money-sent-by-sender", (data) => {
    const receiverId = data.transaction.receiverId._id;
    const senderId = data.transaction.senderId._id;
    // console.log("Money sent by sender:", receiverId, senderId);
    const receiverSocketId = onlineUsers[receiverId];
    const senderSocketId = onlineUsers[senderId];
    io.to([receiverSocketId, senderSocketId]).emit(
      "money-received-by-receiver",
      data
    );
  });

  socket.on("newUserAgentTransactionRequest", (data) => {
    const userIdSocketId = onlineUsers[data.transaction.userId._id];
    const agentIdSocketId = onlineUsers[data.transaction.agentId._id];

    io.to([userIdSocketId, agentIdSocketId]).emit(
      "newUserAgentTransactionSent",
      data
    );
  });

  socket.on("UserAgentRequestAccepted", (data) => {
    // console.log("User Agent Request Accepted:", data);
    const userIdSocketId = onlineUsers[data.userId._id];
    // console.log(
    // "User Agent Request Accepted:",
    // userIdSocketId
    // );
    io.to(userIdSocketId).emit("UserAgentRequestAcceptedBackend", data);
  });

  socket.on("UserAgentRequestRejected", (data) => {
    const userIdSocketId = onlineUsers[data.userId._id];
    console.log("User Agent Request Rejected:", data);
    io.to(userIdSocketId).emit("UserAgentRequestRejectedBackend", data);
  });
  socket.on("UserAgentDepositCompleted", (data) => {
    const userIdSocketId = onlineUsers[data.userId._id];
    console.log("User Agent Deposit Completed:", data);
    io.to(userIdSocketId).emit("UserAgentDepositCompletedBackend", data);
    
  });

  socket.on("disconnect", () => {
    // console.log(`Client disconnected: ${socket.id}`);
    for (const userId in onlineUsers) {
      if (onlineUsers[userId] === socket.id) {
        delete onlineUsers[userId];
        console.log(`User ${userId} disconnected`);
        break;
      }
    }
    console.log("Online users after disconnect:", onlineUsers);
  });
});

app.use("/api/user", userRoutes);
app.use("/api/agent", agentRoutes);
app.use("/api/finance", financeRoutes);
app.use("/api/userToUserTransaction", userToUserTransactionRoutes);
app.use("/api/budget", budgetRoutes);
app.use("/api/agentToUserTransaction", agentToUserTransactionRoutes);
app.use("/api/admin", adminRoutes);
// server.js or app.js
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
