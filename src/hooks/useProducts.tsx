import { useState, useEffect } from 'react';
import { fetchProductsFromAPI } from '@/services/api';
import { Product } from '@/interfaces/product';

const useProducts = (filterQuery: string) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await fetchProductsFromAPI();
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
  }, []); // Dependencia vacía para ejecutar solo una vez al montar el componente

  useEffect(() => {
    const filterProducts = () => {
      if (filterQuery === '') {
        setFilteredProducts(products);
      } else {
        const lowerCaseQuery = filterQuery.toLowerCase();
        const filtered = products.filter(product =>
          product.title.toLowerCase().includes(lowerCaseQuery)
        );
        setFilteredProducts(filtered);
      }
    };

    filterProducts();
  }, [filterQuery, products]);

  return { filteredProducts, loading, error };
};

export default useProducts;
