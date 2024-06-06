import React, { useState, useEffect } from 'react';
import { IoClose } from 'react-icons/io5';

const Modal = ({ isOpen, onClose, employee, worksheets, onPay }) => {
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [availableMonths, setAvailableMonths] = useState([]);

  useEffect(() => {
    if (isOpen && worksheets.length > 0) {
      // Initial set up for year and month when worksheets are available
      const years = worksheets.map(ws => new Date(ws.date).getFullYear());
      setSelectedYear(Math.max(...years));
    }
  }, [isOpen, worksheets]);

  useEffect(() => {
    const monthsInYear = worksheets
      .filter(ws => new Date(ws.date).getFullYear() === selectedYear)
      .map(ws => new Date(ws.date).getMonth() + 1);
    const uniqueMonths = [...new Set(monthsInYear)].sort((a, b) => a - b);
    setAvailableMonths(uniqueMonths);
    setSelectedMonth(uniqueMonths[0] || new Date().getMonth() + 1);
  }, [selectedYear, worksheets]);

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-8 rounded-lg shadow-lg z-50">
      <div className="flex justify-end">
        <IoClose className="text-gray-500 text-xl  cursor-pointer" onClick={onClose} />
      </div>
      <h2 className="text-xl font-semibold mb-4">Worksheets for {employee?.name}</h2>
      <p className="mb-4">Salary: ${employee?.salary}</p>
      <div className="mb-4">
        <label className="block mb-1">Year:</label>
        <select className="border rounded-lg py-1 px-2 w-full" value={selectedYear} onChange={e => setSelectedYear(Number(e.target.value))}>
          {[...new Set(worksheets.map(ws => new Date(ws.date).getFullYear()))].sort().map(year => (
            <option key={year} value={year}>{year}</option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <label className="block mb-1">Month:</label>
        <select className="border rounded-lg py-1 px-2 w-full" value={selectedMonth} onChange={e => setSelectedMonth(Number(e.target.value))}>
          {availableMonths.map(month => (
            <option key={month} value={month}>{month}</option>
          ))}
        </select>
      </div>
      <button className="bg-green-500 text-white py-2 px-4 rounded-lg" onClick={() => onPay()}>Pay {employee?.name}</button>
    </div>
  );
};

export default Modal;
