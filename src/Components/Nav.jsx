import React, { useContext } from "react";
import { ProductContext } from "./utils/Context";
import { Link } from "react-router-dom";

const Nav = () => {
  const [products] = useContext(ProductContext);

  let unique =
    products && products.reduce((acc, cv) => [...acc, cv.category], []);
  unique = [...new Set(unique)]; //Set unique things lata
  // console.log(unique);

  //to genreate random colors

  const color = () => {
    return `rgba(${(Math.random() * 255).toFixed()},${(
      Math.random() * 255
    ).toFixed()},${(Math.random() * 255).toFixed()},0.4)`;
  };

  return (
    <nav className="w-[15%] h-full bg-zinc-300 flex flex-col items-center gap-4 p-3">
      <a
        className="px-2 py-3  text-red-900 border border-sky-500  bg-purple-200"
        href="/create"
      >
        Add new Product
      </a>
      <hr className="w-[80%]" />
      <h1 className="text-2xl mb-3 w-[80%]">Category Filter</h1>
      <div className="w-[80%]  p-1 ">
        {unique.map((elem, index) => (
          <Link
            key={index}
            to={`/?category=${elem}`}
            className="flex items-center mb-3"
          >
            <span
              style={{ backgroundColor: color() }}
              className="w-[15px] h-[15px] rounded-full  mr-2"
            ></span>{" "}
            {elem}
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default Nav;
