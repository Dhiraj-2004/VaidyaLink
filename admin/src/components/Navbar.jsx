import React, { useContext } from "react";
import { AdminContext } from "../context/AdminContext";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { aToken, setAToken } = useContext(AdminContext);
  const navigate = useNavigate();

  const logout = () => {
    navigate('/');
    aToken && setAToken("");
    aToken && localStorage.removeItem("aToken");
  };

  return (
    <div className="flex justify-between items-center px-4 sm:px-10 py-3 border-b bg-white">
      {/* Left */}
      <div className="flex items-center gap-2 text-xs">
        <img
          src={assets.admin_logo}
          alt="Logo"
          className="w-36 sm:w-40 cursor-pointer"
        />
        <span className="px-2.5 py-0.5 text-xs border border-gray-500 rounded-full text-gray-600">
          {aToken ? 'Admin' : 'Doctor'}
        </span>

      </div>
      <button onClick={logout} className="bg-primary text-white px-10 py-2 rounded-full">Logout</button>
    </div>
  );
};

export default Navbar;
