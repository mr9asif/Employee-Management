import { useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import toast from 'react-hot-toast';
import { FaEye, FaEyeSlash } from 'react-icons/fa6';
import { Context } from '../AuthProvider/Authprovider';
import useSecurePublic from '../Hook/useSecurePublic';

const imageFromImgbb = import.meta.env.VITE_IMGBB_API;
console.log(import.meta.env.VITE_IMGBB_API)
const imageUrl = `https://api.imgbb.com/1/upload?key=${imageFromImgbb}`;

const Signup = () => {
  const { CreateUser, Profile } = useContext(Context);
  const [error, setError] = useState('');
  const location = useLocation();
  const dis = location.state || '/';
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const axiosSecurePublic = useSecurePublic();

  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    try {
      console.log(data);
      const Carent = await CreateUser(data.email, data.password);
      console.log(Carent.user);

      const imageFile = new FormData();
      imageFile.append("image", data.image[0]);

      const res = await axiosSecurePublic.post(imageUrl, imageFile, {
        headers: { "content-type": "multipart/form-data" },
      });

      if (res.data.success) {
        const uploadedImageUrl = res.data.data.display_url;
        const Role = res.data.data.role;

        await Profile(data.DisplayName, uploadedImageUrl, Role);

        const userInfo = {
          name: data.DisplayName,
          email: data.email,
          role: data.role,
          photoURL: uploadedImageUrl
        };

        await axiosSecurePublic.post('/users', userInfo);

        toast.success('Sign up successfully!');
        navigate(dis);
      } else {
        setError('Image upload failed.');
      }
    } catch (error) {
      console.log(error);
      setError(error.message);
    }
  };

  return (
    <div className="max-w-7xl mx-auto py-10 style">
      <div className="hero min-h-screen">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <img className='w-full' src='https://i.postimg.cc/BZM8NsMS/sign-up-8044864-6430773.png' alt="" />
          </div>
          <div className="card shrink-0 w-full max-w-sm">
            <form onSubmit={handleSubmit(onSubmit)} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="text-xl font-semibold">Name</span>
                </label>
                <input type="text" {...register("DisplayName", { required: true })} placeholder="Display Name" className="input input-bordered" required />
              </div>
              <div>
                <label>
                  <h1 className="text-xl font-semibold my-4">Image*</h1>
                  <input
                    {...register("image", { required: true })}
                    type="file"
                    className="file-input w-full max-w-xs"
                  />
                </label>
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="text-xl font-semibold">Email</span>
                </label>
                <input type="email" {...register("email", { required: true })} placeholder="Email" className="input input-bordered" required />
                {errors.email && <span>Email is required</span>}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="text-xl font-semibold">Password</span>
                </label>
                <div className="relative">
                  <input type={show ? "text" : 'password'} {...register("password", {
                    required: true,
                    minLength: 6,
                    pattern: {
                      value: /^(?=.*[A-Z])(?=.*[!@#$%^&*]).{6,}$/,
                      message: "Password must contain at least one capital letter and one special character"
                    }
                  })} placeholder="Password" className="input input-bordered w-full" required />
                  <span className="absolute top-4 right-3" onClick={() => setShow(!show)}>{show ? <FaEye /> : <FaEyeSlash />}</span>
                </div>
                {errors.password && errors.password.type === "pattern" && (
                  <p className="text-red-500">Password must contain at least one capital letter and one special character.</p>
                )}
                {errors.password && errors.password.type === "minLength" && (
                  <p className="text-red-500">Password must be at least 6 characters long.</p>
                )}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="text-xl font-semibold">Role</span>
                </label>
                <select {...register("role", { required: true })} className="input input-bordered" required>
                  <option value="">Select Role</option>
                  <option value="HR">HR</option>
                  <option value="Employee">Employee</option>
                </select>
                {errors.role && <span>Role is required</span>}
              </div>
              <label className="label">
                <h1 className="label-text-alt text-[15px]">Already Registered? Go to <Link to='/login' className="font-bold underline relative">Login</Link></h1>
              </label>
              <h1 className='my-4 text-red-400'>{error}</h1>
              <div className="form-control mt-6">
                <button type='submit' className="btn btn-primary bg-orange-400 hover:bg-orange-700">Sign Up</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
