import AboutUs from "./AboutUs";
import Achievement from "./Achievement";
import Banner from "./Banner";
import Question from "./Question";
import Services from "./Services";


const Home = () => {
    return (
        <div>
           <Banner></Banner>
           <AboutUs></AboutUs>
           <Services></Services>
           <Question></Question>
           <Achievement></Achievement>
        </div>
    );
};

export default Home;