import Booking from '../models/booking.js';
import mongoose from 'mongoose';

const isDatabaseReady = () => mongoose.connection.readyState === 1;

// --- GET ALL BOOKINGS ---
// This function will be triggered by GET /api/bookings
export const getAllBookings = async (req, res) => {
  if (!isDatabaseReady()) {
    return res.status(503).json({ message: 'Database is unavailable. Please try again later.' });
  }

  try {
    // Find all documents in the Booking collection
    const bookings = await Booking.find({}); 
    // Send them back to the frontend with a 200 OK status
    res.status(200).json(bookings);
  } catch (error) {
    // If something goes wrong, send a 500 error status
    res.status(500).json({ message: 'Error fetching bookings', error: error.message });
  }
};

// --- CREATE A NEW BOOKING ---
// This function can be used later for your form submissions
export const createBooking = async (req, res) => {
  if (!isDatabaseReady()) {
    return res.status(503).json({ message: 'Database is unavailable. Please try again later.' });
  }

  try {
    const newBooking = new Booking(req.body);
    await newBooking.save();
    res.status(201).json(newBooking);
  } catch (error) {
    res.status(400).json({ message: 'Error creating booking', error: error.message });
  }
};

// --- UPDATE BOOKING STATUS ---
// This function is triggered by PATCH /api/bookings/:id/status
export const updateBookingStatus = async (req, res) => {
  if (!isDatabaseReady()) {
    return res.status(503).json({ message: 'Database is unavailable. Please try again later.' });
  }

  const { id } = req.params;
  const { status } = req.body;
  const validStatuses = ['Pending', 'Approved', 'Rejected'];

  if (!validStatuses.includes(status)) {
    return res.status(400).json({ message: 'Invalid status value.' });
  }

  try {
    const updatedBooking = await Booking.findByIdAndUpdate(
      id,
      { status },
      { new: true, runValidators: true }
    );

    if (!updatedBooking) {
      return res.status(404).json({ message: 'Booking not found.' });
    }

    res.status(200).json(updatedBooking);
  } catch (error) {
    res.status(400).json({ message: 'Error updating booking status', error: error.message });
  }
};

// --- UPDATE ADMIN NOTES ---
// This function is triggered by PATCH /api/bookings/:id/notes
export const updateBookingNotes = async (req, res) => {
  if (!isDatabaseReady()) {
    return res.status(503).json({ message: 'Database is unavailable. Please try again later.' });
  }

  const { id } = req.params;
  const { adminNotes } = req.body;

  try {
    const updatedBooking = await Booking.findByIdAndUpdate(
      id,
      { adminNotes: typeof adminNotes === 'string' ? adminNotes : '' },
      { new: true, runValidators: true }
    );

    if (!updatedBooking) {
      return res.status(404).json({ message: 'Booking not found.' });
    }

    res.status(200).json(updatedBooking);
  } catch (error) {
    res.status(400).json({ message: 'Error updating booking notes', error: error.message });
  }
};