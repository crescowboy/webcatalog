'use client';

import { useState } from 'react';
import '../globals.css';

const AddProductPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    price: ''
  });
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ text: '', type: '' });

    if (!image) {
      setMessage({ text: '❌ Selecciona una imagen', type: 'error' });
      setLoading(false);
      return;
    }

    try {
      const data = new FormData();
      data.append('name', formData.name);
      data.append('price', formData.price);
      data.append('image', image);

      const res = await fetch('/api/products', {
        method: 'POST',
        body: data, 
      });

      if (!res.ok) throw new Error('Error al agregar el producto');

      setMessage({ text: '✅ Producto agregado exitosamente', type: 'success' });
      setFormData({ name: '', price: '' });
      setImage(null);
    } catch {
      setMessage({ text: '❌ Error al agregar el producto', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">Agregar Producto</h2>
        
        {message.text && (
          <p className={`text-center mb-4 text-sm font-medium p-2 rounded-md ${message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
            {message.text}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input 
            type="text" 
            name="name" 
            value={formData.name} 
            onChange={handleChange} 
            placeholder="Nombre del producto" 
            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            required 
          />
          
          <input 
            type="number" 
            name="price" 
            value={formData.price} 
            onChange={handleChange} 
            placeholder="Precio" 
            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            required 
          />
          
          <input 
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            required 
          />

          <button 
            type="submit" 
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
            disabled={loading}
          >
            {loading ? 'Agregando...' : 'Agregar Producto'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProductPage;
