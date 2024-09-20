import React, { useContext } from 'react';
import { Outlet, Link } from 'react-router-dom';
import Footer from './Footer';
import { ProductContext } from './utils/Context';

const Layout = () => {
  const { cart } = useContext(ProductContext);
  
  // Count unique products in cart, not total quantity
  const uniqueItemsCount = cart.length;

  return (
    <div className="flex flex-col min-h-screen relative">
      {/* Cart icon */}
      <Link to="/cart" className="fixed top-4 right-4 z-50">
        <div className="relative">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          {uniqueItemsCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
              {uniqueItemsCount}
            </span>
          )}
        </div>
      </Link>

      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;