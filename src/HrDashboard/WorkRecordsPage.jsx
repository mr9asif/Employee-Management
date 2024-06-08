import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Assuming you're using axios for HTTP requests
import useSecurePublic from '../Hook/useSecurePublic';

const WorkRecordsPage = () => {
  const [workRecords, setWorkRecords] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('');
  const axiosSecurePublic=useSecurePublic()

  useEffect(() => {
    // Fetch work records data
    fetchWorkRecords();
    
    // Fetch employee names for dropdown
    fetchEmployeeNames();
  }, []);

  const fetchWorkRecords = async () => {
    try {
      const response = await axiosSecurePublic.get('/work-records');
      console.log(response.data) // Replace with your API endpoint
      setWorkRecords(response.data);
    } catch (error) {
      console.error('Error fetching work records:', error);
    }
  };

  const fetchEmployeeNames = async () => {
    try {
      const response = await axios.get('/employees'); // Replace with your API endpoint
      setEmployees(response.data);
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  };

  const filteredWorkRecords = workRecords.filter(record => {
    console.log(workRecords);

    // Filter by selected employee name
    if (selectedEmployee && record.employee !== selectedEmployee) {
      return false;
    }
    // Filter by selected month
    if (selectedMonth && record.month !== selectedMonth) {
      return false;
    }
    return true;
  });

  return (
    <div>
      <h1>Work Records</h1>
      <div>
        <label>Select Employee: </label>
        <select value={selectedEmployee} onChange={e => setSelectedEmployee(e.target.value)}>
          <option value="">All</option>
          {employees.map(employee => (
            <option key={employee.id} value={employee.name}>{employee.name}</option>
          ))}
        </select>
      </div>
      <div>
        <label>Select Month: </label>
        <select value={selectedMonth} onChange={e => setSelectedMonth(e.target.value)}>
          <option value="">All</option>
          <option value="January">January</option>
          <option value="February">February</option>
          <option value="March">March</option>
          {/* Add other months as options */}
        </select>
      </div>
      <table>
        <thead>
          <tr>
            <th>Employee</th>
            <th>Work Done</th>
            <th>Month</th>
          </tr>
        </thead>
        <tbody>
          {filteredWorkRecords.map(record => (
            <tr key={record.id}>
              <td>{record.employee}</td>
              <td>{record.workDone}</td>
              <td>{record.month}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default WorkRecordsPage;
