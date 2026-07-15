const express = require("express");
const {
  addExpense,
  getExpenses,
  deleteExpense,
  updateExpense,
} = require("../controllers/expenseController");

const router = express.Router();

router.route("/").get(getExpenses).post(addExpense);
router.route("/:id").put(updateExpense).delete(deleteExpense);

module.exports = router;
