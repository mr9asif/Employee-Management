import { useRef } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import '../App.css'
import { Autoplay, Navigation, Pagination } from "swiper/modules";

const Partnership = () => {
    const progressCircle = useRef(null);
    const progressContent = useRef(null);
    const onAutoplayTimeLeft = (s, time, progress) => {
      progressCircle.current.style.setProperty('--progress', 1 - progress);
      progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
    };
    return (
        <div className="my-6 w-[96%] lg:max-w-7xl mx-auto mt-12">
        <h1 data-aos='zoom-in-up' data-aos-duration="1000" className="tracking-[12px] font-semibold text-xl text-center text-green-400">PARTNERSHIP</h1>
        <h1 data-aos='zoom-in-down' data-aos-duration="1000" className="tracking-[6px] mb-8 font-semibold lg:text-4xl text-center text-orange-800">Explore Our Partnership</h1>
        
        <div className='h-[300px]'>
        <Swiper
        spaceBetween={30}
        slidesPerView={4}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        onAutoplayTimeLeft={onAutoplayTimeLeft}
        className="mySwiper"
      >
        <SwiperSlide>
          <div  data-aos="fade-right"  data-aos-duration="1200" className='flex flex-col justify-center  items-center gap-1 shadow-lg '>
           <img src="https://i.postimg.cc/bJqc2f0F/oracle-logo.png" alt="" />
          </div>
        
        </SwiperSlide>
        <SwiperSlide>
        <div  data-aos="fade-right"  data-aos-duration="1200"  className='flex flex-col justify-center  items-center gap-1 shadow-lg '>
           <img src="https://i.postimg.cc/gc5SCPXF/1-C6639340-google-logo.jpg" alt="" />
          </div>
      
        </SwiperSlide>
        <SwiperSlide>
        <div  data-aos="fade-right"  data-aos-duration="1200"  className='flex flex-col justify-center items-center gap-1 shadow-lg '>
           <img src="https://i.postimg.cc/YSb8bcKP/image.png" alt="" />
          </div>
        </SwiperSlide>
        <SwiperSlide >
        <div  data-aos="fade-right"  data-aos-duration="1200"  className='flex flex-col justify-center  items-center gap-1 shadow-lg '>
           <img src="https://i.postimg.cc/sfkFpWJh/image.png" alt="" />
          </div>
        
        </SwiperSlide>
        <SwiperSlide >
        <div  data-aos="fade-right"  data-aos-duration="1200"  className='flex flex-col justify-center  items-center gap-1 shadow-lg '>
           <img src="https://i.postimg.cc/x1PWD4Vv/salesforce-red-hat-mashup-1200x600-091523.jpg" alt="" />
          </div>
        </SwiperSlide>
       
        <div className="autoplay-progress" slot="container-end">
          <svg viewBox="0 0 48 48" ref={progressCircle}>
            <circle cx="24" cy="24" r="20"></circle>
          </svg>
          <span ref={progressContent}></span>
        </div>
      </Swiper>
        </div>
    </div>
    );
};

export default Partnership;