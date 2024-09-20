import React, { useEffect, useState, useContext, useRef } from "react";
import { gsap } from "gsap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ProductContext } from "./utils/Context";
import Loader from "./Loader";

const Home = () => {
  const { products, addToCart, isInCart, cart } = useContext(ProductContext);
  const [loading, setLoading] = useState(true);
  const productRefs = useRef([]);
  const { search } = useLocation();
  const navigate = useNavigate();
  const category = search ? decodeURIComponent(search.split("=")[1]) : "";

  const [filteredProducts, setFilteredProducts] = useState([]);
  const [sortOrder, setSortOrder] = useState('asc');
  const [searchTerm, setSearchTerm] = useState('');
  const [categories, setCategories] = useState([]);

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

    result.sort((a, b) => {
      return sortOrder === 'asc' ? a.price - b.price : b.price - a.price;
    });

    setFilteredProducts(result);
  }, [products, category, searchTerm, sortOrder]);

  const handleCategoryChange = (e) => {
    const selectedCategory = e.target.value;
    navigate(selectedCategory ? `/?category=${selectedCategory}` : '/');
  };

  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen bg-blue-50 p-4 lg:p-8">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-blue-800 mb-2">ShopWave</h1>
        <p className="text-gray-600">Ride the wave of modern shopping</p>
      </div>
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
          <button 
            onClick={() => setSortOrder(prevOrder => prevOrder === 'asc' ? 'desc' : 'asc')}
            className="bg-golden-500 hover:bg-golden-600 text-blue-900 font-bold py-2 px-4 rounded transition duration-300 transform hover:scale-105"
          >
            Sort by Price ({sortOrder === 'asc' ? '↑' : '↓'})
          </button>
          <Link to="/cart" className="relative">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            {cartItemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
                {cartItemCount}
              </span>
            )}
          </Link>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.map((product, index) => (
          <div 
            key={product.id} 
            ref={el => productRefs.current[index] = el}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 transform hover:scale-105"
          >
            <Link to={`/details/${product.id}`}>
              <div className="aspect-w-1 aspect-h-1">
                <img 
                  src={product.image} 
                  alt={product.title} 
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="p-4">
                <h2 className="text-lg font-semibold text-gray-800 mb-2 truncate">{product.title}</h2>
                <p className="text-gray-600 mb-2">${product.price.toFixed(2)}</p>
                <p className="text-sm text-gray-500 capitalize">{product.category}</p>
              </div>
            </Link>
            <div className="p-4 pt-0">
              <button
                onClick={() => addToCart(product)}
                className={`w-full py-2 px-4 rounded transition duration-300 ${
                  isInCart(product.id)
                    ? 'bg-green-500 hover:bg-green-600'
                    : 'bg-blue-500 hover:bg-blue-600'
                } text-white`}
              >
                {isInCart(product.id) ? 'Added in Cart' : 'Add to Cart'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
