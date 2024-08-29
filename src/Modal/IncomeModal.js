import React, { useEffect, useState } from "react";
import { Button, Modal, DatePicker } from "rsuite";
import "rsuite/dist/rsuite.min.css";

const IncomeModal = ({ open, onClose, income, onUpdate }) => {
  const [subject, setSubject] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState(null);
  const [category, setCategory] = useState("");
  const [note, setNote] = useState("");

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (income) {
      setSubject(income.subject);
      setAmount(income.amount);
      setDate(new Date(income.date));
      setCategory(income.category);
      setNote(income.note);
    }
  }, [income]);

  const validateInputs = () => {
    let newErrors = {};

    if (!subject) newErrors.subject = "Subject is required.";
    if (!amount || isNaN(amount) || Number(amount) <= 0)
      newErrors.amount = "Valid amount is required.";
    if (!date) newErrors.date = "Date is required.";
    if (!category) newErrors.category = "Income type is required.";
    if (!note) newErrors.note = "Note is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleUpdate = () => {
    if (validateInputs()) {
      onUpdate({
        ...income,
        subject,
        date: date.toISOString().split("T")[0], // Convert date to string format
        category,
        amount: Number(amount),
        note,
      });
      onClose();
    }
  };

  const incomeTypes = [
    "Salary",
    "Bank",
    "Cashback",
    "Family",
    "Stock Market",
    "Others",
  ];

  return (
    <Modal open={open} onClose={onClose} size="sm" className="update-modal">
      <Modal.Header>
        <Modal.Title>Update Income</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form className="space-y-5">
          <div className="relative">
            <label className="block min-w-32 font-medium text-xs mb-2">
              Id
            </label>
            <input
              value={income?.id || ""}
              className="border border-gray-200 h-9 rounded-md px-2 w-full"
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
              className="border border-gray-200 h-9 rounded-md px-2 w-full"
            />
            {errors.subject && (
              <span className="text-red-500 text-xs">{errors.subject}</span>
            )}
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
            {errors.amount && (
              <span className="text-red-500 text-xs">{errors.amount}</span>
            )}
          </div>
          <div className="relative">
            <label className="block min-w-32 font-medium text-xs mb-2">
              Date
            </label>
            <DatePicker
              value={date}
              onChange={(value) => setDate(value)}
              format="dd-MM-yyyy"
              size="md"
              style={{ width: "100%" }}
              className="modal-datepicker"
            />
            {errors.date && (
              <span className="text-red-500 text-xs">{errors.date}</span>
            )}
          </div>
          <div className="relative">
            <label className="block min-w-32 font-medium text-xs mb-2">
              Income Type
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="border border-gray-200 py-1.5 px-2 w-full rounded-md"
            >
              <option value="">Select Type</option>
              {incomeTypes.sort().map((cat, index) => (
                <option key={index} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            {errors.category && (
              <span className="text-red-500 text-xs">{errors.category}</span>
            )}
          </div>
          <div className="relative">
            <label className="block min-w-32 font-medium text-xs mb-2">
              Note
            </label>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Enter note"
              className="border border-gray-200 rounded-md px-2 w-full"
              rows={3}
            />
            {errors.note && (
              <span className="text-red-500 text-xs">{errors.note}</span>
            )}
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

export default IncomeModal;
