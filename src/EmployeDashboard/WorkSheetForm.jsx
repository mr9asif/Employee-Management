import React, { useContext, useState } from 'react';

import { Context } from '../AuthProvider/Authprovider';

import toast from 'react-hot-toast';
import UseAxiosSecure from '../Hook/useAxiosSecure';

const WorkSheetForm = () => {

  const axioxSecure=UseAxiosSecure()
  const { user } = useContext(Context);
  
  const [formData, setFormData] = useState({
    task: 'Sales', // Set a default value for the task
    hoursWorked: 'hoursWorked',
    date: new Date().toISOString().split('T')[0], // Default to current date
    email: user.email,
    name: user.displayName,
    isVerified: false,
    salary: 30000,
  });

  const handleChange = (e) => {
    if (e.target.name === 'hoursWorked' && e.target.value < 0) {
      return; // Do not update state if hoursWorked is negative
    }
    setFormData(prevFormData => ({ ...prevFormData, [e.target.name]: e.target.value }));
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axioxSecure.post('/worksheet', formData)
        .then(res => {
          console.log('res', res.data);
          if (res.data.insertedId) {
            toast.success('You added worksheet successfully!');
          }
        });
      // Refresh data in the table after submission
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div className="pt-12">
      <form onSubmit={handleSubmit} className="flex items-center space-x-4">
        <div className="flex flex-col items-start">
          <label htmlFor="task" className="text-gray-700">Task</label>
          <select
            name="task"
            value={formData.task}
            onChange={handleChange}
            className="mt-1 py-2 px-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="Sales">Sales</option>
            <option value="Support">Support</option>
            <option value="Content">Content</option>
            <option value="Paper-work">Paper-work</option>
          </select>
        </div>
        <div className="flex flex-col items-start">
          <label htmlFor="hoursWorked" className="text-gray-700">Hours Worked</label>
          <input
            type="number"
            name="hoursWorked"
            value={formData.hoursWorked}
            onChange={handleChange}
            className="mt-1 py-2 px-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div className="flex flex-col items-start">
          <label htmlFor="date" className="text-gray-700">Date</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="mt-1 py-2 px-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div className="flex flex-col items-start">
          <label htmlFor="email" className="text-gray-700">Email</label>
          <input
            type="text"
            name="email"
            value={formData.email}
            disabled
            className="mt-1 py-2 px-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div className="flex flex-col items-start">
          <label htmlFor="name" className="text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            disabled
            className="mt-1 py-2 px-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div className="flex flex-col items-start justify-end h-full">
          <button type="submit" className="bg-green-500 text-white py-2 px-4 rounded-md shadow-sm hover:bg-green-600 focus:outline-none focus:ring focus:ring-blue-500 focus:ring-opacity-50 mt-7">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default WorkSheetForm;
