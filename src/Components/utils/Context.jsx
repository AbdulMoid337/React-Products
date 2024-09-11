import React, { createContext, useEffect, useState } from "react";
import axios from "./axios";

export const ProductContext = createContext();

const Context = (props) => {
  const [products, setproducts] = useState(null);

  const getProducts = async () => {
    try {
      const { data } = await axios("/products");
      setproducts(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <ProductContext.Provider value={[products, setproducts]}>
      {props.children}
    </ProductContext.Provider>
  );
};

export default Context;
