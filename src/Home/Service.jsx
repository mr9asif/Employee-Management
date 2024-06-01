import { Link } from "react-router-dom";

const Service = ({item}) => {
    const {title,shortDescription,_id, longDescription, image}=item;
    console.log(item)
    return (
        <div className="border-l-orange-200-100 shadow-lg bg-slate-200 rounded-md relative h-[520px]">
            <img className="w-full h-[300px] p-2" src={image} alt="" />
           <div className="p-4">
           <h1 className="text-2xl font-bold text-yellow-600">{title}</h1>

           <h1 className="text-[18px] font-semibold text-gray-700">{shortDescription}</h1>
           <p className="text-[16px] font-semibold text-gray-500">{longDescription.slice(0, 90)}..</p>
           </div>
           <div className="absolute bottom-0 left-0 right-0 flex justify-between items-center mb-3 px-6 my-2">
           <Link to={`/viewdetails/${_id}`}>
           <button className="btn btn-outline bg-yellow-500 hover:bg-yellow-600 hover:text-white text-[15px] text-gray-700">View Details</button>
       </Link>
       </div>
        </div>
    );
};

export default Service;