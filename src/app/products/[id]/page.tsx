'use client';

import { useParams } from 'next/navigation'; 
import { useProduct } from '@/hooks/useProduct'; 
import 'tailwindcss/tailwind.css'; 
import Spinner from '@/components/Spinner'; 
import ZoomableImage from '@/components/ZoomableImage'; 
import { useState } from 'react'; 

const ProductPage: React.FC = () => {
  const { id } = useParams();
  const productId = Array.isArray(id) ? id[0] : id;
  
  const { product, loading, error } = useProduct(productId);

  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);

  if (loading) return <Spinner />;

  if (error) return <p className="text-red-500 text-center p-4">{error}</p>;

  const isClothingCategory = ["men's clothing", "women's clothing"].includes(product?.category || '');

  const colorClasses: Record<string, string> = {
    'black': 'bg-black',
    'blue-300': 'bg-blue-300',
    'purple-300': 'bg-purple-300',
    'blue-900': 'bg-blue-900',
    'green-700': 'bg-green-700',
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <main className="w-full max-w-6xl px-4 py-6">
        <div className="flex flex-col lg:flex-row">
          <div className="lg:w-1/2 flex justify-center items-center p-4">
            <ZoomableImage src={product?.image ?? '/default-image.jpg'} alt={product?.title ?? 'Product image'} />
          </div>

          <div className="lg:w-1/2 p-6 flex flex-col justify-between">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold mb-2">{product?.title}</h1>
              <p className="text-xl font-bold text-gray-900 mb-2">${product?.price.toFixed(2)}</p>
              <p className="text-base mb-4">{product?.description}</p>

              {isClothingCategory && (
                <>
                  <div className="mt-6">
                    <p className="text-lg font-semibold mb-2">Color:</p>
                    <div className="flex space-x-2">
                      {['black', 'blue-300', 'purple-300', 'blue-900', 'green-700'].map((color) => (
                        <div
                          key={color}
                          onClick={() => setSelectedColor(color)}
                          className={`w-8 h-8 rounded-full cursor-pointer ${colorClasses[color]} ${selectedColor === color ? 'border-2 border-gray-800' : ''}`}
                        ></div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-6">
                    <p className="text-lg font-semibold mb-2">Size:</p>
                    <div className="flex flex-wrap gap-1">
                      {['Small', 'Medium', 'Large', 'X-Large', 'XX-Large'].map((size) => (
                        <button
                          key={size}
                          onClick={() => setSelectedSize(size)}
                          className={`border rounded-lg px-4 py-2 flex-1 min-w-[90px] text-center ${selectedSize === size ? 'bg-gray-200' : ''}`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>

            <button
              className="mt-8 bg-purple-600 text-white py-2 px-6 rounded-lg hover:bg-purple-700 transition-colors"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProductPage;
