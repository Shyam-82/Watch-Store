import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useCart } from './CartContext';

const WishlistContext = createContext();

export const useWishlist = () => useContext(WishlistContext);

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);
  const { addToCart } = useCart();

  // Persist wishlist
  useEffect(() => {
    const stored = localStorage.getItem('chronos_wishlist');
    if (stored) {
      try { setWishlist(JSON.parse(stored)); } catch {}
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('chronos_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  // Toggle item in wishlist
  const toggleWishlist = (watch) => {
    const exists = wishlist.find(i => i.id === watch.id);
    if (exists) {
      setWishlist(prev => prev.filter(i => i.id !== watch.id));
      toast.info('Removed from wishlist.');
    } else {
      setWishlist(prev => [...prev, watch]);
      toast.success(`${watch.name} added to wishlist.`);
    }
  };

  // Remove from wishlist
  const removeFromWishlist = (id) => {
    setWishlist(prev => prev.filter(i => i.id !== id));
    toast.info('Removed from wishlist.');
  };

  // Move item from wishlist to cart
  const moveToCart = (watch) => {
    addToCart(watch);
    setWishlist(prev => prev.filter(i => i.id !== watch.id));
    toast.success('Moved to cart!');
  };

  // Check if in wishlist
  const isInWishlist = (id) => wishlist.some(i => i.id === id);

  return (
    <WishlistContext.Provider value={{ wishlist, toggleWishlist, removeFromWishlist, moveToCart, isInWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};
