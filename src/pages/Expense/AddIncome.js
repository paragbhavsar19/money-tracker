import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { addIncome } from "../../store/expenseSlice";
import TitleBar from "../Components/TitleBar";
import Papa from "papaparse";
import { useDropzone } from "react-dropzone";
import { ImportFileIcon } from "../../images";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import the CSS for Toastify
import { DatePicker } from "rsuite"; // Import DatePicker from rsuite
import "rsuite/dist/rsuite.min.css"; // Import rsuite styles
import { v4 as uuidv4 } from "uuid";

const incomeTypes = [
  "Salary",
  "Bank",
  "Cashback",
  "Family",
  "Stock Market",
  "Others",
];

const AddIncome = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [subject, setSubject] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState(null); // Use null as initial value
  const [category, setCategory] = useState("");
  const [note, setNote] = useState("");
  const [errors, setErrors] = useState({});
  const [file, setFile] = useState(null);
  const [csvData, setCsvData] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!subject) newErrors.subject = "Subject is required";
    if (!amount) newErrors.amount = "Amount is required";
    if (!date) newErrors.date = "Date is required";
    if (!category) newErrors.category = "Category is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const newIncome = {
      id: uuidv4(),
      subject,
      amount: parseFloat(amount),
      date: date ? date.toISOString().split("T")[0] : "",
      category,
      note,
    };

    dispatch(addIncome(newIncome));
    toast.success("One Income saved successfully");

    setTimeout(() => {
      navigate("/income");
    }, 2000); // 2 seconds delay
  };

  const handleDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    setFile(file);
    parseCSV(file);
  };

  const parseCSV = (file) => {
    Papa.parse(file, {
      header: true,
      complete: (results) => {
        setCsvData(results.data);
      },
      error: (error) => {
        console.error("Error parsing CSV:", error);
      },
    });
  };

  const handleSubmitCSV = () => {
    if (csvData.length > 0) {
      csvData.forEach((data) => {
        if (data.id && data.id !== "") {
          const newIncome = {
            id: uuidv4(),
            subject: data.subject || "",
            amount: parseFloat(data.amount) || 0,
            date: data.date || "",
            category: data.category || "",
            note: data.note || "",
          };
          dispatch(addIncome(newIncome));
        }
      });
      toast.success("CSV Data imported successfully");
      navigate("/income");
    } else {
      console.error("No CSV data to submit.");
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: handleDrop,
    accept: ".csv",
  });

  const downloadCsvFile = () => {
    const link = document.createElement("a");
    link.href =
      "https://demo.upperinc.com/wp-content/uploads/2024/08/incomes.csv";
    link.download = "incomes.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div>
      <TitleBar title="Add Income" backbutton={true} backlink={"/income"} />
      <div className="grid grid-cols-2 gap-4 px-6 h-[calc(100vh-64px)]">
        <div className="py-10">
          <form className="space-y-8" onSubmit={handleSubmit}>
            <div className="flex items-center relative">
              <label className="min-w-32 font-medium text-base">Subject</label>
              <input
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Enter subject"
                className="border border-gray-200 h-9 rounded-md px-2 min-w-96"
              />
              {errors.subject && (
                <span className="text-xs text-red-500 absolute left-32 top-10">
                  {errors.subject}
                </span>
              )}
            </div>
            <div className="flex items-center relative">
              <label className="min-w-32 font-medium text-base">Amount</label>
              <input
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Enter amount"
                className="border border-gray-200 h-9 rounded-md px-2 min-w-96"
                type="number"
              />
              {errors.amount && (
                <span className="text-xs text-red-500 absolute left-32 top-10">
                  {errors.amount}
                </span>
              )}
            </div>
            <div className="flex items-center relative">
              <label className="min-w-32 font-medium text-base">Date</label>
              <DatePicker
                value={date}
                size="md"
                onChange={setDate}
                placeholder="Select date"
                format="dd-MM-yyyy"
                className="min-w-96"
                disabledDate={(date) => date > new Date()}
              />
              {errors.date && (
                <span className="text-xs text-red-500 absolute left-32 top-10">
                  {errors.date}
                </span>
              )}
            </div>
            <div className="flex items-center relative">
              <label className="min-w-32 font-medium text-base">
                Income Type
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="border border-gray-200 py-1.5 px-2 min-w-96 rounded-md"
              >
                <option value="">Select Type</option>
                {incomeTypes.sort().map((cat, index) => (
                  <option key={index} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
              {errors.category && (
                <span className="text-xs text-red-500 absolute left-32 top-10">
                  {errors.category}
                </span>
              )}
            </div>
            <div className="flex items-start relative">
              <label className="min-w-32 font-medium text-base">Note</label>
              <textarea
                value={note}
                rows="3"
                onChange={(e) => setNote(e.target.value)}
                placeholder="Enter note"
                className="border border-gray-200 rounded-md px-2 min-w-96 py-2"
              />
            </div>
            <div className="flex space-x-4 pt-8">
              <Link
                to="/income"
                className="w-24 text-base bg-red-500 text-white py-1.5 rounded-md text-center font-medium hover:text-white hover:no-underline"
              >
                Back
              </Link>
              <button
                type="submit"
                className="w-24 text-base bg-green-600 text-white py-1.5 rounded-md font-medium"
              >
                Save
              </button>
            </div>
          </form>
        </div>
        <div className="pl-16 py-10 border-l">
          <p className="font-medium text-base pb-3">
            Add Your Income File here
          </p>
          <div
            {...getRootProps({ className: "dropzone" })}
            className="border-dashed border-2 p-4 h-36 text-center cursor-pointer flex justify-center items-center"
          >
            <input {...getInputProps()} />
            <div className="block ">
              <p className="inline-block">
                <ImportFileIcon />
              </p>
              <p className="">
                Drag 'n' drop a CSV file here, or click to select one
              </p>
            </div>
          </div>
          <p className="pt-3">
            File Name: {file ? file.name : "No file selected"}
          </p>

          <button
            onClick={handleSubmitCSV}
            className="mt-4 w-full bg-[#388ad6] text-white py-1.5 rounded-md font-medium"
            disabled={!file}
          >
            Import CSV File
          </button>
          <p className="mt-6 text-sm">
            Don't have a CSV file?{" "}
            <button
              onClick={downloadCsvFile}
              className="text-blue-500 hover:underline cursor-pointer"
            >
              Download a sample file
            </button>
          </p>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default AddIncome;
