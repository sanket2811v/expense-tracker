# Personal Expense Tracker

A full-stack **MERN** expense tracker for logging spending, reviewing history, and seeing a live total.

---

## Features

- Add expenses with amount, description, category, and date
- View all expenses in a responsive list
- Delete expenses with confirmation
- Live **Total Spent** summary (₹)
- Form validation and success/error notifications
- Loading and empty states
- Clean MVC backend with Express + MongoDB
- Axios service layer on the frontend

---

## Tech Stack

| Layer    | Technology                          |
|----------|-------------------------------------|
| Frontend | React 18, Vite, Axios, CSS          |
| Backend  | Node.js, Express.js                 |
| Database | MongoDB (Atlas or local) + Mongoose |
| Deploy   | Vercel (frontend), Render (backend) |

---

## Project Structure

```
Personal Expense Tracker/
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   └── expenseController.js
│   ├── models/
│   │   └── Expense.js
│   ├── routes/
│   │   └── expenseRoutes.js
│   ├── server.js
│   ├── .env.example
│   └── package.json
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── ExpenseForm.jsx
│   │   │   ├── ExpenseList.jsx
│   │   │   ├── Notification.jsx
│   │   │   └── TotalExpenses.jsx
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── utils/
│   │   │   └── helpers.js
│   │   ├── App.jsx
│   │   ├── App.css
│   │   └── main.jsx
│   ├── .env.example
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
├── .gitignore
└── README.md
```

---

## Setup Instructions

### Prerequisites

- Node.js 18+ and npm
- MongoDB Atlas account **or** local MongoDB

### 1. Clone the repository

```bash
git clone <your-github-repo-url>
cd "Personal Expense Tracker"
```

### 2. Backend setup

```bash
cd backend
npm install
cp .env.example .env
```

Edit `backend/.env`:

```env
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/expense-tracker?retryWrites=true&w=majority
PORT=5000
CLIENT_URL=http://localhost:5173
```

Start the API:

```bash
npm run dev
```

The server runs at `http://localhost:5000`.

### 3. Frontend setup

Open a second terminal:

```bash
cd frontend
npm install
cp .env.example .env
```

Ensure `frontend/.env` contains:

```env
VITE_API_URL=http://localhost:5000/api
```

Start the Vite app:

```bash
npm run dev
```

Open `http://localhost:5173` in your browser.

---

## API Endpoints

Base URL (local): `http://localhost:5000`

| Method | Endpoint            | Description        |
|--------|---------------------|--------------------|
| POST   | `/api/expenses`     | Add a new expense  |
| GET    | `/api/expenses`     | Get all expenses   |
| DELETE | `/api/expenses/:id` | Delete an expense  |

### POST `/api/expenses`

**Request body**

```json
{
  "amount": 500,
  "description": "Groceries",
  "category": "Food",
  "date": "2026-07-14"
}
```

**Response**

```json
{
  "success": true,
  "message": "Expense added successfully"
}
```

### GET `/api/expenses`

**Response**

```json
[
  {
    "_id": "...",
    "amount": 500,
    "description": "Groceries",
    "category": "Food",
    "date": "2026-07-14T00:00:00.000Z",
    "createdAt": "..."
  }
]
```

### DELETE `/api/expenses/:id`

**Response**

```json
{
  "success": true,
  "message": "Expense deleted successfully"
}
```

**Categories:** Food, Transport, Shopping, Bills, Entertainment, Health, Education, Other


## Environment Variables Summary

### Backend (`backend/.env`)

| Variable      | Description                              |
|---------------|------------------------------------------|
| `MONGODB_URI` | MongoDB connection string                |
| `PORT`        | API port (default `5000`)                |
| `CLIENT_URL`  | Allowed CORS origin(s), comma-separated  |

### Frontend (`frontend/.env`)

| Variable       | Description                         |
|----------------|-------------------------------------|
| `VITE_API_URL` | Backend API base URL ending in `/api` |

---

## GitHub Repository

```
https://github.com/<your-username>/<your-repo>
```

---

## Live Demo

```
https://your-app.vercel.app
```

---

## License

MIT
