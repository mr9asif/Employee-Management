import axios from "axios";
import { useContext, useEffect } from "react";

import { useNavigate } from "react-router-dom";
import { Context } from "../AuthProvider/Authprovider";


 const  axioxSecure = axios.create({
    baseURL:'https://as-12-server-weld.vercel.app',
    withCredentials:true
})

const UseAxiosSecure = () => {
         const {Signout} = useContext(Context); 
         const navigate = useNavigate()
    useEffect(()=>{
        axioxSecure.interceptors.response.use( res =>{
            return res
        }, error =>{
            console.log('error trac', error.response)
            if(error.response.status === 401 || error.response.status=== 403){
                console.log('log out user')
                Signout()
                .then(res=>{
                    console.log(res)
                    navigate('/login')
                })
                .catch(error=>{
                    console.log(error)
                })
            }
        })
    },[])
    
    return axioxSecure
};

export default UseAxiosSecure;