"use client"

import Image from "next/image";
import { useState } from "react";

type Product = {
    id: number;
    name: string;
    price: number;
    image: string;
  };

const products: Product[] = [
    { id: 1, name: "Silla de Madera", price: 50, image: "/products/silla.jpg" },
    { id: 2, name: "Mesa de Centro", price: 120, image: "/products/mesa.jpg" },
    { id: 3, name: "Estante Moderno", price: 200, image: "/products/estante.jpg" },
  ];

const CatalogPage = () => {

    const [cart, setCart] = useState<Product[]>([]);

    const addToCart = (product: Product) => {
        setCart([...cart, product]);
        alert(`"${product.name}" agregado al carrito`);
      };

  return (
    <main className="p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Catálogo de Productos</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product.id} className="border rounded-lg p-4 shadow-lg">
            <Image 
              src={product.image} 
              alt={product.name} 
              width={300} 
              height={200} 
              className="w-full h-auto rounded-lg"
            />
            <h2 className="text-xl font-semibold mt-4">{product.name}</h2>
            <p className="text-gray-600">${product.price}</p>
            <button 
              className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              onClick={() => addToCart(product)}
            >
              Agregar al Carrito
            </button>
          </div>
        ))}
      </div>
    </main>
  )
}

export default CatalogPage
