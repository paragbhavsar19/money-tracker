// transactionsSlice.js
import { createSlice } from '@reduxjs/toolkit';

const transactionsSlice = createSlice({
  name: 'transactions',
  initialState: {
    list: [],
    income: 0,
    expense: 0,
  },
  reducers: {
    addTransaction: (state, action) => {
      state.list.push(action.payload);
      action.payload.type === 'expense'
        ? (state.expense += action.payload.amount)
        : (state.income += action.payload.amount);
    },
  },
});

export const { addTransaction } = transactionsSlice.actions;

export default transactionsSlice.reducer;
