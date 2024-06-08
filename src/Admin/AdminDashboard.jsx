import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import useSecurePublic from '../Hook/useSecurePublic';

const AdminDashboard = () => {
    const axiosSecurePublic = useSecurePublic();
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const { data, isLoading, error, refetch } = useQuery({
        queryKey: ['varify'],
        queryFn: async () => {
            const res = await axiosSecurePublic.get('/varify-employee');
            return res.data;
        }
    });

    const handleMakeHR = async (employeeId) => {
        try {
            await axiosSecurePublic.patch(`/update-employee/${employeeId}`, { role: 'HR' });
            // Show success alert
            window.alert('Employee has been promoted to HR.');
            // Refetch the data after a successful request
            refetch();
        } catch (error) {
            console.error('Error updating role:', error);
            // Show error alert
            window.alert('Failed to promote employee to HR. Please try again.');
        }
    };

    const handleFireEmployee = async (employeeId) => {
        try {
            const response = await axiosSecurePublic.patch(`/fire-employee/${employeeId}`, { fired: true });
            if (response.data.success) {
                window.alert('Employee has been fired.');
                refetch();
            } else {
                window.alert('Failed to fire employee. Please try again.');
            }
        } catch (error) {
            console.error('Error firing employee:', error);
            window.alert('Failed to fire employee. Please try again.');
        } finally {
            closeModal();
        }
    };

    const openModal = (employee) => {
        setSelectedEmployee(employee);
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setSelectedEmployee(null);
        setModalIsOpen(false);
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error fetching data</div>;
    }


    return (
        <div className='pt-24'>
            <h1 className='text-3xl font-bold text-center'>Admin Dashboard</h1>
            <div className='mt-6 max-w-7xl mx-auto'>
                <table className='min-w-full border-collapse block md:table'>
                    <thead className='block md:table-header-group'>
                        <tr className='border border-grey-500 md:border-none block md:table-row absolute -top-full md:top-auto -left-full md:left-auto md:relative '>
                            <th className='bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-center block md:table-cell'>Name</th>
                            <th className='bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-center block md:table-cell'>Role</th>
                            <th className='bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-center block md:table-cell'>Designation</th>
                            <th className='bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-center block md:table-cell'>Actions</th>
                        </tr>
                    </thead>
                    <tbody className='block md:table-row-group'>
                        {data?.map((item) => (
                            <tr key={item._id} className='bg-gray-300 border border-grey-500 md:border-none block md:table-row text-center'>
                                <td className='p-2 md:border md:border-grey-500 text-center block md:table-cell '>{item.name}</td>
                                <td className='p-2 md:border md:border-grey-500 text-center block md:table-cell'>{item.role}</td>
                                <td className='p-2 md:border md:border-grey-500 text-center block md:table-cell'>{item.designation}</td>
                                <td className='p-2 md:border md:border-grey-500 text-center block md:table-cell'>
                                    <button
                                        className={`btn bg-green-400 hover:bg-green-700 hover:text-white ${item.role === 'HR' ? 'cursor-not-allowed' : ''}`}
                                        onClick={() => handleMakeHR(item._id)}
                                        disabled={item.role === 'HR'}
                                    >
                                        Make HR
                                    </button>
                                    <button
                                        className={`btn bg-red-400 hover:bg-red-700 hover:text-white ml-2 ${item.fired ? 'cursor-not-allowed' : ''}`}
                                        onClick={() => handleFireEmployee(item._id)}
                                        disabled={item.fired}
                                    >
                                        FIRE
                                    </button>
                                    {item.fired ? (
                                        <span className="ml-2">Fired</span>
                                    ) : null}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminDashboard;