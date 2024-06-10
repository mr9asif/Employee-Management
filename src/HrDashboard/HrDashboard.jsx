import React, { useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import useSecurePublic from '../Hook/useSecurePublic';
import { Link } from 'react-router-dom';
import Modal from './Modal'; // Import the Modal component
import WorkRecordsPage from './WorkRecordsPage';
import UseAxiosSecure from '../Hook/useAxiosSecure';

const HrDashboard = () => {
  const axiosSecurePublic = useSecurePublic();
  const queryClient = useQueryClient();
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [worksheets, setWorksheets] = useState([]);
  const [isLoadingWorksheets, setIsLoadingWorksheets] = useState(false);
  

  const axiosSecure=UseAxiosSecure()
  const fetchWorksheets = async (email) => {
    setIsLoadingWorksheets(true);
    try {
      const res = await axiosSecurePublic.get(`/worksheets/${email}`);
      setWorksheets(res.data);

    } catch (error) {
      console.error('Failed to fetch worksheets', error);
    } finally {
      setIsLoadingWorksheets(false);
    }
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      try {
        const res = await axiosSecure.get('/employee');
        
        return res.data.filter(user => user.role === 'Employee');
      } catch (error) {
        throw new Error('Failed to fetch employee data');
      }
    },
  });

  const handleToggleVerified = async (id, currentVerified) => {
    try {
      const response = await axiosSecurePublic.patch(`/employee/${id}`, {
        isVerified: !currentVerified,
      });
      console.log('Server response:', response.data);
      queryClient.invalidateQueries(['user']);
    } catch (error) {
      console.error('Failed to update verified status', error);
    }
  };

  const handlePayClick = (employee) => {
    setSelectedEmployee(employee);
    fetchWorksheets(employee.email);
    setIsModalOpen(true);
  };

  const handlePay = () => {
  
    // Implement the logic for paying the employee here
    setIsModalOpen(false);
  };

  if (isLoading || isLoadingWorksheets) {
    return <div className="max-w-4xl mx-auto  text-center pt-44 pb-96"><span className="loading loading-bars text-blue-600 text-center loading-lg"></span></div>;
  }

  if (isError) {
    console.log(isError);
    return <div>Error: {isError.message}</div>;
  }

  const columns = [
    { Header: 'No.', accessor: 'no' },
    { Header: 'Name', accessor: 'name' },
    { Header: 'Email', accessor: 'email' },
    { Header: 'Verified', accessor: 'verified' },
    { Header: 'Bank Account', accessor: 'bankAccount' },
    { Header: 'Salary', accessor: 'salary' },
    { Header: 'Pay', accessor: 'pay' },
    { Header: 'Details', accessor: 'details' },
  ];

  return (
    <div className="p-4 max-w-7xl mx-auto pt-24">
      <div>
      {/* work sheet filter*/}
      </div>
      <table className="min-w-full border border-gray-200 ">
        <thead>
          <tr className="bg-gray-100">
            {columns.map((column) => (
              <th key={column.accessor} className="py-2 px-4 border-b">
                {column.Header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item, inx) => (
            <tr key={item.id} className="hover:bg-gray-50">
              <td className="py-2 pl-14 px-4 border-b">{inx + 1}</td>
              <td className="py-2 px-4 pl-24 border-b">{item.name}</td>
              <td className="py-2 px-4 pl-24 border-b">{item.email}</td>
              <td className="py-2 px-4 pl-12 border-b">
                <button
                  onClick={() => handleToggleVerified(item._id, item.isVerified)}
                  className="text-lg"
                >
                  {item.isVerified ? '✅' : '❌'}
                </button>
              </td>
              <td className="py-2 px-4 pl-16 border-b">{item.bank_account}</td>
              <td className="py-2 px-4 pl-12 border-b">{item.salary}</td>
              <td className="py-2 px-4 border-b pl-12">
                <button
                  onClick={() => handlePayClick(item)}
                  className={`px-3 py-2 rounded-lg bg-green-400 hover:bg-orange-600 ${
                    !item.isVerified ? 'cursor-not-allowed opacity-50' : ''
                  }`}
                  disabled={!item.isVerified}
                >
                  Pay
                </button>
              </td>
              <td className="py-2 px-4 border-b pl-12">
              <Link to={`/employee-details/${item.email}`}>
                <button className="px-3 py-2 bg-yellow-400 hover:bg-orange-600 rounded-lg">
                  Details
                </button>
              </Link>
            </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        employee={selectedEmployee}
        worksheets={worksheets}
        onPay={handlePay}
      />
    </div>
  );
};

export default HrDashboard;
