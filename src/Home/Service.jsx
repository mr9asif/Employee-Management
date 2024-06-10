import { Link } from "react-router-dom";

const Service = ({item}) => {
    const {title,shortDescription,_id, longDescription, image}=item;
    // console.log(item)
    return (
        <div data-aos="fade-up"
        data-aos-duration="1200" className="border-l-orange-200-100 shadow-lg bg-slate-200 rounded-md relative h-[520px]">
            <img className="w-full h-[300px] p-2" src={image} alt="" />
           <div className="p-4">
           <h1 className="text-2xl font-bold text-yellow-600">{title}</h1>

           <h1 className="text-[18px] font-semibold text-gray-700">{shortDescription}</h1>
           <p className="text-[16px] font-semibold text-gray-500">{longDescription.slice(0, 90)}..</p>
           </div>
           <div className="absolute bottom-0 left-0 right-0 flex justify-between items-center mb-3 px-6 my-2">
           <Link to={`/viewdetails/${_id}`}>
           <button className="text-[13px]  lg:text-xl w-24 h-[30px] lg:w-32 rounded-xl lg:h-[40px] bg-gradient-to-r from-blue-500 to-teal-400 text-white relative overflow-hidden group z-10 hover:text-white duration-1000"><span className="absolute bg-gradient-to-r from-blue-500 to-teal-400 size-36 rounded-xl group-hover:scale-100 scale-0 -z-10 -left-2 -top-10 group-hover:duration-500 duration-700 origin-center transform transition-all"></span><span className="absolute bg-orange-600 size-36 -left-2 -top-10 rounded-full group-hover:scale-100 scale-0 -z-10 group-hover:duration-700 duration-500 origin-center transform transition-all"></span>ViewDetails</button>
       </Link>
       </div>
        </div>
    );
};

export default Service;