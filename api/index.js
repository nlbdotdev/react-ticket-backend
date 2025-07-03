const app = require('../app');
const { connectToDatabase } = require('../config/database');

// Ensure DB connection before handling requests
let dbReady = false;
let dbReadyPromise = connectToDatabase().then(() => { dbReady = true; });

// Middleware to wait for DB connection
app.use(async (req, res, next) => {
  if (!dbReady) {
    await dbReadyPromise;
  }
  next();
});

// Export the Express app for Vercel serverless functions
module.exports = app;

// Optional: Add serverless-specific logging
console.log('Serverless function initialized'); 