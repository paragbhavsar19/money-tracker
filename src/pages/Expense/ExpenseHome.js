// src/pages/category/ExpenseHome.js
import React from "react";
import ExpenseSidebar from "./ExpenseSidebar";
import { Outlet } from "react-router-dom";

const ExpenseHome = () => {
  return (
    <div className="flex  h-screen overflow-auto">
      <div className="w-1/6 border-r bg-gray-100">
        <ExpenseSidebar />
      </div>
      <div className="w-5/6 relative">
        <Outlet />
      </div>
    </div>
  );
};

export default ExpenseHome;
