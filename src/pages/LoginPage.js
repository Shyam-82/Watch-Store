import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const LoginPage = () => {
  const { login, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => { if (user) navigate(from, { replace: true }); }, [user]);

  const validate = () => {
    const e = {};
    if (!form.email) e.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Invalid email';
    if (!form.password) e.password = 'Password is required';
    return e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setLoading(true);
    const ok = await login(form.email, form.password);
    setLoading(false);
    if (ok) navigate(from, { replace: true });
  };

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    setErrors(prev => ({ ...prev, [e.target.name]: '' }));
  };

  // Demo credentials fill
  const fillDemo = (role) => {
    if (role === 'admin') setForm({ email: 'admin@watches.com', password: 'admin123' });
    else setForm({ email: 'john@example.com', password: 'john123' });
  };

  return (
    <div className="pt-16 min-h-screen flex items-center justify-center px-4 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0" style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1594534475808-b18fc33b045e?w=1400&q=50)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.04,
        }} />
        <div className="absolute inset-0" style={{
          background: 'radial-gradient(ellipse at center, rgba(201,168,76,0.05) 0%, transparent 70%)',
        }} />
      </div>

      <div className="relative w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-10">
          <Link to="/" className="inline-block">
            <span className="text-2xl tracking-[0.3em]" style={{ fontFamily: 'Playfair Display, serif', color: '#c9a84c' }}>
              CHRONOS
            </span>
          </Link>
          <p className="text-xs tracking-widest uppercase mt-1" style={{ color: '#555' }}>Luxury Timepieces</p>
        </div>

        {/* Card */}
        <div className="glass-card p-8 lg:p-10">
          <h1 className="text-xl font-semibold mb-1" style={{ fontFamily: 'Playfair Display, serif', color: '#e8e8e8' }}>
            Welcome Back
          </h1>
          <p className="text-xs text-gray-600 mb-8">Sign in to your account to continue.</p>

          <form onSubmit={handleSubmit} className="space-y-5">
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
                autoComplete="email"
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
                  placeholder="••••••••"
                  className="input-dark w-full px-4 py-3 text-sm pr-12"
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-600 hover:text-gray-400 transition-colors"
                >
                  {showPass ? 'Hide' : 'Show'}
                </button>
              </div>
              {errors.password && <p className="text-xs text-red-400 mt-1">{errors.password}</p>}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-gold w-full py-3.5 text-xs tracking-[0.2em] uppercase mt-2 disabled:opacity-50"
            >
              {loading ? 'Signing In...' : 'Sign In'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-xs text-gray-600">
              Don't have an account?{' '}
              <Link to="/register" className="text-yellow-600 hover:text-yellow-400 transition-colors">
                Create one
              </Link>
            </p>
          </div>

          {/* Demo credentials */}
          <div className="mt-6 pt-6" style={{ borderTop: '1px solid #1a1a1a' }}>
            <p className="text-[10px] tracking-widest uppercase text-center mb-3" style={{ color: '#444' }}>Demo Accounts</p>
            <div className="flex gap-2">
              <button onClick={() => fillDemo('user')} className="flex-1 text-[10px] py-2 px-3 text-gray-600 hover:text-gray-400 transition-colors" style={{ border: '1px solid #1a1a1a', borderRadius: '1px' }}>
                User Login
              </button>
              <button onClick={() => fillDemo('admin')} className="flex-1 text-[10px] py-2 px-3 transition-colors" style={{ border: '1px solid rgba(201,168,76,0.2)', color: '#c9a84c', borderRadius: '1px' }}>
                Admin Login
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
