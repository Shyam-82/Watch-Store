import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer style={{ background: '#080808', borderTop: '1px solid rgba(201,168,76,0.1)' }}>
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">

          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <svg width="24" height="24" viewBox="0 0 28 28" fill="none">
                <circle cx="14" cy="14" r="10" stroke="#c9a84c" strokeWidth="1.5"/>
                <line x1="14" y1="8" x2="14" y2="14" stroke="#c9a84c" strokeWidth="1.5" strokeLinecap="round"/>
                <line x1="14" y1="14" x2="17.5" y2="16.5" stroke="#e8c97e" strokeWidth="1.2" strokeLinecap="round"/>
                <rect x="11" y="2" width="6" height="3" rx="1" fill="#c9a84c" opacity="0.6"/>
                <rect x="11" y="23" width="6" height="3" rx="1" fill="#c9a84c" opacity="0.6"/>
              </svg>
              <span style={{ fontFamily: 'Playfair Display, serif', color: '#c9a84c', fontSize: '1.1rem', letterSpacing: '0.2em' }}>
                CHRONOS
              </span>
            </div>
            <p className="text-sm leading-relaxed max-w-xs" style={{ color: '#555' }}>
              Curating the world's finest timepieces since 1985. Each watch in our collection tells a story of precision, artistry, and timeless elegance.
            </p>
            <div className="flex gap-4 mt-6">
              {['Instagram', 'Twitter', 'Facebook'].map(s => (
                <a
                  key={s}
                  href="#"
                  className="text-xs tracking-widest uppercase transition-colors duration-200 hover:text-yellow-600"
                  style={{ color: '#444' }}
                >
                  {s}
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-xs tracking-[0.2em] uppercase mb-5 font-semibold" style={{ color: '#c9a84c' }}>
              Navigation
            </h3>
            <ul className="space-y-3">
              {[
                { label: 'Collection', to: '/watches' },
                { label: 'Wishlist', to: '/wishlist' },
                { label: 'Cart', to: '#' },
                { label: 'My Account', to: '/login' },
              ].map(({ label, to }) => (
                <li key={label}>
                  <Link to={to} className="text-sm transition-colors duration-200 hover:text-yellow-600" style={{ color: '#555' }}>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xs tracking-[0.2em] uppercase mb-5 font-semibold" style={{ color: '#c9a84c' }}>
              Contact
            </h3>
            <ul className="space-y-3 text-sm" style={{ color: '#555' }}>
              <li>support@chronos.com</li>
              <li>+1 (800) CHRONOS</li>
              <li>Mon–Sat 9am–7pm EST</li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="gold-divider mb-6" />

        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs" style={{ color: '#333', letterSpacing: '0.05em' }}>
            © {new Date().getFullYear()} Chronos Luxury Timepieces. All rights reserved.
          </p>
          <div className="flex gap-6">
            {['Privacy Policy', 'Terms of Service', 'Returns'].map(item => (
              <a key={item} href="#" className="text-xs transition-colors hover:text-yellow-600" style={{ color: '#333' }}>
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
