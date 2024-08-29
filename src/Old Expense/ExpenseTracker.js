import React, { useEffect, useState } from "react";
import Overview from "./Overview";
import Transcation from "./Transcation";

const ExpenseTracker = () => {
  const [transactions, UpdateTransactions] = useState([]);
  const [expense, UpdateExpense] = useState(0);
  const [income, UpdateIncome] = useState(0);

  const addTransaction = (payload) => {
    const transactionsArray = [...transactions];
    transactionsArray.push(payload);
    UpdateTransactions(transactionsArray);
  };

  const calculateBalance = () => {
    let exp = 0;
    let inc = 0;

    transactions.map((payload) => {
      payload.type === "expense"
        ? (exp = exp + payload.amount)
        : (inc = inc + payload.amount);
    });
    UpdateExpense(exp);
    UpdateIncome(inc);
  };

  useEffect(() => {
    calculateBalance();
  }, [transactions]);

  return (
    <>
      <div className="w-1/3 mx-auto my-10">
        <h1 className="text-3xl font-medium text-center border-b pb-5">
          Expense Tracker
        </h1>
        <Overview
          addTransaction={addTransaction}
          expense={expense}
          income={income}
        />
        <Transcation transactions={transactions} />
      </div>
    </>
  );
};

export default ExpenseTracker;
