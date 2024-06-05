import React from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import useSecurePublic from '../Hook/useSecurePublic';

const HrDashboard = () => {
  const axiosSecurePublic = useSecurePublic();
  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      try {
        const res = await axiosSecurePublic.get('/employee');
        return res.data;
      } catch (error) {
        throw new Error('Failed to fetch employee data');
      }
    }
  });
  const handleToggleVerified = async (id, currentVerified) => {
    try {
      const response = await axiosSecurePublic.patch(`/employee/${id}`, {
        isVerified: !currentVerified
      });
      console.log("Server response:", response.data);
      queryClient.invalidateQueries(['user']);
    } catch (error) {
      console.error('Failed to update verified status', error);
    }
  };
  
  
  
  
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    console.log(isError);
    return <div>Error: {isError.message}</div>;
  }

  // const updatedData = data.map(item => {
  //   if (item._id === id) {
  //     return { ...item, isVerified: !currentVerified };
  //   }
  //   return item;
  // });
  // queryClient.setQueryData(['user'], updatedData)
  //  }



  const columns = [
    { Header: 'No.', accessor: 'no' },
    { Header: 'Name', accessor: 'name' },
    { Header: 'Email', accessor: 'email' },
    { Header: 'Verified', accessor: 'verified' },
    { Header: 'Bank Account', accessor: 'bankAccount' },
    { Header: 'Salary', accessor: 'salary' },
    { Header: 'Pay', accessor: 'pay' },
    { Header: 'Details', accessor: 'details' }
  ];
  console.log(data)

  return (
    <div className="p-4 max-w-7xl mx-auto pt-24">
      <table className="min-w-full border border-gray-200 ">
        <thead>
          <tr className="bg-gray-100">
            {columns.map(column => (
              <th key={column.accessor} className="py-2 px-4 border-b">{column.Header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item, inx )=> (
            <tr key={item.id} className="hover:bg-gray-50">
              <td className="py-2 pl-14 px-4 border-b">{inx+1}</td>
              <td className="py-2 px-4 pl-24 border-b">{item.name}</td>
              <td className="py-2 px-4 pl-24 border-b">{item.email}</td>
              <td className="py-2 px-4 pl-12 border-b">
                <button
                  onClick={() => handleToggleVerified(item._id, item.isVerified, console.log(item))}
                  className="text-lg"
                >
                  {item.isVerified ? '✅' : '❌'}
                </button>
              </td>
              <td className="py-2 px-4 pl-16 border-b">{item.bankAccount}</td>
              <td className="py-2 px-4 pl-12 border-b">{item.salary}</td>
              <td className="py-2 px-4 border-b">{item.pay}</td>
              <td className="py-2 px-4 border-b">{item.details}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HrDashboard;
