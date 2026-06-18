import React from 'react';
import { Link } from 'react-router-dom';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import StarRating from '../components/common/StarRating';
import { formatPrice } from '../utils/helpers';

const WishlistPage = () => {
  const { wishlist, removeFromWishlist, moveToCart } = useWishlist();
  const { isInCart } = useCart();

  return (
    <div className="pt-16">
      {/* Header */}
      <div className="py-14" style={{ background: '#0d0d0d', borderBottom: '1px solid #151515' }}>
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-[10px] tracking-[0.4em] uppercase mb-3" style={{ color: '#c9a84c' }}>Saved</p>
          <h1 className="text-4xl font-bold mb-4" style={{ fontFamily: 'Playfair Display, serif', color: '#e8e8e8' }}>
            My Wishlist
          </h1>
          <div className="gold-divider w-24 mx-auto" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {wishlist.length === 0 ? (
          <div className="text-center py-24">
            <svg className="mx-auto mb-6 opacity-20" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#c9a84c" strokeWidth="1">
              <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>
            </svg>
            <p className="text-gray-600 mb-6">Your wishlist is empty.</p>
            <Link to="/watches" className="btn-gold px-8 py-3 text-xs tracking-[0.15em] uppercase">
              Explore Collection
            </Link>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-8">
              <p className="text-xs text-gray-600 tracking-wider uppercase">
                {wishlist.length} {wishlist.length === 1 ? 'piece' : 'pieces'} saved
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-px" style={{ background: '#1a1a1a' }}>
              {wishlist.map(watch => (
                <div key={watch.id} style={{ background: '#0a0a0a' }} className="group">
                  <div className="p-1">
                    {/* Image */}
                    <div className="relative overflow-hidden" style={{ height: '220px' }}>
                      <img
                        src={watch.image}
                        alt={watch.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=400&q=60'; }}
                      />
                      <button
                        onClick={() => removeFromWishlist(watch.id)}
                        className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center text-xs transition-all"
                        style={{ background: 'rgba(239,68,68,0.15)', border: '1px solid rgba(239,68,68,0.3)', color: '#fca5a5' }}
                        title="Remove from wishlist"
                      >
                        ✕
                      </button>
                      <div className="absolute bottom-3 left-3">
                        <span className="badge-gold">{watch.category}</span>
                      </div>
                    </div>

                    {/* Details */}
                    <div className="p-4">
                      <p className="text-[10px] tracking-widest uppercase mb-1" style={{ color: '#c9a84c' }}>{watch.brand}</p>
                      <Link to={`/watches/${watch.id}`}>
                        <h3 className="text-sm font-medium mb-2 hover:text-yellow-500 transition-colors line-clamp-2"
                          style={{ fontFamily: 'Playfair Display, serif', color: '#ddd' }}>
                          {watch.name}
                        </h3>
                      </Link>
                      <StarRating rating={watch.rating} size={11} />
                      <div className="flex items-center justify-between mt-4">
                        <span className="text-base font-semibold text-gold-gradient" style={{ fontFamily: 'Playfair Display, serif' }}>
                          {formatPrice(watch.price)}
                        </span>
                        <button
                          onClick={() => moveToCart(watch)}
                          disabled={isInCart(watch.id)}
                          className={`text-[10px] tracking-wider uppercase px-3 py-2 transition-all ${
                            isInCart(watch.id)
                              ? 'border border-yellow-700 text-yellow-700 cursor-default'
                              : 'btn-gold'
                          }`}
                        >
                          {isInCart(watch.id) ? '✓ In Cart' : 'Move to Cart'}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default WishlistPage;
