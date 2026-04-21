import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';
import bookingRoutes from './routes/BookingRoutes.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api/bookings', bookingRoutes);


const mongoUri = process.env.MONGODB_URI;

console.log('Attempting to connect with Mongo URI:', mongoUri); 


if (!mongoUri) {
  console.error('FATAL ERROR: MONGODB_URI is not defined in the .env file.');
  process.exit(1); 
}


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


mongoose.connect(mongoUri)
  .then(() => {
    console.log('MongoDB connected successfully.');
  })
  .catch(err => {
    console.error('MongoDB connection error:', err.message);
    console.warn('API server is running, but database-dependent endpoints may fail until MongoDB is reachable.');
  });