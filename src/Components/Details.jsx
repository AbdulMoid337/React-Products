import React, { useContext, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ProductContext } from "./utils/Context";
import Loader from "./Loader";

const Details = () => {
  const { id } = useParams();
  const { products, addToCart, isInCart, cart } = useContext(ProductContext);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const foundProduct = products.find((p) => p.id === parseInt(id));
    if (foundProduct) {
      setProduct(foundProduct);
      setLoading(false);
    }
  }, [id, products]);

  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

  if (loading) {
    return <Loader />;
  }

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className="min-h-screen bg-blue-50 p-4 lg:p-8">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-blue-800 mb-2">ShopWave</h1>
        <p className="text-gray-600">Detailed product information</p>
      </div>
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-blue-700">{product.title}</h2>
          <div className="flex items-center space-x-4">
            <Link 
              to="/" 
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300"
            >
              Back to Products
            </Link>
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
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/2 mb-4 md:mb-0">
            <img src={product.image} alt={product.title} className="w-full h-auto object-cover rounded-lg" />
          </div>
          <div className="md:w-1/2 md:pl-6">
            <p className="text-2xl font-bold text-gray-800 mb-4">${product.price.toFixed(2)}</p>
            <p className="text-gray-600 mb-4">{product.description}</p>
            <p className="text-sm text-gray-500 mb-4 capitalize">Category: {product.category}</p>
            <button
              onClick={() => addToCart(product)}
              className={`w-full py-2 px-4 rounded transition duration-300 ${
                isInCart(product.id)
                  ? 'bg-green-500 hover:bg-green-600'
                  : 'bg-blue-500 hover:bg-blue-600'
              } text-white font-bold`}
            >
              {isInCart(product.id) ? 'Added to Cart' : 'Add to Cart'}
            </button>
            <div className="mt-4 flex justify-between">
              <Link 
                to={`/edit/${product.id}`} 
                className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded transition duration-300"
              >
                Edit Product
              </Link>
              <button 
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded transition duration-300"
              >
                Delete Product
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
