import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Persist cart in localStorage
  useEffect(() => {
    const stored = localStorage.getItem('chronos_cart');
    if (stored) {
      try { setCartItems(JSON.parse(stored)); } catch {}
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('chronos_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  // Add item to cart
  const addToCart = (watch) => {
    setCartItems(prev => {
      const existing = prev.find(i => i.id === watch.id);
      if (existing) {
        if (existing.quantity >= watch.stock) {
          toast.error('Maximum stock reached.');
          return prev;
        }
        toast.success('Quantity updated.');
        return prev.map(i => i.id === watch.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      toast.success(`${watch.name} added to cart.`);
      return [...prev, { ...watch, quantity: 1 }];
    });
  };

  // Remove item from cart
  const removeFromCart = (id) => {
    setCartItems(prev => prev.filter(i => i.id !== id));
    toast.info('Item removed from cart.');
  };

  // Increase quantity
  const increaseQty = (id) => {
    setCartItems(prev => prev.map(i => {
      if (i.id === id) {
        if (i.quantity >= i.stock) { toast.error('Max stock reached.'); return i; }
        return { ...i, quantity: i.quantity + 1 };
      }
      return i;
    }));
  };

  // Decrease quantity (remove if qty = 1)
  const decreaseQty = (id) => {
    setCartItems(prev => {
      const item = prev.find(i => i.id === id);
      if (item?.quantity === 1) {
        toast.info('Item removed from cart.');
        return prev.filter(i => i.id !== id);
      }
      return prev.map(i => i.id === id ? { ...i, quantity: i.quantity - 1 } : i);
    });
  };

  // Clear entire cart
  const clearCart = () => {
    setCartItems([]);
    toast.info('Cart cleared.');
  };

  // Check if item is in cart
  const isInCart = (id) => cartItems.some(i => i.id === id);

  // Computed values
  const totalItems = cartItems.reduce((sum, i) => sum + i.quantity, 0);
  const subtotal = cartItems.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const tax = subtotal * 0.18;            // 18% GST
  const delivery = subtotal > 5000 ? 0 : 299;  // Free delivery above $5000
  const grandTotal = subtotal + tax + delivery;

  return (
    <CartContext.Provider value={{
      cartItems, isCartOpen, setIsCartOpen,
      addToCart, removeFromCart, increaseQty, decreaseQty, clearCart, isInCart,
      totalItems, subtotal, tax, delivery, grandTotal
    }}>
      {children}
    </CartContext.Provider>
  );
};
