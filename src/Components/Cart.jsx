import React, { useContext, useState } from "react";
import { ProductContext } from "./utils/Context";
import Nav from "./Nav";
import { toast } from "react-toastify";

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, clearCart } = useContext(ProductContext);
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleClearCart = () => {
    clearCart();
    toast.success("Cart cleared successfully");
  };

  const handleCheckout = () => {
    setIsCheckingOut(true);
    // Simulate a checkout process
    setTimeout(() => {
      clearCart();
      setIsCheckingOut(false);
      toast.success("Checkout successful! Thank you for your purchase.");
    }, 2000); // Simulating a 2-second checkout process
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-blue-50">
      <Nav />
      <main className="flex-1 p-4 lg:p-8 lg:ml-64">
        <h2 className="text-3xl font-bold text-blue-800 mb-6">Your Cart</h2>
        {cart.length === 0 ? (
          <p className="text-gray-600">Your cart is empty.</p>
        ) : (
          <>
            <div className="bg-white shadow-xl rounded-lg p-6 mb-6">
              {cart.map((item) => (
                <div key={item.id} className="flex items-center justify-between border-b py-4">
                  <div className="flex items-center">
                    <img src={item.image} alt={item.title} className="w-16 h-16 object-cover mr-4" />
                    <div>
                      <h3 className="font-semibold">{item.title}</h3>
                      <p className="text-gray-600">${item.price.toFixed(2)}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="bg-gray-200 px-2 py-1 rounded-l"
                    >
                      -
                    </button>
                    <span className="bg-gray-100 px-4 py-1">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="bg-gray-200 px-2 py-1 rounded-r"
                    >
                      +
                    </button>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="ml-4 text-red-500 hover:text-red-700"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold">Total: ${total.toFixed(2)}</h3>
              <button
                onClick={handleClearCart}
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded transition duration-300"
              >
                Remove All
              </button>
            </div>
            <button 
              onClick={handleCheckout}
              disabled={isCheckingOut}
              className={`w-full ${
                isCheckingOut ? 'bg-gray-400' : 'bg-green-500 hover:bg-green-600'
              } text-white font-bold py-3 px-4 rounded transition duration-300`}
            >
              {isCheckingOut ? 'Processing...' : 'Proceed to Checkout'}
            </button>
          </>
        )}
      </main>
    </div>
  );
};

export default Cart;
