import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-400 p-4 text-center">
      <p>&copy; {new Date().getFullYear()} Product App. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
