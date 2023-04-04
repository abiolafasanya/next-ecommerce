import React, { useState, createContext, useLayoutEffect } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

type PropTypes = {
  [name: string]: React.Context<{}> | React.PropsWithChildren | any;
};

type ShoppingCartContext = {  
  getItemQuantity: (id: string) => number;
  increaseCartQuantity: (id: string) => void;
  decreaseCartQuantity: (id: string) => void;
  removeCartQuantity: (id: string) => void;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  cartQuantity: number;
  cartItems: CartItem[];
};

type CartItem = {
  id: string;
  quantity: number;
};

const CartContext = createContext({} as ShoppingCartContext);

export const CartProvider: React.FC<PropTypes> = ({ children }) => {
  const [cartItems, setCartItems] = useLocalStorage<CartItem[]>(
    'shopping-cart',
    []
  );

  const [isOpen, setIsOpen] = useState(false);

  function openCart() {
    setIsOpen(true);
  }
  
  function closeCart() {
    setIsOpen(false);
  }

  function getItemQuantity(id: string): number {
    return cartItems.find((item) => item.id === id)?.quantity || 0;
  }

  function increaseCartQuantity(id: string) {
    setCartItems((currItems) => {
      if (currItems.find((item) => item.id === id) == null) {
        return [...currItems, { id, quantity: 1 }];
      } else {
        return currItems.map((item) => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity + 1 };
          } else {
            return item;
          }
        });
      }
    });
  }

  function decreaseCartQuantity(id: string) {
    setCartItems((currItems) => {
      if (currItems.find((item) => item.id === id)?.quantity === 1) {
        return currItems.filter((item) => item.id !== id);
      } else {
        return currItems.map((item) => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity - 1 };
          } else {
            return item;
          }
        });
      }
    });
  }

  function removeCartQuantity(id: string) {
    setCartItems((currItems) => {
      return currItems.filter((item) => item.id !== id);
    });
  }

  const cartQuantity = cartItems.reduce(
    (prev, item) => prev + item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        getItemQuantity,
        increaseCartQuantity,
        decreaseCartQuantity,
        removeCartQuantity,
        cartItems,
        cartQuantity,
        openCart,
        closeCart,
        isOpen,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
