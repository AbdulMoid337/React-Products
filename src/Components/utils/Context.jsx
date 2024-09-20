import React, { createContext, useState, useEffect } from "react";
import axios from "./axios";

export const ProductContext = createContext();

const Context = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [recentlyViewed, setRecentlyViewed] = useState([]);

  const getProducts = async () => {
    try {
      const { data } = await axios.get("/products");
      setProducts(data);
      localStorage.setItem("products", JSON.stringify(data));
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    const storedProducts = localStorage.getItem("products");
    if (storedProducts) {
      setProducts(JSON.parse(storedProducts));
    } else {
      getProducts();
    }

    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  const addToCart = (product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        const updatedCart = prevCart.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
        localStorage.setItem("cart", JSON.stringify(updatedCart));
        return updatedCart;
      } else {
        const updatedCart = [...prevCart, { ...product, quantity: 1 }];
        localStorage.setItem("cart", JSON.stringify(updatedCart));
        return updatedCart;
      }
    });
  };

  const removeFromCart = (productId) => {
    setCart(prevCart => {
      const updatedCart = prevCart.filter(item => item.id !== productId);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  const updateQuantity = (productId, quantity) => {
    setCart(prevCart => {
      const updatedCart = prevCart.map(item =>
        item.id === productId ? { ...item, quantity: quantity } : item
      );
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem("cart");
  };

  const addToWishlist = (product) => {
    setWishlist(prevWishlist => {
      if (!prevWishlist.some(item => item.id === product.id)) {
        return [...prevWishlist, product];
      }
      return prevWishlist;
    });
  };

  const removeFromWishlist = (productId) => {
    setWishlist(prevWishlist => prevWishlist.filter(item => item.id !== productId));
  };

  const addToRecentlyViewed = (product) => {
    setRecentlyViewed(prevViewed => {
      const updatedViewed = [product, ...prevViewed.filter(p => p.id !== product.id)].slice(0, 5);
      return updatedViewed;
    });
  };

  return (
    <ProductContext.Provider value={{ 
      products, 
      setProducts, 
      cart, 
      addToCart, 
      removeFromCart, 
      updateQuantity,
      clearCart,
      wishlist,
      addToWishlist,
      removeFromWishlist,
      recentlyViewed,
      addToRecentlyViewed
    }}>
      {children}
    </ProductContext.Provider>
  );
};

export default Context;
