// PrintData.js

import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const PrintData = ({ printData }) => {
    console.log(printData, "Prindata")
  const generatePDF = () => {
    const input = document.getElementById('print-table');
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      pdf.addImage(imgData, 'PNG', 0, 0);
      pdf.save('expenses.pdf');
    });
  };

  return (
    <>
      <button onClick={generatePDF} className="">Download PDF</button>
      <table id="print-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Subject</th>
            <th>Merchant</th>
            <th>Date</th>
            <th>Category</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {printData.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.subject}</td>
              <td>{item.merchant}</td>
              <td>{item.date}</td>
              <td>{item.category}</td>
              <td>{item.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default PrintData;
