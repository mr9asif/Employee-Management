import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";


const Services = () => {
    // const { data, isLoading, error } = useQuery({
    //     queryKey: ['service'],
    //     queryFn: () => 
    //         fetch('/Employee-management/public/service.json')
    //             .then(res => {
    //                 if (!res.ok) {
    //                     throw new Error('Network response was not ok');
    //                 }
    //                 return res.json();
    //             })
    // });

    // // Log the data to console (for debugging purposes)
    // console.log(data);

    // if (isLoading) return <div>Loading...</div>;
    // if (error) return <div>Error loading services</div>;

    useEffect(() => {
        fetch('/Employee-management/public/service.json')
        .then(res => res.json())
        .then(data => {
            console.log(data);
        })
    }, []);
    
    return (
        <div>
            
        </div>
    );
};

export default Services;