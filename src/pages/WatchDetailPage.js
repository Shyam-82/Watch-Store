import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useWatches } from '../context/WatchContext';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useAuth } from '../context/AuthContext';
import StarRating from '../components/common/StarRating';
import LoadingSpinner from '../components/common/LoadingSpinner';
import WatchCard from '../components/watches/WatchCard';
import { formatPrice } from '../utils/helpers';

const WatchDetailPage = () => {
  const { id } = useParams();
  const { watches, loading, getWatch } = useWatches();
  const { addToCart, isInCart, setIsCartOpen } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [watch, setWatch] = useState(null);
  const [loadingDetail, setLoadingDetail] = useState(true);
  const [qty, setQty] = useState(1);

  useEffect(() => {
  window.scrollTo(0, 0);
  setLoadingDetail(true);

  getWatch(id).then(data => {
    setWatch(data);
    setLoadingDetail(false);
  });

}, [id, getWatch]);

  const handleAddToCart = () => {
    for (let i = 0; i < qty; i++) addToCart(watch);
    setIsCartOpen(true);
  };

  const handleWishlist = () => {
    if (!user) { navigate('/login'); return; }
    toggleWishlist(watch);
  };

  // Related watches (same category, excluding current)
  const related = watches.filter(w => w.category === watch?.category && w.id !== watch?.id).slice(0, 4);

  if (loadingDetail || loading) return (
    <div className="pt-16"><LoadingSpinner text="Loading timepiece..." /></div>
  );

  if (!watch) return (
    <div className="pt-16 text-center py-20">
      <p className="text-gray-500 mb-4">Watch not found.</p>
      <Link to="/watches" className="btn-gold px-6 py-2 text-xs tracking-widest uppercase">Back to Collection</Link>
    </div>
  );

  const inCart = isInCart(watch.id);
  const inWishlist = isInWishlist(watch.id);

  return (
    <div className="pt-16">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center gap-2 text-xs text-gray-600">
          <Link to="/" className="hover:text-yellow-600 transition-colors">Home</Link>
          <span>/</span>
          <Link to="/watches" className="hover:text-yellow-600 transition-colors">Collection</Link>
          <span>/</span>
          <span className="text-gray-400 truncate max-w-xs">{watch.name}</span>
        </div>
      </div>

      {/* Main Detail */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">

          {/* Image */}
          <div className="relative">
            <div className="sticky top-24">
              <div className="relative overflow-hidden" style={{ paddingBottom: '100%' }}>
                <img
                  src={watch.image}
                  alt={watch.name}
                  className="absolute inset-0 w-full h-full object-cover"
                  style={{ border: '1px solid #1a1a1a' }}
                  onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=700&q=80'; }}
                />
                {/* Gold corner accents */}
                <div className="absolute top-3 left-3 w-8 h-8 border-t border-l" style={{ borderColor: 'rgba(201,168,76,0.4)' }} />
                <div className="absolute top-3 right-3 w-8 h-8 border-t border-r" style={{ borderColor: 'rgba(201,168,76,0.4)' }} />
                <div className="absolute bottom-3 left-3 w-8 h-8 border-b border-l" style={{ borderColor: 'rgba(201,168,76,0.4)' }} />
                <div className="absolute bottom-3 right-3 w-8 h-8 border-b border-r" style={{ borderColor: 'rgba(201,168,76,0.4)' }} />
              </div>
              {/* Stock indicator */}
              {watch.stock <= 5 && watch.stock > 0 && (
                <div className="mt-3 text-center">
                  <span className="text-xs px-4 py-1.5"
                    style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)', color: '#fca5a5' }}>
                    Only {watch.stock} pieces remaining
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Info */}
          <div className="flex flex-col">
            <div className="mb-2">
              <span className="badge-gold">{watch.category}</span>
            </div>
            <p className="text-sm tracking-[0.2em] uppercase mt-3 mb-1" style={{ color: '#c9a84c' }}>
              {watch.brand}
            </p>
            <h1 className="text-3xl lg:text-4xl font-bold mb-4" style={{ fontFamily: 'Playfair Display, serif', color: '#f0f0f0' }}>
              {watch.name}
            </h1>

            <div className="flex items-center gap-4 mb-6">
              <StarRating rating={watch.rating} size={16} />
              <span className="text-xs text-gray-600">· {watch.stock} in stock</span>
            </div>

            <div className="gold-divider mb-6" />

            <div className="text-4xl font-bold text-gold-gradient mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>
              {formatPrice(watch.price)}
            </div>

            <p className="text-sm leading-relaxed mb-8" style={{ color: '#777', lineHeight: 1.9 }}>
              {watch.description}
            </p>

            {/* Specs */}
            <div className="grid grid-cols-2 gap-3 mb-8">
              {[
                { label: 'Brand', value: watch.brand },
                { label: 'Category', value: watch.category },
                { label: 'Rating', value: `${watch.rating}/5.0` },
                { label: 'Availability', value: watch.stock > 0 ? `${watch.stock} In Stock` : 'Sold Out' },
              ].map(({ label, value }) => (
                <div key={label} className="px-4 py-3" style={{ background: '#111', border: '1px solid #1a1a1a' }}>
                  <p className="text-[10px] tracking-widest uppercase mb-1" style={{ color: '#555' }}>{label}</p>
                  <p className="text-sm font-medium" style={{ color: '#ccc' }}>{value}</p>
                </div>
              ))}
            </div>

            {/* Quantity */}
            <div className="flex items-center gap-4 mb-6">
              <span className="text-xs tracking-widest uppercase" style={{ color: '#666' }}>Qty</span>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setQty(q => Math.max(1, q - 1))}
                  className="qty-btn w-9 h-9"
                >−</button>
                <span className="w-10 text-center text-sm text-gray-300">{qty}</span>
                <button
                  onClick={() => setQty(q => Math.min(watch.stock, q + 1))}
                  className="qty-btn w-9 h-9"
                >+</button>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <button
                onClick={handleAddToCart}
                disabled={watch.stock === 0}
                className={`flex-1 py-4 text-xs tracking-[0.2em] uppercase transition-all ${
                  watch.stock === 0 ? 'opacity-40 cursor-not-allowed bg-gray-800 text-gray-500' : 'btn-gold'
                }`}
              >
                {watch.stock === 0 ? 'Sold Out' : inCart ? '✓ Added — View Cart' : 'Add to Cart'}
              </button>
              <button
                onClick={handleWishlist}
                className="w-14 h-14 flex items-center justify-center transition-all duration-200"
                style={{
                  border: `1px solid ${inWishlist ? 'rgba(201,168,76,0.6)' : '#2a2a2a'}`,
                  background: inWishlist ? 'rgba(201,168,76,0.1)' : 'transparent',
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24"
                  fill={inWishlist ? '#c9a84c' : 'none'}
                  stroke="#c9a84c" strokeWidth="1.5">
                  <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>
                </svg>
              </button>
            </div>

            {/* Trust badges */}
            <div className="grid grid-cols-3 gap-3 mt-8 pt-8" style={{ borderTop: '1px solid #1a1a1a' }}>
              {[
                { icon: '🛡', label: '2-Year Warranty' },
                { icon: '📦', label: 'Free Returns' },
                { icon: '✓', label: 'Authentic' },
              ].map(({ icon, label }) => (
                <div key={label} className="flex flex-col items-center gap-1 text-center">
                  <span className="text-lg">{icon}</span>
                  <span className="text-[10px] tracking-wider uppercase" style={{ color: '#555' }}>{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Related Watches */}
      {related.length > 0 && (
        <section className="max-w-7xl mx-auto px-6 py-16">
          <div className="mb-8">
            <p className="text-[10px] tracking-[0.4em] uppercase mb-2" style={{ color: '#c9a84c' }}>You May Also Like</p>
            <h2 className="text-2xl font-bold" style={{ fontFamily: 'Playfair Display, serif', color: '#e8e8e8' }}>
              Related Timepieces
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px" style={{ background: '#1a1a1a' }}>
            {related.map(w => (
              <div key={w.id} style={{ background: '#0a0a0a' }}>
                <WatchCard watch={w} />
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default WatchDetailPage;
