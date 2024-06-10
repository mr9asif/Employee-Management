import React, { useState, useEffect } from 'react';
import { IoClose } from 'react-icons/io5';
import axios from 'axios'; // Assuming you're using axios for HTTP requests
import useSecurePublic from '../Hook/useSecurePublic';
import toast from 'react-hot-toast';

const Modal = ({ isOpen, onClose, employee, worksheets, onPay }) => {
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [availableMonths, setAvailableMonths] = useState([]);

  const [payments, setPayments] = useState([]);
  const axiosSecurePublic = useSecurePublic();

  useEffect(() => {
    if (isOpen && worksheets.length > 0) {
      const years = worksheets.map(ws => new Date(ws.date).getFullYear());
      const maxYear = Math.max(...years);
      setSelectedYear(maxYear);
    }
  }, [isOpen, worksheets]);

  useEffect(() => {
    const monthsInYear = worksheets
      .filter(ws => new Date(ws.date).getFullYear() === selectedYear)
      .map(ws => new Date(ws.date).getMonth() + 1);
    const uniqueMonths = [...new Set(monthsInYear)].sort((a, b) => a - b);
    setAvailableMonths(uniqueMonths);
    if (uniqueMonths.length > 0) {
      setSelectedMonth(uniqueMonths[0]);
    }
  }, [selectedYear, worksheets]);

  useEffect(() => {
    if (isOpen && employee) {
      fetchPayments();
    }
  }, [isOpen, employee, selectedYear, selectedMonth]);

  const fetchPayments = async () => {
    try {
      const response = await axiosSecurePublic.get('/payments', {
        params: {
          employeeId: employee.id,
          year: selectedYear,
          month: selectedMonth
        }
      });
      setPayments(response.data);
    } catch (error) {
      console.error('Error fetching payments:', error);
    }
  };

  const handlePay = async (bank_account) => {
    const existingPayment = payments.find(payment =>
      payment.bank_account === bank_account &&
      payment.year === selectedYear &&
      payment.month === selectedMonth
    );

    if (existingPayment) {
       toast.success('Payment for this month and year already exists for this bank account.')
      return;
    }

    const newPayment = {
      employeeId: employee.id,
      year: selectedYear,
      month: selectedMonth,
      salary: employee.salary,
      bank_account: bank_account,
      email:employee.email,
    };

    try {
      await axiosSecurePublic.post('/Postpayments', newPayment);
      onPay(newPayment);
      toast.success('Payment successful!')
      onClose();
    } catch (error) {
      console.error('Error making payment:', error);
      alert('Error making payment. Please try again.');
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-16 flex flex-col gap-3 rounded-lg shadow-lg z-50">
      <div className="flex justify-end">
        <IoClose className="text-gray-500 text-xl cursor-pointer" onClick={onClose} />
      </div>
      <h2 className="text-xl font-bold mb-4">Payment for {employee?.name}</h2>
      <p className="mb-4 font-bold">Salary: ${employee?.salary}</p>
      <p className="mb-4 font-bold">Bank account: {employee?.bank_account}</p>
      <div className="mb-4">
        <label className="block font-bold mb-1">Year:</label>
        <select className="border rounded-lg font-bold py-1 px-2 w-full" value={selectedYear} onChange={e => setSelectedYear(Number(e.target.value))}>
          {[...new Set(worksheets.map(ws => new Date(ws.date).getFullYear()))].map(year => (
            <option key={year} value={year}>{year}</option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <label className="block mb-1 font-bold">Month:</label>
        <select className="border rounded-lg py-1 px-2 font-bold w-full" value={selectedMonth} onChange={e => setSelectedMonth(Number(e.target.value))}>
          {availableMonths.map(month => (
            <option key={month} value={month}>{month}</option>
          ))}
        </select>
      </div>
      <button className="bg-green-500 text-white py-2 px-4 rounded-lg" onClick={() => handlePay(employee?.bank_account)}>Pay {employee?.name}</button>
    </div>
  );
};

export default Modal;
