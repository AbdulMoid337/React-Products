import React, { useContext, useState } from "react";
import { ProductContext } from "./utils/Context";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";

const Cart = () => {
  const { cart, removeFromCart, updateCartItemQuantity } = useContext(ProductContext);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();

  const handleQuantityChange = (productId, newQuantity) => {
    updateCartItemQuantity(productId, newQuantity);
  };

  const handleRemove = (productId) => {
    removeFromCart(productId);
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = () => {
    setIsCheckingOut(true);
  };

  const processPayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsCheckingOut(false);
      cart.forEach(item => removeFromCart(item.id));
      toast.success("Payment successful! Your order has been placed.", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      navigate('/');
    }, 2000);
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
        <p className="text-gray-600">Your Shopping Cart</p>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6"
      >
        {cart.length === 0 ? (
          <div className="text-center">
            <p className="text-xl text-gray-600 mb-4">Your cart is empty</p>
            <Link 
              to="/" 
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <>
            {cart.map((item) => (
              <div key={item.id} className="flex items-center justify-between border-b py-4">
                <div className="flex items-center">
                  <img src={item.image} alt={item.title} className="w-16 h-16 object-cover mr-4" />
                  <div>
                    <h3 className="text-lg font-semibold">{item.title}</h3>
                    <p className="text-gray-600">${item.price.toFixed(2)}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <button 
                    onClick={() => handleQuantityChange(item.id, Math.max(1, item.quantity - 1))}
                    className="bg-gray-200 px-2 py-1 rounded-l"
                  >
                    -
                  </button>
                  <span className="bg-gray-100 px-4 py-1">{item.quantity}</span>
                  <button 
                    onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                    className="bg-gray-200 px-2 py-1 rounded-r"
                  >
                    +
                  </button>
                  <button 
                    onClick={() => handleRemove(item.id)}
                    className="ml-4 text-red-500 hover:text-red-700"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
            <div className="mt-6 text-right">
              <p className="text-xl font-semibold">Total: ${total.toFixed(2)}</p>
              <button 
                onClick={handleCheckout}
                className="mt-4 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition duration-300"
              >
                Proceed to Checkout
              </button>
            </div>
          </>
        )}
      </motion.div>
      
      <div className="mt-8 text-center">
        <Link 
          to="/" 
          className="text-blue-500 hover:text-blue-700 font-semibold"
        >
          ← Back to Products
        </Link>
      </div>

      <AnimatePresence>
        {isCheckingOut && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
          >
            <div className="bg-white p-8 rounded-lg max-w-md w-full">
              <h2 className="text-2xl font-bold mb-4">Checkout</h2>
              <p className="mb-4">Total to pay: ${total.toFixed(2)}</p>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="card">
                  Card Number
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="card"
                  type="text"
                  placeholder="1234 5678 9012 3456"
                />
              </div>
              <div className="flex justify-between">
                <button
                  onClick={() => setIsCheckingOut(false)}
                  className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded transition duration-300"
                >
                  Cancel
                </button>
                <button
                  onClick={processPayment}
                  disabled={isProcessing}
                  className={`bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition duration-300 ${isProcessing ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {isProcessing ? 'Processing...' : 'Pay Now'}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Cart;
