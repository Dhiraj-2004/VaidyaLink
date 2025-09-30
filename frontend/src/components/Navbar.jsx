import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";

const Navbar = () => {

  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const [token, setToken] = useState(true);

  const navItems = [
    { name: "HOME", path: "/" },
    { name: "ALL DOCTORS", path: "/doctors" },
    { name: "ABOUT", path: "/about" },
    { name: "CONTACT", path: "/contact" },
  ];

  return (
    <div className="flex items-center justify-between py-4 mb-5 border-b border-gray-300">
      <img className="w-44 cursor-pointer" src={assets.logo} alt="Logo" />

      {/* Nav Links */}
      <ul className="hidden md:flex items-center gap-6 font-medium text-sm">
        {navItems.map(({ name, path }) => (
          <li key={name}>
            <NavLink
              to={path}
              className={({ isActive }) =>
                `block py-1 ${
                  isActive
                    ? "text-primary border-b-2 border-primary"
                    : "text-gray-700 hover:text-primary"
                }`
              }
            >
              {name}
            </NavLink>
          </li>
        ))}
      </ul>

      {/* Button */}
      <div className="flex items-center gap-4">
        {
          token
          ? <div className="flex items-center gap-2 cursor-pointer group relative">
              <img className="w-8 rounded-full" src={assets.profile_pic} alt="" />
              <img className="w-2.5" src={assets.dropdown_icon} alt="" />
              <div className="absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 hidden group-hover:block">
                <div className="min-w-48 bg-stone-100 rounded flex flex-col gap-4 p-4">
                  <p onClick={() => navigate('/my-profile')} className="hover:text-primary cursor-pointer">My Profile</p>
                  <p onClick={() => navigate('/my-appointments')} className="hover:text-primary cursor-pointer">My Appointments</p>
                  <p onClick={() => setToken(false)} className="hover:text-primary cursor-pointer">Logout</p>
                </div>
              </div>

            </div>

          : <button onClick={() => navigate('/login')} className="bg-primary text-white px-8 py-3 rounded-full font-light hidden md:block hover:bg-primary/90 transition">
              Create Account
            </button>
        }
        
      </div>
    </div>
  );
};

export default Navbar;
