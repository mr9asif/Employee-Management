import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import Service from "./Service";

const Services = () => {
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
    console.log(data);

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error loading services</div>;

    return (
        <div>
            <h1 className="text-7xl">Services</h1>
             <div className="max-w-7xl mx-auto lg:grid lg:grid-cols-3 md:grid-cols-2  gap-3">
             {
                data.map(item => (
                    <Service key={item._id} item={item}></Service>
                ))
            }
             </div>
        </div>
    );
};

export default Services;
