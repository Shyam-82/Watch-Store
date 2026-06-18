import React, { useState } from 'react';
//import { Link, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { formatPrice } from '../utils/helpers';
import { toast } from 'react-toastify';

const CheckoutPage = () => {
  const { cartItems, subtotal, tax, delivery, grandTotal, clearCart, totalItems } = useCart();
  const { user } = useAuth();
  //const navigate = useNavigate();
  const [placing, setPlacing] = useState(false);
  const [ordered, setOrdered] = useState(false);

  const [form, setForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    country: 'United States',
    cardName: '',
    cardNumber: '',
    expiry: '',
    cvv: '',
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    let val = e.target.value;
    // Format card number
    if (e.target.name === 'cardNumber') {
      val = val.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim();
    }
    // Format expiry
    if (e.target.name === 'expiry') {
      val = val.replace(/\D/g, '').slice(0, 4);
      if (val.length > 2) val = val.slice(0, 2) + '/' + val.slice(2);
    }
    setForm(prev => ({ ...prev, [e.target.name]: val }));
    setErrors(prev => ({ ...prev, [e.target.name]: '' }));
  };

  const validate = () => {
    const e = {};
    if (!form.name) e.name = 'Required';
    if (!form.email) e.email = 'Required';
    if (!form.phone) e.phone = 'Required';
    if (!form.address) e.address = 'Required';
    if (!form.city) e.city = 'Required';
    if (!form.zip) e.zip = 'Required';
    if (!form.cardName) e.cardName = 'Required';
    if (!form.cardNumber || form.cardNumber.replace(/\s/g,'').length < 16) e.cardNumber = 'Enter valid card number';
    if (!form.expiry || form.expiry.length < 5) e.expiry = 'Required';
    if (!form.cvv || form.cvv.length < 3) e.cvv = 'Required';
    return e;
  };

  const handlePlaceOrder = async () => {
    if (cartItems.length === 0) return;
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); toast.error('Please fill all required fields.'); return; }
    setPlacing(true);
    await new Promise(r => setTimeout(r, 1800)); // Simulate API
    clearCart();
    setOrdered(true);
    setPlacing(false);
  };

  // Success screen
  if (ordered) {
    return (
      <div className="pt-16 min-h-screen flex items-center justify-center px-6">
        <div className="text-center max-w-md">
          <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
            style={{ background: 'rgba(201,168,76,0.1)', border: '1px solid rgba(201,168,76,0.3)' }}>
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#c9a84c" strokeWidth="2">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
          </div>
          <h1 className="text-3xl font-bold mb-3" style={{ fontFamily: 'Playfair Display, serif', color: '#e8e8e8' }}>
            Order Placed!
          </h1>
          <p className="text-sm text-gray-500 mb-2">Thank you for your purchase, {user?.name}.</p>
          <p className="text-xs text-gray-600 mb-8">A confirmation has been sent to {user?.email}</p>
          <div className="gold-divider mb-8" />
          <div className="flex gap-4 justify-center">
            <Link to="/watches" className="btn-gold px-8 py-3 text-xs tracking-[0.15em] uppercase">
              Continue Shopping
            </Link>
            <Link to="/" className="btn-outline-gold px-8 py-3 text-xs tracking-[0.15em] uppercase">
              Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="pt-16 min-h-screen flex items-center justify-center px-6 text-center">
        <div>
          <p className="text-gray-600 mb-6">Your cart is empty.</p>
          <Link to="/watches" className="btn-gold px-8 py-3 text-xs tracking-[0.15em] uppercase">Browse Collection</Link>
        </div>
      </div>
    );
  }

  const InputField = ({ label, name, type = 'text', placeholder, half }) => (
    <div className={half ? '' : 'col-span-2'}>
      <label className="block text-[10px] tracking-[0.15em] uppercase mb-1.5" style={{ color: '#777' }}>{label}</label>
      <input
        type={type}
        name={name}
        value={form[name]}
        onChange={handleChange}
        placeholder={placeholder}
        className="input-dark w-full px-3 py-2.5 text-sm"
      />
      {errors[name] && <p className="text-[10px] text-red-400 mt-1">{errors[name]}</p>}
    </div>
  );

  return (
    <div className="pt-16">
      {/* Header */}
      <div className="py-12" style={{ background: '#0d0d0d', borderBottom: '1px solid #151515' }}>
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-[10px] tracking-[0.4em] uppercase mb-3" style={{ color: '#c9a84c' }}>Secure Checkout</p>
          <h1 className="text-3xl font-bold" style={{ fontFamily: 'Playfair Display, serif', color: '#e8e8e8' }}>
            Complete Your Order
          </h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Left: Forms */}
          <div className="lg:col-span-2 space-y-8">

            {/* Shipping */}
            <section style={{ background: '#0d0d0d', border: '1px solid #1a1a1a', padding: '28px' }}>
              <h2 className="text-sm tracking-[0.2em] uppercase font-semibold mb-6" style={{ color: '#c9a84c' }}>
                Shipping Information
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <InputField label="Full Name" name="name" placeholder="John Doe" />
                <InputField label="Email" name="email" type="email" placeholder="john@email.com" half />
                <InputField label="Phone" name="phone" placeholder="+1 555 000 0000" half />
                <InputField label="Street Address" name="address" placeholder="123 Main Street" />
                <InputField label="City" name="city" placeholder="New York" half />
                <InputField label="State" name="state" placeholder="NY" half />
                <InputField label="ZIP Code" name="zip" placeholder="10001" half />
                <div>
                  <label className="block text-[10px] tracking-[0.15em] uppercase mb-1.5" style={{ color: '#777' }}>Country</label>
                  <select name="country" value={form.country} onChange={handleChange} className="select-dark w-full px-3 py-2.5 text-sm">
                    <option>United States</option>
                    <option>United Kingdom</option>
                    <option>Canada</option>
                    <option>Australia</option>
                    <option>India</option>
                    <option>Germany</option>
                    <option>France</option>
                    <option>Japan</option>
                  </select>
                </div>
              </div>
            </section>

            {/* Payment */}
            <section style={{ background: '#0d0d0d', border: '1px solid #1a1a1a', padding: '28px' }}>
              <h2 className="text-sm tracking-[0.2em] uppercase font-semibold mb-6" style={{ color: '#c9a84c' }}>
                Payment Details
              </h2>
              {/* Card icons */}
              <div className="flex gap-2 mb-5">
                {['VISA', 'MC', 'AMEX'].map(c => (
                  <span key={c} className="text-[10px] px-2 py-1 font-bold tracking-widest"
                    style={{ background: '#111', border: '1px solid #2a2a2a', color: '#666' }}>
                    {c}
                  </span>
                ))}
              </div>
              <div className="grid grid-cols-2 gap-4">
                <InputField label="Name on Card" name="cardName" placeholder="John Doe" />
                <InputField label="Card Number" name="cardNumber" placeholder="0000 0000 0000 0000" />
                <div>
                  <label className="block text-[10px] tracking-[0.15em] uppercase mb-1.5" style={{ color: '#777' }}>Expiry Date</label>
                  <input type="text" name="expiry" value={form.expiry} onChange={handleChange}
                    placeholder="MM/YY" maxLength={5} className="input-dark w-full px-3 py-2.5 text-sm" />
                  {errors.expiry && <p className="text-[10px] text-red-400 mt-1">{errors.expiry}</p>}
                </div>
                <div>
                  <label className="block text-[10px] tracking-[0.15em] uppercase mb-1.5" style={{ color: '#777' }}>CVV</label>
                  <input type="password" name="cvv" value={form.cvv} onChange={handleChange}
                    placeholder="•••" maxLength={4} className="input-dark w-full px-3 py-2.5 text-sm" />
                  {errors.cvv && <p className="text-[10px] text-red-400 mt-1">{errors.cvv}</p>}
                </div>
              </div>
              <div className="flex items-center gap-2 mt-4">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="2">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                  <path d="M7 11V7a5 5 0 0110 0v4"/>
                </svg>
                <span className="text-[10px] text-gray-700">256-bit SSL encrypted. Your card details are safe.</span>
              </div>
            </section>
          </div>

          {/* Right: Order Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-24" style={{ background: '#0d0d0d', border: '1px solid #1a1a1a' }}>
              <div className="px-6 py-5" style={{ borderBottom: '1px solid #1a1a1a' }}>
                <h2 className="text-sm tracking-[0.2em] uppercase font-semibold" style={{ color: '#c9a84c' }}>
                  Order Summary
                </h2>
                <p className="text-xs text-gray-600 mt-0.5">{totalItems} items</p>
              </div>

              {/* Items */}
              <div className="max-h-64 overflow-y-auto">
                {cartItems.map(item => (
                  <div key={item.id} className="flex gap-3 px-6 py-3" style={{ borderBottom: '1px solid #151515' }}>
                    <img src={item.image} alt={item.name} className="w-12 h-12 object-cover flex-shrink-0"
                      style={{ border: '1px solid #1a1a1a' }}
                      onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=100&q=50'; }} />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium truncate" style={{ color: '#ccc', fontFamily: 'Playfair Display, serif' }}>{item.name}</p>
                      <p className="text-[10px] text-gray-600">Qty: {item.quantity}</p>
                    </div>
                    <p className="text-xs font-semibold" style={{ color: '#c9a84c' }}>{formatPrice(item.price * item.quantity)}</p>
                  </div>
                ))}
              </div>

              {/* Billing breakdown */}
              <div className="px-6 py-5 space-y-3">
                <div className="flex justify-between text-xs text-gray-600">
                  <span>Subtotal</span><span>{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-xs text-gray-600">
                  <span>GST (18%)</span><span>{formatPrice(tax)}</span>
                </div>
                <div className="flex justify-between text-xs text-gray-600">
                  <span>Delivery</span>
                  <span style={{ color: delivery === 0 ? '#4ade80' : undefined }}>
                    {delivery === 0 ? 'FREE' : formatPrice(delivery)}
                  </span>
                </div>
                {delivery === 0 && (
                  <p className="text-[10px]" style={{ color: '#4ade80' }}>✓ Free delivery applied</p>
                )}
                <div className="gold-divider" />
                <div className="flex justify-between font-semibold">
                  <span className="text-sm" style={{ fontFamily: 'Playfair Display, serif', color: '#e8e8e8' }}>Grand Total</span>
                  <span className="text-lg text-gold-gradient" style={{ fontFamily: 'Playfair Display, serif' }}>
                    {formatPrice(grandTotal)}
                  </span>
                </div>
              </div>

              {/* Place Order */}
              <div className="px-6 pb-6">
                <button
                  onClick={handlePlaceOrder}
                  disabled={placing}
                  className="btn-gold w-full py-4 text-xs tracking-[0.2em] uppercase disabled:opacity-50"
                >
                  {placing ? (
                    <span className="flex items-center justify-center gap-2">
                      <span className="w-4 h-4 border-2 border-t-transparent rounded-full animate-spin" style={{ borderColor: 'rgba(0,0,0,0.3)', borderTopColor: 'transparent' }} />
                      Processing...
                    </span>
                  ) : `Place Order · ${formatPrice(grandTotal)}`}
                </button>
                <Link to="/watches" className="block text-center text-xs text-gray-700 hover:text-gray-500 mt-3 transition-colors">
                  ← Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
