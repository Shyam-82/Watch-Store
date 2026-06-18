import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load user from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem('chronos_user');
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch {
        localStorage.removeItem('chronos_user');
      }
    }
    setLoading(false);
  }, []);

  // Register a new user
  const register = async (name, email, password) => {
    try {
      // Check if email already exists
      const { data: existing } = await axios.get(`http://localhost:5000/users?email=${email}`);
      if (existing.length > 0) {
        toast.error('Email already registered.');
        return false;
      }

      const newUser = { name, email, password, role: 'user' };
      const { data } = await axios.post('http://localhost:5000/users', newUser);
      const loggedIn = { id: data.id, name: data.name, email: data.email, role: data.role };
      setUser(loggedIn);
      localStorage.setItem('chronos_user', JSON.stringify(loggedIn));
      toast.success(`Welcome, ${data.name}!`);
      return true;
    } catch (err) {
      toast.error('Registration failed. Please try again.');
      return false;
    }
  };

  // Login existing user
  const login = async (email, password) => {
    try {
      const { data } = await axios.get(
        `http://localhost:5000/users?email=${email}&password=${password}`
      );
      if (data.length === 0) {
        toast.error('Invalid email or password.');
        return false;
      }
      const u = data[0];
      const loggedIn = { id: u.id, name: u.name, email: u.email, role: u.role };
      setUser(loggedIn);
      localStorage.setItem('chronos_user', JSON.stringify(loggedIn));
      toast.success(`Welcome back, ${u.name}!`);
      return true;
    } catch (err) {
      toast.error('Login failed. Please try again.');
      return false;
    }
  };

  // Logout user
  const logout = () => {
    setUser(null);
    localStorage.removeItem('chronos_user');
    toast.info('You have been signed out.');
  };

  const isAdmin = user?.role === 'admin';

  return (
    <AuthContext.Provider value={{ user, loading, register, login, logout, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};
