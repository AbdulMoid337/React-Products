import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-blue-600 text-white">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="space-y-8 xl:col-span-1">
            <Link to="/" className="text-2xl font-bold text-golden-400">ShopWave</Link>
            <p className="text-gray-300 text-base">
              Ride the wave of modern shopping with ShopWave. We bring you the best products at the best prices.
            </p>
            <div className="flex space-x-6">
              {/* Add social media icons here if needed */}
            </div>
          </div>
          <div className="mt-12 grid grid-cols-2 gap-8 xl:mt-0 xl:col-span-2">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold text-gray-200 tracking-wider uppercase">
                  Shop
                </h3>
                <ul className="mt-4 space-y-4">
                  <li>
                    <Link to="/" className="text-base text-gray-300 hover:text-white">
                      All Products
                    </Link>
                  </li>
                  <li>
                    <Link to="/cart" className="text-base text-gray-300 hover:text-white">
                      Cart
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="mt-12 md:mt-0">
                <h3 className="text-sm font-semibold text-gray-200 tracking-wider uppercase">
                  Support
                </h3>
                <ul className="mt-4 space-y-4">
                  <li>
                    <a href="#" className="text-base text-gray-300 hover:text-white">
                      Contact Us
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-base text-gray-300 hover:text-white">
                      FAQs
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold text-gray-200 tracking-wider uppercase">
                  Company
                </h3>
                <ul className="mt-4 space-y-4">
                  <li>
                    <a href="#" className="text-base text-gray-300 hover:text-white">
                      About
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-base text-gray-300 hover:text-white">
                      Careers
                    </a>
                  </li>
                </ul>
              </div>
              <div className="mt-12 md:mt-0">
                <h3 className="text-sm font-semibold text-gray-200 tracking-wider uppercase">
                  Legal
                </h3>
                <ul className="mt-4 space-y-4">
                  <li>
                    <a href="#" className="text-base text-gray-300 hover:text-white">
                      Privacy Policy
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-base text-gray-300 hover:text-white">
                      Terms of Service
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t border-gray-200 pt-8">
          <p className="text-base text-gray-300 xl:text-center">
            &copy; 2023 ShopWave, Inc. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;