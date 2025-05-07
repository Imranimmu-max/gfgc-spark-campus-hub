const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: ['http://localhost:8080', 'http://localhost:8081', 'http://localhost:3000',
           'https://gfgc-spark-campus-hub.vercel.app', 'https://gfgc-spark-campus-hub-git-main-imranimmu-max.vercel.app',
           'https://gfgc-spark-campus-hub.vercel.app', 'https://gfgc.vercel.app'],
  methods: ['GET', 'POST', 'DELETE', 'OPTIONS', 'PUT', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

// Handle preflight requests
app.options('*', cors());

app.use(express.json());

// Determine if we're running on Vercel
const isVercel = process.env.VERCEL === '1';

// API Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running' });
});

// For Vercel serverless functions, we need to export the app
// For local development, we'll start the server
if (isVercel) {
  console.log('Exporting app for Vercel serverless function');
  module.exports = app;
} else {
  // Start the server for local development
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}
