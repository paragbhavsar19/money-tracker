import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { useSelector } from "react-redux";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const IncomeExpenseChart = ({ viewType }) => {
  const { incomeList, expensesList } = useSelector((state) => state.expense);

  const [monthlyIncomeData, setMonthlyIncomeData] = useState([]);
  const [monthlyExpenseData, setMonthlyExpenseData] = useState([]);
  const [yearlyIncomeData, setYearlyIncomeData] = useState([]);
  const [yearlyExpenseData, setYearlyExpenseData] = useState([]);
  const [years, setYears] = useState([]);

  useEffect(() => {
    const incomeByMonth = new Array(12).fill(0);
    const expensesByMonth = new Array(12).fill(0);
    const incomeByYear = {};
    const expensesByYear = {};

    incomeList.forEach((income) => {
      const month = new Date(income.date).getMonth();
      const year = new Date(income.date).getFullYear();
      incomeByMonth[month] += income.amount;

      if (!incomeByYear[year]) {
        incomeByYear[year] = 0;
      }
      incomeByYear[year] += income.amount;
    });

    expensesList.forEach((expense) => {
      const month = new Date(expense.date).getMonth();
      const year = new Date(expense.date).getFullYear();
      expensesByMonth[month] += expense.amount;

      if (!expensesByYear[year]) {
        expensesByYear[year] = 0;
      }
      expensesByYear[year] += expense.amount;
    });

    setMonthlyIncomeData(incomeByMonth);
    setMonthlyExpenseData(expensesByMonth);

    const incomeYears = Object.keys(incomeByYear);
    setYears(incomeYears);

    setYearlyIncomeData(Object.values(incomeByYear));
    setYearlyExpenseData(incomeYears.map((year) => expensesByYear[year] || 0));
  }, [incomeList, expensesList]);

  const monthlyData = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        label: "Income",
        data: monthlyIncomeData,
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
      {
        label: "Expenses",
        data: monthlyExpenseData,
        backgroundColor: "rgba(255, 99, 132, 0.6)",
      },
    ],
  };

  const yearlyData = {
    labels: years,
    datasets: [
      {
        label: "Income",
        data: yearlyIncomeData,
        backgroundColor: "rgba(54, 162, 235, 0.6)",
      },
      {
        label: "Expenses",
        data: yearlyExpenseData,
        backgroundColor: "rgba(255, 206, 86, 0.6)",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "Income vs Expenses" },
    },
  };

  return (
    <div>
      {viewType === "monthly" ? (
        <>
          <Bar data={monthlyData} options={options} />
        </>
      ) : (
        <>
          
          <Bar data={yearlyData} options={options} />
        </>
      )}
    </div>
  );
};

export default IncomeExpenseChart;
