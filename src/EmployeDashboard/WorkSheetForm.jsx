// WorkSheetForm.js
import React, { useState } from 'react';
import axios from 'axios';

const WorkSheetForm = () => {
  const [formData, setFormData] = useState({
    task: '',
    hoursWorked: '',
    date: new Date().toISOString().split('T')[0] // Default to current date
  });

  const handleChange = (e) => {
    // Ensure that hoursWorked is not negative
    if (e.target.name === 'hoursWorked' && e.target.value < 0) {
      return; // Do not update state if hoursWorked is negative
    }
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/work-sheet', formData);
      // Refresh data in the table after submission
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div className="pt-12">
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
        <div className="flex flex-col">
          <label htmlFor="task" className="text-gray-700">Task</label>
          <select name="task" value={formData.task} onChange={handleChange} className="mt-1 py-2 px-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500">
            <option value="Sales">Sales</option>
            <option value="Support">Support</option>
            <option value="Content">Content</option>
            <option value="Paper-work">Paper-work</option>
          </select>
        </div>
        <div className="flex flex-col">
          <label htmlFor="hoursWorked" className="text-gray-700">Hours Worked</label>
          <input type="number" name="hoursWorked" value={formData.hoursWorked} onChange={handleChange} className="mt-1 py-2 px-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500" />
        </div>
        <div className="flex flex-col">
          <label htmlFor="date" className="text-gray-700">Date</label>
          <input type="date" name="date" value={formData.date} onChange={handleChange} className="mt-1 py-2 px-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500" />
        </div>
        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-500 focus:ring-opacity-50">Add/Submit</button>
      </form>
    </div>
  );
};

export default WorkSheetForm;
