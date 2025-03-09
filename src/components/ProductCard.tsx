'use client'; 

import { useRouter } from 'next/navigation'; 
import Image from 'next/image'; 
import { ProductCardProps } from '@/interfaces/productCard'; 

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const router = useRouter(); 

  const handleCardClick = () => {
    router.push(`/products/${product._id}`);
  };

  return (
    <div
      onClick={handleCardClick}
      className="group bg-white border rounded-md p-2 shadow-none transition-all duration-300 ease-in-out hover:shadow-lg cursor-pointer flex flex-col h-full"
    >
      <div className="relative overflow-hidden rounded-md mb-2 h-64">
        <Image
          src={product.image}
          alt={product.name}
          fill 
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw" 
          style={{ objectFit: 'contain' }} 
          className="transition-transform duration-300 ease-in-out group-hover:scale-110" 
          priority 
        />
      </div>
      
      <div className="flex flex-col flex-grow">
        <h2 className="text-lg font-semibold mb-2 line-clamp-2">{product.name}</h2>
        <p className="text-xl font-semibold text-gray-600 mb-4">${product.price.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default ProductCard;
