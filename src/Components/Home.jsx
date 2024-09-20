import React, { useEffect, useState, useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ProductContext } from "./utils/Context";
import Loader from "./Loader";
import { motion, AnimatePresence } from "framer-motion";

const Home = () => {
  const { products, addToCart, isInCart, getCartItemQuantity } = useContext(ProductContext);
  const [loading, setLoading] = useState(true);
  const { search } = useLocation();
  const navigate = useNavigate();
  const category = search ? decodeURIComponent(search.split("=")[1]) : "";

  const [filteredProducts, setFilteredProducts] = useState([]);
  const [sortOrder, setSortOrder] = useState('newest');
  const [searchTerm, setSearchTerm] = useState('');
  const [categories, setCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;

  const [animatingProduct, setAnimatingProduct] = useState(null);

  useEffect(() => {
    if (products.length > 0) {
      setLoading(false);
      const uniqueCategories = [...new Set(products.map(p => p.category))];
      setCategories(uniqueCategories);
    }
  }, [products]);

  useEffect(() => {
    let result = [...products];

    if (category) {
      result = result.filter((p) => p.category.toLowerCase() === category.toLowerCase());
    }

    if (searchTerm) {
      result = result.filter((p) => 
        p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Sort products based on sortOrder
    if (sortOrder === 'asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortOrder === 'desc') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortOrder === 'newest') {
      result.sort((a, b) => b.id - a.id);
    }

    setFilteredProducts(result);
    setCurrentPage(1);
  }, [products, category, searchTerm, sortOrder]);

  const handleCategoryChange = (e) => {
    const selectedCategory = e.target.value;
    navigate(selectedCategory ? `/?category=${selectedCategory}` : '/');
  };

  const handleAddToCart = (product) => {
    setAnimatingProduct(product);
    setTimeout(() => {
      addToCart(product);
      setAnimatingProduct(null);
    }, 1000);
  };

  const cartItemCount = products.reduce((total, item) => total + item.quantity, 0);

  // Pagination logic
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen bg-blue-50 p-4 lg:p-8 relative">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8 text-center"
      >
        <h1 className="text-4xl font-bold text-blue-800 mb-2">ShopWave</h1>
        <p className="text-gray-600">Ride the wave of modern shopping</p>
      </motion.div>
      <div className="mb-6 space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-semibold text-blue-700">Our Products</h2>
          <Link 
            to="/create" 
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition duration-300 transform hover:scale-105"
          >
            Add New Product
          </Link>
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 flex-grow"
          />
          <select
            value={category}
            onChange={handleCategoryChange}
            className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="newest">Newest</option>
            <option value="asc">Price: Low to High</option>
            <option value="desc">Price: High to Low</option>
          </select>
        </div>
      </div>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
      >
        {currentProducts.map((product) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 transform hover:scale-105 flex flex-col"
          >
            <Link to={`/details/${product.id}`} className="flex-grow">
              <div className="aspect-w-1 aspect-h-1">
                <img 
                  src={product.image} 
                  alt={product.title} 
                  className="object-contain w-full h-full"
                />
              </div>
              <div className="p-4 flex flex-col h-40">
                <h2 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">{product.title}</h2>
                <p className="text-gray-600 mb-2">${product.price.toFixed(2)}</p>
                <p className="text-sm text-gray-500 capitalize mt-auto">{product.category}</p>
              </div>
            </Link>
            <div className="p-4">
              <button
                onClick={() => handleAddToCart(product)}
                className={`w-full py-2 px-4 rounded transition duration-300 ${
                  isInCart(product.id)
                    ? 'bg-green-500 hover:bg-green-600'
                    : 'bg-blue-500 hover:bg-blue-600'
                } text-white`}
              >
                {isInCart(product.id) ? `Add More (${getCartItemQuantity(product.id)})` : 'Add to Cart'}
              </button>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Pagination */}
      <div className="flex justify-center mt-8">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
          <button
            key={number}
            onClick={() => paginate(number)}
            className={`mx-1 px-3 py-1 rounded ${
              currentPage === number
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {number}
          </button>
        ))}
      </div>

      {/* Animating product */}
      <AnimatePresence>
        {animatingProduct && (
          <motion.img
            key="animating-product"
            src={animatingProduct.image}
            initial={{ opacity: 1, scale: 0.5, x: 0, y: 0 }}
            animate={{ 
              opacity: 0,
              scale: 0.1,
              x: window.innerWidth - 100,
              y: -window.innerHeight + 100
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, ease: "easeInOut" }}
            className="fixed z-50 w-16 h-16 object-contain"
            style={{ 
              top: `${window.innerHeight / 2}px`, 
              left: `${window.innerWidth / 2}px` 
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Home;
