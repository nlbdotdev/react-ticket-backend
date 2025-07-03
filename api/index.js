const app = require('../app');
const { connectToDatabase } = require('../config/database');

// Simple middleware to ensure DB connection
app.use(async (req, res, next) => {
  try {
    await connectToDatabase();
    next();
  } catch (error) {
    console.error('Database connection error:', error);
    res.status(500).json({ 
      message: 'Database connection failed', 
      error: error.message 
    });
  }
});

module.exports = app;

console.log('Serverless function initialized'); 