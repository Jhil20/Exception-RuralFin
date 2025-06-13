const Budget = require("../models/budgetModel");
const Finance = require("../models/financeModel");
const UserToUserTransaction = require("../models/userToUserTransactionModel");
const { createNotification } = require("./notificationController");
const createBudget = async (req, res) => {
  try {
    const {
      userId,
      income,
      budget,
      savingsGoal,
      alertsEnabled,
      CBHousing,
      CBFood,
      CBHealthcare,
      CBEducation,
      CBUtilities,
      CBEntertainment,
      CBTransport,
      CBOthers,
    } = req.body;

    // Validate required fields
    const requiredFields = [
      "userId",
      "income",
      "budget",
      "savingsGoal",
      "alertsEnabled",
      "CBHousing",
      "CBFood",
      "CBHealthcare",
      "CBEducation",
      "CBUtilities",
      "CBEntertainment",
      "CBTransport",
      "CBOthers",
    ];
    for (const field of requiredFields) {
      if (req.body[field] === undefined || req.body[field] === null) {
        return res
          .status(400)
          .json({ message: `${field} is required`, success: false });
      }
    }

    // Check if budget already exists for the user
    const existingBudget = await Budget.findOne({ userId });
    if (existingBudget) {
      // If a budget already exists, you can choose to update it or return an error
      // Uncomment the following lines to update the existing budget instead of returning an error
      const updatedBudget = await Budget.findByIdAndUpdate(
        existingBudget._id,
        {
          income,
          budget,
          savingsGoal,
          alertsEnabled,
          categoryBudgets: {
            Housing: CBHousing,
            Food: CBFood,
            Healthcare: CBHealthcare,
            Education: CBEducation,
            Utilities: CBUtilities,
            Entertainment: CBEntertainment,
            Transport: CBTransport,
            Others: CBOthers,
          },
        },
        { new: true }
      );
      if (!updatedBudget) {
        return res
          .status(400)
          .json({ message: "Failed to update budget", success: false });
      }

      return res.status(200).json({
        updatedBudget,
        message: "Budget updated successfully",
        success: true,
      });
    }
    const date = new Date();
    const currentMonth = date.getMonth() + 1;
    const currentYear = date.getFullYear();

    const AllDebitTransactions = await UserToUserTransaction.find({
      senderId: userId,
      status: "completed",
      transactionDate: {
        $gte: new Date(currentYear, currentMonth - 1, 1),
        $lt: new Date(currentYear, currentMonth, 1),
      },
    });

    const categorySpending = {
      Housing: 0,
      Food: 0,
      Healthcare: 0,
      Education: 0,
      Utilities: 0,
      Entertainment: 0,
      Transport: 0,
      Others: 0,
    };

    // console.log("AllDebitTransactions", AllDebitTransactions);
    AllDebitTransactions.forEach(async (transaction) => {
      const { amount, remarks } = transaction;
      const category = remarks;
      if (category == "Food & Dining") {
        categorySpending.Food += amount;
      } else {
        categorySpending[category] += amount;
      }
    });

    // console.log("categorySpending", categorySpending);

    const newBudget = Budget.create({
      userId,
      income,
      budget,
      month: currentMonth,
      year: currentYear,
      savingsGoal,
      alertsEnabled,
      categoryBudgets: {
        Housing: CBHousing,
        Food: CBFood,
        Healthcare: CBHealthcare,
        Education: CBEducation,
        Utilities: CBUtilities,
        Entertainment: CBEntertainment,
        Transport: CBTransport,
        Others: CBOthers,
      },
      categorySpending,
    });
    if (!newBudget) {
      return res
        .status(400)
        .json({ message: "Failed to create budget", success: false });
    }

    // console.log("newBudget", newBudget);

    const finance = await Finance.updateOne(
      { userId },
      { $set: { budget: newBudget._id, isBudgetPlanningEnabled: true } },
      { new: true }
    );

    if (!finance) {
      await Budget.deleteOne({ _id: newBudget._id });
      return res.status(400).json({
        message: "Failed to update finance and Rollback Budget",
        success: false,
      });
    }

    res.status(201).json({
      newBudget,
      message: "Budget created successfully",
      success: true,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getBudgetByUserId = async (req, res) => {
  try {
    const userId = req.params.id;

    // Validate required fields
    if (!userId) {
      return res
        .status(400)
        .json({ message: "userId is required", success: false });
    }
    const date = new Date();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    const budget = await Budget.findOne({ userId, month, year });
    if (!budget) {
      return res
        .status(404)
        .json({ message: "Budget not found", success: false });
    }

    res
      .status(200)
      .json({ budget, message: "Budget fetched successfully", success: true });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateBudgetSpending = async (req, res) => {
  try {
    const { userId, category, amount } = req.body;
    // console.log("updateBudgetSpending", req.body);

    // Validate required fields
    if (!userId || !category || !amount) {
      return res.status(400).json({
        message: "userId, category and amount are required",
        success: false,
      });
    }

    const date = new Date();
    const currentMonth = date.getMonth() + 1;
    const currentYear = date.getFullYear();

    const budget = await Budget.findOne({
      userId,
      month: currentMonth,
      year: currentYear,
    });
    if (!budget) {
      return res
        .status(404)
        .json({ message: "Budget not found for this user", success: false });
    }

    // Update the category spending
    if (category == "Food & Dining") {
      budget.categorySpending["Food"] += amount;
    } else {
      budget.categorySpending[category] += amount;
    }

    if (
      budget.categorySpending[category] + amount >
        budget.categoryBudgets[category] &&
      budget.alertsEnabled
    ) {
      createNotification({
        userType: "User",
        userId,
        message: `Budget Alert: You've exceeded your ₹${
          budget.categoryBudgets[category]
        } budget for ${category == "Food" ? "Food & Dining" : category} by ₹${
          budget.categorySpending[category] - budget.categoryBudgets[category]
        } this month. Consider reviewing your spending to stay on track.`,
        type: "budget",
        read: false,
      });
    }

    // Save the updated budget
    await budget.save();

    res.status(200).json({
      budget,
      message: "Budget spending updated successfully",
      success: true,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllBudgetsOfThisYearByUserId = async (req, res) => {
  try {
    const userId = req.params.id;

    // Validate required fields
    if (!userId) {
      return res
        .status(400)
        .json({ message: "userId is required", success: false });
    }

    const date = new Date();
    const currentYear = date.getFullYear();

    const budgets = await Budget.find({
      userId,
      year: currentYear,
    });

    // console.log("budgets", budgets);

    if (!budgets || budgets.length === 0) {
      return res
        .status(404)
        .json({ message: "Budgets not found", success: false });
    }

    res.status(200).json({
      budgets,
      message: "Budgets fetched successfully",
      success: true,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createBudget,
  getBudgetByUserId,
  getAllBudgetsOfThisYearByUserId,
  updateBudgetSpending,
};
