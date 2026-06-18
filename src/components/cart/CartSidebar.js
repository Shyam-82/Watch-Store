import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { formatPrice } from '../../utils/helpers';

const CartSidebar = () => {
  const {
    cartItems, isCartOpen, setIsCartOpen,
    removeFromCart, increaseQty, decreaseQty, clearCart,
    totalItems, subtotal, tax, delivery, grandTotal
  } = useCart();

  if (!isCartOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="sidebar-overlay fixed inset-0 z-50"
        style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(4px)' }}
        onClick={() => setIsCartOpen(false)}
      />

      {/* Panel */}
      <div
        className="sidebar-panel fixed top-0 right-0 h-full w-full max-w-md z-50 flex flex-col"
        style={{ background: '#0d0d0d', borderLeft: '1px solid rgba(201,168,76,0.15)' }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5" style={{ borderBottom: '1px solid #1a1a1a' }}>
          <div>
            <h2 className="text-sm font-semibold tracking-[0.2em] uppercase" style={{ fontFamily: 'Playfair Display, serif', color: '#e8e8e8' }}>
              Your Cart
            </h2>
            <p className="text-xs text-gray-600 mt-0.5">{totalItems} {totalItems === 1 ? 'item' : 'items'}</p>
          </div>
          <div className="flex items-center gap-3">
            {cartItems.length > 0 && (
              <button onClick={clearCart} className="text-xs text-gray-600 hover:text-red-400 transition-colors uppercase tracking-wider">
                Clear
              </button>
            )}
            <button
              onClick={() => setIsCartOpen(false)}
              className="w-8 h-8 flex items-center justify-center hover:text-yellow-500 transition-colors text-gray-500"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto">
          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 px-6">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#2a2a2a" strokeWidth="1">
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
                <line x1="3" y1="6" x2="21" y2="6"/>
                <path d="M16 10a4 4 0 01-8 0"/>
              </svg>
              <p className="text-sm text-gray-600">Your cart is empty</p>
              <button
                onClick={() => setIsCartOpen(false)}
                className="btn-gold text-xs tracking-widest uppercase px-6 py-2"
              >
                Browse Collection
              </button>
            </div>
          ) : (
            <div>
              {cartItems.map(item => (
                <div key={item.id} className="cart-item flex gap-4 px-6 py-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover flex-shrink-0"
                    style={{ border: '1px solid #1a1a1a' }}
                    onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=200&q=60'; }}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] tracking-widest uppercase" style={{ color: '#c9a84c' }}>{item.brand}</p>
                    <p className="text-xs font-medium truncate mt-0.5" style={{ fontFamily: 'Playfair Display, serif', color: '#ddd' }}>
                      {item.name}
                    </p>
                    <div className="flex items-center justify-between mt-2">
                      {/* Qty */}
                      <div className="flex items-center gap-1">
                        <button onClick={() => decreaseQty(item.id)} className="qty-btn">−</button>
                        <span className="text-xs w-6 text-center text-gray-300">{item.quantity}</span>
                        <button onClick={() => increaseQty(item.id)} className="qty-btn">+</button>
                      </div>
                      {/* Price */}
                      <span className="text-sm font-semibold" style={{ color: '#c9a84c' }}>
                        {formatPrice(item.price * item.quantity)}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="self-start mt-1 text-gray-700 hover:text-red-400 transition-colors text-xs"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Summary */}
        {cartItems.length > 0 && (
          <div style={{ borderTop: '1px solid #1a1a1a' }}>
            <div className="px-6 py-4 space-y-2.5">
              <div className="flex justify-between text-xs text-gray-500">
                <span>Subtotal</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between text-xs text-gray-500">
                <span>GST (18%)</span>
                <span>{formatPrice(tax)}</span>
              </div>
              <div className="flex justify-between text-xs text-gray-500">
                <span>Delivery</span>
                <span style={{ color: delivery === 0 ? '#4ade80' : 'inherit' }}>
                  {delivery === 0 ? 'Free' : formatPrice(delivery)}
                </span>
              </div>
              <div className="gold-divider" />
              <div className="flex justify-between text-sm font-semibold">
                <span style={{ fontFamily: 'Playfair Display, serif', color: '#e8e8e8' }}>Grand Total</span>
                <span className="text-gold-gradient" style={{ fontFamily: 'Playfair Display, serif' }}>
                  {formatPrice(grandTotal)}
                </span>
              </div>
              {delivery === 0 && (
                <p className="text-[10px] text-center" style={{ color: '#4ade80' }}>✓ Free delivery on this order</p>
              )}
            </div>

            <div className="px-6 pb-6">
              <Link
                to="/checkout"
                onClick={() => setIsCartOpen(false)}
                className="btn-gold w-full block text-center text-xs tracking-[0.15em] uppercase py-3 mb-2"
              >
                Proceed to Checkout
              </Link>
              <button
                onClick={() => setIsCartOpen(false)}
                className="w-full text-center text-xs tracking-wider uppercase py-2 text-gray-600 hover:text-gray-400 transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CartSidebar;
