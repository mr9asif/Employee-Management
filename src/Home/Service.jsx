
const Service = ({item}) => {
    const {title,shortDescription, longDescription, image}=item;
    console.log(item)
    return (
        <div className="border-l-orange-200-100 shadow-lg bg-slate-200 rounded-md relative h-[400px]">
            <img className="w-full h-[300px] p-2" src={image} alt="" />
            <h1 className="text-2xl font-bold text-orange-600">{title}</h1>
            <h1>{shortDescription}</h1>
        </div>
    );
};

export default Service;