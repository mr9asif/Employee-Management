import React from 'react';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';

const AchievementItem = ({ backgroundImage, endValue, prefix }) => {
    const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    return (
        <div
            ref={ref}
            className="relative text-center bg-cover bg-center bg-no-repeat h-48 md:h-96 flex items-center justify-center"
            style={{ backgroundImage: `url(${backgroundImage})` }}
        >
            <div className="absolute inset-0  bg-opacity-30 backdrop-blur-sm"></div>
            {inView && (
                <div className="relative z-10 bg-white bg-opacity-65 p-4 rounded">
                    <CountUp
                    start={0}
                    end={endValue}
                    duration={2.75}
                    separator=","
                    prefix={prefix}
                    suffix="+"
                    className="text-4xl text-yellow-700"
                    />
                </div>
            )}
        </div>
    );
};

const Achievement = () => {
    return (
        <div className="w-[95%]  lg:max-w-7xl mx-auto">
            <h1 className="text-2xl md:text-3xl lg:text-4xl mt-16 mb-5 text-yellow-600 text-center">Our Achievement</h1>
            <h1 className="tracking-[6px] mb-8 font-semibold lg:text-3xl text-center text-orange-800">Explore Our Achievement</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <AchievementItem
                    backgroundImage="https://i.postimg.cc/tg5q41qZ/best-project-management-companie.jpg"
                    endValue={2500}
                    prefix="Total Project "
                />
                <AchievementItem
                    backgroundImage="https://i.postimg.cc/1Xvt2tt6/financial-concept-online-business-profit-e-business-earn-money-on-internet-e-commerce-PE2-TD4.jpg"
                    endValue={4000000}
                    prefix="Earning $"
                />
                <AchievementItem
                    backgroundImage="https://i.postimg.cc/s22vP5gz/stock-photo-corporate-photo-smiling-diverse-employees-with-confident-executive-wearing-glasses-stand.jpg"
                    endValue={600}
                    prefix="Employees "
                />
                <AchievementItem
                    backgroundImage="https://i.postimg.cc/d0TmmM1w/happy-businessman-businesswoman-shaking-hands-600nw-2021639264.jpg"
                    endValue={140}
                    prefix="New Clients "
                />
            </div>
        </div>
    );
};

export default Achievement;
