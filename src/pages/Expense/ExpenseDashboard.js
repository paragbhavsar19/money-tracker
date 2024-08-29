import React, { useEffect, useState } from "react";
import TitleBar from "../Components/TitleBar";
import { useSelector } from "react-redux";
import { BsCurrencyDollar } from "react-icons/bs";
import formatAmount from "../../utils/formatAmount";
import { Link } from "react-router-dom";
import { Table, Toggle } from "rsuite";
import { selectAllTransactions } from "../../store/expenseSlice";
import IncomeExpenseChart from "./IncomeExpenseChart";
const { Column, HeaderCell, Cell } = Table;

const ExpenseDashboard = () => {
  const [viewType, setViewType] = useState("monthly");
  const [pageHeight, setPageHeight] = useState(0);
  console.log(pageHeight, "pageHeight");

  const { income, expense, balance, transaction, incomeList, expensesList } =
    useSelector((state) => state.expense);

  const recentIncomes = incomeList.slice(-5).reverse();
  const recentexpence = expensesList.slice(-5).reverse();
  const recentTransactions = useSelector(selectAllTransactions)
    .slice(-5)
    .reverse();

  useEffect(() => {
    const windowHeight = window.innerHeight;
    const totalHeight = windowHeight - 64;
    setPageHeight(totalHeight);
  }, []);

  return (
    <>
      <TitleBar title="Dashboard" id="titlebar">
        <div className="flex space-x-3">
          <Link
            className="bg-blue-700 py-2 text-sm px-4 text-white hover:text-white hover:no-underline rounded-md font-medium"
            to="/addincome"
          >
            Add Income
          </Link>
          <Link
            className="bg-blue-700 py-2 text-sm px-4 text-white hover:text-white hover:no-underline rounded-md font-medium"
            to="/addexpense"
          >
            Add Expense
          </Link>
        </div>
      </TitleBar>
      <div className="h-[calc(100%_-_64px)] overflow-auto">
        <div className="grid grid-cols-4 gap-5 px-6 mt-6">
          <div className="border border-gray-200 rounded-lg p-6">
            <div className="text-3xl font-medium flex items-baseline">
              {formatAmount(income)}
              <BsCurrencyDollar size={"15"} />
            </div>
            <div className="text-base mt-1 text-gray-600">Income</div>
          </div>

          <div className="border border-gray-200 rounded-lg p-6">
            <div className="text-3xl font-medium flex items-baseline">
              {formatAmount(expense)}
              <BsCurrencyDollar size={"15"} />
            </div>
            <div className="text-base mt-1 text-gray-600">Expense</div>
          </div>

          <div className="border border-gray-200 rounded-lg p-6">
            <div className="text-3xl font-medium flex items-baseline">
              {formatAmount(balance)}
              <BsCurrencyDollar size={"15"} />
            </div>
            <div className="text-base mt-1 text-gray-600">Balance</div>
          </div>

          <div className="border border-gray-200 rounded-lg p-6">
            <div className="text-3xl font-medium flex items-baseline">
              {formatAmount(transaction)}
              <BsCurrencyDollar size={"15"} />
            </div>
            <div className="text-base mt-1 text-gray-600">Transaction</div>
          </div>
        </div>
        <div className="px-6 mt-6">
          <h1 className="text-lg text-gray-800 font-medium">
            Recent Financial Activity
          </h1>
          <div className="grid grid-cols-3 gap-5 mt-3">
            {/* Recent Incomes Table */}
            <div className="border border-gray-200 shadow-sm rounded-lg px-5 py-2">
              <div className="text-base mt-1 mb-1 text-gray-600 border-b border-gray-300">
                Recent Incomes
              </div>
              <Table data={recentIncomes} headerHeight={38} height={270}>
                <Column flexGrow={1}>
                  <HeaderCell>Income Type</HeaderCell>
                  <Cell dataKey="category" />
                </Column>

                <Column flexGrow={1}>
                  <HeaderCell>Date</HeaderCell>
                  <Cell dataKey="date" />
                </Column>

                <Column>
                  <HeaderCell>Amount</HeaderCell>
                  <Cell dataKey="amount" />
                </Column>
              </Table>
            </div>
            {/* Recent Expenses Table */}
            <div className="border border-gray-200 shadow-sm rounded-lg px-5 py-2">
              <div className="text-base mt-1 mb-1 text-gray-600 border-b border-gray-300">
                Recent Expenses
              </div>
              <Table data={recentexpence} headerHeight={38} height={270}>
                <Column flexGrow={1}>
                  <HeaderCell>Category</HeaderCell>
                  <Cell dataKey="category" />
                </Column>

                <Column flexGrow={1}>
                  <HeaderCell>Date</HeaderCell>
                  <Cell dataKey="date" />
                </Column>

                <Column>
                  <HeaderCell>Amount</HeaderCell>
                  <Cell dataKey="amount" />
                </Column>
              </Table>
            </div>
            {/* Recent Transactions Table */}
            <div className="border border-gray-200 shadow-sm rounded-lg px-5 py-2">
              <div className="text-base mt-1 mb-1 text-gray-600 border-b border-gray-300">
                Recent Transactions
              </div>
              <Table data={recentTransactions} headerHeight={38} height={270}>
                <Column flexGrow={1}>
                  <HeaderCell>Type</HeaderCell>
                  <Cell>
                    {(rowData) => (
                      <p
                        className={`text-xs w-24 py-1 -mt-0.5 text-center bg-gray-100 border border-gray-200 rounded-md ${
                          rowData.type === "Income"
                            ? "text-[#15ad86]"
                            : "text-[#f41717]"
                        }`}
                      >
                        {rowData.type === "Income" ? "Income" : "Expense"}
                      </p>
                    )}
                  </Cell>
                </Column>

                <Column flexGrow={1}>
                  <HeaderCell>Category</HeaderCell>
                  <Cell dataKey="category" />
                </Column>

                <Column flexGrow={1}>
                  <HeaderCell>Date</HeaderCell>
                  <Cell dataKey="date" />
                </Column>

                <Column>
                  <HeaderCell>Amount</HeaderCell>
                  <Cell dataKey="amount" />
                </Column>
              </Table>
            </div>
          </div>
        </div>
        <div className="px-6 mt-6 pb-20">
          <h1 className="text-lg text-gray-800 font-medium">
            Financial Summary
          </h1>
          <div className="grid grid-cols-2 gap-5 mt-3">
            <div className="border border-gray-200 shadow-sm rounded-lg px-5 py-2">
              <div className="flex items-center justify-between border-b border-gray-300">
                <div className="text-base mt-1 mb-1 text-gray-600 ">
                  Income vs. Expenses
                </div>
                <div>
                  <Toggle
                    size="md"
                    checked={viewType === "yearly"}
                    onChange={(checked) =>
                      setViewType(checked ? "yearly" : "monthly")
                    }
                  >
                    {viewType === "yearly" ? "Yearly" : "Monthly"}
                  </Toggle>
                </div>
              </div>
              <IncomeExpenseChart viewType={viewType} />
            </div>
            <div className="border border-gray-200 shadow-sm rounded-lg px-5 py-2">
              <div className="text-base mt-1 mb-1 text-gray-600 border-b border-gray-300">
                Expense Breakdown
              </div>
              <div>chart</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ExpenseDashboard;
