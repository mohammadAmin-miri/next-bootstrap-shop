export interface Product {
  id: string;
  title: string;
  price: number;
  category: string;
  stock: number;
  rating: number;
  image: string;
  description: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}