import React, { useContext, useState } from "react";
import { AdminContext } from "../context/AdminContext.jsx";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
  const [role, setRole] = useState('Admin');
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const {setAToken, backendUrl} = useContext(AdminContext)

  const onSubmitHandler = async(e) => {
    e.preventDefault()

    try {
        if(role === 'Admin') {
            const {data} = await axios.post(backendUrl + 'api/admin/login', {email, password})
            if(data.success) {
                localStorage.setItem('aToken', data.token)
                setAToken(data.token)
                toast.success(data.message || 'Login successful')
            }
            else {
                toast.error(data.message || 'Login failed')
            }
        }
        else {
            const {data} = await axios.post(backendUrl + 'api/doctor/login', {email, password})
            if(data.success) {
                localStorage.setItem('dToken', data.token)
                toast.success(data.message || 'Login successful')
                // Handle doctor login - you may want to add doctor context
            }
            else {
                toast.error(data.message || 'Login failed')
            }
        }
        
    } catch (error) {
        toast.error(error.response?.data?.message || 'An error occurred during login')
    }
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="min-h-[80vh] flex items-center justify-center"
    >
      <div className="flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl shadow-lg text-sm text-zinc-600">

        {/* Title */}
        <p className="text-2xl font-semibold m-auto">
          <span className="text-primary">{role}</span> Login
        </p>

        {/* Email */}
        <div className="w-full">
          <p className="mb-1">Email</p>
          <input
            className="border border-[#DADADA] rounded w-full p-2 focus:outline-none focus:border-primary"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        {/* Password */}
        <div className="w-full">
          <p className="mb-1">Password</p>
          <input
            className="border border-[#DADADA] rounded w-full p-2 focus:outline-none focus:border-primary"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {/* Button */}
        <button
          type="submit"
          className="bg-primary text-white w-full py-2 rounded-md text-base font-medium hover:opacity-90 transition"
        >
          Login
        </button>

        {/* Switch */}
        {
            role === 'Admin'
            ? <p>Doctor Login ? <span className="text-primary underline cursor-pointer" onClick={() => setRole('Doctor')}>Click Here</span></p>
            : <p>Admin Login ? <span className="text-primary underline cursor-pointer" onClick={() => setRole('Admin')}>Click Here</span></p>
        }

      </div>
    </form>
  );
};

export default Login;
