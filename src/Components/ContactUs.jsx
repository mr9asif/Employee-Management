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
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md mx-auto pt-32 mb-8">
            <h2 className="text-2xl font-bold mb-6 text-center">Contact Us</h2>
            <form onSubmit={handleSubmit}>
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
                    className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-600 transition duration-300"
                >
                    Submit
                </button>
            </form>
            
        </div>
    );
};

export default ContactUs;
