// src/App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./Header";
import ExpenseHome from "./pages/Expense/ExpenseHome";
import ExpenseDashboard from "./pages/Expense/ExpenseDashboard";
import AddExpense from "./pages/Expense/AddExpense";
import Income from "./pages/Expense/Income";
import AddIncome from "./pages/Expense/AddIncome";
import Expenses from "./pages/Expense/Expenses";
import PrintData from "./pages/Components/PrintData";
import Transaction from "./pages/Expense/Transaction";
import User from "./pages/User/User";

function App() {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<ExpenseHome />}>
            <Route index element={<ExpenseDashboard />} />
            <Route path="/transaction" element={<Transaction />} />
            <Route path="/expenseies" element={<Expenses />} />
            <Route path="/addexpense" element={<AddExpense />} />
            <Route path="/income" element={<Income />} />
            <Route path="/addincome" element={<AddIncome />} />
            <Route path="/user" element={<User />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
