import mongoose from 'mongoose';

if (!process.env.MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable');
}

// The MONGODB_URI is already configured to use the bayernexpress database in the .env file
const MONGODB_URI = process.env.MONGODB_URI;

/**
 * Simple MongoDB connection function without caching
 * This creates a new connection for each request, which is fine for smaller applications
 */
async function dbConnect() {
  try {
    const connection = await mongoose.connect(MONGODB_URI);
    console.log('MongoDB connected successfully');
    return connection;
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw error;
  }
}

export default dbConnect;
