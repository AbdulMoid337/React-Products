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
  const category =  decodeURIComponent(search.split("=")[1]) ;

  const [filteredProducts, setfilteredProducts] = useState(null);

  const getProductsbycategory = async () => {
    try {
      const { data } = await axios.get(`/products/category/${category}`);
      setfilteredProducts(data);
    } catch (error) {
      console.error("Error fetching products by category:", error);    }
  };

  useEffect(() => {
    if (!filteredProducts || category == "undefined") setfilteredProducts(products);
    
    if (category && category !== "undefined") {
      getProductsbycategory();
    }
  }, [category, products]);

//   const ProductProvider = ({ children }) => {
//   const [products, setProducts] = useState([]);

//   useEffect(() => {
//     // Fetch products from the API and set them
//     const fetchProducts = async () => {
//       const { data } = await axios.get("/products");
//       setProducts(data);
//     };
//     fetchProducts();
//   }, []);

//   return (
//     <ProductContext.Provider value={[products, setProducts]}>
//       {children}
//     </ProductContext.Provider>
//   );
// };

  

  return products ? (
    <>
      <Nav />
      <div className="w-[85%] h-full p-5 flex flex-wrap gap-4 my-6 overflow-x-hidden overflow-y-auto">
        {filteredProducts &&
          filteredProducts.map((elem, index) => (
            <Link
              key={elem.id}
              to={`/details/${elem.id}`}
              className="hover:text-cyan-100 card p-5 rounded border-solid border-2 border-sky-500  shadow-md w-[18%] h-[45vh] flex-col flex justify-center items-center"
            >
              <div
                className="hover:scale-95 transition duration-300 aspect-[1/3] ease-in-out w-full h-[80%]  bg-contain bg-no-repeat bg-center  mb-3"
                style={{
                  backgroundImage: `url(${elem.image})`,
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
