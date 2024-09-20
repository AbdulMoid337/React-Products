import React, { useState } from "react";
import { Link } from "react-router-dom";

const Nav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      {/* Mobile Nav */}
      <div className="lg:hidden">
        <div className="flex items-center justify-between p-4 bg-blue-600 text-white">
          <Link to="/" className="text-2xl font-bold text-golden-400">ShopWave</Link>
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white focus:outline-none">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
            </svg>
          </button>
        </div>
        {isMenuOpen && (
          <div className="bg-blue-500 text-white p-4">
            <Link to="/" className="block py-2">Home</Link>
            <Link to="/create" className="block py-2">Add New Product</Link>
            {/* Remove the Cart link from here */}
          </div>
        )}
      </div>

      {/* Desktop Nav */}
      <nav className="hidden lg:block fixed left-0 top-0 w-64 h-full bg-blue-600 text-white p-6 space-y-6 overflow-y-auto">
        <Link to="/" className="text-2xl font-bold text-golden-400">ShopWave</Link>
        
        <Link
          to="/create"
          className="block w-full py-2 px-4 bg-golden-500 hover:bg-golden-600 text-blue-900 rounded-md text-center transition duration-300 transform hover:scale-105"
        >
          Add New Product
        </Link>

        <div className="space-y-2">
          <Link to="/" className="block py-2 px-4 hover:bg-blue-700 rounded-md transition duration-300">Home</Link>
          {/* Remove the Cart link from here */}
        </div>
      </nav>
    </>
  );
};

export default Nav;
