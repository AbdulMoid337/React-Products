import React, { useState, useContext } from "react";
import { ProductContext } from "./utils/Context";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

const Create = () => {
  const { products, setProducts } = useContext(ProductContext);
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    title: "",
    price: "",
    description: "",
    category: "",
    image: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: "" }));
  };

  const validateForm = () => {
    let formErrors = {};
    if (!product.title.trim()) formErrors.title = "Title is required";
    if (!product.price || isNaN(product.price)) formErrors.price = "Valid price is required";
    if (!product.description.trim()) formErrors.description = "Description is required";
    if (!product.category.trim()) formErrors.category = "Category is required";
    if (!product.image.trim()) formErrors.image = "Image URL is required";
    return formErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }
    
    const newProduct = {
      ...product,
      id: Date.now(),
      price: parseFloat(product.price)
    };
    
    setProducts(prevProducts => [newProduct, ...prevProducts]);
    
    toast.success("Product created successfully!", {
      position: "bottom-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-blue-50 p-4 lg:p-8">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8 text-center"
      >
        <h1 className="text-4xl font-bold text-blue-800 mb-2">ShopWave</h1>
        <p className="text-gray-600">Create New Product</p>
      </motion.div>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          {Object.entries(product).map(([key, value]) => (
            <div key={key}>
              <label htmlFor={key} className="block text-sm font-medium text-gray-700 capitalize">{key}</label>
              <input
                type={key === "price" ? "number" : "text"}
                id={key}
                name={key}
                value={value}
                onChange={handleChange}
                className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 ${errors[key] ? 'border-red-500' : ''}`}
              />
              {errors[key] && <p className="mt-1 text-sm text-red-500">{errors[key]}</p>}
            </div>
          ))}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition duration-300"
          >
            Create Product
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default Create;
