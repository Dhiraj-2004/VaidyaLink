import React from "react";
import { NavLink } from "react-router-dom";
import { assets } from "../assets/assets";

const Navbar = () => {
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
      <div>
        <button className="bg-primary text-white rounded-lg hover:bg-primary/90 transition">
          Create Account
        </button>
      </div>
    </div>
  );
};

export default Navbar;
