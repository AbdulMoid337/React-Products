import React, { useContext, useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ProductContext } from "./utils/Context";
import Nav from "./Nav";
import { toast } from "react-toastify";
import Loader from "./Loader";

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, clearCart } = useContext(ProductContext);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("credit");
  const [loading, setLoading] = useState(true);
  const cartItemRefs = useRef([]);

  useEffect(() => {
    // Simulate loading cart data
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);

  useEffect(() => {
    if (!loading && cart.length > 0) {
      gsap.from(cartItemRefs.current, {
        duration: 0.5,
        opacity: 0,
        y: 20,
        stagger: 0.1,
        ease: "power3.out"
      });
    }
  }, [loading, cart]);

  if (loading) {
    return <Loader />;
  }

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleCheckout = () => {
    setIsCheckingOut(true);
  };

  const processPayment = () => {
    // Simulate payment processing
    setTimeout(() => {
      toast.success(`Payment of $${total.toFixed(2)} processed successfully via ${paymentMethod}!`);
      setIsCheckingOut(false);
      clearCart();
    }, 2000);
  };

  const handleClearCart = () => {
    clearCart();
    toast.success("Cart cleared successfully");
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
              {cart.map((item, index) => (
                <div 
                  key={item.id} 
                  ref={el => cartItemRefs.current[index] = el}
                  className="flex items-center justify-between border-b py-4"
                >
                  <div className="flex items-center">
                    <img src={item.image} alt={item.title} className="w-16 h-16 object-cover mr-4" />
                    <div>
                      <h3 className="font-semibold">{item.title}</h3>
                      <p>${item.price.toFixed(2)}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <button
                      onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
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
            <button className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-4 rounded transition duration-300">
              Proceed to Checkout
            </button>
          </>
        )}
      </main>
    </div>
  );
};

export default Cart;
