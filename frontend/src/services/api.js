import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 15000,
});

/**
 * Fetch all expenses from the API.
 * @returns {Promise<Array>} List of expense documents
 */
export const getExpenses = async () => {
  const response = await api.get("/expenses");
  return response.data;
};

/**
 * Create a new expense.
 * @param {{ amount: number, description: string, category: string, date: string }} expenseData
 * @returns {Promise<object>} API success payload
 */
export const addExpense = async (expenseData) => {
  const response = await api.post("/expenses", expenseData);
  return response.data;
};

/**
 * Update an expense by its MongoDB ObjectId.
 * @param {string} id
 * @param {{ amount: number, description: string, category: string, date: string }} expenseData
 * @returns {Promise<object>} API success payload
 */
export const updateExpense = async (id, expenseData) => {
  const response = await api.put(`/expenses/${id}`, expenseData);
  return response.data;
};

/**
 * Delete an expense by its MongoDB ObjectId.
 * @param {string} id
 * @returns {Promise<object>} API success payload
 */
export const deleteExpense = async (id) => {
  const response = await api.delete(`/expenses/${id}`);
  return response.data;
};

export default api;
