import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import useSecurePublic from '../Hook/useSecurePublic';

// Set the app element for accessibility
Modal.setAppElement('#root');

const AdminEmployeeManagement = () => {
    const [employees, setEmployees] = useState([]);
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [isFireModalOpen, setIsFireModalOpen] = useState(false);
    const [isSalaryModalOpen, setIsSalaryModalOpen] = useState(false);
    const [newSalary, setNewSalary] = useState('');
    const axiosSecurePublic = useSecurePublic();

    useEffect(() => {
        fetchEmployees();
    }, []);

    const fetchEmployees = async () => {
        try {
            const response = await axiosSecurePublic.get('/employees/verified');
            setEmployees(response.data);
        } catch (error) {
            console.error('Error fetching employees:', error);
        }
    };

    const handleFire = async (employeeId) => {
        try {
            await axiosSecurePublic.post(`/employees/fire/${employeeId}`);
            setEmployees(employees.map(emp => emp.id === employeeId ? { ...emp, fired: true } : emp));
            setIsFireModalOpen(false);
        } catch (error) {
            console.error('Error firing employee:', error);
        }
    };

    const handleMakeHR = async (employeeId) => {
        try {
            await axiosSecurePublic.post(`/employees/makeHR/${employeeId}`);
            fetchEmployees();
        } catch (error) {
            console.error('Error making employee HR:', error);
        }
    };

    const handleAdjustSalary = async (employeeId) => {
        try {
            await axiosSecurePublic.post(`/employees/salary/${employeeId}`, { salary: newSalary });
            fetchEmployees();
            setIsSalaryModalOpen(false);
        } catch (error) {
            console.error('Error adjusting salary:', error);
        }
    };

    const openFireModal = (employee) => {
        setSelectedEmployee(employee);
        setIsFireModalOpen(true);
    };

    const openSalaryModal = (employee) => {
        setSelectedEmployee(employee);
        setIsSalaryModalOpen(true);
        setNewSalary(employee.salary);
    };

    return (
        <div className="w-full p-4">
            <h1 className="text-center text-xl font-bold mb-4">Employee Management</h1>
            <table className="w-full border-collapse border border-gray-500">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="border border-gray-500 p-2">Name</th>
                        <th className="border border-gray-500 p-2">Designation</th>
                        <th className="border border-gray-500 p-2">Make HR</th>
                        <th className="border border-gray-500 p-2">Fire</th>
                        <th className="border border-gray-500 p-2">Adjust Salary</th>
                    </tr>
                </thead>
                <tbody>
                    {employees.map(employee => (
                        <tr key={employee.id} className="border border-gray-500 text-center">
                            <td className="border border-gray-500 p-2">{employee.name}</td>
                            <td className="border border-gray-500 p-2">{employee.designation}</td>
                            <td className="border border-gray-500 p-2">
                                {employee.isHR ? 'HR' : <button onClick={() => handleMakeHR(employee.id)}>Make HR</button>}
                            </td>
                            <td className="border border-gray-500 p-2">
                                {employee.fired ? 'Fired' : <button onClick={() => openFireModal(employee)}>Fire</button>}
                            </td>
                            <td className="border border-gray-500 p-2">
                                <button onClick={() => openSalaryModal(employee)}>Adjust Salary</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Fire Confirmation Modal */}
            <Modal
                isOpen={isFireModalOpen}
                onRequestClose={() => setIsFireModalOpen(false)}
                contentLabel="Fire Confirmation"
                className="modal"
                overlayClassName="modal-overlay"
            >
                <h2>Confirm Firing</h2>
                <p>Are you sure you want to fire {selectedEmployee?.name}?</p>
                <button onClick={() => handleFire(selectedEmployee.id)}>Confirm</button>
                <button onClick={() => setIsFireModalOpen(false)}>Cancel</button>
            </Modal>

            {/* Adjust Salary Modal */}
            <Modal
                isOpen={isSalaryModalOpen}
                onRequestClose={() => setIsSalaryModalOpen(false)}
                contentLabel="Adjust Salary"
                className="modal"
                overlayClassName="modal-overlay"
            >
                <h2>Adjust Salary</h2>
                <p>Adjust salary for {selectedEmployee?.name}:</p>
                <input
                    type="number"
                    value={newSalary}
                    onChange={e => setNewSalary(e.target.value)}
                    className="border p-2 mb-4"
                />
                <button onClick={() => handleAdjustSalary(selectedEmployee.id)}>Update Salary</button>
                <button onClick={() => setIsSalaryModalOpen(false)}>Cancel</button>
            </Modal>
        </div>
    );
};

export default AdminEmployeeManagement;
