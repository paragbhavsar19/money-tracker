// src/components/ExpenseModal.js

import React, { useState, useEffect } from "react";
import { Button, Modal, DatePicker,Message  } from "rsuite";

const ExpenseModal = ({ open, onClose, expense, onUpdate }) => {
  const [subject, setSubject] = useState("");
  const [merchant, setMerchant] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [category, setCategory] = useState("");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (expense) {
      setSubject(expense.subject);
      setMerchant(expense.merchant);
      setDate(new Date(expense.date));
      setCategory(expense.category);
      setAmount(expense.amount);
    }
  }, [expense]);

  const handleUpdate = () => {
    const newErrors = {};
    if (!subject) newErrors.subject = "Subject is required";
    if (!merchant) newErrors.merchant = "Merchant is required";
    if (!date) newErrors.date = "Date is required";
    if (!category) newErrors.category = "Category is required";
    if (!amount) newErrors.amount = "Amount is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onUpdate({
      ...expense,
      subject,
      merchant,
      date: date.toISOString().split("T")[0], // Convert date to string format
      category,
      amount: Number(amount),
    });
    onClose();
  };

  const cats = [
    "Invest",
    "Shopping",
    "Food",
    "Telephone",
    "Entertainment",
    "Education",
    "Beauty",
    "Sport",
    "Social",
    "Transportation",
    "Clothing",
    "Car",
    "Cigarette",
    "Electronics",
    "Travel",
    "Health",
    "Pet",
    "Repair",
    "Housing",
    "Home",
    "Gift",
    "Donate",
    "Lottery",
    "Snacks",
    "Child",
    "Vegetable",
    "Fruit",
    "Salary",
    "Investments",
    "Awards",
    "Others",
  ];

  return (
    <Modal open={open} onClose={onClose} size={"sm"} className="update-modal">
      <Modal.Header>
        <Modal.Title>Update Expense</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form className="space-y-5">
          <div className="relative">
            <label className="block min-w-32 font-medium text-xs mb-2">
              Id
            </label>
            <input
              value={expense?.id || ""}
              className="border h-9 rounded-md px-2 w-full"
              readOnly
              disabled
            />
          </div>
          <div className="relative">
            <label className="block min-w-32 font-medium text-xs mb-2">
              Subject
            </label>
            <input
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Enter subject"
              className="border h-9 rounded-md px-2 w-full"
            />
            {errors.subject && <span className="text-red-500 text-xs">{errors.subject}</span>}
          </div>
          <div className="relative">
            <label className="block min-w-32 font-medium text-xs mb-2">
              Merchant
            </label>
            <input
              value={merchant}
              onChange={(e) => setMerchant(e.target.value)}
              placeholder="Enter Merchant"
              className="border h-9 rounded-md px-2 w-full"
            />
            {errors.merchant && <span className="text-red-500 text-xs">{errors.merchant}</span>}
          </div>
          <div className="relative">
            <label className="block min-w-32 font-medium text-xs mb-2">
              Date
            </label>

            <DatePicker
              value={date}
              onChange={(value) => setDate(value)}
              oneTap
              format="dd-MM-yyyy"
              size="md"
              style={{ width: "100%" }}
              className="modal-datepicker"
            />
             {errors.date && <span className="text-red-500 text-xs">{errors.date}</span>}
          </div>
          <div className="relative">
            <label className="block min-w-32 font-medium text-xs mb-2">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="border border-gray-200 py-1.5 px-2 w-full rounded-md"
            >
              <option value="">Select Category</option>
              {cats.sort().map((cat, index) => (
                <option key={index} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            {errors.category && <span className="text-red-500 text-xs">{errors.category}</span>}
          </div>
          <div className="relative">
            <label className="block min-w-32 font-medium text-xs mb-2">
              Amount
            </label>
            <input
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount"
              className="border border-gray-200 h-9 rounded-md px-2 w-full"
              type="number"
            />
            {errors.amount && <span className="text-red-500 text-xs">{errors.amount}</span>}
          </div>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleUpdate} appearance="primary">
          Update
        </Button>
        <Button onClick={onClose} appearance="default">
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ExpenseModal;
