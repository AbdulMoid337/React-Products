import React, { useContext, useState } from "react";
import { ProductContext } from "./utils/Context";
import { Link, useLocation } from "react-router-dom";

const Nav = () => {
  const { cart, products } = useContext(ProductContext);
  const { pathname, search } = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  let unique = products && products.reduce((acc, cv) => [...acc, cv.category], []);
  unique = [...new Set(unique)];

  const isActive = (category) => {
    return search === `?category=${category}` ? 'bg-blue-600' : '';
  };

  return (
    <>
      {/* Mobile Nav */}
      <div className="lg:hidden">
        <div className="flex items-center justify-between p-4 bg-blue-600 text-white">
          <Link to="/" className="text-2xl font-bold text-golden-400">FakeStore</Link>
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
        </div>
        {isMenuOpen && (
          <div className="bg-blue-500 text-white p-4">
            <Link
              to="/create"
              className="block w-full py-2 px-4 bg-green-500 hover:bg-green-600 rounded-md text-center transition duration-300"
              onClick={() => setIsMenuOpen(false)}
            >
              Add New Product
            </Link>
            <h2 className="text-xl mb-3">Categories</h2>
            <ul className="space-y-2">
              {unique.map((category, index) => (
                <li key={index}>
                  <Link
                    to={`/?category=${category}`}
                    className={`block py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300 ${isActive(category)}`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {category}
                  </Link>
                </li>
              ))}
            </ul>
            <Link
              to="/cart"
              className="block py-2 px-4 text-white bg-blue-500 rounded mt-2"
            >
              Cart ({cart.length})
            </Link>
          </div>
        )}
      </div>

      {/* Desktop Nav */}
      <nav className="hidden lg:block fixed left-0 top-0 w-64 h-full bg-blue-600 text-white p-6 space-y-6 overflow-y-auto">
        <Link to="/" className="text-2xl font-bold text-golden-400">FakeStore</Link>
        
        <Link
          to="/create"
          className="block w-full py-2 px-4 bg-golden-500 hover:bg-golden-600 text-blue-900 rounded-md text-center transition duration-300 transform hover:scale-105"
        >
          Add New Product
        </Link>

        <div>
          <h2 className="text-xl mb-3">Categories</h2>
          <ul className="space-y-2">
            {unique.map((category, index) => (
              <li key={index}>
                <Link
                  to={`/?category=${category}`}
                  className={`block py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300 ${isActive(category)}`}
                >
                  {category}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <Link
          to="/cart"
          className="block w-full py-2 px-4 bg-blue-500 hover:bg-blue-600 rounded-md text-center transition duration-300"
        >
          Cart ({cart.length})
        </Link>

        {pathname !== "/" && (
          <Link
            to="/"
            className="block w-full py-2 px-4 bg-gray-700 hover:bg-gray-600 rounded-md text-center transition duration-300"
          >
            Back to Home
          </Link>
        )}
      </nav>
    </>
  );
};

export default Nav;
