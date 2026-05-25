const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Serve a beautiful HTML page with logo at root
app.get('/', (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Stock Broker API</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    background: linear-gradient(135deg, #0f172a, #1e2937);
                    color: white;
                    text-align: center;
                    padding: 50px;
                }
                .logo {
                    font-size: 80px;
                    margin-bottom: 20px;
                }
                h1 { font-size: 2.5em; margin: 20px 0; }
                p { font-size: 1.2em; opacity: 0.9; }
                .endpoint { 
                    background: rgba(255,255,255,0.1); 
                    padding: 15px; 
                    margin: 15px auto; 
                    border-radius: 10px;
                    max-width: 600px;
                }
            </style>
        </head>
        <body>
            <div class="logo">📈</div>
            <h1>Stock Broker API</h1>
            <p>Professional Stock Market Trading Backend</p>
            
            <div class="endpoint">
                <strong>✅ Status:</strong> Running Live
            </div>
            
            <p>Test these endpoints:</p>
            <div class="endpoint">
                <a href="/api/stocks/AAPL" style="color:#60a5fa;">/api/stocks/AAPL</a><br>
                <a href="/api/stocks/TSLA" style="color:#60a5fa;">/api/stocks/TSLA</a><br>
                <a href="/api/stocks/GOOGL" style="color:#60a5fa;">/api/stocks/GOOGL</a>
            </div>
            
            <p style="margin-top: 40px; opacity: 0.7;">Built with ❤️ for Stock Trading</p>
        </body>
        </html>
    `);
});

// Keep the existing API routes
app.get('/api/stocks/:symbol', (req, res) => {
    const symbol = req.params.symbol.toUpperCase();
    
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

app.get('/health', (req, res) => {
    res.json({ status: "healthy" });
});

app.listen(PORT, () => {
    console.log(`🚀 Stock Broker API running on http://localhost:${PORT}`);
});
