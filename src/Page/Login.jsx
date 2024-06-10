import React, { useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import toast from "react-hot-toast";
import { Context } from '../AuthProvider/Authprovider';
import axios from 'axios';
import useSecurePublic from '../Hook/useSecurePublic';

const Login = () => {
  const [show, setShow] = useState(false);
  const [error, setError] = useState('');
  const { GoogleLogin, GithubLogin, Login } = useContext(Context);
  const location = useLocation();
  const navigate = useNavigate();
  const from = location?.state || '/';
  const axiosSecurePublic = useSecurePublic();
  const { register, handleSubmit, formState: { errors } } = useForm();

  const handleSocialLogin = async (socialLogin) => {
    try {
      const result = await socialLogin();
      if (result.user) {
        const { email } = result.user;
        await axiosSecurePublic.post('/social', { email, role: 'Employee' });

        toast.success('You Login Successfully!');
        navigate(from);

        const us = { email };
        axiosSecurePublic.post('/jwt', us, { withCredentials: true })
          .then(res => {
            console.log(res.data);
          })
          .catch(error => {
            console.log(error.message);
          });
      }
    } catch (error) {
      console.error(error);
      setError('Failed to login with social account');
    }
  };

  const onSubmit = async (data) => {
    const { email, password } = data;
    try {
      const result = await Login(email, password);
      if (result.user) {
        
        const us = { email: result.user.email };
        axiosSecurePublic.post('/jwt', us, { withCredentials: true })
          .then(res => {
            console.log(res.data);
            toast.success('You successfully Login!')
            navigate(from)
          })
          .catch(error => {
            console.log(error.response); 
            if (error.response && error.response.status === 403) {
              setError('You are Fired By Admin! You can not access your previous Role!!');
            
            } else {
              toast.success('You Login Successfully!');
              navigate(from);
            }
          });
      }
    } catch (error) {
      console.error(error);
      setError('Invalid Email or Password!');
    }
  };
  
  

  return (
    <div className="md:flex lg:flex justify-between items-center max-w-6xl mx-auto px-5">
      <div className="w-[96%] mx-auto md:w-1/2 lg:w-1/2">
        <img src="https://i.postimg.cc/kG1kGwKb/userlog.png" alt="" />
      </div>

      <div className="hero min-h-screen max-w-8xl p-4 w-1/2">
        <div className="hero-content flex-col w-[90%]">
          <div className="card shrink-0 w-full shadow-2xl bg-base-100 p-6">
            <form onSubmit={handleSubmit(onSubmit)} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input type="email" {...register("email", { required: true })} name="email" placeholder="email" className="input input-bordered" required />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <div className="relative">
                  <input type={show ? "text" : 'password'} {...register('password', { required: true })} name="password" placeholder="password" className="input input-bordered w-full" required />
                  <span className="absolute top-4 right-3" onClick={() => setShow(!show)}>{show ? <FaEye /> : <FaEyeSlash />}</span>
                </div>
              </div>

              <div className="form-control mt-6">
                <button type='submit' className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-gradient-to-r from-blue-500 to-teal-400 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-400 focus:ring-opacity-50">
                  Sign in
                </button>
                <p className="text-red-400">{error}</p>
              </div>
            </form>

            <div onClick={() => handleSocialLogin(GoogleLogin)}>
              <a href="#" className="flex items-center justify-center px-6 py-3 mt-4 text-gray-600 transition-colors duration-300 transform border rounded-lg dark:border-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
                <svg className="w-6 h-6 mx-2" viewBox="0 0 40 40">
                  <path d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.045 27.2142 24.3525 30 20 30C14.4775 30 10 25.5225 10 20C10 14.4775 14.4775 9.99999 20 9.99999C22.5492 9.99999 24.8683 10.9617 26.6342 12.5325L31.3483 7.81833C28.3717 5.04416 24.39 3.33333 20 3.33333C10.7958 3.33333 3.33335 10.7958 3.33335 20C3.33335 29.2042 10.7958 36.6667 20 36.6667C29.2042 36.6667 36.6667 29.2042 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z" fill="#FFC107" />
                  <path d="M5.25497 12.2425L10.7308 16.2583C12.2125 12.59 15.8008 9.99999 20 9.99999C22.5491 9.99999 24.8683 10.9617 26.6341 12.5325L31.3483 7.81833C28.3716 5.04416 24.39 3.33333 20 3.33333C13.5983 3.33333 8.04663 6.94749 5.25497 12.2425Z" fill="#FF3D00" />
                  <path d="M20 36.6667C24.305 36.6667 28.2167 35.0192 31.1742 32.34L26.0159 27.975C24.3425 29.2425 22.2625 30 20 30C15.665 30 11.9842 27.2359 10.5975 23.3784L5.16254 27.5659C7.92087 32.9634 13.5225 36.6667 20 36.6667Z" fill="#4CAF50" />
                  <path d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.7592 25.1975 27.56 26.805 26.0133 27.9758C26.0142 27.975 26.015 27.975 26.0158 27.9742L31.1742 32.3392C30.8092 32.6708 36.6667 28.3333 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z" fill="#1976D2" />
                </svg>
                <span className="mx-2">Sign in with Google</span>
              </a>
            </div>

            <div className="mt-6 text-center">
              <a href="#" className="text-sm text-blue-500 dark:text-blue-400">
                Don’t have an account yet? <Link to='/signup' className='font-bold underline '>Sign up</Link>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
