const Expense = require("../models/Expense");
const addExpense = async (req, res) => {
  try {
    const { amount, description, category, date } = req.body;
    if (
      amount === undefined ||
      amount === null ||
      amount === "" ||
      !description ||
      !category ||
      !date
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const parsedAmount = Number(amount);
    if (Number.isNaN(parsedAmount) || parsedAmount <= 0) {
      return res.status(400).json({
        success: false,
        message: "The Amount is not valid",
      });
    }

    const parsedDate = new Date(date);
    if (Number.isNaN(parsedDate.getTime())) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid date",
      });
    }

    const expense = await Expense.create({
      amount: parsedAmount,
      description: description.trim(),
      category: category.trim(),
      date: parsedDate,
    });

    console.log(
      `Expense saved → db=${Expense.db.name} collection=${Expense.collection.name} id=${expense._id}`
    );

    return res.status(201).json({
      success: true,
      message: "Expense added successfully",
      data: expense,
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({
        success: false,
        message: messages.join(", "),
      });
    }

    console.error("Add expense error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while adding expense",
    });
  }
};

const getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find().sort({ date: -1, createdAt: -1 });
    return res.status(200).json(expenses);
  } catch (error) {
    console.error("Get expenses error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while fetching expenses",
    });
  }
};

const deleteExpense = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({
        success: false,
        message: "Invalid expense ID",
      });
    }

    const expense = await Expense.findByIdAndDelete(id);

    if (!expense) {
      return res.status(404).json({
        success: false,
        message: "Expense not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Expense deleted successfully",
    });
  } catch (error) {
    console.error("Delete expense error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while deleting expense",
    });
  }
};


const updateExpense = async (req, res) => {
  try {
    const { id } = req.params;
    const { amount, description, category, date } = req.body;

    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({
        success: false,
        message: "Invalid expense ID",
      });
    }

    if (
      amount === undefined ||
      amount === null ||
      amount === "" ||
      !description ||
      !category ||
      !date
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const parsedAmount = Number(amount);
    if (Number.isNaN(parsedAmount) || parsedAmount <= 0) {
      return res.status(400).json({
        success: false,
        message: "The Amount is not valid",
      });
    }

    const parsedDate = new Date(date);
    if (Number.isNaN(parsedDate.getTime())) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid date",
      });
    }

    const updatedExpense = await Expense.findByIdAndUpdate(
      id,
      {
        amount: parsedAmount,
        description: description.trim(),
        category: category.trim(),
        date: parsedDate,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedExpense) {
      return res.status(404).json({
        success: false,
        message: "Expense not found",
      });
    }

    console.log(`Expense updated → id=${updatedExpense._id}`);

    return res.status(200).json({
      success: true,
      message: "Expense updated successfully",
      data: updatedExpense,
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({
        success: false,
        message: messages.join(", "),
      });
    }

    console.error("Update expense error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

module.exports = {
  addExpense,
  getExpenses,
  deleteExpense,
  updateExpense,
};
