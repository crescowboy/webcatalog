export interface Product {
    _id: string;
    name: string;
    price: number;
    image: string;
    rating: {
      rate: number; 
    };
  }
  
  export interface ProductCardProps {
    product: Product;
  }
  