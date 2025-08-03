import React from 'react';
const formatExtraServices = (services) => {
  const selected = Object.keys(services).filter(key => services[key]);
  if (selected.length === 0) return 'None';
  return selected.join(', ');
};

const BookingTable = ({ bookings, onStatusChange }) => {
  if (bookings.length === 0) {
    return <p className="no-bookings-message">No bookings found. New submissions will appear here automatically.</p>;
  }

  return (
    <div className="table-container">
      <table className="bookings-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Customer</th>
            <th>Event Details</th>
            <th>Cost</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map(booking => (
            <tr key={booking._id} className="booking-card">
              <td>{new Date(booking.bookingDate).toLocaleDateString()}</td>
              <td>
                <div className="user-info">
                  <strong>{booking.userName}</strong>
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
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BookingTable;