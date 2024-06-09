import { useContext, useState } from "react";
import { Context } from "../AuthProvider/Authprovider";
import useSecurePublic from "../Hook/useSecurePublic";
import { useQuery } from "@tanstack/react-query";
import ReactPaginate from "react-paginate";
import './Style.css'; // Import your custom CSS


const HistoryWork = () => {
    const { user } = useContext(Context);
    const axiosSecurePublic = useSecurePublic();
    const [currentPage, setCurrentPage] = useState(0);
    const [dataPerPage] = useState(5); // Number of data items to display per page
   

    const { data, isLoading } = useQuery({
        queryKey: ['history'],
        queryFn: async () => {
            const res = await axiosSecurePublic.get(`/payment/${user?.email}`);
            return res.data;
        }
    });

    if (isLoading) {
        return <h1>Loading...</h1>;
    }

    // Pagination logic
    const indexOfLastData = (currentPage + 1) * dataPerPage;
    const indexOfFirstData = indexOfLastData - dataPerPage;
    const currentData = data?.slice(indexOfFirstData, indexOfLastData);

    // Handle page change
    const handlePageChange = ({ selected }) => {
        setCurrentPage(selected);
    };

    return (
        <div className="w-full">
            <h1 className="text-center text-xl font-bold mb-4">Payment History</h1>
            <table className="w-full border-collapse border border-gray-500">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="border border-gray-500 p-2">Month</th>
                        <th className="border border-gray-500 p-2">Salary</th>
                        <th className="border border-gray-500 p-2">Payment ID</th>
                    </tr>
                </thead>
                <tbody>
                    {currentData?.map(item => (
                        <tr key={item._id} className="border border-gray-500 text-center">
                            <td className="border border-gray-500 text-blue-600 p-2">{getMonthName(item.month)}</td>
                            <td className="border border-gray-500 text-blue-600 p-2">{item.salary}</td>
                            <td className="border border-gray-500 text-blue-600 p-2">{item._id}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Pagination */}
            <div className="mt-4 flex justify-center">
                <ReactPaginate
                    previousLabel={"Previous"}
                    nextLabel={"Next"}
                    breakLabel={"..."}
                    pageCount={Math.ceil(data?.length / dataPerPage)}
                    onPageChange={handlePageChange}
                    containerClassName={"pagination"}
                    activeClassName={"active"}
                    previousLinkClassName={"page-link"}
                    nextLinkClassName={"page-link"}
                    breakLinkClassName={"page-link"}
                    pageLinkClassName={"page-link"}
                    disabledClassName={"disabled"}
                    activeClassName={"active"}
                />
            </div>
        </div>
    );
};

// Function to convert month number to month name
const getMonthName = (monthNumber) => {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    return months[monthNumber - 1];
};

export default HistoryWork;
