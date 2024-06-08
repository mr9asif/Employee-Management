import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { Context } from "../AuthProvider/Authprovider";
import useUserRole from "../Hook/useUserRole";


const Navbar = () => {
    const {user, Signout}=useContext(Context);
    const { role, loading } = useUserRole();
    console.log(user)
    return (
        <div className="max-w-8xl mx-auto bg-black fixed z-30 bg-opacity-30 ">
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
                            <NavLink to='/dashboard' className={({ isActive }) => isActive ? 'text-green-600 font-bold' : 'text-black font-bold'}>DASHBOARD</NavLink>
                            <NavLink to='/about' className={({ isActive }) => isActive ? 'text-green-600 font-bold' : 'text-black font-bold'}>ABOUT US</NavLink>
                          {
                              <NavLink to='/shop/salad' className={({ isActive }) => isActive ? 'text-green-600 font-bold' : 'text-black font-bold'}>OUR SHOP</NavLink>
                          }
                        </ul>
                    </div>
                    <div className="flex flex-col justify-center items-center px-5">
                        <h1 className="text-2xl font-extrabold text-blue-600">EMPOWER<span className="text-orange-500">MANAGE</span></h1>
                        <h1 className="text-[13px] tracking-[9px] font-bold text-white">COMPANY</h1>
                    </div>
                </div>
                <div className="navbar-end">
                    <div className="hidden lg:flex justify-center items-center">
                        <ul className="menu menu-horizontal px-1 gap-5">
                            <NavLink to='/' className={({ isActive }) => isActive ? 'text-green-600 font-bold' : 'text-white font-bold'}>HOME</NavLink>
                            <NavLink to='/allservices' className={({ isActive }) => isActive ? 'text-green-600 font-bold' : 'text-white font-bold'}>ALL SERVICES</NavLink>
                            
                            <NavLink to='/about' className={({ isActive }) => isActive ? 'text-green-600 font-bold' : 'text-white font-bold'}>ABOUT US</NavLink>
                            {
                                 <NavLink to='/shop/salad' className={({ isActive }) => isActive ? 'text-green-600 font-bold' : 'text-white font-bold'}>OUR SHOP</NavLink>
                            }
                            {user && !loading && (
                                <>
                                  {role === 'HR' && <NavLink to="/hrdashboard"   className={({ isActive }) => isActive ? 'text-green-600 font-bold' : 'text-white font-bold'}>HR Dashboard</NavLink>}
                                  {role === 'Employee' && <NavLink to="/emdashboard"   className={({ isActive }) => isActive ? 'text-green-600 font-bold' : 'text-white font-bold'}>Employee Dashboard</NavLink>}
                                  {role === 'Admin' && <NavLink to="/admindashboard"   className={({ isActive }) => isActive ? 'text-green-600 font-bold' : 'text-white font-bold'}>Admin Dashboard</NavLink>}
                                </>
                              )}
                            
                        </ul>
                    </div>
                    <div className="mx-3 flex justify-center items-center gap-4">
                     {
                        user ? <div className="flex items-center gap-2">
                        <img className="w-[50px] h-[50px] rounded-[50%] border" src={user.photoURL} />
                        <Link to='/login'><button onClick={Signout} className="btn bg-green-500 hover:bg-green-700 text-white ">Sign Out</button></Link>
                        </div>: <div className="flex items-center gap-2">
                        <Link to='/signup' className="btn  bg-green-500 hover:bg-green-700 text-white ">Sign Up</Link>
                        <Link to='/login' className="btn bg-green-500 hover:bg-green-700 text-white ">Log In</Link>
                        </div>
                     }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;