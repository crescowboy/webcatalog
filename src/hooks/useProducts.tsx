import { useState, useEffect } from 'react';
import { Product } from '@/interfaces/product';

const useProducts = (filterQuery: string) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/products');
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        setProducts(data);
        setFilteredProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
        setError('Failed to fetch products');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []); 

  useEffect(() => {
    const filterProducts = () => {
      if (filterQuery === '') {
        setFilteredProducts(products);
      } else {
        const lowerCaseQuery = filterQuery.toLowerCase();
        const filtered = products.filter(product =>
          product.name.toLowerCase().includes(lowerCaseQuery)
        );
        setFilteredProducts(filtered);
      }
    };

    filterProducts();
  }, [filterQuery, products]);

  return { filteredProducts, loading, error };
};

export default useProducts;
