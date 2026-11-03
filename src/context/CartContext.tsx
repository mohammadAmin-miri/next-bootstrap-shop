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

  // ۱. خواندن اطلاعات سبد خرید از localStorage در اولین رندر کلاینت
  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      try {
        const storedCart = localStorage.getItem(CART_STORAGE_KEY);
        if (storedCart) {
          setItems(JSON.parse(storedCart));
        }
      } catch (error) {
        console.error("خطا در خواندن سبد خرید از حافظه مرورگر:", error);
      } finally {
        setIsInitialized(true);
      }
    }, 0);

    return () => window.clearTimeout(timeoutId);
  }, []);

  // ۲. ذخیره خودکار تغییرات سبد خرید در localStorage
  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    }
  }, [items, isInitialized]);

  // افزودن محصول یا افزایش تعداد (با رعایت سقف موجودی انبار)
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

  // کاهش تعداد محصول (یا حذف در صورت رسیدن به صفر)
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

  // حذف کامل یک ردیف محصول از سبد
  const removeFromCart = (productId: string) => {
    setItems((prevItems) =>
      prevItems.filter((item) => item.product.id !== productId)
    );
  };

  // خالی کردن کل سبد خرید
  const clearCart = () => {
    setItems([]);
  };

  // دریافت تعداد فعلی یک محصول خاص در سبد
  const getItemQuantity = (productId: string): number => {
    const item = items.find((item) => item.product.id === productId);
    return item ? item.quantity : 0;
  };

  // محاسبه مجموع تعداد کالاها و جمع کل فاکتور
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
    throw new Error("هوک useCart باید داخل CartProvider استفاده شود");
  }
  return context;
}