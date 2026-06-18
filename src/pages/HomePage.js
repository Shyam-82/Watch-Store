import React from 'react';
import { Link } from 'react-router-dom';
import { useWatches } from '../context/WatchContext';
import WatchCard from '../components/watches/WatchCard';
import LoadingSpinner from '../components/common/LoadingSpinner';

const BRANDS = [
  { name: 'Chronex', icon: '◈' },
  { name: 'OceanMaster', icon: '◇' },
  { name: 'SkyWatch', icon: '◉' },
  { name: 'EleganceTime', icon: '◎' },
  { name: 'GlobalTime', icon: '◆' },
  { name: 'ArmyTech', icon: '◈' },
];

const HomePage = () => {
  const { watches, loading } = useWatches();

  // Featured: top 4 by rating
  const featured = [...watches].sort((a, b) => b.rating - a.rating).slice(0, 4);
  // New arrivals: last 4
  const newArrivals = [...watches].slice(-4).reverse();

  return (
    <div className="pt-16">
      {/* ── Hero ──────────────────────────────────────── */}
      <section className="hero-section relative overflow-hidden" style={{ minHeight: '90vh' }}>
        {/* Background decorative circles */}
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute rounded-full"
            style={{
              width: '600px', height: '600px',
              top: '-200px', right: '-200px',
              background: 'radial-gradient(circle, rgba(201,168,76,0.06) 0%, transparent 70%)',
            }}
          />
          <div
            className="absolute rounded-full"
            style={{
              width: '400px', height: '400px',
              bottom: '-100px', left: '-100px',
              background: 'radial-gradient(circle, rgba(201,168,76,0.04) 0%, transparent 70%)',
            }}
          />
          {/* Grid lines */}
          <div className="absolute inset-0" style={{
            backgroundImage: 'linear-gradient(rgba(201,168,76,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,0.03) 1px, transparent 1px)',
            backgroundSize: '80px 80px',
          }} />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 flex flex-col lg:flex-row items-center gap-16" style={{ paddingTop: '10vh', paddingBottom: '8vh' }}>
          {/* Text */}
          <div className="flex-1 text-center lg:text-left">
            <div className="inline-flex items-center gap-3 mb-8">
              <div className="h-px w-12" style={{ background: 'linear-gradient(90deg, transparent, #c9a84c)' }} />
              <span className="text-[10px] tracking-[0.4em] uppercase" style={{ color: '#c9a84c' }}>
                Est. 1985 · Master Horologists
              </span>
              <div className="h-px w-12" style={{ background: 'linear-gradient(90deg, #c9a84c, transparent)' }} />
            </div>

            <h1
              className="text-5xl lg:text-7xl font-bold leading-[1.05] mb-6"
              style={{ fontFamily: 'Playfair Display, serif', color: '#e8e8e8' }}
            >
              Time is the<br />
              <span className="text-gold-gradient italic">ultimate</span><br />
              luxury.
            </h1>

            <p className="text-base lg:text-lg max-w-lg mb-10 mx-auto lg:mx-0" style={{ color: '#666', lineHeight: 1.8 }}>
              Discover our curated collection of the world's finest timepieces.
              From Swiss complications to modern artisanship — each watch tells a story.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link to="/watches" className="btn-gold px-10 py-4 text-xs tracking-[0.2em] uppercase text-center">
                Explore Collection
              </Link>
              <Link to="/watches?category=Luxury" className="btn-outline-gold px-10 py-4 text-xs tracking-[0.2em] uppercase text-center">
                View Luxury
              </Link>
            </div>

            {/* Stats */}
            <div className="flex gap-10 mt-14 justify-center lg:justify-start">
              {[['500+', 'Timepieces'], ['40+', 'Brands'], ['99%', 'Satisfaction']].map(([num, label]) => (
                <div key={label}>
                  <div className="text-2xl font-bold text-gold-gradient" style={{ fontFamily: 'Playfair Display, serif' }}>{num}</div>
                  <div className="text-xs tracking-widest uppercase mt-1" style={{ color: '#555' }}>{label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Hero watch visual */}
          <div className="flex-1 flex items-center justify-center lg:justify-end">
            <div className="relative animate-float">
              {/* Glow */}
              <div className="absolute inset-0 rounded-full blur-3xl opacity-20"
                style={{ background: 'radial-gradient(circle, #c9a84c 0%, transparent 70%)', transform: 'scale(1.2)' }} />
              <div className="relative" style={{ width: '340px', height: '340px' }}>
                <img
                  src="https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=700&q=90"
                  alt="Luxury Watch"
                  className="w-full h-full object-cover rounded-full"
                  style={{
                    border: '1px solid rgba(201,168,76,0.2)',
                    boxShadow: '0 0 80px rgba(201,168,76,0.15), inset 0 0 40px rgba(0,0,0,0.5)',
                  }}
                />
                {/* Ring */}
                <div className="absolute -inset-4 rounded-full border border-dashed opacity-30 animate-spin-slow"
                  style={{ borderColor: '#c9a84c' }} />
              </div>
              {/* Floating tag */}
              <div
                className="absolute -bottom-4 -left-8 px-4 py-2"
                style={{
                  background: 'rgba(13,13,13,0.9)',
                  border: '1px solid rgba(201,168,76,0.3)',
                  backdropFilter: 'blur(12px)',
                }}
              >
                <p className="text-[10px] tracking-widest uppercase" style={{ color: '#c9a84c' }}>Featured</p>
                <p className="text-sm font-medium" style={{ fontFamily: 'Playfair Display, serif', color: '#e8e8e8' }}>
                  Royal Perpetual
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
          <span className="text-[9px] tracking-[0.4em] uppercase text-gray-500">Scroll</span>
          <div className="w-px h-12 bg-gradient-to-b from-gray-500 to-transparent" />
        </div>
      </section>

      {/* ── Category Strip ─────────────────────────────── */}
      <section style={{ background: '#0d0d0d', borderTop: '1px solid #151515', borderBottom: '1px solid #151515' }}>
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex flex-wrap justify-center gap-2">
            {['Luxury', 'Diver', 'Sport', 'Dress', 'Smart'].map(cat => (
              <Link
                key={cat}
                to={`/watches`}
                className="filter-pill text-xs"
              >
                {cat}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Featured Watches ───────────────────────────── */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <p className="text-[10px] tracking-[0.4em] uppercase mb-3" style={{ color: '#c9a84c' }}>Handpicked Selection</p>
          <h2 className="text-3xl lg:text-4xl font-bold mb-4" style={{ fontFamily: 'Playfair Display, serif', color: '#e8e8e8' }}>
            Featured Timepieces
          </h2>
          <div className="gold-divider w-24 mx-auto" />
        </div>

        {loading ? (
          <LoadingSpinner />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px" style={{ background: '#1a1a1a' }}>
            {featured.map(watch => (
              <div key={watch.id} style={{ background: '#0a0a0a' }}>
                <WatchCard watch={watch} />
              </div>
            ))}
          </div>
        )}

        <div className="text-center mt-10">
          <Link to="/watches" className="btn-outline-gold px-10 py-3 text-xs tracking-[0.2em] uppercase inline-block">
            View All Watches
          </Link>
        </div>
      </section>

      {/* ── Banner ─────────────────────────────────────── */}
      <section className="relative overflow-hidden py-24" style={{ background: '#070707' }}>
        <div className="absolute inset-0" style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1547996160-81dfa63595aa?w=1400&q=60)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.07,
        }} />
        <div className="absolute inset-0" style={{
          background: 'linear-gradient(135deg, rgba(201,168,76,0.08) 0%, transparent 50%, rgba(201,168,76,0.05) 100%)',
        }} />
        <div className="relative max-w-3xl mx-auto px-6 text-center">
          <p className="text-[10px] tracking-[0.4em] uppercase mb-4" style={{ color: '#c9a84c' }}>Free Delivery</p>
          <h2 className="text-3xl lg:text-5xl font-bold mb-6" style={{ fontFamily: 'Playfair Display, serif', color: '#e8e8e8' }}>
            Complimentary Shipping<br />
            <span className="text-gold-gradient">on orders over $5,000</span>
          </h2>
          <p className="text-sm mb-8" style={{ color: '#666' }}>
            Every timepiece arrives in our signature presentation box with certificate of authenticity.
          </p>
          <Link to="/watches" className="btn-gold px-10 py-4 text-xs tracking-[0.2em] uppercase inline-block">
            Shop Now
          </Link>
        </div>
      </section>

      {/* ── New Arrivals ───────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <p className="text-[10px] tracking-[0.4em] uppercase mb-3" style={{ color: '#c9a84c' }}>Just Arrived</p>
          <h2 className="text-3xl lg:text-4xl font-bold mb-4" style={{ fontFamily: 'Playfair Display, serif', color: '#e8e8e8' }}>
            New Arrivals
          </h2>
          <div className="gold-divider w-24 mx-auto" />
        </div>

        {loading ? (
          <LoadingSpinner />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px" style={{ background: '#1a1a1a' }}>
            {newArrivals.map(watch => (
              <div key={watch.id} style={{ background: '#0a0a0a' }}>
                <WatchCard watch={watch} />
              </div>
            ))}
          </div>
        )}
      </section>

      {/* ── Brands ─────────────────────────────────────── */}
      <section className="py-16" style={{ background: '#0d0d0d', borderTop: '1px solid #151515' }}>
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-center text-[10px] tracking-[0.4em] uppercase mb-10" style={{ color: '#444' }}>Our Brands</p>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-6">
            {BRANDS.map(b => (
              <div key={b.name} className="flex flex-col items-center gap-2 py-4 opacity-40 hover:opacity-80 transition-opacity cursor-default">
                <span className="text-2xl" style={{ color: '#c9a84c' }}>{b.icon}</span>
                <span className="text-[10px] tracking-[0.2em] uppercase" style={{ color: '#666' }}>{b.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
