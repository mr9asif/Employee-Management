import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Item from '../Page/Item'



const AllServices = () => {
    const { data, isLoading, error } = useQuery({
        queryFn: async () => {
            try {
                const response = await axios.get('http://localhost:4000/services');
                return response.data; // Return the data fetched from the API
            } catch (error) {
                throw new Error('Failed to fetch services'); // Throw an error in case of failure
            }
        },
        queryKey: ['services'] // Update the query key to match the fetched data
    });

    // Log the data to console (for debugging purposes)
  

    if (isLoading) return <div className="max-w-4xl mx-auto  text-center pt-44 pb-96"><span className="loading loading-bars text-blue-600 text-center loading-lg"></span></div>;
    if (error) return <div>Error loading services</div>;

    return (
        <div className="max-w-7xl mx-auto pt-24">
        <h1 className="text-xl md:text-3xl lg:text-4xl  mb-5 text-yellow-600 text-center">Our Services</h1>
        
         <div className="max-w-7xl mx-auto grid lg:grid-cols-3 md:grid-cols-2  gap-3">
         {
            data.map(item => (
                <Item key={item._id} item={item}></Item>
            ))
        }
         </div>
    </div>
    );
};

export default AllServices;