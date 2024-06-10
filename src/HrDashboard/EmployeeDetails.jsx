import React from 'react';
import { useQuery } from '@tanstack/react-query';
import useSecurePublic from '../Hook/useSecurePublic';
import { useParams } from 'react-router-dom';
import Chart from './Chart';

const EmployeeDetails = () => {
  const axiosSecurePublic = useSecurePublic();
  const { email } = useParams();

  const { data: employee, isLoading, isError, error } = useQuery({
    queryKey: ['details', email],
    queryFn: async () => {
      const res = await axiosSecurePublic.get(`/api/employees/${email}`);
      console.log(res.data)
      return res.data;
    },
  });

  if (isLoading) {
    return <div className="max-w-4xl mx-auto  text-center pt-44 pb-96"><span className="loading loading-bars text-blue-600 text-center loading-lg"></span></div>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className='pt-24 mb-5 max-w-6xl mx-auto'>
       <div className='p-8  shadow-lg rounded-lg w-[400px] mx-auto flex flex-col justify-center items-center gap-3 '>
       <h1 className='text-2xl font-bold text-red-800 '><span className='text-yellow-600'>Employee Name</span>: {employee.name}</h1>
       <img className='w-[100px] h-[100px] rounded-[50%]' src={employee.photoURL} alt={`${employee.name}'s profile`} />
       <p className='text-2xl font-bold text-red-800 '> <span className='text-yellow-600'>Designation: </span>{employee.designation}</p>
       <p className='text-2xl font-bold text-red-800 '> <span className='text-yellow-600'>Role: </span>{employee.role}</p>
       </div>
      {/* Additional details */}

      <div className='my-7 max-w-7xl mx-auto text-center'>
        <Chart bank_account={employee.bank_account}></Chart>
      </div>
    </div>
  );
};

export default EmployeeDetails;
