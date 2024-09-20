import React, { useState, useContext, useEffect } from "react";
import { ProductContext } from "./utils/Context";
import { useNavigate, useParams } from "react-router-dom";
import Nav from "./Nav";
import Loader from "./Loader";

const Edit = () => {
  const { products, setProducts } = useContext(ProductContext);
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(true);

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");

  useEffect(() => {
    const productToEdit = products.find((p) => p.id === parseInt(id));
    if (productToEdit) {
      setTitle(productToEdit.title);
      setPrice(productToEdit.price);
      setDescription(productToEdit.description);
      setCategory(productToEdit.category);
      setImage(productToEdit.image);
      setLoading(false);
    } else {
      console.log("Product not found");
      navigate("/");
    }
  }, [id, products, navigate]);

  if (loading) {
    return <Loader />;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedProduct = {
      id: parseInt(id),
      title,
      price: parseFloat(price),
      description,
      category,
      image,
    };

    const updatedProducts = products.map((p) =>
      p.id === parseInt(id) ? updatedProduct : p
    );

    setProducts(updatedProducts);
    localStorage.setItem("products", JSON.stringify(updatedProducts));
    navigate("/");
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-100">
      <Nav />
      <main className="flex-1 p-4 lg:p-8 lg:ml-64">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Edit Product</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
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
            className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Update Product
          </button>
        </form>
      </main>
    </div>
  );
};

export default Edit;
