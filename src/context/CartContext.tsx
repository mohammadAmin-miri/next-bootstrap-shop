"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { Product, CartItem } from "../../types";

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product) => void;
  decreaseQuantity: (productId: string) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  getItemQuantity: (productId: string) => number;
  totalItems: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = "digistore_cart";

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  // 1. Read the cart from localStorage on the first client render
  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      try {
        const storedCart = localStorage.getItem(CART_STORAGE_KEY);
        if (storedCart) {
          setItems(JSON.parse(storedCart));
        }
      } catch (error) {
        console.error("Failed to read the cart from browser storage:", error);
      } finally {
        setIsInitialized(true);
      }
    }, 0);

    return () => window.clearTimeout(timeoutId);
  }, []);

  // 2. Automatically save cart changes to localStorage
  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    }
  }, [items, isInitialized]);

  // Add a product or increase its quantity without exceeding available stock
  const addToCart = (product: Product) => {
    setItems((prevItems) => {
      const existingItem = prevItems.find(
        (item) => item.product.id === product.id
      );

      if (existingItem) {
        if (existingItem.quantity >= product.stock) {
          return prevItems;
        }
        return prevItems.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...prevItems, { product, quantity: 1 }];
    });
  };

  // Decrease the product quantity or remove it when it reaches zero
  const decreaseQuantity = (productId: string) => {
    setItems((prevItems) => {
      const existingItem = prevItems.find(
        (item) => item.product.id === productId
      );

      if (existingItem && existingItem.quantity === 1) {
        return prevItems.filter((item) => item.product.id !== productId);
      }

      return prevItems.map((item) =>
        item.product.id === productId
          ? { ...item, quantity: item.quantity - 1 }
          : item
      );
    });
  };

  // Remove a product row from the cart
  const removeFromCart = (productId: string) => {
    setItems((prevItems) =>
      prevItems.filter((item) => item.product.id !== productId)
    );
  };

  // Clear the entire cart
  const clearCart = () => {
    setItems([]);
  };

  // Get the current quantity of a product in the cart
  const getItemQuantity = (productId: string): number => {
    const item = items.find((item) => item.product.id === productId);
    return item ? item.quantity : 0;
  };

  // Calculate the total item count and order price
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        decreaseQuantity,
        removeFromCart,
        clearCart,
        getItemQuantity,
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}