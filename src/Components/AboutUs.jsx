import React from 'react';

const AboutUs = () => {
    return (
        <div className="container mx-auto p-6  pt-24 md:mb-">
            <div className="bg-white shadow-md rounded-lg p-8">
                <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-800 mb-4">About EmployeeManagement</h1>
                <p className="text-gray-700 mb-6">
                    Welcome to EmployeeManagement, where we provide top-notch services to help you manage your workforce efficiently and effectively. Our mission is to empower businesses with the tools and support they need to optimize their human resource processes.
                </p>
                
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Our Services</h2>
                <ul className="list-disc list-inside text-gray-700 mb-6">
                <li><strong>HR Management:</strong> Comprehensive HR solutions to manage employee data, benefits, payroll, and compliance.</li>
                    <li><strong>Employee Self-Service:</strong> A self-service portal where employees can view their information, request leaves, and manage their profiles.</li>
                    <li><strong>Performance Management:</strong> Tools to track employee performance, set goals, and conduct reviews.</li>
                    <li><strong>Recruitment Solutions:</strong> End-to-end recruitment services to attract, hire, and onboard top talent.</li>
                    <li><strong>Training and Development:</strong> Programs and resources to help employees develop their skills and advance their careers.</li>
                    <li><strong>Time and Attendance:</strong> Systems to track employee time, attendance, and manage shifts.</li>
                    <li><strong>Compliance Management:</strong> Ensure your company adheres to all local, state, and federal employment laws and regulations.</li>
                </ul>

                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Our Team</h2>
                <p className="text-gray-700 mb-6">
                    Our team is composed of experienced HR professionals, software engineers, and customer support specialists dedicated to providing you with the best service possible. We believe in continuous improvement and innovation to meet the evolving needs of our clients.
                </p>

                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Contact Us</h2>
                <p className="text-gray-700">
                    We would love to hear from you! Whether you have questions about our services, need support, or want to provide feedback, feel free to reach out to us.
                </p>
                <p className="text-gray-700">
                    Email: support@employeemanagement.com
                </p>
                <p className="text-gray-700">
                    Phone: (123) 456-7890
                </p>
            </div>
        </div>
    );
};

export default AboutUs;
