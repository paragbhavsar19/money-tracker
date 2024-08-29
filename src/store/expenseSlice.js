import { createSlice } from "@reduxjs/toolkit";

// Function to load data from local storage
const loadFromLocalStorage = () => {
  try {
    const expenses = JSON.parse(localStorage.getItem("expensesList")) || [];
    const income = JSON.parse(localStorage.getItem("incomeList")) || [];
    const balance = JSON.parse(localStorage.getItem("balance")) || 0;
    const incomeTotal = JSON.parse(localStorage.getItem("incomeTotal")) || 0;
    const expenseTotal = JSON.parse(localStorage.getItem("expenseTotal")) || 0;
    const transactionCount =
      JSON.parse(localStorage.getItem("transactionCount")) || 0;

    return {
      expensesList: expenses,
      incomeList: income,
      balance,
      income: incomeTotal,
      expense: expenseTotal,
      transaction: transactionCount,
    };
  } catch (error) {
    console.error("Failed to load from local storage", error);
    return {
      expensesList: [],
      incomeList: [],
      balance: 0,
      income: 0,
      expense: 0,
      transaction: 0,
    };
  }
};

// Function to save data to local storage
const saveToLocalStorage = (state) => {
  try {
    localStorage.setItem("expensesList", JSON.stringify(state.expensesList));
    localStorage.setItem("incomeList", JSON.stringify(state.incomeList));
    localStorage.setItem("balance", JSON.stringify(state.balance));
    localStorage.setItem("incomeTotal", JSON.stringify(state.income));
    localStorage.setItem("expenseTotal", JSON.stringify(state.expense));
    localStorage.setItem("transactionCount", JSON.stringify(state.transaction));
  } catch (error) {
    console.error("Failed to save to local storage", error);
  }
};

const expenseSlice = createSlice({
  name: "expense",
  initialState: loadFromLocalStorage(),
  reducers: {
    addExpense: (state, action) => {
      state.expensesList.push(action.payload);
      state.expense += action.payload.amount;
      state.balance -= action.payload.amount;
      state.transaction += 1;
      saveToLocalStorage(state);
    },
    addIncome: (state, action) => {
      state.incomeList.push(action.payload);
      state.income += action.payload.amount;
      state.balance += action.payload.amount;
      state.transaction += 1;
      saveToLocalStorage(state);
    },
    updateIncome: (state, action) => {
      const { id, subject, amount, date, category, note } = action.payload;
      const index = state.incomeList.findIndex((income) => income.id === id);
      if (index !== -1) {
        state.incomeList[index] = { id, subject, amount, date, category, note };
        saveToLocalStorage(state);
      }
    },
    deleteIncome: (state, action) => {
      state.incomeList = state.incomeList.filter(
        (income) => income.id !== action.payload
      );
      saveToLocalStorage(state);
    },
    updateExpense: (state, action) => {
      const { id, subject, merchant, amount, date, category } = action.payload;
      const index = state.expensesList.findIndex(
        (expense) => expense.id === id
      );
      if (index !== -1) {
        state.expensesList[index] = {
          id,
          subject,
          merchant,
          amount,
          date,
          category,
        };
        saveToLocalStorage(state);
      }
    },
    deleteExpense: (state, action) => {
      state.expensesList = state.expensesList.filter(
        (expense) => expense.id !== action.payload
      );
      saveToLocalStorage(state);
    },
  },
});

export const {
  addExpense,
  addIncome,
  updateIncome,
  updateExpense,
  deleteExpense,
  deleteIncome,
} = expenseSlice.actions;

export const selectAllTransactions = (state) => {
  const expenses = state.expense.expensesList;
  const income = state.expense.incomeList;

  // Combine expenses and income into a single array of transactions
  const transactions = [
    ...expenses.map((transaction) => ({ ...transaction, type: "Expense" })),
    ...income.map((transaction) => ({ ...transaction, type: "Income" })),
  ];

  return transactions;
};

export default expenseSlice.reducer;
