import { useCallback, useEffect, useMemo, useState } from "react";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";
import TotalExpenses from "./components/TotalExpenses";
import Notification from "./components/Notification";
import Sidebar from "./components/Sidebar";
import TopNavbar from "./components/TopNavbar";
import {
  getExpenses,
  addExpense,
  updateExpense,
  deleteExpense,
} from "./services/api";

function App() {
  const [expenses, setExpenses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [editingExpense, setEditingExpense] = useState(null);
  const [notification, setNotification] = useState({ message: "", type: "" });
  const [activeNav, setActiveNav] = useState("dashboard");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const showNotification = useCallback((message, type = "success") => {
    setNotification({ message, type });
  }, []);

  const clearNotification = useCallback(() => {
    setNotification({ message: "", type: "" });
  }, []);

  const fetchExpenses = useCallback(async () => {
    try {
      setIsLoading(true);
      const data = await getExpenses();
      setExpenses(Array.isArray(data) ? data : []);
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.message ||
        "Failed to load expenses";
      showNotification(message, "error");
      setExpenses([]);
    } finally {
      setIsLoading(false);
    }
  }, [showNotification]);

  useEffect(() => {
    fetchExpenses();
  }, [fetchExpenses]);

  const totalSpent = useMemo(
    () =>
      expenses.reduce((sum, expense) => sum + Number(expense.amount || 0), 0),
    [expenses]
  );

  const highestExpense = useMemo(() => {
    if (!expenses.length) return 0;
    return Math.max(...expenses.map((expense) => Number(expense.amount || 0)));
  }, [expenses]);

  const averageExpense = useMemo(() => {
    if (!expenses.length) return 0;
    return totalSpent / expenses.length;
  }, [expenses, totalSpent]);

  const handleAddExpense = async (payload) => {
    try {
      setIsSubmitting(true);
      const result = await addExpense(payload);
      showNotification(result.message || "Expense added successfully", "success");
      await fetchExpenses();
      return true;
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.message ||
        "Failed to add expense";
      showNotification(message, "error");
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdateExpense = async (id, payload) => {
    try {
      setIsSubmitting(true);
      const result = await updateExpense(id, payload);
      showNotification(
        result.message || "Expense updated successfully",
        "success"
      );
      setEditingExpense(null);
      await fetchExpenses();
      return true;
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.message ||
        "Failed to update expense";
      showNotification(message, "error");
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEditExpense = (expense) => {
    setEditingExpense(expense);
    setActiveNav("dashboard");
    const formSection = document.getElementById("expense-form");
    if (formSection) {
      formSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleCancelEdit = () => {
    setEditingExpense(null);
  };

  const handleDeleteExpense = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this expense? This cannot be undone."
    );
    if (!confirmed) return;

    try {
      setDeletingId(id);
      if (editingExpense?._id === id) {
        setEditingExpense(null);
      }
      const result = await deleteExpense(id);
      showNotification(
        result.message || "Expense deleted successfully",
        "success"
      );
      await fetchExpenses();
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.message ||
        "Failed to delete expense";
      showNotification(message, "error");
    } finally {
      setDeletingId(null);
    }
  };

  const handleNavigate = (navId) => {
    setActiveNav(navId);
    setIsSidebarOpen(false);

    if (navId === "expenses") {
      const section = document.getElementById("expenses-section");
      if (section) {
        section.scrollIntoView({ behavior: "smooth", block: "start" });
      }
      return;
    }

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="app-shell">
      <div className="app__backdrop" aria-hidden="true" />

      <Notification
        message={notification.message}
        type={notification.type}
        onClose={clearNotification}
      />

      <Sidebar
        activeNav={activeNav}
        onNavigate={handleNavigate}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      <div className="app-frame">
        <TopNavbar onMenuOpen={() => setIsSidebarOpen(true)} />

        <main className="app-main">
          <div className="page-intro">
            <p className="page-intro__eyebrow">Overview</p>
            <h1>Financial Dashboard</h1>
            <p className="page-intro__text">
              Monitor spending, log new expenses, and keep your budget in focus.
            </p>
          </div>

          <div id="dashboard-section">
            <TotalExpenses
              total={totalSpent}
              count={expenses.length}
              highest={highestExpense}
              average={averageExpense}
            />
          </div>

          <div className="content-grid">
            <ExpenseForm
              onAdd={handleAddExpense}
              onUpdate={handleUpdateExpense}
              onCancelEdit={handleCancelEdit}
              editingExpense={editingExpense}
              isSubmitting={isSubmitting}
            />

            <ExpenseList
              expenses={expenses}
              onEdit={handleEditExpense}
              onDelete={handleDeleteExpense}
              editingId={editingExpense?._id}
              deletingId={deletingId}
              isLoading={isLoading}
            />
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
