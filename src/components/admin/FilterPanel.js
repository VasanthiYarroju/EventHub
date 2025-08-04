// src/components/admin/FilterPanel.js
import React from 'react';

const FilterPanel = ({
  searchTerm,
  setSearchTerm,
  eventTypeFilter,
  setEventTypeFilter,
  statusFilter,
  setStatusFilter,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  onClearFilters,
  allEventTypes,
}) => {
  return (
    <div className="toolbar card"> {/* Added card class */}
      <h2>Bookings Overview</h2>
      <input
        type="text"
        placeholder="Search by customer/event/email..."
        className="filter-input"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <select
        className="filter-select"
        value={eventTypeFilter}
        onChange={(e) => setEventTypeFilter(e.target.value)}
      >
        <option value="">All Event Types</option>
        {allEventTypes.map(type => (
          <option key={type} value={type}>{type}</option>
        ))}
      </select>
      <select
        className="filter-select"
        value={statusFilter}
        onChange={(e) => setStatusFilter(e.target.value)}
      >
        <option value="">All Statuses</option>
        <option value="Pending">Pending</option>
        <option value="Approved">Approved</option>
        <option value="Rejected">Rejected</option>
      </select>
      <input
        type="date"
        className="date-input"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
        title="Start Date"
      />
      <input
        type="date"
        className="date-input"
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
        title="End Date"
      />
      <button onClick={onClearFilters} className="clear-filters-btn">
        Clear Filters
      </button>
    </div>
  );
};

export default FilterPanel;