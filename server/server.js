import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';
import bookingRoutes from './routes/BookingRoutes.js';

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/bookings', bookingRoutes);


const mongoUri = process.env.MONGODB_URI;

console.log('Attempting to connect with Mongo URI:', mongoUri); 


if (!mongoUri) {
  console.error('FATAL ERROR: MONGODB_URI is not defined in the .env file.');
  process.exit(1); 
}


mongoose.connect(mongoUri)
  .then(() => {
    console.log('MongoDB connected successfully.');
    app.listen(5000, () => console.log('Server running on port 5000'));
  })
  .catch(err => {
    console.error('MongoDB connection error:', err.message);
  });