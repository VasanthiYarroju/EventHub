// src/components/admin/SummaryCards.js
import React from 'react';
import { Book, CheckCircle, Clock, XCircle } from 'lucide-react'; // Icons

const SummaryCard = ({ title, value, icon: IconComponent }) => (
  <div className="card summary-card">
    {IconComponent && <IconComponent size={40} className="icon" />}
    <h3>{title}</h3>
    <p>{value}</p>
  </div>
);

const SummaryCards = ({ bookings }) => {
  const totalBookings = bookings.length;
  const pendingBookings = bookings.filter(b => b.status === 'Pending').length;
  const approvedBookings = bookings.filter(b => b.status === 'Approved').length;
  const rejectedBookings = bookings.filter(b => b.status === 'Rejected').length;

  return (
    <div className="summary-cards-grid">
      <SummaryCard title="Total Bookings" value={totalBookings} icon={Book} />
      <SummaryCard title="Pending" value={pendingBookings} icon={Clock} />
      <SummaryCard title="Approved" value={approvedBookings} icon={CheckCircle} />
      <SummaryCard title="Rejected" value={rejectedBookings} icon={XCircle} />
    </div>
  );
};

export default SummaryCards;