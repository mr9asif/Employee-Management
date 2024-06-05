import React from 'react';
import WorkSheetForm from './WorkSheetForm';
import WorkSheetTable from './WorkSheetTable';

const Dashboard = () => {
    return (
        <div className='pt-24 max-w-7xl mx-auto'>
        <h2 className='text-3xl font-bold text-green-400 text-center'>Welcome to the Employee Dashboard</h2>
        <div className="dashboard-section">
          <h3 className='text-2xl font-bold text-green-400 text-center  mt-16'>Submit Your Work Sheet</h3>
          <WorkSheetForm></WorkSheetForm>
        </div>
        <div className="dashboard-section">
          <h3>Your Work Sheet Entries</h3>
         
        </div>
      </div>
    );
};

export default Dashboard;