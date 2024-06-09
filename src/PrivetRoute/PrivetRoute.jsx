import { useContext, useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css'
import { Context } from "../AuthProvider/Authprovider";
const PrivetRoute = ({ children }) => {
  
    const navigate = useNavigate();
    const { user, loading } = useContext(Context);
      console.log(loading)

    if (loading) {
        return (
            <SkeletonTheme color="#202020" highlightColor="#444">
                <div className="max-w-4xl mx-auto my-16">
                    <h1 className="text-center mb-7">
                        <Skeleton width={300} height={45} />
                    </h1>
                    <h1>
                    <Skeleton width={900} height={60} count={6} />
                    </h1>
                </div>
            </SkeletonTheme>
        );
    }

    if (!user) {
        return navigate("/errorpage");
    }

    return children;
};

export default PrivetRoute;
