// src/components/admin/ChartsSection.js
import React from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell,
  BarChart, Bar
} from 'recharts';

// --- Bookings Over Time Chart ---
const BookingsOverTimeChart = ({ data }) => {
  // Aggregate bookings by month
  const monthlyData = data.reduce((acc, booking) => {
    const date = new Date(booking.bookingDate);
    const monthYear = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}`;
    acc[monthYear] = (acc[monthYear] || 0) + 1;
    return acc;
  }, {});

  const chartData = Object.keys(monthlyData)
    .sort()
    .map(key => ({
      name: key,
      bookings: monthlyData[key]
    }));

  return (
    <div className="chart-card card">
      <h3>Bookings Over Time</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="bookings" stroke="var(--accent-color)" activeDot={{ r: 8 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

// --- Catering Packages Chart ---
const CateringPackagesChart = ({ data }) => {
  const packageCounts = data.reduce((acc, booking) => {
    acc[booking.cateringPackage] = (acc[booking.cateringPackage] || 0) + 1;
    return acc;
  }, {});

  const chartData = Object.keys(packageCounts).map(key => ({
    name: key,
    value: packageCounts[key]
  }));

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF', '#FF19A3'];

  return (
    <div className="chart-card card">
      <h3>Most Booked Catering Packages</h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={100}
            fill="#8884d8"
            dataKey="value"
            label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

// --- Venue Type Chart ---
const VenueTypeChart = ({ data }) => {
  const venueTypeCounts = data.reduce((acc, booking) => {
    acc[booking.venueType] = (acc[booking.venueType] || 0) + 1;
    return acc;
  }, {});

  const chartData = [
    { name: 'AC Hall', value: venueTypeCounts.ac || 0 },
    { name: 'Non-AC Hall', value: venueTypeCounts['non-ac'] || 0 },
  ];

  return (
    <div className="chart-card card">
      <h3>AC vs Non-AC Hall Bookings</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Legend />
          <Bar dataKey="value" fill="var(--accent-color)" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};


const ChartsSection = ({ bookings }) => {
    if (!bookings || bookings.length === 0) {
        return <p className="no-bookings-message">No data available for charts.</p>;
    }
  return (
    <div className="charts-grid">
      <BookingsOverTimeChart data={bookings} />
      <CateringPackagesChart data={bookings} />
      <VenueTypeChart data={bookings} />
    </div>
  );
};

export default ChartsSection;