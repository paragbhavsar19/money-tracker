import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  Checkbox,
  DateRangePicker,
  Dropdown,
  IconButton,
  Pagination,
  Popover,
  SelectPicker,
  Table,
  Whisper,
} from "rsuite";
import { MeatballsIcon, PrintIcon, SearchIcon, TrashIcon } from "../../images";

import IncomeModal from "../../Modal/IncomeModal";
import { deleteIncome, updateIncome } from "../../store/expenseSlice";

import TitleBar from "../Components/TitleBar";
import incomeCategories from "../../mock.json";

const { Column, HeaderCell, Cell } = Table;

// Prepare data for SelectPicker
const categoryOptions = incomeCategories.incomeCategories.map((item) => ({
  label: item,
  value: item,
}));

const Income = () => {
  const incomeList = useSelector((state) => state.expense.incomeList);

  const [open, setOpen] = useState(false);
  const [selectedIncome, setSelectedIncome] = useState(null);
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

  const [checkedKeys, setCheckedKeys] = useState([]);
  let checked = false;
  let indeterminate = false;

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

  const handleUpdateIncome = (updatedIncome) => {
    dispatch(updateIncome(updatedIncome));
    setOpen(false);
  };

  // Filter and sort the Incomes list
  const filteredData = incomeList.filter((income) => {
    const incomeDate = new Date(income.date);
    const isWithinDateRange = dateRange
      ? incomeDate >= dateRange[0] && incomeDate <= dateRange[1]
      : true;
    const matchesSearchText =
      income.subject.toLowerCase().includes(searchText.toLowerCase()) ||
      income.category.toLowerCase().includes(searchText.toLowerCase()) ||
      income.date.includes(searchText) ||
      income.note.toLowerCase().includes(searchText.toLowerCase()) ||
      income.amount.toString().includes(searchText);
    const matchesCategory = categoryFilter
      ? income.category === categoryFilter
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
      dispatch(deleteIncome(id));
    });
    setCheckedKeys([]); // Clear selected items after deletion
  };

  const renderMenu = ({ onClose, right, top, className }, ref) => {
    const handleSelect = (eventKey) => {
      onClose();
      if (eventKey === 1 && selectedIncome !== null) {
        setOpen(true);
      } else if (eventKey === 2) {
        dispatch(deleteIncome(selectedIncome.id));
        console.log("Delete Income");
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
          <Dropdown.Item eventKey={1}>Edit Income</Dropdown.Item>
          <Dropdown.Item eventKey={2}>
            <span className="text-[#FF4545]">Delete Income</span>
          </Dropdown.Item>
        </Dropdown.Menu>
      </Popover>
    );
  };

  const ActionCell = ({ ...props }) => {
    return (
      <Cell {...props} className="link-group">
        <Whisper
          placement="auto"
          trigger="click" // Ensures single click
          speaker={renderMenu}
          controlId="control-id-with-dropdown"
          ref={ref}
        >
          <IconButton
            appearance="subtle"
            icon={<MeatballsIcon />}
            onClick={() => setSelectedIncome(props.rowData)} // Sets the selected income
          />
        </Whisper>
      </Cell>
    );
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

  const handleCheckAll = (value, checked) => {
    const keys = checked ? filteredData.map((item) => item.id) : [];
    setCheckedKeys(keys);
  };

  const handleCheck = (value, checked) => {
    const keys = checked
      ? [...checkedKeys, value]
      : checkedKeys.filter((item) => item !== value);
    setCheckedKeys(keys);
  };

  const totalIncome = filteredData.reduce(
    (total, item) => total + item.amount,
    0
  );

  return (
    <>
      <div id="titlebar">
        <TitleBar title="Income">
          <Link
            to="/addincome"
            className="bg-blue-700 py-2 text-sm px-4 text-white rounded-md font-medium hover:text-white hover:no-underline"
          >
            + Add Income
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
                className="w-80 h-9 placeholder-animation focus:ring-0 focus:outline-none border-0 focus:border-0 px-9 pt-2 placeholder:text-gray-500 text-base"
                placeholder="Search Incomes..."
                value={searchText}
                onChange={(e) => {
                  setSearchText(e.target.value);
                  setPage(1);
                }}
              />
            </div>
            <div>
              <SelectPicker
                data={categoryOptions}
                searchable={true}
                style={{ width: 224 }}
                placeholder="Select Income Type"
                onChange={(value) => {
                  setCategoryFilter(value);
                  setPage(1);
                }}
              />
            </div>
            <div className="w-9 h-9 flex items-center justify-center border rounded-md cursor-pointer Printicon">
              <PrintIcon />
            </div>
          </div>
        </div>

        <Table
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

          <Column flexGrow={1} sortable>
            <HeaderCell>Income Type</HeaderCell>
            <Cell dataKey="category" />
          </Column>

          <Column flexGrow={1} sortable>
            <HeaderCell>Date</HeaderCell>
            <Cell dataKey="date" />
          </Column>

          <Column flexGrow={1} fullText>
            <HeaderCell>Note</HeaderCell>
            <Cell dataKey="note" />
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
          <span className="ml-1.5 bg-green-600 text-white py-1.5 px-4 text-lg rounded-md total-income">
            {totalIncome.toFixed(2)}
          </span>
        </div>
      </div>

      <IncomeModal
        open={open}
        onClose={() => setOpen(false)}
        income={selectedIncome}
        onUpdate={handleUpdateIncome}
      />
    </>
  );
};

export default Income;
