import { Link } from "react-router-dom";


const AboutUs = () => {
    return (
        <div>
            
        <div className="max-w-[95%]  lg:max-w-7xl mx-auto  my-12 mb-9">
         
        <div className="flex items-center ">
        <div  data-aos="fade-up"
        data-aos-duration="3000">
        <img  className="w-[600px] md:w-[500px] lg:w-[900px] h-[300px] md:h-[400px] lg:h-[650px]" src="https://i.postimg.cc/2jGpQkdH/Banner-Meeting-5.jpg" alt="" />
        </div>
        <div  data-aos="fade-down"
        data-aos-duration="3000" className="bg-gray-500 md:w-[600px] lg:w-[1000px] h-[430px] md:h-[460px] lg:h-[560px] p-6 relative md:right-10 lg:right-16">
         <h2 className="text-xl lg:text-2xl font-bold text-green-900">ABOUT US</h2>
         <h3 className="text-2xl lg:text-4xl text-gray-400 font-bold mb-2 mt-1">We Provide Best Service in our Website!</h3>
         <p className="text-[13px] lg:text-[16px] mb-3 text-gray-800">EmpowerManage is Your all-in-one solution for seamless employee management and optimization.</p>
          <div className="flex items-center gap-3">
          <img data-aos="flip-right" data-aos-duration="1500" className="w-[60px] md:w-[140px] lg:w-[260px]" src="https://i.postimg.cc/3wXJjMx3/Easy-device-streaming-on-the-meeting-room-display-with-the-new-Display-Note-Launcher-Video-Source-Sho.jpg" alt="" />
          <img data-aos="flip-left" data-aos-duration="1500" className="w-[60px] md:w-[120px] lg:w-[210px]" src="https://freerangestock.com/sample/119865/business-meeting--conference-room--people--corporate-life.jpg" alt="" />
          </div >
          <Link to='/about'><button className="group relative flex w-40 lg:w-32 items-center rounded-lg border-2 border-sky-400 mt-3 p-2 lg:p-4 text-sky-300"><span>See More</span><span className="absolute right-3 box-content flex w-1/6 justify-center rounded-md bg-sky-400 duration-300 group-hover:w-5/6"><svg viewBox="0 0 24 24" fill="none" className="w-10" xmlns="http://www.w3.org/2000/svg"><g strokeWidth="0"></g><g strokeLinecap="round" strokeLinejoin="round"></g><g><path d="M4 12H20M20 12L14 6M20 12L14 18" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path></g></svg></span></button></Link>
        </div>
        </div>
     </div>
        </div>
    );
};

export default AboutUs;