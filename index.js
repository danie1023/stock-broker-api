const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Professional Stock Broker Landing Page
app.get('/', (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>StockPro - Premium Stock Trading</title>
            <style>
                * { margin: 0; padding: 0; box-sizing: border-box; }
                body { font-family: 'Segoe UI', Arial, sans-serif; background: #0f172a; color: #e2e8f0; line-height: 1.6; }
                .header { background: #1e2937; padding: 15px 40px; display: flex; justify-content: space-between; align-items: center; position: sticky; top: 0; z-index: 100; }
                .logo { font-size: 28px; font-weight: bold; color: #3b82f6; }
                .nav button { padding: 10px 25px; background: #3b82f6; color: white; border: none; border-radius: 8px; font-weight: bold; cursor: pointer; }
                
                .hero { background: linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.8)), url('https://source.unsplash.com/random/1600x900/?stockmarket') center/cover; height: 90vh; display: flex; align-items: center; text-align: center; padding: 0 20px; }
                .hero h1 { font-size: 3.5rem; margin-bottom: 20px; }
                .hero p { font-size: 1.4rem; max-width: 700px; margin: 0 auto 30px; }
                .btn { padding: 16px 40px; font-size: 1.2rem; background: #3b82f6; color: white; border: none; border-radius: 50px; cursor: pointer; }
                .btn:hover { background: #2563eb; }

                .section { padding: 80px 40px; text-align: center; }
                .features { background: #1e2937; }
                .grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 30px; max-width: 1200px; margin: 40px auto; }
                .card { background: #334155; padding: 30px; border-radius: 12px; }
                
                footer { background: #0a0e17; padding: 60px 40px; text-align: center; font-size: 0.9rem; color: #94a3b8; }
            </style>
        </head>
        <body>
            <div class="header">
                <div class="logo">STOCKPRO</div>
                <div>
                    <a href="/login"><button>Login</button></a>
                    <a href="#register"><button class="nav">Register</button></a>
                </div>
            </div>

            <section class="hero">
                <div>
                    <h1>Trade Stocks & Crypto</h1>
                    <p>The most advanced platform for stock market trading. Real-time data, powerful tools, and secure investments.</p>
                    <button class="btn" onclick="window.location.href='/register'">Open Free Account</button>
                </div>
            </section>

            <section class="section features">
                <h2 style="font-size: 2.5rem; margin-bottom: 20px;">Why Traders Choose StockPro</h2>
                <div class="grid">
                    <div class="card">
                        <h3>Real-Time Market Data</h3>
                        <p>Live prices for thousands of stocks and cryptocurrencies.</p>
                    </div>
                    <div class="card">
                        <h3>Advanced Charting</h3>
                        <p>Professional technical analysis tools used by expert traders.</p>
                    </div>
                    <div class="card">
                        <h3>Secure & Fast</h3>
                        <p>Bank-level security with instant deposits and withdrawals.</p>
                    </div>
                </div>
            </section>

            <section class="section" style="background:#1e2937;">
                <h2>Available on All Devices</h2>
                <p style="font-size:1.3rem; margin:20px 0;">Web • Mobile • Desktop</p>
            </section>

            <footer>
                <p><strong>STOCKPRO</strong> - Premium Stock Trading Platform</p>
                <p>Trade Responsibly • Past performance is not indicative of future results</p>
                <p style="margin-top:20px;">© 2026 StockPro. All Rights Reserved.</p>
            </footer>
        </body>
        </html>
    `);
});

app.get('/register', (req, res) => {
    res.send(`<h2>Registration Form Coming Soon...</h2><a href="/">Back to Home</a>`);
});

app.get('/login', (req, res) => {
    res.send(`<h2>Login Page Coming Soon...</h2><a href="/">Back to Home</a>`);
});

app.listen(PORT, () => {
    console.log(`🚀 StockPro running on port ${PORT}`);
});
