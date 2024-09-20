import React, { useEffect, useState, useContext, useRef } from "react";
import { gsap } from "gsap";
import Nav from "./Nav";
import { Link, useLocation } from "react-router-dom";
import { ProductContext } from "./utils/Context";
import Loader from "./Loader";

const Home = () => {
  const { products, addToCart } = useContext(ProductContext);
  const [loading, setLoading] = useState(true);
  const productRefs = useRef([]);
  const { search } = useLocation();
  const category = search ? decodeURIComponent(search.split("=")[1]) : undefined;

  const [filteredProducts, setFilteredProducts] = useState([]);
  const [sortOrder, setSortOrder] = useState('asc');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (products.length > 0) {
      let filtered = products;
      if (category && category !== "undefined") {
        filtered = filtered.filter((p) => p.category === category);
      }
      if (searchTerm) {
        filtered = filtered.filter((p) => 
          p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.description.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }
      setFilteredProducts(filtered);
      setLoading(false);
    }
  }, [category, products, searchTerm]);

  useEffect(() => {
    if (!loading) {
      gsap.from(productRefs.current, {
        duration: 0.5,
        opacity: 0,
        y: 50,
        stagger: 0.1,
        ease: "power3.out"
      });
    }
  }, [loading, filteredProducts]);

  const sortProducts = () => {
    const sorted = [...filteredProducts].sort((a, b) => {
      return sortOrder === 'asc' ? a.price - b.price : b.price - a.price;
    });
    setFilteredProducts(sorted);
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-blue-50">
      <Nav />
      <main className="flex-1 p-4 lg:p-8 lg:ml-64">
        <div className="mb-4 flex flex-col sm:flex-row justify-between items-center">
          <h1 className="text-3xl font-bold text-blue-800 mb-2 sm:mb-0">Products</h1>
          <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4">
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button 
              onClick={sortProducts}
              className="bg-golden-500 hover:bg-golden-600 text-blue-900 font-bold py-2 px-4 rounded transition duration-300 transform hover:scale-105"
            >
              Sort by Price ({sortOrder === 'asc' ? '↑' : '↓'})
            </button>
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
                  className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Home;
