import axios from "./utils/axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Loader from "./Loader";

const Details = () => {
  const [products, setproducts] = useState(null);
  const { id } = useParams(); //useParams used to get the id of the products in the product list

  const getSingleProduct = async () => {
    try {
      const { data } = await axios.get(`/products/${id}`);
      setproducts(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSingleProduct();
  }, []);
  return products ? (
    <div className="w-[75%] flex h-full pl-0 m-auto p-[10%]">
      <img
        className="object-contain h-[74%] w-[50% ]"
        src={`${products.image}`}
        alt=""
      />
      <div className="content h-[60%] justify-normal flex flex-col gap-4 pl-4 m-auto  ]">
        <h2 className="text-3xl">{`${products.title}`}</h2>
        <p>{`${products.description}`}</p>
        <p className="text-zinc-600">{`${products.category}`}</p>
        <h2 className="text-green-400">{`$ ${products.price}`}</h2>
        <div className="flex  gap-3">
          <Link className="p-2 border rounded">Edit</Link>
          <Link className=" p-2 pl-2 border rounded text-red-400">Delete</Link>
        </div>
      </div>
    </div>
  ) : (
    <Loader />
  );
};

export default Details;
