import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;
//the cached variable is intent to hold a cached connection to our database
let cached = (global as any).mongoose || { conn: null, promise: null };

export const connectToDatabase = async () => {
  if (cached.conn) return cached.conn;

  if (!MONGODB_URI) throw new Error('MONGODB_URI is missing');
  cached.promise =
    cached.promise ||
    mongoose.connect(MONGODB_URI, {
      dbName: 'eventful',
      bufferCommands: false,
    });

  cached.conn = await cached.promise;

  return cached.con;
};
