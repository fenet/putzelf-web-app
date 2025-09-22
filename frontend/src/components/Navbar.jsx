import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png"; // place your logo in frontend/src/assets/

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md p-4 flex items-center justify-between">
      {/* Logo */}
      <Link to="/" className="flex items-center space-x-2">
        <img src={logo} alt="PutzELF" className="h-10 w-auto" />
        <span className="text-xl font-bold text-blue-600">putzELF</span>
      </Link>

      {/* Nav Links */}
      <div className="space-x-6">
        <Link to="/" className="text-gray-700 hover:text-blue-600">
          Home
        </Link>
        <Link to="/search/order" className="text-gray-700 hover:text-blue-600">
          Book
        </Link>
        <Link to="/about" className="text-gray-700 hover:text-blue-600">
          About
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;

