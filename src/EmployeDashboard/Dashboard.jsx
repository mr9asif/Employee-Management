import React from 'react';
import WorkSheetForm from './WorkSheetForm';
import WorkSheetTable from './WorkSheetTable';

const Dashboard = () => {
    return (
        <div className='pt-24 max-w-7xl mx-auto'>
        <h2>Welcome to the Employee Dashboard</h2>
        <div className="dashboard-section">
          <h3>Submit Your Work Sheet</h3>
          <WorkSheetForm></WorkSheetForm>
        </div>
        <div className="dashboard-section">
          <h3>Your Work Sheet Entries</h3>
         
        </div>
      </div>
    );
};

export default Dashboard;