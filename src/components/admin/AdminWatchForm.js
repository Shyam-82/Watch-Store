import React, { useState, useEffect } from 'react';

const CATEGORIES = ['Luxury', 'Diver', 'Sport', 'Dress', 'Smart'];

const defaultForm = {
  name: '', brand: '', image: '', category: 'Luxury',
  price: '', rating: '', stock: '', description: ''
};

const AdminWatchForm = ({ watch, onSave, onClose }) => {
  const [form, setForm] = useState(defaultForm);
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (watch) setForm({ ...watch, price: watch.price, rating: watch.rating, stock: watch.stock });
    else setForm(defaultForm);
  }, [watch]);

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Name is required';
    if (!form.brand.trim()) e.brand = 'Brand is required';
    if (!form.image.trim()) e.image = 'Image URL is required';
    if (!form.price || isNaN(form.price) || Number(form.price) <= 0) e.price = 'Valid price required';
    if (!form.rating || isNaN(form.rating) || Number(form.rating) < 0 || Number(form.rating) > 5) e.rating = 'Rating must be 0–5';
    if (!form.stock || isNaN(form.stock) || Number(form.stock) < 0) e.stock = 'Valid stock required';
    if (!form.description.trim()) e.description = 'Description is required';
    return e;
  };

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    setErrors(prev => ({ ...prev, [e.target.name]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setSaving(true);
    const payload = {
      ...form,
      price: Number(form.price),
      rating: Number(form.rating),
      stock: Number(form.stock),
    };
    await onSave(payload);
    setSaving(false);
  };

  const Field = ({ label, name, type = 'text', placeholder, as }) => (
    <div>
      <label className="block text-xs tracking-widest uppercase mb-1.5" style={{ color: '#888' }}>{label}</label>
      {as === 'textarea' ? (
        <textarea
          name={name}
          value={form[name]}
          onChange={handleChange}
          placeholder={placeholder}
          rows={3}
          className="input-dark w-full px-3 py-2.5 text-sm resize-none"
        />
      ) : as === 'select' ? (
        <select name={name} value={form[name]} onChange={handleChange} className="select-dark w-full px-3 py-2.5 text-sm">
          {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
      ) : (
        <input
          type={type}
          name={name}
          value={form[name]}
          onChange={handleChange}
          placeholder={placeholder}
          className="input-dark w-full px-3 py-2.5 text-sm"
        />
      )}
      {errors[name] && <p className="text-xs text-red-400 mt-1">{errors[name]}</p>}
    </div>
  );

  return (
    <div className="modal-overlay fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="modal-content w-full max-w-2xl max-h-[90vh] overflow-y-auto"
        style={{ background: '#0d0d0d', border: '1px solid rgba(201,168,76,0.2)' }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5" style={{ borderBottom: '1px solid #1a1a1a' }}>
          <h2 className="text-sm tracking-[0.2em] uppercase font-semibold" style={{ fontFamily: 'Playfair Display, serif', color: '#c9a84c' }}>
            {watch ? 'Edit Timepiece' : 'Add New Timepiece'}
          </h2>
          <button onClick={onClose} className="text-gray-600 hover:text-gray-300 transition-colors text-lg">✕</button>
        </div>

        <form onSubmit={handleSubmit} className="px-6 py-6 space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <Field label="Watch Name" name="name" placeholder="Royal Perpetual..." />
            <Field label="Brand" name="brand" placeholder="Chronex..." />
            <Field label="Category" name="category" as="select" />
            <Field label="Price (USD)" name="price" type="number" placeholder="4999" />
            <Field label="Rating (0–5)" name="rating" type="number" placeholder="4.8" />
            <Field label="Stock" name="stock" type="number" placeholder="10" />
          </div>
          <Field label="Image URL" name="image" placeholder="https://images.unsplash.com/..." />
          <Field label="Description" name="description" as="textarea" placeholder="A masterpiece of..." />

          {/* Image preview */}
          {form.image && (
            <div>
              <p className="text-xs text-gray-600 uppercase tracking-widest mb-2">Preview</p>
              <img
                src={form.image}
                alt="preview"
                className="w-32 h-32 object-cover"
                style={{ border: '1px solid #2a2a2a' }}
                onError={(e) => { e.target.style.display = 'none'; }}
              />
            </div>
          )}

          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              disabled={saving}
              className="btn-gold flex-1 py-3 text-xs tracking-[0.15em] uppercase disabled:opacity-50"
            >
              {saving ? 'Saving...' : watch ? 'Update Watch' : 'Add Watch'}
            </button>
            <button type="button" onClick={onClose} className="btn-outline-gold px-6 py-3 text-xs tracking-[0.15em] uppercase">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminWatchForm;
