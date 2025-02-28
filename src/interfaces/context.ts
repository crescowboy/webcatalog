// Define la interfaz para los productos
export interface Product {
    id: number;
    title: string;
    price: number;
    image: string;
  }
  
  // Define la interfaz para el contexto de productos
  export interface ProductContextType {
    products: Product[];
    fetchProducts: () => Promise<void>;
    error: string | null; // Añadido el estado de error
  }
  