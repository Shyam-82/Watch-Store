import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useAuth } from '../../context/AuthContext';
import StarRating from '../common/StarRating';
import { formatPrice } from '../../utils/helpers';
import { useNavigate } from 'react-router-dom';

const WatchCard = ({ watch }) => {
  const { addToCart, isInCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { user } = useAuth();
  const navigate = useNavigate();

  const inCart = isInCart(watch.id);
  const inWishlist = isInWishlist(watch.id);

  const handleWishlist = (e) => {
    e.preventDefault();
    if (!user) { navigate('/login'); return; }
    toggleWishlist(watch);
  };

  const handleAddToCart = (e) => {
    e.preventDefault();
    addToCart(watch);
  };

  return (
    <div className="watch-card rounded-none flex flex-col group">
      {/* Image */}
      <Link to={`/watches/${watch.id}`} className="block">
        <div className="watch-image-wrap" style={{ height: '240px' }}>
          <img
            src={watch.image}
            alt={watch.name}
            loading="lazy"
            onError={(e) => {
              e.target.src = 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=600&q=80';
            }}
          />
          {/* Overlay on hover */}
          <div
            className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{ background: 'rgba(0,0,0,0.3)' }}
          >
            <span className="text-xs tracking-[0.2em] uppercase px-6 py-2 border border-white text-white">
              View Details
            </span>
          </div>
          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1">
            <span className="badge-gold">{watch.category}</span>
            {watch.stock <= 3 && (
              <span className="text-[10px] px-2 py-0.5 font-semibold uppercase tracking-wider"
                style={{ background: 'rgba(239,68,68,0.15)', border: '1px solid rgba(239,68,68,0.3)', color: '#f87171', borderRadius: '1px' }}>
                Only {watch.stock} left
              </span>
            )}
          </div>
          {/* Wishlist button */}
          <button
            onClick={handleWishlist}
            className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center transition-all duration-200"
            style={{
              background: inWishlist ? 'rgba(201,168,76,0.9)' : 'rgba(0,0,0,0.5)',
              border: '1px solid rgba(201,168,76,0.3)',
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24"
              fill={inWishlist ? '#0a0a0a' : 'none'}
              stroke={inWishlist ? '#0a0a0a' : '#c9a84c'}
              strokeWidth="2">
              <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>
            </svg>
          </button>
        </div>
      </Link>

      {/* Info */}
      <div className="p-4 flex flex-col flex-1">
        <div className="flex items-start justify-between gap-2 mb-1">
          <Link to={`/watches/${watch.id}`}>
            <p className="text-[11px] tracking-[0.15em] uppercase" style={{ color: '#c9a84c' }}>
              {watch.brand}
            </p>
          </Link>
        </div>
        <Link to={`/watches/${watch.id}`} className="block mb-2">
          <h3 className="text-sm font-medium leading-snug hover:text-yellow-500 transition-colors line-clamp-2"
            style={{ fontFamily: 'Playfair Display, serif', color: '#e8e8e8' }}>
            {watch.name}
          </h3>
        </Link>

        <StarRating rating={watch.rating} size={12} />

        <div className="mt-auto pt-4 flex items-center justify-between">
          <span className="text-lg font-semibold text-gold-gradient" style={{ fontFamily: 'Playfair Display, serif' }}>
            {formatPrice(watch.price)}
          </span>

          <button
            onClick={handleAddToCart}
            disabled={watch.stock === 0}
            className={`text-[10px] tracking-[0.15em] uppercase px-3 py-2 transition-all duration-200 ${
              watch.stock === 0
                ? 'opacity-40 cursor-not-allowed'
                : inCart
                ? 'border border-yellow-600 text-yellow-600'
                : 'btn-gold'
            }`}
          >
            {watch.stock === 0 ? 'Sold Out' : inCart ? '✓ In Cart' : 'Add to Cart'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default WatchCard;
