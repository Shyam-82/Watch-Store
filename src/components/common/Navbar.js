import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';

const Navbar = () => {
  const { user, logout, isAdmin } = useAuth();
  const { totalItems, setIsCartOpen } = useCart();
  const { wishlist } = useWishlist();
  const navigate = useNavigate();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setMenuOpen(false);
    setUserMenuOpen(false);
  }, [location.pathname]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? 'rgba(10,10,10,0.97)' : 'rgba(10,10,10,0.85)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(201,168,76,0.12)',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            {/* Watch icon SVG */}
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none" className="flex-shrink-0">
              <circle cx="14" cy="14" r="10" stroke="#c9a84c" strokeWidth="1.5"/>
              <circle cx="14" cy="14" r="7" stroke="#c9a84c" strokeWidth="0.8" opacity="0.5"/>
              <line x1="14" y1="8" x2="14" y2="14" stroke="#c9a84c" strokeWidth="1.5" strokeLinecap="round"/>
              <line x1="14" y1="14" x2="17.5" y2="16.5" stroke="#e8c97e" strokeWidth="1.2" strokeLinecap="round"/>
              <rect x="11" y="2" width="6" height="3" rx="1" fill="#c9a84c" opacity="0.6"/>
              <rect x="11" y="23" width="6" height="3" rx="1" fill="#c9a84c" opacity="0.6"/>
            </svg>
            <div>
              <span
                className="text-lg tracking-[0.2em] font-semibold"
                style={{ fontFamily: 'Playfair Display, serif', color: '#c9a84c' }}
              >
                CHRONOS
              </span>
              <div className="text-[9px] tracking-[0.35em] text-gray-500 uppercase -mt-1">
                Luxury Timepieces
              </div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {[
              { label: 'Collection', to: '/watches' },
              ...(user ? [{ label: 'Wishlist', to: '/wishlist' }] : []),
              ...(isAdmin ? [{ label: 'Admin', to: '/admin' }] : []),
            ].map(({ label, to }) => (
              <Link
                key={to}
                to={to}
                className="text-xs tracking-[0.15em] uppercase transition-colors duration-200 relative"
                style={{
                  color: isActive(to) ? '#c9a84c' : '#aaa',
                  fontWeight: isActive(to) ? 600 : 400,
                }}
              >
                {label}
                {isActive(to) && (
                  <span
                    className="absolute -bottom-1 left-0 right-0 h-px"
                    style={{ background: 'linear-gradient(90deg, transparent, #c9a84c, transparent)' }}
                  />
                )}
                {label === 'Wishlist' && wishlist.length > 0 && (
                  <span
                    className="ml-1 text-[10px] px-1 rounded-full"
                    style={{ background: 'rgba(201,168,76,0.2)', color: '#c9a84c' }}
                  >
                    {wishlist.length}
                  </span>
                )}
              </Link>
            ))}
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            {/* Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative flex items-center gap-2 px-3 py-2 transition-all duration-200 group"
              style={{ border: '1px solid #2a2a2a', borderRadius: '2px' }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#c9a84c" strokeWidth="1.5">
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
                <line x1="3" y1="6" x2="21" y2="6"/>
                <path d="M16 10a4 4 0 01-8 0"/>
              </svg>
              <span className="text-xs text-gray-400 hidden sm:block">Cart</span>
              {totalItems > 0 && (
                <span
                  className="absolute -top-2 -right-2 w-5 h-5 flex items-center justify-center text-[10px] font-bold rounded-full"
                  style={{ background: '#c9a84c', color: '#0a0a0a' }}
                >
                  {totalItems}
                </span>
              )}
            </button>

            {/* User Menu */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 px-3 py-2 transition-all duration-200"
                  style={{ border: '1px solid rgba(201,168,76,0.3)', borderRadius: '2px' }}
                >
                  <div
                    className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
                    style={{ background: 'linear-gradient(135deg,#c9a84c,#e8c97e)', color: '#0a0a0a' }}
                  >
                    {user.name[0].toUpperCase()}
                  </div>
                  <span className="text-xs text-gray-300 hidden sm:block max-w-[80px] truncate">
                    {user.name}
                  </span>
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="#888" strokeWidth="1.5">
                    <path d="M2 4l4 4 4-4"/>
                  </svg>
                </button>

                {userMenuOpen && (
                  <div
                    className="absolute right-0 top-full mt-2 w-44 py-1 z-50"
                    style={{ background: '#111', border: '1px solid #222', borderRadius: '2px', boxShadow: '0 8px 32px rgba(0,0,0,0.5)' }}
                  >
                    <div className="px-3 py-2 border-b border-gray-800">
                      <p className="text-xs text-gray-400">Signed in as</p>
                      <p className="text-sm text-gray-200 truncate font-medium">{user.email}</p>
                    </div>
                    {isAdmin && (
                      <Link to="/admin" className="block px-3 py-2 text-xs text-gray-300 hover:text-yellow-500 hover:bg-gray-900 transition-colors">
                        Admin Dashboard
                      </Link>
                    )}
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-3 py-2 text-xs text-red-400 hover:bg-gray-900 transition-colors"
                    >
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  to="/login"
                  className="hidden sm:block text-xs tracking-widest uppercase px-4 py-2 transition-colors"
                  style={{ color: '#aaa' }}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="btn-gold text-xs tracking-widest uppercase px-4 py-2"
                >
                  Register
                </Link>
              </div>
            )}

            {/* Hamburger - mobile */}
            <button
              className="md:hidden p-2 ml-1"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Menu"
            >
              <div className="space-y-1.5">
                <span className={`block w-5 h-px bg-gray-400 transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
                <span className={`block w-5 h-px bg-gray-400 transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
                <span className={`block w-5 h-px bg-gray-400 transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div
            className="md:hidden py-4 border-t space-y-1"
            style={{ borderColor: '#1a1a1a' }}
          >
            <Link to="/watches" className="block px-2 py-2 text-xs tracking-widest uppercase text-gray-400 hover:text-yellow-500">Collection</Link>
            {user && <Link to="/wishlist" className="block px-2 py-2 text-xs tracking-widest uppercase text-gray-400 hover:text-yellow-500">Wishlist</Link>}
            {isAdmin && <Link to="/admin" className="block px-2 py-2 text-xs tracking-widest uppercase text-gray-400 hover:text-yellow-500">Admin</Link>}
            {!user && (
              <>
                <Link to="/login" className="block px-2 py-2 text-xs tracking-widest uppercase text-gray-400 hover:text-yellow-500">Login</Link>
                <Link to="/register" className="block px-2 py-2 text-xs tracking-widest uppercase text-yellow-600 hover:text-yellow-400">Register</Link>
              </>
            )}
            {user && (
              <button onClick={handleLogout} className="block px-2 py-2 text-xs tracking-widest uppercase text-red-400 hover:text-red-300">
                Sign Out
              </button>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
