// src/pages/category/ExpenseSidebar.js
import React from "react";
import { Link } from "react-router-dom";
import { Avatar } from "rsuite";

const ExpenseSidebar = () => {
  return (
    <div className="h-full">
      <Link
        to="/"
        className="logo px-10 py-3 border-b text-3xl font-semibold  h-16 text-[#34b334] hover:text-[#34b334]  hover:no-underline focus:no-underline block"
      >
        Money Tracker
      </Link>

      <div className="grid grid-flow-row px-10 py-5 space-y-4">
        <Link
          to="/user"
          className="text-lg hover:text-black hover:no-underline focus:text-black focus:no-underline mb-3"
        >
          <div className="flex items-center ">
            <Avatar
              circle
              src="https://i.pravatar.cc/150?u=1"
              alt="Avatar"
              className="mr-3 border"
            />
            <div>
              <p className="text-lg font-bold">John Doe</p>
            </div>
          </div>
        </Link>
        <Link
          to="/"
          className="text-lg hover:text-black hover:no-underline focus:text-black focus:no-underline"
        >
          Dashboard
        </Link>
        <Link
          to="/income"
          className="text-lg hover:text-black hover:no-underline focus:text-black focus:no-underline"
        >
          Incomes
        </Link>
        <Link
          to="/expenseies"
          className="text-lg hover:text-black hover:no-underline focus:text-black focus:no-underline"
        >
          Expense
        </Link>
        <Link
          to="/transaction"
          className="text-lg hover:text-black hover:no-underline focus:text-black focus:no-underline"
        >
          Transaction
        </Link>
      </div>

      <div className="grid grid-flow-row p-10 space-y-4 absolute bottom-0">
        <Link className="text-lg hover:text-black hover:no-underline focus:text-black focus:no-underline">
          Help & Information
        </Link>
        <Link className="text-lg hover:text-black hover:no-underline focus:text-black focus:no-underline">
          Logout
        </Link>
      </div>
    </div>
  );
};

export default ExpenseSidebar;
