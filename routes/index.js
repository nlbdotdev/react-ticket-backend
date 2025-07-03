var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.json({ message: 'Express API is running!' });
});

/* GET HTML page with favicon. */
router.get('/html', function(req, res, next) {
  res.render('index', { title: 'React Ticket Backend' });
});

/* GET health check. */
router.get('/health', async function(req, res, next) {
  try {
    const mongoose = require('mongoose');
    const dbStatus = mongoose.connection.readyState === 1 ? 'connected' : 'disconnected';
    res.json({ 
      status: 'ok', 
      database: dbStatus,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({ 
      status: 'error', 
      message: error.message,
      timestamp: new Date().toISOString()
    });
  }
});

module.exports = router;
