import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Import all your components
import AdminHeader from '../components/admin/AdminHeader';
import SummaryCards from '../components/admin/SummaryCards';
import FilterPanel from '../components/admin/FilterPanel';
import BookingTable from '../components/admin/BookingTable';
import ChartsSection from '../components/admin/ChartsSection';
import KanbanView from '../components/admin/KanbanView';
import ExportButtons from '../components/admin/ExportButtons';
import BookingCalendar from '../components/admin/BookingCalendar';
import UserInfoModal from '../components/admin/UserInfoModal';

import '../pages/AdminDashboard.css'; // Import your main CSS

// Define your API URL
const API_URL = 'http://localhost:5000/api/bookings';

const AdminDashboard = () => {
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // --- Theme State ---
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme || 'light';
  });

  useEffect(() => {
    // Apply theme class to the root HTML element or a parent container
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  }, []);

  // --- Filter States ---
  const [searchTerm, setSearchTerm] = useState('');
  const [eventTypeFilter, setEventTypeFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  // --- Modal States ---
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);

  // --- Notification States ---
  const [notifications, setNotifications] = useState([]);
  const newNotificationsCount = useMemo(() => notifications.filter(n => !n.read).length, [notifications]);

  // Ref to store IDs of previously seen bookings for new booking notifications
  const previousBookingIds = useRef(new Set());
  const newBookingToastId = useRef(null); // Ref for the toast ID to prevent duplicate "new booking" toasts


  // --- Data Fetching Logic (from your provided code, with notification enhancement) ---
  const fetchBookings = useCallback(async () => {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error(`Failed to fetch data: ${response.statusText}`);
      }
      const data = await response.json();

      // Logic for new booking notifications
      const currentBookingIds = new Set(data.map(b => b._id));
      const newBookingsFound = data.filter(b => !previousBookingIds.current.has(b._id));

      if (newBookingsFound.length > 0 && bookings.length > 0) { // Only notify if there were previous bookings
        newBookingsFound.forEach(newBooking => {
          const notificationMessage = `New booking from ${newBooking.userName} for ${newBooking.eventName}!`;
          setNotifications(prev => [{ message: notificationMessage, timestamp: new Date().toISOString(), read: false }, ...prev]);

          if (newBookingToastId.current && toast.isActive(newBookingToastId.current)) {
            toast.update(newBookingToastId.current, { render: notificationMessage, type: toast.info, autoClose: 5000 });
          } else {
            newBookingToastId.current = toast.info(notificationMessage, {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          }
        });
      }

      setBookings(data);
      previousBookingIds.current = currentBookingIds; // Update the set of known IDs
    } catch (err) {
      setError(err.message);
      toast.error(`Error fetching bookings: ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  }, [bookings.length]); // Depend on bookings.length to differentiate initial load from subsequent polls

  useEffect(() => {
    fetchBookings(); // Fetch once on component mount

    // Set up polling for real-time updates every 5 seconds
    const intervalId = setInterval(fetchBookings, 5000);

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, [fetchBookings]); // Depend on fetchBookings to re-run interval if callback changes

  const handleLogout = useCallback(() => {
    console.log("Logged out");
    navigate('/');
  }, [navigate]);

  const handleStatusChange = useCallback(async (id, newStatus) => {
    // Optimistic UI update
    setBookings(prevBookings =>
      prevBookings.map(b => b._id === id ? { ...b, status: newStatus } : b)
    );
    toast.success(`Booking status updated to ${newStatus}!`);

    try {
      const response = await fetch(`${API_URL}/${id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) {
        throw new Error(`Failed to update status: ${response.statusText}`);
      }
      // Re-fetch to ensure data consistency with backend after successful update
      fetchBookings();
    } catch (error) {
      console.error("Failed to update status:", error);
      toast.error("Failed to update status. Please try again.");
      // Revert on failure (or re-fetch after a delay)
      // A full re-fetch handles the revert automatically if the server hasn't updated
      fetchBookings();
    }
  }, [fetchBookings]);

  const handleUpdateAdminNotes = useCallback(async (id, newNotes) => {
    // Optimistic UI update
    setBookings(prevBookings =>
      prevBookings.map(b => b._id === id ? { ...b, adminNotes: newNotes } : b)
    );
    toast.success("Admin notes updated successfully!");
    setIsModalOpen(false); // Close modal after saving notes

    try {
      const response = await fetch(`${API_URL}/${id}/notes`, { // Assuming an endpoint for notes
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ adminNotes: newNotes }),
      });

      if (!response.ok) {
        throw new Error(`Failed to update admin notes: ${response.statusText}`);
      }
      // Re-fetch to ensure data consistency
      fetchBookings();
    } catch (error) {
      console.error("Failed to update admin notes:", error);
      toast.error("Failed to update admin notes. Please try again.");
      // Revert on failure (or re-fetch)
      fetchBookings();
    }
  }, [fetchBookings]);


  const handleOpenModal = useCallback((booking) => {
    setSelectedBooking(booking);
    setIsModalOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setSelectedBooking(null);
    setIsModalOpen(false);
  }, []);

  const handleMarkNotificationsRead = useCallback(() => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  }, []);

  const handleClearFilters = useCallback(() => {
    setSearchTerm('');
    setEventTypeFilter('');
    setStatusFilter('');
    setStartDate('');
    setEndDate('');
  }, []);

  // Memoize filtered bookings
  const filteredBookings = useMemo(() => {
    let currentBookings = bookings;

    if (searchTerm) {
      currentBookings = currentBookings.filter(b =>
        b.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        b.eventName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        b.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (eventTypeFilter) {
      currentBookings = currentBookings.filter(b => b.eventType === eventTypeFilter);
    }

    if (statusFilter) {
      currentBookings = currentBookings.filter(b => b.status === statusFilter);
    }

    if (startDate) {
      const start = new Date(startDate);
      currentBookings = currentBookings.filter(b => new Date(b.bookingDate) >= start);
    }

    if (endDate) {
      const end = new Date(endDate);
      end.setHours(23, 59, 59, 999); // Include entire end day
      currentBookings = currentBookings.filter(b => new Date(b.bookingDate) <= end);
    }

    return currentBookings;
  }, [bookings, searchTerm, eventTypeFilter, statusFilter, startDate, endDate]);

  const allEventTypes = useMemo(() => {
    // Dynamically get all unique event types from the fetched bookings
    const types = new Set(bookings.map(b => b.eventType).filter(Boolean)); // Filter out undefined/null
    return Array.from(types).sort();
  }, [bookings]);

  return (
    <div className={`admin-dashboard ${theme}-theme`}>
      <ToastContainer /> {/* Toast notifications */}
      <AdminHeader
        onLogout={handleLogout}
        newNotificationsCount={newNotificationsCount}
        notifications={notifications}
        onMarkNotificationsRead={handleMarkNotificationsRead}
        theme={theme}
        toggleTheme={toggleTheme}
      />
      <main className="admin-main-content">
        <SummaryCards bookings={bookings} />

        <FilterPanel
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          eventTypeFilter={eventTypeFilter}
          setEventTypeFilter={setEventTypeFilter}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          startDate={startDate}
          setStartDate={setStartDate}
          endDate={endDate}
          setEndDate={setEndDate}
          onClearFilters={handleClearFilters}
          allEventTypes={allEventTypes}
        />

        {isLoading && <p className="no-bookings-message">Loading bookings...</p>}
        {error && <p className="error-message no-bookings-message">Error: {error}</p>}
        {!isLoading && !error && (
          <>
            <ExportButtons bookings={filteredBookings} /> {/* Export based on filtered data */}

            <h2 style={{ color: 'var(--text-primary)', textAlign: 'center', margin: '10px 0' }}>Booking Table</h2>
            <BookingTable
              bookings={filteredBookings}
              onStatusChange={handleStatusChange}
              onCustomerClick={handleOpenModal}
              onAdminNotesClick={handleOpenModal} // Reuse for notes modal
            />

            <h2 style={{ color: 'var(--text-primary)', textAlign: 'center', margin: '30px 0 10px' }}>Kanban Board</h2>
            <KanbanView
              bookings={bookings} // Kanban should ideally show all bookings for drag-drop
              onStatusChange={handleStatusChange}
              onCustomerClick={handleOpenModal}
              onAdminNotesClick={handleOpenModal}
            />

            <h2 style={{ color: 'var(--text-primary)', textAlign: 'center', margin: '30px 0 10px' }}>Analytics & Insights</h2>
            <ChartsSection bookings={bookings} /> {/* Charts always on all data */}

            <h2 style={{ color: 'var(--text-primary)', textAlign: 'center', margin: '30px 0 10px' }}>Calendar View</h2>
            <BookingCalendar bookings={bookings} />

            <UserInfoModal
              isOpen={isModalOpen}
              onRequestClose={handleCloseModal}
              booking={selectedBooking}
              onUpdateAdminNotes={handleUpdateAdminNotes}
            />
          </>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;