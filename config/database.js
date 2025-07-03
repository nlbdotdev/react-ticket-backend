const mongoose = require('mongoose');

// Connection options optimized for serverless
const connectionOptions = {
  maxPoolSize: 1, // Reduce pool size for serverless
  serverSelectionTimeoutMS: 5000, // Slightly longer timeout
  socketTimeoutMS: 30000, // Longer socket timeout
  connectTimeoutMS: 5000, // Longer connection timeout
  bufferCommands: true, // Enable command buffering for serverless
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

let cachedConnection = null;

async function connectToDatabase() {
  if (cachedConnection && mongoose.connection.readyState === 1) {
    return cachedConnection;
  }

  try {
    // Close existing connection if it exists but is not ready
    if (cachedConnection && mongoose.connection.readyState !== 1) {
      await mongoose.disconnect();
      cachedConnection = null;
    }

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