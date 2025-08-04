// src/components/admin/ExportButtons.js
import React from 'react';
import * as XLSX from 'xlsx';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable'; // Important for doc.autoTable
import { Download, FileText } from 'lucide-react'; // Icons
import { toast } from 'react-toastify';


const ExportButtons = ({ bookings }) => {
  const exportToExcel = () => {
    if (bookings.length === 0) {
      toast.info("No bookings to export to Excel.");
      return;
    }
    const data = bookings.map(booking => ({
      'Booking ID': booking._id,
      'Customer Name': booking.userName,
      'Email': booking.email,
      'Mobile': booking.mobileNumber,
      'Event Name': booking.eventName,
      'Event Type': booking.eventType,
      'Booking Date': new Date(booking.bookingDate).toLocaleDateString(),
      'Event Date': new Date(booking.eventDate).toLocaleDateString(),
      'Guest Count': booking.guestCount,
      'Venue Type': booking.venueType === 'ac' ? 'AC Hall' : 'Non-AC Hall',
      'Catering Package': booking.cateringPackage,
      'Extra Services': Object.keys(booking.extraServices).filter(key => booking.extraServices[key]).map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(', ') || 'None',
      'Total Cost (₹)': booking.totalEstimatedCost,
      'Status': booking.status,
      'Admin Notes': booking.adminNotes || '',
    }));

    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Bookings");
    XLSX.writeFile(wb, "bookings_data.xlsx");
    toast.success("Bookings exported to Excel successfully!");
  };

  const exportToPDF = () => {
    if (bookings.length === 0) {
        toast.info("No bookings to export to PDF.");
        return;
    }
    const doc = new jsPDF();

    const tableColumn = [
      "Date", "Customer", "Event", "Guests", "Venue", "Catering", "Cost", "Status"
    ];
    const tableRows = [];

    bookings.forEach(booking => {
      const bookingData = [
        new Date(booking.bookingDate).toLocaleDateString(),
        booking.userName,
        booking.eventName,
        booking.guestCount,
        booking.venueType === 'ac' ? 'AC Hall' : 'Non-AC Hall',
        booking.cateringPackage,
        `₹${booking.totalEstimatedCost.toLocaleString('en-IN')}`,
        booking.status
      ];
      tableRows.push(bookingData);
    });

    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 20,
      theme: 'grid',
      styles: { fontSize: 8, cellPadding: 2, overflow: 'linebreak' },
      headStyles: { fillColor: '#007bff', textColor: '#ffffff' },
      margin: { top: 10, right: 10, bottom: 10, left: 10 },
    });

    doc.save('bookings_data.pdf');
    toast.success("Bookings exported to PDF successfully!");
  };

  return (
    <div className="export-buttons-container">
      <button onClick={exportToExcel}>
        <Download size={18} /> Export as Excel
      </button>
      <button onClick={exportToPDF}>
        <FileText size={18} /> Export as PDF
      </button>
    </div>
  );
};

export default ExportButtons;