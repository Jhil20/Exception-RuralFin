const Budget = require("../models/budgetModel");
const Finance = require("../models/financeModel");

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
      return res.status(400).json({
        message: "Budget already exists for this user",
        success: false,
      });
    }

    const newBudget = Budget.create({
      userId,
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
    });
    if (!newBudget) {
      return res
        .status(400)
        .json({ message: "Failed to create budget", success: false });
    }

    const finance = await Finance.updateOne(
      { userId },
      { $set: { budget: newBudget._id, isBudgetPlanningEnabled: true } },
      { new: true }
    );

    if (!finance) {
      await Budget.deleteOne({ _id: newBudget._id });
      return res
        .status(400)
        .json({ message: "Failed to update finance and Rollback Budget", success: false });
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

module.exports = {
  createBudget,
};
