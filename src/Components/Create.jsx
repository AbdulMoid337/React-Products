import React, { useState, useContext, useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ProductContext } from "./utils/Context";
import { useNavigate } from "react-router-dom";
import Nav from "./Nav";
import Loader from "./Loader";

const Create = () => {
  console.log("Create component rendered");
  const { products, setProducts } = useContext(ProductContext);
  console.log("Products from context:", products);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const newProduct = {
      id: Date.now(),
      title,
      price: parseFloat(price),
      description,
      category,
      image,
    };

    // Simulate an API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    setProducts([...products, newProduct]);
    localStorage.setItem("products", JSON.stringify([...products, newProduct]));
    setLoading(false);
    navigate("/");
  };

  const formRef = useRef(null);

  useEffect(() => {
    gsap.from(formRef.current, {
      duration: 0.5,
      opacity: 0,
      y: 50,
      ease: "power3.out"
    });
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-blue-50">
      <Nav />
      <main className="flex-1 p-4 lg:p-8 lg:ml-64">
        <h2 className="text-3xl font-bold text-blue-800 mb-6">Create New Product</h2>
        <form 
          ref={formRef}
          onSubmit={handleSubmit} 
          className="bg-white shadow-xl rounded-lg p-8 space-y-4 transform hover:scale-105 transition-transform duration-300"
        >
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              required
            />
          </div>
          <div>
            <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price</label>
            <input
              type="number"
              id="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              required
            />
          </div>
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              required
            ></textarea>
          </div>
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
            <input
              type="text"
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              required
            />
          </div>
          <div>
            <label htmlFor="image" className="block text-sm font-medium text-gray-700">Image URL</label>
            <input
              type="url"
              id="image"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-blue-900 bg-golden-500 hover:bg-golden-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-golden-500 transition duration-300 transform hover:scale-105"
          >
            Create Product
          </button>
        </form>
      </main>
    </div>
  );
};

export default Create;
