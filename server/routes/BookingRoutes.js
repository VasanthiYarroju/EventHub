// routes/BookingRoutes.js
import express from 'express';

import {
	getAllBookings,
	createBooking,
	updateBookingStatus,
	updateBookingNotes,
} from '../controllers/bookingController.js'; 

const router = express.Router();


router.get('/', getAllBookings);



router.post('/', createBooking);


router.patch('/:id/status', updateBookingStatus);


router.patch('/:id/notes', updateBookingNotes);



export default router;