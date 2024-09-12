import axios from "./utils/axios";
import React, { useContext, useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import Loader from "./Loader";
import { ProductContext } from "./utils/Context";

const Details = () => {
  const [goods, setGoods] = useContext(ProductContext);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams(); // useParams to get the id of the product
  const navigate = useNavigate();

  const getSingleProduct = async () => {
    try {
      const { data } = await axios.get(`/products/${id}`);
      setProduct(data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setError("Failed to fetch product details.");
      setLoading(false);
    }
  };

  useEffect(() => {
    if (goods && goods.length) {
      const foundProduct = goods.find((p) => p.id === id);
      if (foundProduct) {
        setProduct(foundProduct);
        setLoading(false);
      } else {
        getSingleProduct();
      }
    } else {
      getSingleProduct();
    }
  }, [goods, id]);

  const deleteHandler = (id) => {
    // Filter out the deleted product
    const filteredProducts = goods.filter((p) => p.id !== id);

    // Update context and localStorage
    setGoods(filteredProducts);
    localStorage.setItem("products", JSON.stringify(filteredProducts));

    // Redirect to the home page or product list
    navigate("/");
  };

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return product ? (
    <div className="w-[75%] flex h-full pl-0 m-auto p-[10%]">
      <img
        className="object-contain aspect-[2/3] h-[74%] w-[50%]"
        src={product.image}
        alt={product.title || "Product image"}
      />
      <div className="content h-[60%] flex flex-col gap-4 pl-4 m-auto">
        <h2 className="text-3xl">{product.title}</h2>
        <p>{product.description}</p>
        <p className="text-zinc-600">{product.category}</p>
        <h2 className="text-green-400">{`$ ${product.price}`}</h2>
        <div className="flex gap-3">
          <Link to={`/edit/${product.id}`} className="p-2 border rounded">
            Edit
          </Link>
          <button
            onClick={() => deleteHandler(product.id)}
            className="p-2 border rounded text-red-400"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  ) : (
    <div>Product not found</div>
  );
};

export default Details;
 