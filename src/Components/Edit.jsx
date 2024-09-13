import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ProductContext } from "./utils/Context";
import { toast } from "react-toastify";

const Edit = () => {
  const navigate = useNavigate(); // Call useNavigate at the top level
  const [product, setProduct] = useState({
    image: "",
    title: "",
    category: "",
    price: "",
    description: "",
  });
  const [products, setProducts] = useContext(ProductContext);
  const { id } = useParams();

  const changeHandler = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  // Initialize the product data based on the id
  useEffect(() => {
    const productToEdit = products.find((p) => p.id == id);
    if (productToEdit) {
      setProduct(productToEdit); // Update the state with the found product
    }
  }, [id, products]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate form data
    if (
      product.title.trim().length < 5 ||
      product.image.trim().length < 5 ||
      product.category.trim().length < 5 ||
      product.price.trim().length < 1 ||
      product.description.trim().length < 5
    ) {
      alert("Please fill out all fields correctly.");
      return;
    }

    const productIndex = products.findIndex((p) => p.id == id);
    if (productIndex !== -1) {
      const updatedProducts = [...products];
      updatedProducts[productIndex] = { ...product }; // Update the product in the array
      setProducts(updatedProducts);
      localStorage.setItem("products", JSON.stringify(updatedProducts));
      navigate(-1); // Navigate back after editing
      toast.success("Product Edited successfully")

    }
  };

  return (
    <div className="w-full max-w-lg mx-auto h-[97%] p-8 mt-3 bg-gradient-to-r from-gray-800 via-gray-900 to-black shadow-2xl rounded-lg animate-fade-in-up">
      <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-blue-500 to-purple-500 mb-8 text-center">
        Edit The Product
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
            value={product.image}
            onChange={changeHandler}
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
            value={product.title}
            onChange={changeHandler}
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
              value={product.category}
              onChange={changeHandler}
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
              value={product.price}
              onChange={changeHandler}
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
            value={product.description}
            onChange={changeHandler}
            placeholder="Product Description"
            className="w-full p-4 bg-gray-800 text-gray-200 rounded-lg shadow-lg focus:outline-none focus:ring-4 focus:ring-teal-400 transition duration-300 h-32"
          ></textarea>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-3 text-lg font-semibold bg-gradient-to-r from-teal-400 to-blue-500 hover:from-teal-500 hover:to-purple-500 text-white rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-teal-400 transition duration-300"
        >
          Edit Product
        </button>
      </form>
    </div>
  );
};

export default Edit;
