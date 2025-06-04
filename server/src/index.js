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
  // console.log("New client connected", socket.id);
  socket.on("join", (userId) => {
    onlineUsers[userId] = socket.id;
    console.log(`User ${userId} connected with socket id: ${socket.id}`);
    // console.log("Online users:", onlineUsers);
  });

  socket.on("money-sent-by-sender",(data)=>{
    const receiverId=data.transaction.receiverId._id;
    console.log("Money sent by sender:",receiverId);
    const receiverSocketId = onlineUsers[receiverId];
    io.to(receiverSocketId).emit("money-received-by-receiver", data);
  })

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
})



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