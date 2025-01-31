import { useContext, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Context } from "../AuthProvider/Authprovider";
import useUserRole from "../Hook/useUserRole";
import useSecurePublic from "../Hook/useSecurePublic";

const Navbar = () => {
    const { user, Signout } = useContext(Context);
    const { role, loading } = useUserRole();
    const axiosSecurePublic = useSecurePublic();
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const handleSignOut = async () => {
        await Signout();
        axiosSecurePublic.post('/logout', {}, { withCredentials: true });
    };

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    const closeDropdown = () => {
        setDropdownOpen(false);
    };

    return (
        <div className="max-w-8xl mx-auto bg-black fixed z-30 bg-opacity-30">
            <div className="navbar bg-black fixed z-10 bg-opacity-30 h-[70px]">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                            </svg>
                        </div>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                            <NavLink to='/' className={({ isActive }) => isActive ? 'text-green-600 font-bold' : 'text-black font-bold'}>HOME</NavLink>
                            <NavLink to='/allservices' className={({ isActive }) => isActive ? 'text-green-600 font-bold' : 'text-black font-bold'}>ALL SERVICES</NavLink>
                            <NavLink to='/about' className={({ isActive }) => isActive ? 'text-green-600 font-bold' : 'text-black font-bold'}>ABOUT US</NavLink>
                            {role === 'Admin' && <NavLink to='/message' className={({ isActive }) => isActive ? 'text-green-600 font-bold' : 'text-black font-bold'}>Message</NavLink>}
                            {user && !loading && (
                                <>
                                    {role === 'HR' && <NavLink to="/hrdashboard" className={({ isActive }) => isActive ? 'text-green-600 font-bold' : 'text-white font-bold'}>HR Dashboard</NavLink>}
                                    {role === 'Employee' && <NavLink to="/emdashboard" className={({ isActive }) => isActive ? 'text-green-600 font-bold' : 'text-white font-bold'}>Employee Dashboard</NavLink>}
                                    {role === 'Admin' && <NavLink to="/admindashboard" className={({ isActive }) => isActive ? 'text-green-600 font-bold' : 'text-white font-bold'}>Admin Dashboard</NavLink>}
                                </>
                            )}
                            {!user && !loading && (
                                <>
                                    {role === 'Admin' && <NavLink to='/message' className={({ isActive }) => isActive ? 'text-green-600 font-bold' : 'text-white font-bold'}>Message</NavLink>}
                                </>
                            )}
                            <NavLink to='/contactus' className={({ isActive }) => isActive ? 'text-green-600 font-bold' : 'text-black font-bold'}>Contact Us</NavLink>
                        </ul>
                    </div>
                    <div className="flex justify-center items-center ">
                        <img className="w-[60px] md:w-[80px] lg:w-[90px]" src="https://i.postimg.cc/9FSVW6B2/company-logo-transparent-png-19.png" alt="Logo" />
                        <h1 className="text-[13px] md:text-[18px] lg:text-xl font-extrabold text-blue-600">EMPOWER<span className="text-orange-500">MANAGE</span></h1>
                    </div>
                </div>
                <div className="navbar-end">
                    <div className="hidden lg:flex justify-center items-center">
                        <ul className="menu menu-horizontal px-1 gap-5">
                            <NavLink to='/' className={({ isActive }) => isActive ? 'text-green-600 font-bold' : 'text-white font-bold'}>Home</NavLink>
                            <NavLink to='/allservices' className={({ isActive }) => isActive ? 'text-green-600 font-bold' : 'text-white font-bold'}>All Service</NavLink>
                            <NavLink to='/about' className={({ isActive }) => isActive ? 'text-green-600 font-bold' : 'text-white font-bold'}>About Us</NavLink>
                            {role === 'Admin' && <NavLink to='/message' className={({ isActive }) => isActive ? 'text-green-600 font-bold' : 'text-white font-bold'}>Message</NavLink>}
                            {user && !loading && (
                                <>
                                    {role === 'HR' && <NavLink to="/hrdashboard" className={({ isActive }) => isActive ? 'text-green-600 font-bold' : 'text-white font-bold'}>HR Dashboard</NavLink>}
                                    {role === 'Employee' && <NavLink to="/emdashboard" className={({ isActive }) => isActive ? 'text-green-600 font-bold' : 'text-white font-bold'}>Employee Dashboard</NavLink>}
                                    {role === 'Admin' && <NavLink to="/admindashboard" className={({ isActive }) => isActive ? 'text-green-600 font-bold' : 'text-white font-bold'}>Admin Dashboard</NavLink>}
                                </>
                            )}
                            {!user && !loading && (
                                <>
                                    {role === 'Admin' && <NavLink to='/message' className={({ isActive }) => isActive ? 'text-green-600 font-bold' : 'text-white font-bold'}>Message</NavLink>}
                                </>
                            )}
                                 <NavLink to='/contactus' className={({ isActive }) => isActive ? 'text-green-600 font-bold' : 'text-white font-bold'}>Contact Us</NavLink>
                        </ul>
                    </div>
                    <div className="mx-3 flex justify-center items-center gap-4">
                        {user ? (
                            <div className="relative">
                                <img
                                    onClick={toggleDropdown}
                                    className="w-[50px] h-[50px] rounded-full border cursor-pointer"
                                    src={user.photoURL}
                                    alt="User Avatar"
                                />
                                {dropdownOpen && (
                                    <div className="absolute right-0 mt-2 w-32 bg-white rounded-md shadow-lg z-20">
                                        <button
                                            onClick={() => {
                                                handleSignOut();
                                                closeDropdown();
                                            }}
                                            className="block w-full text-left px-3 rounded-lg   py-2 text-sm text-white bg-gradient-to-r from-blue-500 to-teal-400 hover:bg-blue-700"
                                        >
                                            Sign Out
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="flex items-center gap-1 md:gap-2 lg:gap-2">
                                <Link to='/signup' className="btn bg-gradient-to-r from-blue-500 to-teal-400 hover:bg-blue-700 text-white">Sign Up</Link>
                                <Link to='/login' className="btn bg-gradient-to-r from-blue-500 to-teal-400 hover:bg-blue-700 text-white">Log In</Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
