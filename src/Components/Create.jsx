import React, { useState, useContext } from "react";
import { ProductContext } from "./utils/Context";
import { nanoid } from "nanoid";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AddProductForm = () => {
  const navigate = useNavigate(); // Call useNavigate at the top level
  const [products, setProducts] = useContext(ProductContext);
  const [formData, setFormData] = useState({
    image: "",
    title: "",
    category: "",
    price: "",
    description: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate form data
    if (
      formData.title.trim().length < 5 ||
      formData.image.trim().length < 5 ||
      formData.category.trim().length < 5 ||
      formData.price.trim().length < 1 ||
      formData.description.trim().length < 5
    ) {
      alert("Please fill out all fields correctly.");
      return; // Exit if validation fails
    }

    // Create a new product
    const product = {
      id: nanoid(),
      ...formData, // Spread formData to include all properties
    };

    // Update products context
    setProducts([...products, product]);

    // Clear form data
    setFormData({
      image: "",
      title: "",
      category: "",
      price: "",
      description: "",
    });
    localStorage.setItem("products", JSON.stringify([...products, product]));
    navigate("/");
    toast.success("Product Added successfully")
    // Navigate to the homepage (or any other route)
  };

  return (
    <div className="w-full max-w-lg mx-auto h-[97%] p-8 mt-3 bg-gradient-to-r from-gray-800 via-gray-900 to-black shadow-2xl rounded-lg animate-fade-in-up">
      <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-blue-500 to-purple-500 mb-8 text-center">
        Add New Product
      </h2>
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Image Link */}
        <div className="relative">
          <label className="block text-sm font-bold text-gray-200 mb-2">
            Image Link
          </label>
          <input
            type="text"
            name="image"
            value={formData.image}
            onChange={handleChange}
            placeholder="Image URL"
            className="w-full p-4 bg-gray-800 text-gray-200 rounded-lg shadow-lg focus:outline-none focus:ring-4 focus:ring-teal-400 transition duration-300"
          />
        </div>

        {/* Title */}
        <div className="relative">
          <label className="block text-sm font-bold text-gray-200 mb-2">
            Title
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Product Title"
            className="w-full p-4 bg-gray-800 text-gray-200 rounded-lg shadow-lg focus:outline-none focus:ring-4 focus:ring-teal-400 transition duration-300"
          />
        </div>

        {/* Category and Price */}
        <div className="flex gap-6">
          <div className="w-1/2">
            <label className="block text-sm font-bold text-gray-200 mb-2">
              Category
            </label>
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              placeholder="Category"
              className="w-full p-4 bg-gray-800 text-gray-200 rounded-lg shadow-lg focus:outline-none focus:ring-4 focus:ring-teal-400 transition duration-300"
            />
          </div>

          <div className="w-1/2">
            <label className="block text-sm font-bold text-gray-200 mb-2">
              Price
            </label>
            <input
              type="text"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="Enter Product's Price"
              className="w-full p-4 bg-gray-800 text-gray-200 rounded-lg shadow-lg focus:outline-none focus:ring-4 focus:ring-teal-400 transition duration-300"
            />
          </div>
        </div>

        {/* Description */}
        <div className="relative">
          <label className="block text-sm font-bold text-gray-200 mb-2">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Product Description"
            className="w-full p-4 bg-gray-800 text-gray-200 rounded-lg shadow-lg focus:outline-none focus:ring-4 focus:ring-teal-400 transition duration-300 h-32"
          ></textarea>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-3 text-lg font-semibold bg-gradient-to-r from-teal-400 to-blue-500 hover:from-teal-500 hover:to-purple-500 text-white rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-teal-400 transition duration-300"
        >
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProductForm;
