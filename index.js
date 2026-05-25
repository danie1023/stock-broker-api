const express = require('express');
const app = express();

// Important for Render.com
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Basic route
app.get('/', (req, res) => {
  res.json({
    message: "✅ Stock Market Broker API is running!",
    status: "success",
    time: new Date().toISOString()
  });
});

// Example stock route
app.get('/api/stocks', (req, res) => {
  res.json({
    message: "Stock data will be here",
    stocks: []
  });
});

// Health check route
app.get('/health', (req, res) => {
  res.status(200).json({ status: "healthy" });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
