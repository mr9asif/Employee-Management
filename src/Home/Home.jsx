import AboutUs from "./AboutUs";
import Achievement from "./Achievement";
import Banner from "./Banner";

import Partnership from "./Partnership";

import Question from "./Question";
import Services from "./Services";
import Testimonial from "./Testimonial";


const Home = () => {
    return (
        <div>
           <Banner></Banner>
           <AboutUs></AboutUs>
           <Services></Services>
           <Question></Question>
           <Achievement></Achievement>
           <Partnership></Partnership>
           <Testimonial></Testimonial>
          
        </div>
    );
};

export default Home;