import React, { useEffect, useState } from "react";

const TransactionCell = (props) => {
  console.log(props, "props");
  return (
    <>
      <div
        className={`flex px-3 py-1.5 text-sm my-3.5 justify-between bg-gray-100 bg-opacity-55  ${
          props.payload.type === "expense"
            ? "border-r-4 border-red-600"
            : "border-r-4 border-green-600"
        }`}
      >
        <span className="text-base font-normal">{props.payload.desc}</span>
        <span className="text-base font-normal">${props.payload.amount}</span>
      </div>
    </>
  );
};

const Transcation = (props) => {
  const [searchText, setSearchText] = useState("");
  const [filteredTxn, updateTxn] = useState(props.transactions);

  const filteredData = (searchText) => {
    if (!searchText || !searchText.trim().length) {
      updateTxn(props.transactions);
      return;
    }
    let txn = [...props.transactions];
    txn = txn.filter((payload) =>
      payload.desc.toLowerCase().includes(searchText.toLowerCase().trim())
    );
    updateTxn(txn);
  };

  useEffect(() => {
    filteredData(searchText);
  }, [props.transactions]);

  return (
    <div className="my-5">
      <div>
        <input
          placeholder="Search"
          className="w-full border border-gray-300 h-9 rounded-md px-2 bg-gray-200 mb-3 "
          type="text"
          value={searchText}
          onChange={(e) => {
            setSearchText(e.target.value);
            filteredData(e.target.value);
          }}
        />
        {filteredTxn?.length
          ? filteredTxn.map((payload) => <TransactionCell payload={payload} />)
          : ""}
      </div>
    </div>
  );
};

export default Transcation;
