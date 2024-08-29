import React, { useState } from "react";

const cats = [
  "Invest", "Shopping", "Food", "Telephone", "Entertainment",
  "Education", "Beauty", "Sport", "Social", "Transportation",
  "Clothing", "Car", "Cigarette", "Electronics", "Travel",
  "Health", "Pet", "Repair", "Housing", "Home", "Gift",
  "Donate", "Lottery", "Snacks", "Child", "Vegetable", "Fruit",
  "Salary", "Investments", "Awards", "Others"
];

const ExpenseCategory = () => {
  const [categories, setCategories] = useState(cats);
  const [newCategory, setNewCategory] = useState("");

  const handleAddCategory = () => {
    const trimmedCategory = newCategory.trim();
    if (trimmedCategory && !categories.includes(trimmedCategory)) {
      setCategories([...categories, trimmedCategory].sort());
      setNewCategory("");
    }
  };

  // Sort categories alphabetically for display
  const sortedCategories = [...categories].sort();

  return (
    <div className="w-[500px] mx-auto my-10">
      <div className="">
        <div className="flex items-center">
          <input
            placeholder="Add Category"
            className="w-full border border-gray-300 h-10 rounded-md px-2 bg-gray-200"
            type="text"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
          />
          <button
            className="bg-black text-white px-4 h-10 rounded-md whitespace-nowrap ml-2"
            onClick={handleAddCategory}
          >
            Add Category
          </button>
        </div>
      </div>

      <div className="my-2 bg-gray-300 p-5 Add-category">
        <select className="w-full border py-1.5 px-2">
          <option value="">Select Category</option>
          {sortedCategories.map((category, index) => (
            <option key={index} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default ExpenseCategory;
