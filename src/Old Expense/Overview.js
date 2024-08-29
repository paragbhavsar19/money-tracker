import React, { useState } from "react";

const AddTransactionView = (props) => {
  const [amount, setAmount] = useState();
  const [desc, setDesc] = useState();
  const [type, setType] = useState("expense");
  const addTxn = () => {
    props.addTransaction({
      amount: Number(amount),
      desc,
      type,
      id: Date.now(),
    });

    props.toggleAddTxn();
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
            checked={type === "expense"}
            onChange={(e) => setType(e.target.value)}
          />
          <label for="expense">Expense</label>
        </div>
        <div className="flex space-x-2">
          <input
            type="radio"
            id="income"
            name="type"
            value="income"
            checked={type === "income"}
            onChange={(e) => setType(e.target.value)}
          />
          <label for="income">Income</label>
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

const Overview = (props) => {
  const [isAddTxnVisible, toggleAddTxn] = useState(false);

  return (
    <>
      <div className="flex justify-between items-center my-4">
        <div className="text-lg font-medium">
          Balance : ${props.income - props.expense}
        </div>
        <button
          className="bg-black py-1.5 px-4 text-white rounded-md font-medium w-24"
          onClick={() => toggleAddTxn(!isAddTxnVisible)}
        >
          {isAddTxnVisible ? "Cancel" : "Add"}
        </button>
      </div>
      {isAddTxnVisible && (
        <AddTransactionView
          toggleAddTxn={toggleAddTxn}
          addTransaction={props.addTransaction}
        />
      )}
      <div className="flex items-center justify-between gap-5">
        <div className="border w-full p-4 rounded-md">
          Expense
          <p className="text-red-600 font-medium text-2xl pt-0.5">
            ${props.expense}
          </p>
        </div>
        <div className="border w-full p-4 rounded-md">
          Income
          <p className="text-green-600 font-medium text-2xl pt-0.5">
            ${props.income}
          </p>
        </div>
      </div>
    </>
  );
};

export default Overview;
