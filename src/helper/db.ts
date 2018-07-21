import mongoose from 'mongoose';
import { getEnvItem } from './utils';

export const connectMongo = async () => {
  const uri = getEnvItem('MONGO_URI');

  const options = {
    useNewUrlParser: true,
    // useMongoClient: true,
    // autoIndex: false, // Don't build indexes
    // reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
    // reconnectInterval: 500, // Reconnect every 500ms
    // poolSize: 10, // Maintain up to 10 socket connections
    // If not connected, return errors immediately rather than waiting for reconnect
    // bufferMaxEntries: 0,
    // connectTimeoutMS: 10000, // Give up initial connection after 10 seconds
    // socketTimeoutMS: 45000 // Close sockets after 45 seconds of inactivity
  };

  return mongoose.connect(
    uri,
    options
  );
};
