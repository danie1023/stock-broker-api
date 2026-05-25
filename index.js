const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Basic route
app.get('/', (req, res) => {
    res.json({
        message: "Welcome to Stock Broker API",
        status: "Running ✅"
    });
});

// Sample stock price route
app.get('/api/stocks/:symbol', (req, res) => {
    const symbol = req.params.symbol.toUpperCase();
    
    // Mock stock data
    const mockStocks = {
        'AAPL': { price: 226.84, change: 1.25 },
        'TSLA': { price: 348.67, change: -2.45 },
        'GOOGL': { price: 178.92, change: 0.87 },
        'MSFT': { price: 432.15, change: 3.12 }
    };

    if (mockStocks[symbol]) {
        res.json({
            symbol: symbol,
            ...mockStocks[symbol],
            timestamp: new Date().toISOString()
        });
    } else {
        res.status(404).json({ error: "Stock symbol not found" });
    }
});

// Health check
app.get('/health', (req, res) => {
    res.json({ status: "healthy" });
});

app.listen(PORT, () => {
    console.log(`🚀 Stock Broker API running on http://localhost:${PORT}`);
});
