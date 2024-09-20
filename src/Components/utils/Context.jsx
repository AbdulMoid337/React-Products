import React, { createContext, useState, useEffect } from "react";

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://fakestoreapi.com/products');
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, []);

  const addToCart = (product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (productId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  };

  const updateCartItemQuantity = (productId, newQuantity) => {
    if (newQuantity === 0) {
      removeFromCart(productId);
    } else {
      setCart(prevCart => prevCart.map(item =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      ));
    }
  };

  const isInCart = (productId) => {
    return cart.some(item => item.id === productId);
  };

  const getCartItemQuantity = (productId) => {
    const item = cart.find(item => item.id === productId);
    return item ? item.quantity : 0;
  };

  const deleteProduct = (productId) => {
    setProducts(prevProducts => prevProducts.filter(product => product.id !== productId));
    // Also remove the product from the cart if it's there
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  };

  const updateProduct = (updatedProduct) => {
    setProducts(prevProducts =>
      prevProducts.map(product =>
        product.id === updatedProduct.id ? updatedProduct : product
      )
    );

    // Update the product in the cart if it exists
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === updatedProduct.id
          ? { ...item, ...updatedProduct, quantity: item.quantity }
          : item
      )
    );
  };

  return (
    <ProductContext.Provider value={{
      products,
      setProducts,
      cart,
      setCart,
      addToCart,
      removeFromCart,
      updateCartItemQuantity,
      isInCart,
      getCartItemQuantity,
      deleteProduct,
      updateProduct // Add this new function to the context
    }}>
      {children}
    </ProductContext.Provider>
  );
};

export default ProductProvider;
