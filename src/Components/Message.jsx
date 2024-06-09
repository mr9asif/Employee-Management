import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useSecurePublic from '../Hook/useSecurePublic';

const Message = () => {
      const axiosSecurePublic=useSecurePublic()
 

    const {data,}=useQuery({
        queryKey:['message'],
        queryFn:async()=>{
            axiosSecurePublic.get('/message')
            .then(res=>{
                console.log(res.data)
            })
        }
    })
    return (
        <div>
            
        </div>
    );
};

export default Message;