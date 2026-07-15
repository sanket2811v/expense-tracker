import {
  Pencil,
  Trash2,
  Utensils,
  Car,
  ShoppingBag,
  Receipt,
  Clapperboard,
  HeartPulse,
  GraduationCap,
  Wallet,
  Inbox,
  LoaderCircle,
} from "lucide-react";
import {
  formatCurrency,
  formatDate,
  getCategoryClass,
} from "../utils/helpers";

const CATEGORY_ICONS = {
  Food: Utensils,
  Transport: Car,
  Shopping: ShoppingBag,
  Bills: Receipt,
  Entertainment: Clapperboard,
  Health: HeartPulse,
  Education: GraduationCap,
  Other: Wallet,
};


function ExpenseList({
  expenses,
  onEdit,
  onDelete,
  editingId,
  deletingId,
  isLoading,
}) {
  if (isLoading) {
    return (
      <section className="panel" aria-labelledby="list-heading">
        <header className="panel__header">
          <h2 id="list-heading">All Expenses</h2>
          <p>Your spending history</p>
        </header>
        <div className="loading-state" role="status">
          <LoaderCircle className="spinner-icon" size={28} aria-hidden="true" />
          <p>Loading expenses...</p>
        </div>
      </section>
    );
  }

  if (!expenses.length) {
    return (
      <section className="panel" aria-labelledby="list-heading">
        <header className="panel__header">
          <h2 id="list-heading">All Expenses</h2>
          <p>Your spending history</p>
        </header>
        <div className="empty-state">
          <div className="empty-state__icon" aria-hidden="true">
            <Inbox size={36} strokeWidth={1.75} />
          </div>
          <h3>Start Tracking Your Expenses</h3>
          <p>
            Add your first expense using the form to begin building your
            spending history.
          </p>
          <button
            type="button"
            className="btn btn--primary btn--empty"
            onClick={() => {
              const form = document.getElementById("expense-form");
              if (form) form.scrollIntoView({ behavior: "smooth", block: "start" });
            }}
          >
            Add Expense
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="panel" id="expenses-section" aria-labelledby="list-heading">
      <header className="panel__header">
        <h2 id="list-heading">All Expenses</h2>
        <p>Your spending history</p>
      </header>

      <ul className="expense-list">
        {expenses.map((expense) => {
          const Icon = CATEGORY_ICONS[expense.category] || Wallet;

          return (
            <li
              key={expense._id}
              className={`expense-item ${
                editingId === expense._id ? "expense-item--editing" : ""
              }`}
            >
              <div
                className={`expense-item__icon ${getCategoryClass(
                  expense.category
                )}`}
                aria-hidden="true"
              >
                <Icon size={18} strokeWidth={2} />
              </div>

              <div className="expense-item__main">
                <div className="expense-item__top">
                  <span className="expense-item__amount">
                    {formatCurrency(expense.amount)}
                  </span>
                  <span
                    className={`expense-item__category ${getCategoryClass(
                      expense.category
                    )}`}
                  >
                    {expense.category}
                  </span>
                </div>
                <p className="expense-item__description">
                  {expense.description}
                </p>
                <time className="expense-item__date" dateTime={expense.date}>
                  {formatDate(expense.date)}
                </time>
              </div>

              <div className="expense-item__actions">
                <button
                  type="button"
                  className="btn btn--update"
                  onClick={() => onEdit(expense)}
                  disabled={deletingId === expense._id}
                  aria-label={`Update expense: ${expense.description}`}
                >
                  <Pencil size={14} />
                  <span>Update</span>
                </button>
                <button
                  type="button"
                  className="btn btn--danger"
                  onClick={() => onDelete(expense._id)}
                  disabled={deletingId === expense._id}
                  aria-label={`Delete expense: ${expense.description}`}
                >
                  <Trash2 size={14} />
                  <span>
                    {deletingId === expense._id ? "Deleting..." : "Delete"}
                  </span>
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

export default ExpenseList;
