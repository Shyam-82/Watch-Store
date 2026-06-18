import React, { useState } from 'react';
import { useWatches } from '../context/WatchContext';
import AdminWatchForm from '../components/admin/AdminWatchForm';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { formatPrice } from '../utils/helpers';
import StarRating from '../components/common/StarRating';

const AdminDashboard = () => {
  const { watches, loading, error, addWatch, editWatch, deleteWatch } = useWatches();
  const [showForm, setShowForm] = useState(false);
  const [editTarget, setEditTarget] = useState(null);
  const [search, setSearch] = useState('');
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const filtered = watches.filter(w =>
    w.name.toLowerCase().includes(search.toLowerCase()) ||
    w.brand.toLowerCase().includes(search.toLowerCase()) ||
    w.category.toLowerCase().includes(search.toLowerCase())
  );

  const handleSave = async (data) => {
    if (editTarget) {
      await editWatch(editTarget.id, { ...editTarget, ...data });
    } else {
      await addWatch(data);
    }
    setShowForm(false);
    setEditTarget(null);
  };

  const handleEdit = (watch) => {
    setEditTarget(watch);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    await deleteWatch(id);
    setDeleteConfirm(null);
  };

  // Stats
  const totalStock = watches.reduce((s, w) => s + w.stock, 0);
  const avgRating = watches.length ? (watches.reduce((s, w) => s + w.rating, 0) / watches.length).toFixed(1) : 0;
  const totalValue = watches.reduce((s, w) => s + w.price * w.stock, 0);

  return (
    <div className="pt-16">
      {/* Header */}
      <div className="py-12" style={{ background: '#0d0d0d', borderBottom: '1px solid #151515' }}>
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-[10px] tracking-[0.4em] uppercase mb-2" style={{ color: '#c9a84c' }}>Management</p>
          <h1 className="text-3xl font-bold" style={{ fontFamily: 'Playfair Display, serif', color: '#e8e8e8' }}>
            Admin Dashboard
          </h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {[
            { label: 'Total Watches', value: watches.length, icon: '⌚' },
            { label: 'Total Stock', value: totalStock, icon: '📦' },
            { label: 'Avg Rating', value: avgRating, icon: '⭐' },
            { label: 'Inventory Value', value: formatPrice(totalValue), icon: '💎' },
          ].map(({ label, value, icon }) => (
            <div key={label} className="glass-card p-5">
              <div className="flex items-center justify-between mb-3">
                <span className="text-2xl">{icon}</span>
              </div>
              <p className="text-xl font-bold text-gold-gradient" style={{ fontFamily: 'Playfair Display, serif' }}>
                {value}
              </p>
              <p className="text-[10px] tracking-widest uppercase mt-1" style={{ color: '#555' }}>{label}</p>
            </div>
          ))}
        </div>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div className="relative">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="2">
              <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
            </svg>
            <input
              type="text"
              placeholder="Search watches..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="input-dark pl-9 pr-4 py-2.5 text-sm w-64"
            />
          </div>
          <button
            onClick={() => { setEditTarget(null); setShowForm(true); }}
            className="btn-gold px-6 py-2.5 text-xs tracking-[0.15em] uppercase flex items-center gap-2"
          >
            <span>+</span> Add Watch
          </button>
        </div>

        {/* Table */}
        {loading ? (
          <LoadingSpinner />
        ) : error ? (
          <p className="text-red-400 text-sm">{error}</p>
        ) : (
          <div className="overflow-x-auto" style={{ border: '1px solid #1a1a1a' }}>
            <table className="admin-table w-full">
              <thead>
                <tr>
                  <th className="text-left">Image</th>
                  <th className="text-left">Name</th>
                  <th className="text-left">Brand</th>
                  <th className="text-left">Category</th>
                  <th className="text-left">Price</th>
                  <th className="text-left">Rating</th>
                  <th className="text-left">Stock</th>
                  <th className="text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="text-center py-10 text-gray-600">No watches found.</td>
                  </tr>
                ) : filtered.map(watch => (
                  <tr key={watch.id}>
                    <td>
                      <img
                        src={watch.image}
                        alt={watch.name}
                        className="w-12 h-12 object-cover"
                        style={{ border: '1px solid #1a1a1a' }}
                        onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=100&q=50'; }}
                      />
                    </td>
                    <td>
                      <span className="font-medium" style={{ fontFamily: 'Playfair Display, serif', color: '#ddd' }}>
                        {watch.name}
                      </span>
                    </td>
                    <td>{watch.brand}</td>
                    <td>
                      <span className="badge-gold">{watch.category}</span>
                    </td>
                    <td>
                      <span style={{ color: '#c9a84c', fontWeight: 600 }}>{formatPrice(watch.price)}</span>
                    </td>
                    <td>
                      <StarRating rating={watch.rating} size={11} />
                    </td>
                    <td>
                      <span style={{ color: watch.stock <= 3 ? '#fca5a5' : '#aaa' }}>
                        {watch.stock}
                      </span>
                    </td>
                    <td>
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => handleEdit(watch)}
                          className="text-[10px] px-3 py-1.5 tracking-wider uppercase transition-all"
                          style={{ border: '1px solid rgba(201,168,76,0.3)', color: '#c9a84c' }}
                          onMouseEnter={e => { e.target.style.background = 'rgba(201,168,76,0.1)'; }}
                          onMouseLeave={e => { e.target.style.background = 'transparent'; }}
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => setDeleteConfirm(watch.id)}
                          className="text-[10px] px-3 py-1.5 tracking-wider uppercase transition-all"
                          style={{ border: '1px solid rgba(239,68,68,0.3)', color: '#f87171' }}
                          onMouseEnter={e => { e.target.style.background = 'rgba(239,68,68,0.1)'; }}
                          onMouseLeave={e => { e.target.style.background = 'transparent'; }}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Add/Edit Form Modal */}
      {showForm && (
        <AdminWatchForm
          watch={editTarget}
          onSave={handleSave}
          onClose={() => { setShowForm(false); setEditTarget(null); }}
        />
      )}

      {/* Delete Confirm Modal */}
      {deleteConfirm && (
        <div className="modal-overlay fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="modal-content max-w-sm w-full p-8 text-center"
            style={{ background: '#0d0d0d', border: '1px solid rgba(239,68,68,0.2)' }}>
            <div className="text-3xl mb-4">⚠️</div>
            <h3 className="text-lg font-semibold mb-2" style={{ fontFamily: 'Playfair Display, serif', color: '#e8e8e8' }}>
              Confirm Deletion
            </h3>
            <p className="text-sm text-gray-500 mb-8">This action cannot be undone.</p>
            <div className="flex gap-3">
              <button
                onClick={() => handleDelete(deleteConfirm)}
                className="flex-1 py-2.5 text-xs tracking-widest uppercase transition-all"
                style={{ background: 'rgba(239,68,68,0.15)', border: '1px solid rgba(239,68,68,0.3)', color: '#f87171' }}
              >
                Delete
              </button>
              <button
                onClick={() => setDeleteConfirm(null)}
                className="flex-1 btn-outline-gold py-2.5 text-xs tracking-widest uppercase"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
