import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => (
  <div className="pt-16 min-h-screen flex items-center justify-center px-6 text-center">
    <div>
      <p className="text-[10px] tracking-[0.4em] uppercase mb-6" style={{ color: '#c9a84c' }}>Error 404</p>
      <h1 className="text-6xl lg:text-8xl font-bold mb-4" style={{ fontFamily: 'Playfair Display, serif', color: '#1a1a1a' }}>
        404
      </h1>
      <h2 className="text-2xl font-semibold mb-4" style={{ fontFamily: 'Playfair Display, serif', color: '#e8e8e8' }}>
        Page Not Found
      </h2>
      <p className="text-sm text-gray-600 mb-10 max-w-sm mx-auto">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <div className="flex gap-4 justify-center">
        <Link to="/" className="btn-gold px-8 py-3 text-xs tracking-[0.15em] uppercase">
          Go Home
        </Link>
        <Link to="/watches" className="btn-outline-gold px-8 py-3 text-xs tracking-[0.15em] uppercase">
          Browse Watches
        </Link>
      </div>
    </div>
  </div>
);

export default NotFoundPage;
