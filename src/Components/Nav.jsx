import React, { useContext } from "react";
import { ProductContext } from "./utils/Context";
import { Link } from "react-router-dom";

const Nav = () => {
  const [products] = useContext(ProductContext);

  let unique = products && products.reduce((acc, cv) => [...acc, cv.category], []);
  unique = [...new Set(unique)];

  const color = () => {
    return `rgba(${(Math.random() * 255).toFixed()},${(Math.random() * 255).toFixed()},${(Math.random() * 255).toFixed()},0.6)`;
  };

  return (
    <nav className="w-full lg:w-[20%] h-auto lg:h-full bg-gray-800 text-white flex flex-col items-center gap-6 p-6 shadow-lg transition duration-300 ease-in-out">
      <Link
        className="px-4 py-3 text-white bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg shadow hover:scale-105 transform transition-transform duration-300 ease-in-out w-full text-center"
        to="/create"
      >
        Add New Product
      </Link>

      <hr className="w-[80%] border-gray-600" />

      <h1 className="text-2xl mb-3 w-[80%] text-center">Category Filter</h1>
      <div className="w-[80%] p-1 space-y-4">
        {unique.map((elem, index) => (
          <Link
            key={index}
            to={`/?category=${elem}`}
            className="flex items-center mb-3 hover:text-gray-400 transition duration-300 ease-in-out"
          >
            <span
              style={{ backgroundColor: color() }}
              className="w-[15px] h-[15px] rounded-full mr-3 transition duration-300 ease-in-out"
            ></span>{" "}
            {elem}
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default Nav;
