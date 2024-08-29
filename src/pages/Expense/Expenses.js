import React, { useRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import {
  Checkbox,
  Dropdown,
  IconButton,
  Pagination,
  Popover,
  Table,
  Whisper,
  DateRangePicker,
  SelectPicker,
} from "rsuite";

import { MeatballsIcon, PrintIcon, SearchIcon, TrashIcon } from "../../images";
import ExpenseModal from "../../Modal/ExpenseModal";
import { updateExpense, deleteExpense } from "../../store/expenseSlice";
import TitleBar from "../Components/TitleBar";
import categorydata from "../../mock.json";
import PrintData from "../Components/PrintData";

const { Column, HeaderCell, Cell } = Table;

// Prepare data for SelectPicker
const categoryOptions = categorydata.categories.map((item) => ({
  label: item,
  value: item,
}));

const Expenses = () => {
  const expensesList = useSelector((state) => state.expense.expensesList);

  console.log(expensesList, "expensesList");

  const [checkedKeys, setCheckedKeys] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState(null);
  const [showTrashIcon, setShowTrashIcon] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [sortColumn, setSortColumn] = useState();
  const [sortType, setSortType] = useState();
  const [loading, setLoading] = useState(false);
  const [limit, setLimit] = useState(30);
  const [page, setPage] = useState(1);
  const [tableHeight, setTableHeight] = useState(0);
  const [dateRange, setDateRange] = useState(null);
  const [categoryFilter, setCategoryFilter] = useState(null);

  const ref = useRef();
  const dispatch = useDispatch();

  useEffect(() => {
    setShowTrashIcon(checkedKeys.length > 0);
  }, [checkedKeys]);

  useEffect(() => {
    const titleBarHeight = document.getElementById("titlebar").offsetHeight;
    const filterBarHeight = document.getElementById("filterbar").offsetHeight;
    const pageFooterHeight = document.getElementById("pagefooter").offsetHeight;
    const windowHeight = window.innerHeight;

    const totalHeight =
      windowHeight - titleBarHeight - filterBarHeight - pageFooterHeight;

    setTableHeight(totalHeight);
  }, []);

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

  const handleUpdateExpense = (updatedExpense) => {
    dispatch(updateExpense(updatedExpense));
    setOpen(false);
  };

  // Filter and sort the expenses list
  const filteredData = expensesList.filter((expense) => {
    const expenseDate = new Date(expense.date);

    // Checking if a date range is selected and whether the expense date falls within the selected range
    const isWithinDateRange = dateRange
      ? expenseDate >= new Date(dateRange[0].setHours(0, 0, 0, 0)) &&
        expenseDate <= new Date(dateRange[1].setHours(23, 59, 59, 999))
      : true;

    const matchesSearchText =
      expense.subject.toLowerCase().includes(searchText.toLowerCase()) ||
      expense.merchant.toLowerCase().includes(searchText.toLowerCase()) ||
      expense.date.includes(searchText) ||
      expense.category.toLowerCase().includes(searchText.toLowerCase()) ||
      expense.amount.toString().includes(searchText);

    const matchesCategory = categoryFilter
      ? expense.category === categoryFilter
      : true;

    return isWithinDateRange && matchesSearchText && matchesCategory;
  });

  if (sortColumn && sortType) {
    filteredData.sort((a, b) => {
      let x = a[sortColumn];
      let y = b[sortColumn];

      if (sortColumn === "date") {
        x = new Date(x);
        y = new Date(y);
      } else {
        if (typeof x === "string") {
          x = x.charCodeAt();
        }
        if (typeof y === "string") {
          y = y.charCodeAt();
        }
      }

      return sortType === "asc" ? x - y : y - x;
    });
  }

  const startIndex = (page - 1) * limit;
  const paginatedData = filteredData.slice(startIndex, startIndex + limit);

  const handleDeleteSelected = () => {
    checkedKeys.forEach((id) => {
      dispatch(deleteExpense(id));
    });
    setCheckedKeys([]); 
  };

  let checked = false;
  let indeterminate = false;



  const handleCheckAll = (value, checked) => {
    const keys = checked ? filteredData.map((item) => item.id) : [];
    setCheckedKeys(keys);
  };

  const handleCheck = (value, checked) => {
    const keys = checked
      ? [...checkedKeys, value]
      : checkedKeys.filter((item) => item !== value);
    setCheckedKeys(keys);
    setShowTrashIcon(keys.length > 1);
  };

  

  const CheckCell = ({ rowData, onChange, checkedKeys, dataKey, ...props }) => (
    <Cell {...props} style={{ padding: 0 }}>
      <div style={{ lineHeight: "46px" }}>
        <Checkbox
          value={rowData[dataKey]}
          inline
          onChange={onChange}
          checked={checkedKeys.some((item) => item === rowData[dataKey])}
          className="mx-auto"
        />
      </div>
    </Cell>
  );

  if (checkedKeys.length === filteredData.length) {
    checked = true;
  } else if (checkedKeys.length === 0) {
    checked = false;
  } else if (
    checkedKeys.length > 0 &&
    checkedKeys.length < filteredData.length
  ) {
    indeterminate = true;
  }

  const renderMenu = ({ onClose, right, top, className }, ref) => {
    const handleSelect = (eventKey) => {
      onClose();
      if (eventKey === 1 && selectedExpense !== null) {
        setOpen(true);
      } else if (eventKey === 2) {
        dispatch(deleteExpense(selectedExpense.id));
      }
    };
    return (
      <Popover
        ref={ref}
        className={className}
        style={{ right, top }}
        full
        arrow={false}
      >
        <Dropdown.Menu onSelect={handleSelect}>
          <Dropdown.Item eventKey={1}>Edit Expense</Dropdown.Item>
          <Dropdown.Item eventKey={2}>
            <span className="text-[#FF4545]">Delete Expense</span>
          </Dropdown.Item>
        </Dropdown.Menu>
      </Popover>
    );
  };

  const ActionCell = ({ ...props }) => (
    <Cell {...props} className="link-group">
      <Whisper
        placement="auto"
        trigger="click"
        speaker={renderMenu}
        controlId="control-id-with-dropdown"
        ref={ref}
      >
        <IconButton
          appearance="subtle"
          icon={<MeatballsIcon />}
          onClick={() => setSelectedExpense(props.rowData)}
        />
      </Whisper>
    </Cell>
  );

  const totalExpense = filteredData.reduce(
    (total, item) => total + item.amount,
    0
  );

  const printRef = useRef();

  const handlePrint = () => {
    if (printRef.current) {
      printRef.current.generatePDF();
    }
    console.log("printclick");
  };

  return (
    <>
      <div id="titlebar">
        <TitleBar title="Expenses">
          <Link
            to="/addexpense"
            className="bg-blue-700 py-2 text-sm px-4 text-white rounded-md font-medium hover:text-white hover:no-underline"
          >
            + New Expense
          </Link>
        </TitleBar>
      </div>
      <div>
        <div
          className="h-14 border-b flex items-center px-6 justify-between"
          id="filterbar"
        >
          <div className="flex space-x-3">
            <div>
              <DateRangePicker
                character=" - "
                onChange={setDateRange}
                placeholder="Select Date"
                size="md"
                className="date-range-picker"
                disabledDate={(date) => date > new Date()}
              />
            </div>
            {showTrashIcon && (
              <div
                className="w-9 h-9 flex items-center justify-center border rounded-md cursor-pointer trashicon"
                onClick={handleDeleteSelected}
              >
                <TrashIcon />
              </div>
            )}
          </div>
          <div className="flex space-x-4">
            <div className="border border-gray-200 rounded-md overflow-hidden relative">
              <div className="absolute top-2 left-2">
                <SearchIcon />
              </div>
              <input
                type="text"
                className="w-80 h-9 placeholder-animation focus:ring-0 focus:outline-none border-0 focus:border-0 px-9 pt-2.5 placeholder:text-gray-500 text-base"
                placeholder="Search expenses..."
                value={searchText}
                onChange={(e) => {
                  setSearchText(e.target.value);
                  setPage(1); // Reset page when search text changes
                }}
              />
            </div>
            <div>
              <SelectPicker
                data={categoryOptions}
                searchable={true}
                style={{ width: 224 }}
                placeholder="Select Category"
                onChange={(value) => {
                  setCategoryFilter(value);
                  setPage(1); // Reset page when category changes
                }}
              />
            </div>
            <div
              className="w-9 h-9 flex items-center justify-center border rounded-md cursor-pointer Printicon"
              onClick={handlePrint}
            >
              <PrintIcon />
            </div>
          </div>
        </div>

        <Table
          ref={ref}
          height={tableHeight}
          data={paginatedData}
          headerHeight={46}
          sortColumn={sortColumn}
          sortType={sortType}
          onSortColumn={handleSortColumn}
        >
          <Column width={70} align="center" fixed>
            <HeaderCell>
              <Checkbox
                inline
                checked={checked}
                indeterminate={indeterminate}
                onChange={handleCheckAll}
                className="mx-auto"
              />
            </HeaderCell>
            <CheckCell
              dataKey="id"
              checkedKeys={checkedKeys}
              onChange={handleCheck}
            />
          </Column>

          <Column flexGrow={1}>
            <HeaderCell>Id</HeaderCell>
            <Cell dataKey="id" />
          </Column>

          <Column flexGrow={1}>
            <HeaderCell>Subject</HeaderCell>
            <Cell dataKey="subject" />
          </Column>

          <Column flexGrow={1}>
            <HeaderCell>Merchant</HeaderCell>
            <Cell dataKey="merchant" />
          </Column>

          <Column flexGrow={1} sortable>
            <HeaderCell>Date</HeaderCell>
            <Cell dataKey="date"></Cell>
          </Column>

          <Column flexGrow={1} sortable>
            <HeaderCell>Category</HeaderCell>
            <Cell dataKey="category" />
          </Column>

          <Column flexGrow={1} sortable>
            <HeaderCell>Amount</HeaderCell>
            <Cell dataKey="amount" />
          </Column>

          <Column width={120} fixed="right">
            <HeaderCell>Action</HeaderCell>
            <ActionCell dataKey="id" />
          </Column>
        </Table>
      </div>

      <div
        className="h-16 bg-gray-100 absolute bottom-0 left-0 w-full flex justify-between items-center px-4"
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
          Total Expense:
          <span className="ml-1.5 bg-red-600 text-white py-1.5 px-4 text-lg rounded-md">
            {totalExpense.toFixed(2)}
          </span>
        </div>
      </div>

      <ExpenseModal
        open={open}
        onClose={() => setOpen(false)}
        expense={selectedExpense}
        onUpdate={handleUpdateExpense}
      />
    </>
  );
};

export default Expenses;
