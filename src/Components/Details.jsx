import axios from "./utils/axios";
import React, { useContext, useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import Loader from "./Loader";
import { ProductContext } from "./utils/Context";

const Details = () => {
  const [goods, setGoods] = useContext(ProductContext); // Access the product context
  const [product, setProduct] = useState(null); // State to hold the selected product
  const [loading, setLoading] = useState(true); // Loader state
  const [error, setError] = useState(null); // Error handling state
  const { id } = useParams(); // Get the product ID from the URL parameters
  const navigate = useNavigate(); // For navigation after deletion

  // Function to fetch a single product from an API
  const getSingleProduct = async () => {
    try {
      const { data } = await axios.get(`/products/${id}`);
      setProduct(data); // Update product state
      setLoading(false); // Stop the loader
    } catch (error) {
      console.error(error);
      setError("Failed to fetch product details.");
      setLoading(false); // Stop the loader in case of error
    }
  };

  // useEffect to run when component mounts or when 'goods' or 'id' changes
  useEffect(() => {
    if (goods && goods.length) {
      // Check if products exist in the context
      const foundProduct = goods.find((p) => String(p.id) === String(id)); // Match product id
      if (foundProduct) {
        setProduct(foundProduct); // Set product if found in context
        setLoading(false); // Stop loader
      } else {
        getSingleProduct(); // Fetch from API if not found
      }
    } else {
      getSingleProduct(); // Fetch from API if context is empty
    }
  }, [goods, id]);

  // Function to delete the product
  const deleteHandler = (id) => {
    const filteredProducts = goods.filter((p) => p.id !== id); // Filter out the deleted product
    setGoods(filteredProducts); // Update the product context
    localStorage.setItem("products", JSON.stringify(filteredProducts)); // Update local storage
    navigate("/"); // Navigate back to the product list or home page
  };

  if (loading) {
    return <Loader />; // Show loader while fetching data
  }

  if (error) {
    return <div>{error}</div>; // Show error if fetching fails
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
