import Team from "../Components/Team";
import AboutUs from "./AboutUs";
import Achievement from "./Achievement";
import Banner from "./Banner";

import Partnership from "./Partnership";

import Question from "./Question";
import Services from "./Services";
import Testimonial from "./Testimonial";


const Home = () => {
    window.scrollTo(0,0)
    return (
        <div>
           <Banner></Banner>
           <AboutUs></AboutUs>
           <Services></Services>
           <Question></Question>
           <Achievement></Achievement>
           <Partnership></Partnership>
           <Team></Team>
           <Testimonial></Testimonial>
          
        </div>
    );
};

export default Home;