import React from 'react';
import WatchGrid from '../components/watches/WatchGrid';

const WatchesPage = () => {
  return (
    <div className="pt-16">
      {/* Page Header */}
      <div className="relative overflow-hidden py-16" style={{ background: '#0d0d0d', borderBottom: '1px solid #151515' }}>
        <div className="absolute inset-0 pointer-events-none" style={{
          backgroundImage: 'linear-gradient(rgba(201,168,76,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,0.03) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }} />
        <div className="relative max-w-7xl mx-auto px-6 text-center">
          <p className="text-[10px] tracking-[0.4em] uppercase mb-3" style={{ color: '#c9a84c' }}>
            Curated for Connoisseurs
          </p>
          <h1 className="text-4xl lg:text-5xl font-bold mb-4" style={{ fontFamily: 'Playfair Display, serif', color: '#e8e8e8' }}>
            The Collection
          </h1>
          <div className="gold-divider w-24 mx-auto" />
        </div>
      </div>

      {/* Grid */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <WatchGrid />
      </div>
    </div>
  );
};

export default WatchesPage;
