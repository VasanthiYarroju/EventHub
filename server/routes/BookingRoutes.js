// routes/BookingRoutes.js
import express from 'express';
// You don't need to import the model here anymore, as the controller handles it.
// import Booking from '../models/booking.js'; 

// Import the controller functions
import {
	getAllBookings,
	createBooking,
	updateBookingStatus,
	updateBookingNotes,
} from '../controllers/bookingController.js'; 

const router = express.Router();


// --- GET ALL BOOKINGS ---
// @route   GET /api/bookings
// @desc    Get all existing bookings
// @access  Public (or Private if you add authentication)
//
// THIS IS THE LINE THAT FIXES YOUR 404 ERROR
router.get('/', getAllBookings);


// --- CREATE A NEW BOOKING ---
// @route   POST /api/bookings
// @desc    Create a new booking
// @access  Public
//
// Your existing POST route can be simplified to just this line:
router.post('/', createBooking);


// --- UPDATE BOOKING STATUS ---
// @route   PATCH /api/bookings/:id/status
router.patch('/:id/status', updateBookingStatus);


// --- UPDATE ADMIN NOTES ---
// @route   PATCH /api/bookings/:id/notes
router.patch('/:id/notes', updateBookingNotes);



export default router;