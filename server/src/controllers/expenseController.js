import Prisma from "../utils/prisma.js";

// Get all expenses
export const getAllExpenses = async (req, res) => {
  try {
    const expenses = await Prisma.expense.findMany();
    res.json(expenses);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch expenses' });
  }
};

// Get expense by ID
export const getExpenseById = async (req, res) => {
  try {
    const { id } = req.params;
    const expense = await Prisma.expense.findUnique({
      where: { id: parseInt(id) },  // Ensure ID is an integer
    });

    if (!expense) {
      return res.status(404).json({ error: 'Expense not found' });
    }

    res.json(expense);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch expense' });
  }
};

// Create a new expense
export const createExpense = async (req, res) => {
  try {
    const { category, amount } = req.body;

    const newExpense = await Prisma.expense.create({
      data: {
        category,
        amount: parseFloat(amount),
      },
    });

    res.status(201).json(newExpense);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create expense' });
  }
};

// Update an expense
export const updateExpense = async (req, res) => {
  try {
    const { id } = req.params;
    const { category, amount } = req.body;

    const updatedExpense = await Prisma.expense.update({
      where: { id: parseInt(id) },
      data: { category, amount: parseFloat(amount) },
    });

    res.json(updatedExpense);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update expense' });
  }
};

// Delete an expense
export const deleteExpense = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.expense.delete({
      where: { id: parseInt(id) },
    });

    res.json({ message: 'Expense deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete expense' });
  }
};
