import React, { createContext, useState, useEffect, ReactNode, FC } from 'react';
import { fetchProductsFromAPI } from '@/services/api';
import { Product, ProductContextType } from '@/interfaces/context';

const ProductContext = createContext<ProductContextType | undefined>(undefined);

interface ProductProviderProps {
  children: ReactNode;
}

export const ProductProvider: FC<ProductProviderProps> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = async () => {
    try {
      const fetchedProducts = await fetchProductsFromAPI();
      setProducts(fetchedProducts);
      setError(null);
    } catch (error) {
      console.error('Error fetching products:', error);
      setError('Failed to load products. Please try again later.');
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <ProductContext.Provider value={{ products, fetchProducts, error }}>
      {error && <div className="text-red-500 text-center p-4">{error}</div>}
      {children}
    </ProductContext.Provider>
  );
};

export default ProductContext;