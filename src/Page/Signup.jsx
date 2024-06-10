import { useContext, useState, useEffect } from 'react';
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
  const { CreateUser, Profile, setLoading } = useContext(Context);
  const [error, setError] = useState('');
  const [salary, setSalary] = useState('');
  const [designation, setDesignation] = useState('');
  const location = useLocation();
  const dis = location.state || '/';
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const axiosSecurePublic = useSecurePublic();

  const { register, handleSubmit, formState: { errors }, watch } = useForm();
  const watchRole = watch("role");

  const generatedNumbers = new Set();

  // Function to generate a unique 6-7 digit bank account number
  const generateUniqueNumber = () => {
    let uniqueNumber;
    do {
      uniqueNumber = Math.floor(100000 + Math.random() * 9000000).toString();
    } while (generatedNumbers.has(uniqueNumber));
    generatedNumbers.add(uniqueNumber);
    return uniqueNumber;
  };


  useEffect(() => {
   
    
    if (watchRole === "Employee") {
      switch (designation) {
        case "sales":
          setSalary(30000);
          break;
        case "social":
          setSalary(35000);
          break;
        case "digital":
          setSalary(40000);
          break;
        default:
          setSalary(30000); // Default salary for employees if no designation is selected
      }
    } else if (watchRole === "HR") {
      setSalary(45000); // Default salary for HR role
    } else {
      setSalary(''); // Clear salary if no role is selected
    }
  }, [designation, watchRole]);

  const onSubmit = async (data) => {
    const {email}=data
    try {
      console.log("Form data:", data);
      const Carent = await CreateUser(data.email, data.password);
      console.log("Created user:", Carent.user);

      const imageFile = new FormData();
      imageFile.append("image", data.image[0]);

      const res = await axiosSecurePublic.post(imageUrl, imageFile, {
        headers: { "content-type": "multipart/form-data" },
      });

      console.log("Image upload response:", res.data);

      if (res.data.success) {
        const uploadedImageUrl = res.data.data.display_url;
        const Role = data.role; // Use the role from form data

        await Profile(data.DisplayName, uploadedImageUrl, Role);

        const userInfo = {
          name: data.DisplayName,
          email: data.email,
          role: data.role,
          designation: data.designation,
          salary: salary,
          photoURL: uploadedImageUrl,
          isVerified: false,
          bank_account:generateUniqueNumber()
        };

        const userResponse = await axiosSecurePublic.post('/users', userInfo);

        console.log("User info saved response:", userResponse.data);

        toast.success('Sign up successfully!');
        navigate(dis);
        const us = { email };
        navigate('/');
        axiosSecurePublic.post('/jwt', us ,  {withCredentials:true})
        .then(res => {
          console.log(res.data);
          setLoading(false)
})
.catch(error => {
console.log(error.message);
});

      } else {
        setError('Image upload failed.');
      }
    } catch (error) {
      console.log("Signup error:", error);
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
              {watchRole === "Employee" && (
                <>
                  <div className="form-control">
                    <label className="label">
                      <span className="text-xl font-semibold">Designation</span>
                    </label>
                    <select {...register("designation", { required: true })} className="input input-bordered" required onChange={(e) => setDesignation(e.target.value)}>
                      <option value="">Select Designation</option>
                      <option value="sales"> Sales Assistant</option>
                      <option value="social">Social Media executive</option>
                      <option value="digital"> Digital Marketer</option>
                    </select>
                    {errors.designation && <span>Designation is required</span>}
                  </div>
                  <div className="form-control">
                    <label className="label">
                      <span className="text-xl font-semibold">Salary</span>
                    </label>
                    <input type="number" {...register("salary", { required: true, valueAsNumber: true })} placeholder="Your Salary" className="input input-bordered" value={salary} readOnly />
                    {errors.salary && <span>Salary is required</span>}
                  </div>
                </>
              )}
              {watchRole === "HR" && (
                <div className="form-control">
                  <label className="label">
                    <span className="text-xl font-semibold">Salary</span>
                  </label>
                  <input type="number" {...register("salary", { required: true, valueAsNumber: true })} placeholder="Your Salary" className="input input-bordered" value={salary} readOnly />
                  {errors.salary && <span>Salary is required</span>}
                </div>
              )}
              <label className="label">
                <h1 className="label-text-alt text-[15px]">Already Registered? Go to <Link to='/login' className="font-bold underline relative">Login</Link></h1>
              </label>
              <h1 className='my-4 text-red-400'>{error}</h1>
              <div className="form-control mt-6">
                <button type='submit' className="btn btn-primary  bg-gradient-to-r from-blue-500 to-teal-400 hover:bg-green-700">Sign Up</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
