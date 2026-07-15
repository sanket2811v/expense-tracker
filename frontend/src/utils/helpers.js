const CATEGORIES = [
  "Food",
  "Transport",
  "Shopping",
  "Bills",
  "Entertainment",
  "Health",
  "Education",
  "Other",
];


export const formatCurrency = (amount) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
  }).format(amount || 0);


export const formatDate = (dateValue) => {
  const date = new Date(dateValue);
  if (Number.isNaN(date.getTime())) return "—";
  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

export const getTodayInputValue = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export const toDateInputValue = (dateValue) => {
  const date = new Date(dateValue);
  if (Number.isNaN(date.getTime())) return getTodayInputValue();
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, "0");
  const day = String(date.getUTCDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};


export const getCategoryClass = (category) => {
  const map = {
    Food: "category--food",
    Transport: "category--transport",
    Shopping: "category--shopping",
    Bills: "category--bills",
    Entertainment: "category--entertainment",
    Health: "category--health",
    Education: "category--education",
    Other: "category--other",
  };
  return map[category] || "category--other";
};


export const formatDisplayDate = (date = new Date()) =>
  date.toLocaleDateString("en-IN", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  });

export { CATEGORIES };
