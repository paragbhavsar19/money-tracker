import React, { useEffect, useState } from "react";
import { Checkbox, DateRangePicker, Pagination, Table } from "rsuite";
import { PrintIcon, SearchIcon } from "../../../images";

const CheckCell = ({ rowData, onChange, checkedKeys, dataKey, ...props }) => (
  <Cell {...props} style={{ padding: 0 }}>
    <div style={{ lineHeight: "46px" }}>
      <Checkbox
        value={rowData[dataKey]}
        inline
        onChange={onChange}
        checked={checkedKeys.some((item) => item === rowData[dataKey])}
      />
    </div>
  </Cell>
);

const { Column, HeaderCell, Cell } = Table;

const ExpenseTransaction = ({ transactions }) => {
  const [data, setData] = useState(transactions);
  const [filteredData, setFilteredData] = useState(transactions);
  const [searchText, setSearchText] = useState("");
  const [dateRange, setDateRange] = useState(null);
  const [tableHeight, setTableHeight] = useState(0);


  const [sortColumn, setSortColumn] = useState();
  const [sortType, setSortType] = useState();
  const [loading, setLoading] = useState(false);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  useEffect(() => {
    const windowHeight = window.innerHeight;
    const totalHeight = windowHeight - 184;
    setTableHeight(totalHeight);
  }, []);


  useEffect(() => {
    let filterData = transactions.filter((transaction) =>
      transaction.subject.toLowerCase().includes(searchText.toLowerCase())
    );

    if (dateRange && dateRange[0] && dateRange[1]) {
      const [startDate, endDate] = dateRange;
      filterData = filterData.filter((transaction) => {
        const transactionDate = parseDate(transaction.date);
        return transactionDate >= startDate && transactionDate <= endDate;
      });
    }

    setFilteredData(filterData);
  }, [searchText, transactions, dateRange]);

  const parseDate = (dateString) => new Date(dateString);

  const getData = (Paginationdata) => {
    if (sortColumn && sortType) {
      return Paginationdata.sort((a, b) => {
        let x = a[sortColumn];
        let y = b[sortColumn];
        if (sortColumn === "date") {
          x = parseDate(x);
          y = parseDate(y);
        }
        if (sortType === "asc") {
          return x < y ? -1 : x > y ? 1 : 0;
        } else {
          return x > y ? -1 : x < y ? 1 : 0;
        }
      });
    }
    return Paginationdata;
  };

  const handleSortColumn = (sortColumn, sortType) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSortColumn(sortColumn);
      setSortType(sortType);
    }, 500);
  };

  const handleChangeLimit = (dataKey) => {
    setPage(1);
    setLimit(dataKey);
  };

  const Paginationdata = filteredData.filter((v, i) => {
    const start = limit * (page - 1);
    const end = start + limit;
    return i >= start && i < end;
  });


  const [checkedKeys, setCheckedKeys] = React.useState([]);
  let checked = false;
  let indeterminate = false;

  if (checkedKeys.length === data.length) {
    checked = true;
  } else if (checkedKeys.length === 0) {
    checked = false;
  } else if (checkedKeys.length > 0 && checkedKeys.length < data.length) {
    indeterminate = true;
  }

  const handleCheckAll = (value, checked) => {
    const keys = checked ? data.map((item) => item.id) : [];
    setCheckedKeys(keys);
  };
  const handleCheck = (value, checked) => {
    const keys = checked
      ? [...checkedKeys, value]
      : checkedKeys.filter((item) => item !== value);
    setCheckedKeys(keys);
  };

  const totalIncome = data.reduce((total, item) => total + item.amount, 0);
  return (
    <div>
      <div>
        <div
          className="h-14 border-b flex items-center px-6 justify-between"
          id="filterbar"
        >
          <div className="flex space-x-4">
            <div>
              <DateRangePicker
                character=" - "
                onChange={(range) => setDateRange(range)}
                placeholder="Select Date"
                size="md"
                className="date-range-picker"
              />
            </div>
          </div>
          <div className="flex space-x-3">
            <div className="border border-gray-200 rounded-md overflow-hidden relative">
              <div className="absolute top-2 left-2">
                <SearchIcon />
              </div>
              <input
                type="text"
                className="w-80 h-9 placeholder-animation focus:ring-0 border-0 focus:border-0 focus:outline-none px-9 pt-[8px] placeholder:text-gray-500 text-base"
                placeholder="Search transactions..."
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
            </div>
            <div className="w-9 h-9 flex items-center justify-center border rounded-md cursor-pointer Printicon">
              <PrintIcon />
            </div>
          </div>
        </div>
      </div>
      <Table
        height={tableHeight}
        id="table"
        data={getData(Paginationdata)}
        sortColumn={sortColumn}
        sortType={sortType}
        onSortColumn={handleSortColumn}
        loading={loading}
      >
        <Column width={50} align="center">
          <HeaderCell>
            <Checkbox
              inline
              checked={checked}
              indeterminate={indeterminate}
              onChange={handleCheckAll}
            />
          </HeaderCell>
          <CheckCell
            dataKey="id"
            checkedKeys={checkedKeys}
            onChange={handleCheck}
          />
        </Column>
        <Column width={150}>
          <HeaderCell>ID</HeaderCell>
          <Cell dataKey="id" />
        </Column>

        <Column width={160} flexGrow={1}>
          <HeaderCell>Subject</HeaderCell>
          <Cell dataKey="subject" />
        </Column>

        <Column width={160} flexGrow={1}>
          <HeaderCell>Date</HeaderCell>
          <Cell dataKey="date" />
        </Column>
        <Column width={160} flexGrow={1}>
          <HeaderCell>Amount</HeaderCell>
          <Cell dataKey="amount" />
        </Column>

        <Column width={200}>
          <HeaderCell>Type</HeaderCell>
          <Cell>
            {(rowData) => (
              <p
                className={` text-xs w-24 py-1 -mt-0.5 text-center bg-gray-100 border border-gray-200 rounded-md ${
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
      </Table>

      <div
        className="h-16 border-t absolute bottom-0 left-0 w-full flex justify-between items-center px-4"
        id="pagefooter"
      >
        <div></div>
        <div>
          <Pagination
            prev
            next
            first
            last
            ellipsis
            boundaryLinks
            maxButtons={5}
            size="xs"
            layout={["total", "-", "limit", "|", "pager", "skip"]}
            total={filteredData.length}
            limitOptions={[10, 30, 50]}
            limit={limit}
            activePage={page}
            onChangePage={setPage}
            onChangeLimit={handleChangeLimit}
          />
        </div>
        <div className="text-black font-medium text-base">
          Total Income:{" "}
          <span className="ml-1.5 bg-red-600 text-white py-1.5 px-4 text-lg rounded-md total-income">
            {totalIncome.toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ExpenseTransaction;
