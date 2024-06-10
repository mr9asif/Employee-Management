import React, { useState } from 'react';
import useSecurePublic from '../Hook/useSecurePublic';
import toast from 'react-hot-toast';

const ContactUs = () => {
    const [email, setEmail] = useState('');  // State to handle the email input
    const [message, setMessage] = useState('');
    const [formMessage, setFormMessage] = useState('');
    const axiosSecurePublic = useSecurePublic();  // Custom hook for Axios instance

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = { email, message };

        axiosSecurePublic.post('/message', formData)
            .then(res => {
                toast.success('Your message has been sent successfully!');
                setEmail('');  // Clear email field on success
                setMessage('');  // Clear message field on success
            })
            .catch(error => {
                setFormMessage('There was an error sending your message. Please try again.');
                console.error('Error posting message:', error);
            });
    };

    return (
    
        <div className='pt-24 md:pt-52 lg:pt-24 mb-4 md:mb-72 lg:mb-6'>
           <div className="bg-gradient-to-r from-blue-500 to-teal-400 p-8 rounded-lg shadow-lg w-[96%] max-w-md mx-auto   ">
           <h2 className="text-3xl font-bold mb-6 text-center text-white">We'd love to hear from you!</h2>
           <p className="text-center text-white mb-6">support@employeemanagement.com</p>
           <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
               <div className="mb-4">
                   <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                       Email:
                   </label>
                   <input
                       type="email"
                       id="email"
                       name="email"
                       className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                       value={email}
                       onChange={(e) => setEmail(e.target.value)}
                       required
                   />
               </div>
               <div className="mb-4">
                   <label htmlFor="message" className="block text-gray-700 font-medium mb-2">
                       Message:
                   </label>
                   <textarea
                       id="message"
                       name="message"
                       rows="4"
                       className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                       value={message}
                       onChange={(e) => setMessage(e.target.value)}
                       required
                   ></textarea>
               </div>
               <button
                   type="submit"
                   className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition duration-300"
               >
                   Send
               </button>
               {formMessage && <p className="mt-4 text-red-500 text-center">{formMessage}</p>}
           </form>
           </div>
        </div>
    );
};

export default ContactUs;
