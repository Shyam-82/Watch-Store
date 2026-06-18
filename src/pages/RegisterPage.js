import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const RegisterPage = () => {
  const { register, user } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' });
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => { if (user) navigate('/'); }, [user]);

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Name is required';
    if (!form.email) e.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Invalid email format';
    if (!form.password) e.password = 'Password is required';
    else if (form.password.length < 6) e.password = 'At least 6 characters';
    if (form.password !== form.confirm) e.confirm = 'Passwords do not match';
    return e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setLoading(true);
    const ok = await register(form.name, form.email, form.password);
    setLoading(false);
    if (ok) navigate('/');
  };

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    setErrors(prev => ({ ...prev, [e.target.name]: '' }));
  };

  return (
    <div className="pt-16 min-h-screen flex items-center justify-center px-4 relative overflow-hidden">
      <div className="absolute inset-0" style={{
        background: 'radial-gradient(ellipse at 30% 50%, rgba(201,168,76,0.04) 0%, transparent 60%)',
      }} />

      <div className="relative w-full max-w-md">
        <div className="text-center mb-10">
          <Link to="/" className="inline-block">
            <span className="text-2xl tracking-[0.3em]" style={{ fontFamily: 'Playfair Display, serif', color: '#c9a84c' }}>
              CHRONOS
            </span>
          </Link>
          <p className="text-xs tracking-widest uppercase mt-1" style={{ color: '#555' }}>Luxury Timepieces</p>
        </div>

        <div className="glass-card p-8 lg:p-10">
          <h1 className="text-xl font-semibold mb-1" style={{ fontFamily: 'Playfair Display, serif', color: '#e8e8e8' }}>
            Create Account
          </h1>
          <p className="text-xs text-gray-600 mb-8">Join the Chronos family today.</p>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name */}
            <div>
              <label className="block text-[10px] tracking-[0.2em] uppercase mb-2" style={{ color: '#888' }}>Full Name</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="John Doe"
                className="input-dark w-full px-4 py-3 text-sm"
              />
              {errors.name && <p className="text-xs text-red-400 mt-1">{errors.name}</p>}
            </div>

            {/* Email */}
            <div>
              <label className="block text-[10px] tracking-[0.2em] uppercase mb-2" style={{ color: '#888' }}>Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="your@email.com"
                className="input-dark w-full px-4 py-3 text-sm"
              />
              {errors.email && <p className="text-xs text-red-400 mt-1">{errors.email}</p>}
            </div>

            {/* Password */}
            <div>
              <label className="block text-[10px] tracking-[0.2em] uppercase mb-2" style={{ color: '#888' }}>Password</label>
              <div className="relative">
                <input
                  type={showPass ? 'text' : 'password'}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Min. 6 characters"
                  className="input-dark w-full px-4 py-3 text-sm pr-12"
                />
                <button type="button" onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-600 hover:text-gray-400">
                  {showPass ? 'Hide' : 'Show'}
                </button>
              </div>
              {errors.password && <p className="text-xs text-red-400 mt-1">{errors.password}</p>}
            </div>

            {/* Confirm */}
            <div>
              <label className="block text-[10px] tracking-[0.2em] uppercase mb-2" style={{ color: '#888' }}>Confirm Password</label>
              <input
                type="password"
                name="confirm"
                value={form.confirm}
                onChange={handleChange}
                placeholder="Re-enter password"
                className="input-dark w-full px-4 py-3 text-sm"
              />
              {errors.confirm && <p className="text-xs text-red-400 mt-1">{errors.confirm}</p>}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-gold w-full py-3.5 text-xs tracking-[0.2em] uppercase mt-2 disabled:opacity-50"
            >
              {loading ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-xs text-gray-600">
              Already have an account?{' '}
              <Link to="/login" className="text-yellow-600 hover:text-yellow-400 transition-colors">Sign in</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
