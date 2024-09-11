import React from "react";
import Nav from "./Nav";
import { Link } from "react-router-dom";
import { ProductContext } from "./utils/Context";
import { useContext } from "react";
import Loader from "./Loader";

const Home = () => {
  const [products] = useContext(ProductContext);

  return products ? (
    <>
      <Nav />
      <div className="w-[85%] h-full p-5 flex flex-wrap gap-4 overflow-x-hidden overflow-y-auto">
        {products.map((elem, index) => (
          <Link key = {elem.id}
            to={`/details/${elem.id}`}
            className="hover:text-cyan-100 card p-5 rounded border-solid border-2 border-sky-500  shadow-md w-[18%] h-[45vh] flex-col flex justify-center items-center"
          >
            <div
              className="hover:scale-95 transition duration-300 ease-in-out w-full h-[80%]  bg-contain bg-no-repeat bg-center  mb-3"
              style={{
                backgroundImage:
                  `url(${elem.image})`,
              }}
            ></div>
            <h2 className="">{elem.title}</h2>
          </Link>
        ))}
      </div>
    </>
  ) : (
    <Loader />
  );
};

export default Home;
