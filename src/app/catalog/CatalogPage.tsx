'use client';
import React, { useState } from 'react';
import ProductFilter from '@/components/ProductFilter'; 
import ProductCard from '@/components/ProductCard'; 
import Spinner from '@/components/Spinner'; 
import 'tailwindcss/tailwind.css'; 
import useProducts from '@/hooks/useProducts'; 
import Header from '@/components/Header';

const HomePage: React.FC = () => {
  const [filterQuery, setFilterQuery] = useState<string>('');
  const { filteredProducts, loading, error } = useProducts(filterQuery);

  if (loading) return <Spinner />;
  if (error) return <p className="text-red-500 text-center p-4">{error}</p>;

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <main className="flex-1 container mx-auto px-4 py-6">
        <Header/>

        <ProductFilter onFilter={setFilterQuery} />

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredProducts.length > 0 ? (
            filteredProducts.map(product => (
              <ProductCard
                key={product.id} 
                product={product} 
              />
            ))
          ) : (
            <p className="col-span-full text-center text-gray-500">No se encontraron productos</p>
          )}
        </div>
      </main>
    </div>
  );
};

export default HomePage;
