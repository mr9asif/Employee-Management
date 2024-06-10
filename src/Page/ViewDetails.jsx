import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";


const ViewDetails = () => {
    const {id}= useParams();
    const [item, setItem]=useState({})
     console.log(id)
     const {title,shortDescription,_id, longDescription, image}=item;

    useEffect(() => {
        fetch(`https://as-12-server-weld.vercel.app/viewdetails/${id}`)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setItem(data)
              
            })
    }, [id]);

    
    return (
        <div className="max-w-5xl  mb-5  mx-auto pt-20 bg-gray-300">
        <div  data-aos="fade-left"  data-aos-duration="1200" className="w-full  shadow-md rounded p-2">
        <div className="flex flex-col justify-center items-center gap-2">
             <img className="w-full h-[400px] p-4  rounded-xl" src={image} alt="" />
             <div className="p-4 flex flex-col gap-3">
                 <h1 className="text-2xl font-bold text-gray-900"><span> </span>{title}</h1>
                 <h2 className="text-[17px] font-bold text-gray-800"><span>Description: </span>{shortDescription}</h2>
                <h1>{longDescription}</h1>
              
                <div className="flex justify-start items-center my-2">
                <Link to='/' ><button className="text-[13px]  lg:text-xl w-12 h-[30px] lg:w-32 rounded-xl lg:h-[40px] bg-gradient-to-r from-blue-500 to-teal-400 text-white relative overflow-hidden group z-10 hover:text-white duration-1000"><span className="absolute bg-green-500 size-36 rounded-xl group-hover:scale-100 scale-0 -z-10 -left-2 -top-10 group-hover:duration-500 duration-700 origin-center transform transition-all"></span><span className="absolute bg-orange-600 size-36 -left-2 -top-10 rounded-full group-hover:scale-100 scale-0 -z-10 group-hover:duration-700 duration-500 origin-center transform transition-all"></span>Back</button></Link>
                </div>

             </div>
        </div>
    </div>
        </div>
    );
};

export default ViewDetails;