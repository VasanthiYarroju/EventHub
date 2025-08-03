import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
  userName: { type: String, required: true },
  email: { type: String, required: true },
  mobileNumber: { type: String, required: true },
  eventType: { type: String, required: true },
  eventName: { type: String, required: true },
  guestCount: { type: Number, required: true },
  venueType: { type: String, required: true },
  cateringPackage: { type: String, required: true },
  extraServices: { type: Map, of: Boolean }, 
  totalEstimatedCost: { type: Number, required: true },
  bookingDate: { type: Date, default: Date.now },
});

const Booking = mongoose.model('Booking', bookingSchema);

export default Booking;