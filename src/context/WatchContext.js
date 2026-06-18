import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const WatchContext = createContext();

export const useWatches = () => useContext(WatchContext);

const API = 'http://localhost:5000/watches';

export const WatchProvider = ({ children }) => {
  const [watches, setWatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch all watches
  const fetchWatches = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const { data } = await axios.get(API);
      setWatches(data);
    } catch (err) {
      setError('Failed to load watches. Is the JSON server running?');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchWatches(); }, [fetchWatches]);

  // Get single watch by ID
  const getWatch = async (id) => {
    try {
      const { data } = await axios.get(`${API}/${id}`);
      return data;
    } catch {
      return null;
    }
  };

  // Admin: Add watch
  const addWatch = async (watchData) => {
    try {
      const { data } = await axios.post(API, watchData);
      setWatches(prev => [...prev, data]);
      toast.success('Watch added successfully.');
      return true;
    } catch {
      toast.error('Failed to add watch.');
      return false;
    }
  };

  // Admin: Edit watch
  const editWatch = async (id, watchData) => {
    try {
      const { data } = await axios.put(`${API}/${id}`, watchData);
      setWatches(prev => prev.map(w => w.id === id ? data : w));
      toast.success('Watch updated successfully.');
      return true;
    } catch {
      toast.error('Failed to update watch.');
      return false;
    }
  };

  // Admin: Delete watch
  const deleteWatch = async (id) => {
    try {
      await axios.delete(`${API}/${id}`);
      setWatches(prev => prev.filter(w => w.id !== id));
      toast.success('Watch deleted.');
      return true;
    } catch {
      toast.error('Failed to delete watch.');
      return false;
    }
  };

  // Get all unique categories
  const categories = ['All', ...new Set(watches.map(w => w.category))];

  return (
    <WatchContext.Provider value={{ watches, loading, error, fetchWatches, getWatch, addWatch, editWatch, deleteWatch, categories }}>
      {children}
    </WatchContext.Provider>
  );
};
