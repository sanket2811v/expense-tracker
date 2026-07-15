import { useEffect, useState } from "react";
import {
  IndianRupee,
  Calendar,
  FileText,
  Tag,
  Plus,
  Save,
  X,
} from "lucide-react";
import {
  CATEGORIES,
  getTodayInputValue,
  toDateInputValue,
} from "../utils/helpers";

const INITIAL_FORM = {
  amount: "",
  description: "",
  category: "Food",
  date: getTodayInputValue(),
};

function validateForm(form) {
  const errors = {};

  const amount = Number(form.amount);
  if (!form.amount || Number.isNaN(amount) || amount <= 0) {
    errors.amount = "Enter a valid amount greater than 0";
  }

  if (!form.description.trim()) {
    errors.description = "Description is required";
  } else if (form.description.trim().length > 200) {
    errors.description = "Description must be 200 characters or less";
  }

  if (!form.category) {
    errors.category = "Select a category";
  }

  if (!form.date) {
    errors.date = "Date is required";
  }

  return errors;
}


function ExpenseForm({
  onAdd,
  onUpdate,
  onCancelEdit,
  editingExpense,
  isSubmitting,
}) {
  const [form, setForm] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});
  const isEditing = Boolean(editingExpense);

  useEffect(() => {
    if (editingExpense) {
      setForm({
        amount: String(editingExpense.amount ?? ""),
        description: editingExpense.description || "",
        category: editingExpense.category || "Food",
        date: toDateInputValue(editingExpense.date),
      });
      setErrors({});
    } else {
      setForm({ ...INITIAL_FORM, date: getTodayInputValue() });
      setErrors({});
    }
  }, [editingExpense]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const resetForm = () => {
    setForm({ ...INITIAL_FORM, date: getTodayInputValue() });
    setErrors({});
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const validationErrors = validateForm(form);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const payload = {
      amount: Number(form.amount),
      description: form.description.trim(),
      category: form.category,
      date: form.date,
    };

    const success = isEditing
      ? await onUpdate(editingExpense._id, payload)
      : await onAdd(payload);

    if (success) {
      resetForm();
    }
  };

  const handleCancel = () => {
    resetForm();
    onCancelEdit();
  };

  return (
    <section
      className="panel panel--form"
      id="expense-form"
      aria-labelledby="form-heading"
    >
      <header className="panel__header">
        <div>
          <h2 id="form-heading">
            {isEditing ? "Update Expense" : "Add Expense"}
          </h2>
          <p>
            {isEditing
              ? "Edit the selected spending entry"
              : "Log a new spending entry"}
          </p>
        </div>
      </header>

      <form className="expense-form" onSubmit={handleSubmit} noValidate>
        <div className="form-row">
          <div className={`form-field ${form.amount ? "has-value" : ""}`}>
            <div className="input-shell">
              <IndianRupee size={16} className="input-icon" aria-hidden="true" />
              <input
                id="amount"
                name="amount"
                type="number"
                min="0.01"
                step="0.01"
                placeholder=" "
                value={form.amount}
                onChange={handleChange}
                disabled={isSubmitting}
                aria-invalid={Boolean(errors.amount)}
              />
              <label htmlFor="amount">Amount</label>
            </div>
            {errors.amount && (
              <span className="field-error">{errors.amount}</span>
            )}
          </div>

          <div className={`form-field ${form.date ? "has-value" : ""}`}>
            <div className="input-shell">
              <Calendar size={16} className="input-icon" aria-hidden="true" />
              <input
                id="date"
                name="date"
                type="date"
                placeholder=" "
                value={form.date}
                onChange={handleChange}
                disabled={isSubmitting}
                aria-invalid={Boolean(errors.date)}
              />
              <label htmlFor="date">Date</label>
            </div>
            {errors.date && <span className="field-error">{errors.date}</span>}
          </div>
        </div>

        <div className={`form-field ${form.description ? "has-value" : ""}`}>
          <div className="input-shell">
            <FileText size={16} className="input-icon" aria-hidden="true" />
            <input
              id="description"
              name="description"
              type="text"
              maxLength={200}
              placeholder=" "
              value={form.description}
              onChange={handleChange}
              disabled={isSubmitting}
              aria-invalid={Boolean(errors.description)}
            />
            <label htmlFor="description">Description</label>
          </div>
          {errors.description && (
            <span className="field-error">{errors.description}</span>
          )}
        </div>

        <div className={`form-field ${form.category ? "has-value" : ""}`}>
          <div className="input-shell input-shell--select">
            <Tag size={16} className="input-icon" aria-hidden="true" />
            <select
              id="category"
              name="category"
              value={form.category}
              onChange={handleChange}
              disabled={isSubmitting}
              aria-invalid={Boolean(errors.category)}
            >
              {CATEGORIES.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
            <label htmlFor="category">Category</label>
          </div>
          {errors.category && (
            <span className="field-error">{errors.category}</span>
          )}
        </div>

        <div
          className={`form-actions ${isEditing ? "form-actions--editing" : ""}`}
        >
          <button
            type="submit"
            className="btn btn--primary"
            disabled={isSubmitting}
          >
            {isEditing ? <Save size={18} /> : <Plus size={18} />}
            <span>
              {isSubmitting
                ? isEditing
                  ? "Updating..."
                  : "Adding..."
                : isEditing
                  ? "Update Expense"
                  : "Add Expense"}
            </span>
          </button>

          {isEditing && (
            <button
              type="button"
              className="btn btn--secondary"
              onClick={handleCancel}
              disabled={isSubmitting}
            >
              <X size={16} />
              <span>Cancel</span>
            </button>
          )}
        </div>
      </form>
    </section>
  );
}

export default ExpenseForm;
