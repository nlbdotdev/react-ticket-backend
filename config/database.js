const mongoose = require('mongoose');

// Connection options optimized for serverless
const connectionOptions = {
  maxPoolSize: 10,
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
  bufferCommands: false,
  bufferMaxEntries: 0,
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

let cachedConnection = null;

async function connectToDatabase() {
  if (cachedConnection) {
    return cachedConnection;
  }

  try {
    const connection = await mongoose.connect(process.env.MONGODB_URI, connectionOptions);
    console.log("CONNECTED TO MONGODB");
    cachedConnection = connection;
    return connection;
  } catch (error) {
    console.log("MongoDB connection error:", error);
    throw error;
  }
}

module.exports = { connectToDatabase }; 