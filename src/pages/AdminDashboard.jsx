import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

import AdminHeader from '../components/admin/AdminHeader';
import BookingTable from '../components/admin/BookingTable';
import '../pages/AdminDashboard.css'; // Import our new CSS file

const API_URL = 'http://localhost:5000/api/bookings';

const AdminDashboard = () => {
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  // Fetch initial data
  const fetchBookings = async () => {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      setBookings(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings(); // Fetch once on component mount

    // Set up polling for real-time updates every 5 seconds
    const intervalId = setInterval(fetchBookings, 5000);

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  const handleLogout = () => {
    // In a real app, you'd clear auth tokens here
    console.log("Logged out");
    navigate('/');
  };

  const handleStatusChange = async (id, newStatus) => {
    // Optimistic UI update
    setBookings(prevBookings =>
      prevBookings.map(b => b._id === id ? { ...b, status: newStatus } : b)
    );
    
    try {
      await fetch(`${API_URL}/${id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
    } catch (error) {
      console.error("Failed to update status:", error);
      // Revert on failure
      fetchBookings(); 
    }
  };

  // Memoize filtered bookings to avoid re-calculating on every render
  const filteredBookings = useMemo(() => {
    if (!searchTerm) return bookings;
    return bookings.filter(b => 
      b.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.eventName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [bookings, searchTerm]);
  
  return (
    <div className="admin-dashboard">
      <AdminHeader onLogout={handleLogout} />
      <main className="admin-main-content">
        <div className="toolbar">
          <h2>Recent Bookings</h2>
          <input 
            type="text"
            placeholder="Filter by name, event, or email..."
            className="filter-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        {isLoading && <p>Loading bookings...</p>}
        {error && <p className="error-message">Error: {error}</p>}
        {!isLoading && !error && (
          <BookingTable bookings={filteredBookings} onStatusChange={handleStatusChange} />
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;