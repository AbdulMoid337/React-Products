import React, { useEffect, useState } from "react";
import Nav from "./Nav";
import { Link, useLocation } from "react-router-dom";
import { ProductContext } from "./utils/Context";
import { useContext } from "react";
import Loader from "./Loader";
import axios from "./utils/axios";

const Home = () => {
  const [products] = useContext(ProductContext);
  const { search } = useLocation();
  const category = decodeURIComponent(search.split("=")[1]);

  const [filteredProducts, setFilteredProducts] = useState(null);

  const getProductsbycategory = async () => {
    try {
      const { data } = await axios.get(`/products/category/${category}`);
      setFilteredProducts(data);
    } catch (error) {
      console.error("Error fetching products by category:", error);
    }
  };

  useEffect(() => {
    if (!filteredProducts || category === "undefined") setFilteredProducts(products);

    if (category && category !== "undefined") {
      // getProductsbycategory();
      setFilteredProducts(products.filter((p) => p.category == category))
    }
  }, [category, products]);

  return products ? (
    <>
      <Nav />
      <div className="w-full lg:w-[80%] p-5 flex flex-wrap gap-6 my-6 overflow-x-hidden overflow-y-auto bg-gray-900">
        {filteredProducts &&
          filteredProducts.map((elem, index) => (
            <Link
              key={elem.id}
              to={`/details/${elem.id}`}
              className="hover:text-cyan-100 card p-5 rounded border-solid border-2 border-blue-400 shadow-lg w-full sm:w-[48%] md:w-[31%] lg:w-[22%] h-[45vh] flex-col flex justify-center items-center transition-transform transform hover:scale-105 duration-300"
            >
              <div
                className="aspect-[1/3] w-full h-[80%] bg-contain bg-no-repeat bg-center mb-3 hover:scale-95 transition-transform duration-300"
                style={{
                  backgroundImage: `url(${elem.image})`,
                }}
              ></div>
              <h2 className="text-center text-white text-sm">{elem.title}</h2>
            </Link>
          ))}
      </div>
    </>
  ) : (
    <Loader />
  );
};

export default Home;
