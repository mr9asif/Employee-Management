import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import Service from "./Service";

const Services = () => {
    const { data, isLoading, error } = useQuery({
        queryFn: async () => {
            try {
                const response = await axios.get('https://as-12-server-weld.vercel.app/services');
                return response.data; // Return the data fetched from the API
            } catch (error) {
                throw new Error('Failed to fetch services'); // Throw an error in case of failure
            }
        },
        queryKey: ['services'] // Update the query key to match the fetched data
    });

    // Log the data to console (for debugging purposes)


    if (isLoading) return <div className="max-w-4xl mx-auto  text-center my-48"><span className="loading loading-bars text-blue-600 text-center loading-lg"></span></div>;
    if (error) return <div>Error loading services</div>;

    return (
        <div>
            <h1 data-aos="fade-up"
            data-aos-duration="1200" className="text-xl md:text-3xl lg:text-4xl mt-16 mb-5 text-yellow-600 text-center">Our Services</h1>
             <h1 data-aos="fade-up"
             data-aos-duration="1200" className="tracking-[6px] mb-8 font-semibold text-xl md:text-2xl lg:text-3xl text-center text-orange-800">Explore Our Services</h1>
             <div className="w-[95%] lg:max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-3   lg:gap-3">
             {
                data.slice(0,6).map(item => (
                    <Service key={item._id} item={item}></Service>
                ))
            }
             </div>
        </div>
    );
};

export default Services;
