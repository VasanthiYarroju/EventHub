// src/components/admin/BookingCalendar.js
import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // Default react-calendar styles

const BookingCalendar = ({ bookings }) => {
  const [value, onChange] = useState(new Date());

  // Get unique event dates for marking on the calendar
  const eventDates = React.useMemo(() => {
    return new Set(bookings.map(booking => new Date(booking.eventDate).toDateString()));
  }, [bookings]);


  const tileClassName = ({ date, view }) => {
    // Add class to tiles that have an event booking
    if (view === 'month' && eventDates.has(date.toDateString())) {
      return 'has-booking';
    }
    return null;
  };

  return (
    <div className="calendar-container card">
      <h3>Bookings Calendar</h3>
      <Calendar
        onChange={onChange}
        value={value}
        tileClassName={tileClassName}
        // Optional: onClickDay handler to show details for dates with bookings
        onClickDay={(date) => {
          const bookingsOnThisDate = bookings.filter(b => new Date(b.eventDate).toDateString() === date.toDateString());
          if (bookingsOnThisDate.length > 0) {
            alert(`Bookings on ${date.toDateString()}:\n${bookingsOnThisDate.map(b => `- ${b.eventName} by ${b.userName}`).join('\n')}`);
          } else {
            alert(`No bookings on ${date.toDateString()}.`);
          }
        }}
      />
    </div>
  );
};

export default BookingCalendar;