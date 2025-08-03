import Booking from '../models/Booking.js'; // Import the model you just showed me

// --- GET ALL BOOKINGS ---
// This function will be triggered by GET /api/bookings
export const getAllBookings = async (req, res) => {
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
  try {
    const newBooking = new Booking(req.body);
    await newBooking.save();
    res.status(201).json(newBooking);
  } catch (error) {
    res.status(400).json({ message: 'Error creating booking', error: error.message });
  }
};