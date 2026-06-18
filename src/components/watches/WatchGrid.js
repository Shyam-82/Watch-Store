import React, { useState, useMemo } from 'react';
import WatchCard from './WatchCard';
import LoadingSpinner from '../common/LoadingSpinner';
import { useWatches } from '../../context/WatchContext';

const WatchGrid = () => {
  const { watches, loading, error, categories } = useWatches();
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [sort, setSort] = useState('default');

  // Filter + sort watches
  const filtered = useMemo(() => {
    let result = [...watches];

    // Search
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(w =>
        w.name.toLowerCase().includes(q) ||
        w.brand.toLowerCase().includes(q) ||
        w.category.toLowerCase().includes(q)
      );
    }

    // Category
    if (category !== 'All') {
      result = result.filter(w => w.category === category);
    }

    // Sort
    switch (sort) {
      case 'price-asc': result.sort((a, b) => a.price - b.price); break;
      case 'price-desc': result.sort((a, b) => b.price - a.price); break;
      case 'rating': result.sort((a, b) => b.rating - a.rating); break;
      case 'name': result.sort((a, b) => a.name.localeCompare(b.name)); break;
      default: break;
    }

    return result;
  }, [watches, search, category, sort]);

  if (loading) return <LoadingSpinner text="Loading collection..." />;
  if (error) return (
    <div className="text-center py-20">
      <p style={{ color: '#f87171' }}>{error}</p>
    </div>
  );

  return (
    <div>
      {/* Controls */}
      <div className="mb-8 space-y-4">
        {/* Search */}
        <div className="relative max-w-xl">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="1.5">
            <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
          </svg>
          <input
            type="text"
            placeholder="Search by name, brand, or category..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="input-dark w-full pl-10 pr-4 py-3 text-sm"
          />
          {search && (
            <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-400">
              ✕
            </button>
          )}
        </div>

        {/* Category Pills + Sort */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap gap-2">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`filter-pill ${category === cat ? 'active' : ''}`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-600 uppercase tracking-wider">Sort:</span>
            <select
              value={sort}
              onChange={e => setSort(e.target.value)}
              className="select-dark text-xs py-1.5 px-3"
            >
              <option value="default">Featured</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Top Rated</option>
              <option value="name">Name A–Z</option>
            </select>
          </div>
        </div>
      </div>

      {/* Results count */}
      <div className="mb-6 flex items-center justify-between">
        <p className="text-xs text-gray-600 tracking-wider uppercase">
          {filtered.length} {filtered.length === 1 ? 'timepiece' : 'timepieces'} found
        </p>
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-20">
          <div className="text-6xl mb-4">⌚</div>
          <p className="text-gray-500 mb-2">No watches found</p>
          <button onClick={() => { setSearch(''); setCategory('All'); }} className="text-xs text-yellow-600 hover:underline">
            Clear filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-px" style={{ background: '#1a1a1a' }}>
          {filtered.map(watch => (
            <div key={watch.id} style={{ background: '#0a0a0a' }}>
              <WatchCard watch={watch} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WatchGrid;
