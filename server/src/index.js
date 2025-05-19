const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const connectMongo = require("./config");
const userRoutes = require("./routes/userRoutes");
const agentRoutes = require("./routes/agentRoutes");
const userToUserTransactionRoutes = require("./routes/userToUserTransactionRoutes");
const budgetRoutes = require("./routes/budgetRoutes");
const app = express();
const financeRoutes = require("./routes/financeRoutes");
app.use(
  cors({
    credentials: true,
  })
);

connectMongo();

app.use(express.json({ limit: "16kb" }));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/api/user", userRoutes);
app.use("/api/agent", agentRoutes);
app.use("/api/finance", financeRoutes);
app.use("/api/userToUserTransaction", userToUserTransactionRoutes);
app.use("/api/budget", budgetRoutes);

app.listen(5000, () => {
  try {
    console.log(`App running on Port 5000`);
  } catch (error) {
    console.log(`error in running`, error);
  }
});
