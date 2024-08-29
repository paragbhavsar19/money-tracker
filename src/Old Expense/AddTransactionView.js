// AddTransactionView.js
import React, { useState } from 'react';

const AddTransactionView = ({ addTransaction, toggleAddTxn }) => {
  const [amount, setAmount] = useState();
  const [desc, setDesc] = useState();
  const [type, setType] = useState('expense');

  const addTxn = () => {
    addTransaction({
      amount: Number(amount),
      desc,
      type,
      id: Date.now(),
    });

    toggleAddTxn();
  };

  return (
    <div className="space-y-3 bg-gray-100 py-8 px-10">
      <div>
        <input
          placeholder="Amount"
          className="w-full border h-9 rounded-md px-2"
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>
      <div>
        <input
          placeholder="Description"
          className="w-full border h-9 rounded-md px-2"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />
      </div>
      <div className="flex space-x-3">
        <div className="flex space-x-2">
          <input
            type="radio"
            id="expense"
            name="type"
            value="expense"
            checked={type === 'expense'}
            onChange={(e) => setType(e.target.value)}
          />
          <label htmlFor="expense">Expense</label>
        </div>
        <div className="flex space-x-2">
          <input
            type="radio"
            id="income"
            name="type"
            value="income"
            checked={type === 'income'}
            onChange={(e) => setType(e.target.value)}
          />
          <label htmlFor="income">Income</label>
        </div>
      </div>
      <div className="pt-2">
        <button
          className="bg-black py-1.5 px-4 text-white rounded-md font-medium w-full"
          onClick={addTxn}
        >
          Add Transaction
        </button>
      </div>
    </div>
  );
};

export default AddTransactionView;
