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
            <div className="max-w-4xl mx-auto  text-center pt-80 mb-96"><span className="loading loading-bars text-blue-600 text-center loading-lg"></span></div>
        );
    }

    if (!user) {
        return navigate("/login");
    }

    return children;
};

export default PrivetRoute;
