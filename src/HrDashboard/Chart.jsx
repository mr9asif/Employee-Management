import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { useQuery } from '@tanstack/react-query';
import useSecurePublic from '../Hook/useSecurePublic';

const Chart = ({ bank_account }) => {
  const axiosSecurePublic = useSecurePublic();

  const getMonthName = (monthNumber) => {
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    return months[monthNumber - 1];
  };

  const { data: paymentData, isLoading, isError } = useQuery({
    queryKey: ['pay', bank_account],
    queryFn: async () => {
      const res = await axiosSecurePublic.get(`/payments/${bank_account}`);
      return res.data;
    },
    enabled: !!bank_account, // Ensure the query runs only if bank_account is provided
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error fetching data</div>;
  }

  if (!Array.isArray(paymentData)) {
    return <div>No data available</div>;
  }

  // Assuming the paymentData is in the format [{ month: 1, year: 2022, salary: 4000 }, ...]
  const labels = paymentData.map(dataPoint => `${getMonthName(dataPoint.month)} ${dataPoint.year}`);
  const yData = paymentData.map(dataPoint => dataPoint.salary);

  return (
    <div className='w-auto border'>
      <BarChart
        width={500}
        height={300}
        series={[{ data: yData, label: 'Salary' }]}
        xAxis={[{ data: labels, scaleType: 'band' }]}
      />
    </div>
  );
};

export default Chart;
