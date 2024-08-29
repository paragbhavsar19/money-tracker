import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import TitleBar from "../Components/TitleBar";
import { DateRangePicker } from "rsuite";
import { SearchIcon } from "../../images";
import { Dropdown, TabItem } from "flowbite-react";
import PillsTab from "../Components/PillsTab";
import AllTransaction from "./TransacationTabs.js/AllTransaction";
import IncomeTransaction from "./TransacationTabs.js/IncomeTransaction";
import ExpenseTransaction from "./TransacationTabs.js/ExpenseTransaction";
import { selectAllTransactions } from "../../store/expenseSlice";

const Transaction = () => {
  const [searchText, setSearchText] = useState("");
  const [dateRange, setDateRange] = useState(null);
  const transactions = useSelector(selectAllTransactions);

  const filteredTransactions = transactions.filter((transaction) =>
    transaction.subject.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <>
      <div id="titlebar">
        <TitleBar title="Transaction"></TitleBar>
      </div>
      

      <PillsTab
        navclasses="sm:absolute top-3.5 z-0 my-3 w-full sm:my-0 dynamic"
        tabclasses="min-w-0 sm:min-w-[94px] sm:flex-1"
      >
        <TabItem title="All" className="max-h-fit sm:overflow-hidden">
          <AllTransaction transactions={filteredTransactions} />
        </TabItem>
        <TabItem title="Income" className="">
          <IncomeTransaction
            transactions={filteredTransactions.filter(
              (t) => t.type === "Income"
            )}
          />
        </TabItem>
        <TabItem title="Expense" className="">
          <ExpenseTransaction
            transactions={filteredTransactions.filter(
              (t) => t.type === "Expense"
            )}
          />
        </TabItem>
      </PillsTab>
    </>
  );
};

export default Transaction;
