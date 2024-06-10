import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useSecurePublic from '../Hook/useSecurePublic';

const Message = () => {
    const axiosSecurePublic = useSecurePublic();

    const { data, error, isLoading } = useQuery({
        queryKey: ['msg'],
        queryFn: async () => {
            const response = await axiosSecurePublic.get('/message');
            return response.data;
        }
    });

    if (isLoading) return <div className="max-w-4xl mx-auto  text-center pt-44 pb-96"><span className="loading loading-bars text-blue-600 text-center loading-lg"></span></div>;
    if (error) return <div className="text-center text-red-500">Error: {error.message}</div>;

    return (
        <div className='pt-24 container max-w-5xl mx-auto p-4'>
            <div className="bg-white shadow-md rounded-lg p-6">
                {data?.map((item, index) => (
                    <div key={index} className="border-b border-gray-200 py-4">
                        <h1 className="text-lg font-semibold text-gray-800">Email: {item.email}</h1>
                        <p className="text-gray-600">{item.message}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Message;
