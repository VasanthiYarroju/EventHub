// src/components/admin/UserInfoModal.js
import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { X } from 'lucide-react'; // Icon

Modal.setAppElement('#root'); // Important for accessibility

const UserInfoModal = ({ isOpen, onRequestClose, booking, onUpdateAdminNotes }) => {
  const [adminNotes, setAdminNotes] = useState('');

  useEffect(() => {
    // Update adminNotes state when booking prop changes
    if (booking) {
      setAdminNotes(booking.adminNotes || '');
    }
  }, [booking]);

  const handleSaveNotes = () => {
    if (onUpdateAdminNotes && booking) {
      onUpdateAdminNotes(booking._id, adminNotes);
    }
  };

  if (!booking) {
    return null;
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="ReactModal__Content"
      overlayClassName="ReactModal__Overlay"
      contentLabel="User Info Modal"
    >
      <div className="modal-header">
        <h2>Booking Details for {booking.userName}</h2>
        <button onClick={onRequestClose} className="modal-close-btn"><X size={24} /></button>
      </div>

      <div className="modal-content-section">
        <h3>Customer Information</h3>
        <p><strong>Email:</strong> {booking.email}</p>
        <p><strong>Phone:</strong> {booking.mobileNumber}</p>
        <p><strong>Preferred Packages:</strong> {booking.preferredPackages && booking.preferredPackages.length > 0 ? booking.preferredPackages.join(', ') : 'None specified'}</p>
      </div>

      <div className="modal-content-section">
        <h3>Event Details</h3>
        <p><strong>Event Name:</strong> {booking.eventName}</p>
        <p><strong>Event Type:</strong> {booking.eventType}</p>
        <p><strong>Event Date:</strong> {new Date(booking.eventDate).toLocaleDateString()}</p>
        <p><strong>Guests:</strong> {booking.guestCount}</p>
        <p><strong>Venue:</strong> {booking.venueType === 'ac' ? 'AC Hall' : 'Non-AC Hall'}</p>
        <p><strong>Catering:</strong> {booking.cateringPackage}</p>
        <p><strong>Total Cost:</strong> ₹{booking.totalEstimatedCost.toLocaleString('en-IN')}</p>
      </div>

      <div className="modal-content-section">
        <h3>Past Bookings</h3>
        {booking.pastBookings && booking.pastBookings.length > 0 ? (
          <ul>
            {booking.pastBookings.map((pb, index) => (
              <li key={index}>{pb.eventName} on {new Date(pb.date).toLocaleDateString()}</li>
            ))}
          </ul>
        ) : (
          <p>No past bookings found for this user.</p>
        )}
      </div>

      <div className="modal-content-section admin-notes-section">
        <h3>Admin Notes</h3>
        <textarea
          value={adminNotes}
          onChange={(e) => setAdminNotes(e.target.value)}
          placeholder="Add internal notes about this booking..."
        ></textarea>
        <button onClick={handleSaveNotes}>Save Notes</button>
      </div>
    </Modal>
  );
};

export default UserInfoModal;