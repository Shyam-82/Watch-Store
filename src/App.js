import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Contexts
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import { WatchProvider } from './context/WatchContext';

// Layout
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import CartSidebar from './components/cart/CartSidebar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import AdminRoute from './components/auth/AdminRoute';

// Pages
import HomePage from './pages/HomePage';
import WatchesPage from './pages/WatchesPage';
import WatchDetailPage from './pages/WatchDetailPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import WishlistPage from './pages/WishlistPage';
import CheckoutPage from './pages/CheckoutPage';
import AdminDashboard from './pages/AdminDashboard';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (
    <Router>
      <AuthProvider>
        <WatchProvider>
          <CartProvider>
            <WishlistProvider>
              <div className="flex flex-col min-h-screen" style={{ background: '#0a0a0a' }}>
                <Navbar />
                <CartSidebar />
                <main className="flex-1 page-enter">
                  <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/watches" element={<WatchesPage />} />
                    <Route path="/watches/:id" element={<WatchDetailPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/wishlist" element={
                      <ProtectedRoute><WishlistPage /></ProtectedRoute>
                    } />
                    <Route path="/checkout" element={
                      <ProtectedRoute><CheckoutPage /></ProtectedRoute>
                    } />
                    <Route path="/admin" element={
                      <AdminRoute><AdminDashboard /></AdminRoute>
                    } />
                    <Route path="*" element={<NotFoundPage />} />
                  </Routes>
                </main>
                <Footer />
              </div>
              <ToastContainer
                position="bottom-right"
                autoClose={2500}
                hideProgressBar={false}
                newestOnTop
                closeOnClick
                pauseOnHover
                theme="dark"
              />
            </WishlistProvider>
          </CartProvider>
        </WatchProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
