// src/components/admin/BookingTable.js
import React from 'react';
import { ExternalLink, Edit } from 'lucide-react'; // Icons

const formatExtraServices = (services) => {
  const selected = Object.keys(services).filter(key => services[key]);
  if (selected.length === 0) return 'None';
  return selected.map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(', ');
};

const BookingTable = ({ bookings, onStatusChange, onCustomerClick, onAdminNotesClick }) => {
  if (bookings.length === 0) {
    return <p className="no-bookings-message">No bookings found matching current filters.</p>;
  }

  return (
    <div className="table-container card">
      <table className="bookings-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Customer</th>
            <th>Event Details</th>
            <th>Cost</th>
            <th>Status</th>
            <th>Actions</th> {/* New column for notes/modal */}
          </tr>
        </thead>
        <tbody>
          {bookings.map(booking => (
            <tr key={booking._id}>
              <td>{new Date(booking.bookingDate).toLocaleDateString()}</td>
              <td>
                <div className="user-info">
                  <strong className="customer-name" onClick={() => onCustomerClick(booking)}>
                    {booking.userName} <ExternalLink size={14} style={{ verticalAlign: 'middle' }} />
                  </strong>
                  <span>{booking.email}</span>
                  <span>{booking.mobileNumber}</span>
                </div>
              </td>
              <td>
                <div className="event-info">
                  <strong>{booking.eventName}</strong>
                  <span>Guests: {booking.guestCount}</span>
                  <span>Venue: {booking.venueType === 'ac' ? 'AC Hall' : 'Non-AC Hall'}</span>
                  <span>Catering: {booking.cateringPackage}</span>
                  <span>Extras: {formatExtraServices(booking.extraServices)}</span>
                </div>
              </td>
              <td>
                <strong>₹{booking.totalEstimatedCost.toLocaleString('en-IN')}</strong>
              </td>
              <td>
                <select
                  className={`status-select status-${(booking.status || 'Pending').toLowerCase()}`}
                  value={booking.status}
                  onChange={(e) => onStatusChange(booking._id, e.target.value)}
                >
                  <option value="Pending">Pending</option>
                  <option value="Approved">Approved</option>
                  <option value="Rejected">Rejected</option>
                </select>
              </td>
              <td>
                <div className="action-buttons">
                  <button onClick={() => onAdminNotesClick(booking)} title="Add/View Admin Notes">
                    <Edit size={18} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BookingTable;