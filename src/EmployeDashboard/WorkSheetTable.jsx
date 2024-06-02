// WorkSheetTable.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const WorkSheetTable = () => {
  const [workSheetData, setWorkSheetData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/work-sheet');
        setWorkSheetData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <table>
      <thead>
        <tr>
          <th>Task</th>
          <th>Hours Worked</th>
          <th>Date</th>
        </tr>
      </thead>
      <tbody>
        {workSheetData?.map((entry) => (
          <tr key={entry.id}>
            <td>{entry.task}</td>
            <td>{entry.hoursWorked}</td>
            <td>{entry.date}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default WorkSheetTable;
