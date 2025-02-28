import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="text-center mb-12 py-8 bg-gray-100">
      <h1 className="text-5xl font-extrabold text-gray-800 mb-4">Find Your Favorite Products</h1>
      <p className="text-xl text-gray-600">Browse our selection of products and filter by your preferences.</p>
    </header>
  );
};

export default Header;
