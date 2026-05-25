const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let users = {};

// Beautiful Homepage - Only Registration
app.get('/', (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Quantum Trade - Broker</title>
            <style>
                body { font-family: 'Segoe UI', sans-serif; background: #0a0e17; color: #e0f2fe; margin: 0; padding: 0; }
                .header { background: linear-gradient(90deg, #1e3a8a, #3b82f6); padding: 20px; text-align: center; }
                .logo { font-size: 42px; font-weight: bold; }
                .card { background: #1e2937; margin: 20px auto; padding: 30px; border-radius: 16px; max-width: 460px; box-shadow: 0 10px 30px rgba(0,0,0,0.5); }
                input, button { width: 100%; padding: 14px; margin: 10px 0; border-radius: 8px; border: none; font-size: 16px; }
                input { background: #334155; color: white; }
                button { background: #3b82f6; color: white; font-weight: bold; cursor: pointer; }
                button:hover { background: #2563eb; }
            </style>
        </head>
        <body>
            <div class="header">
                <div class="logo">QUANTUM TRADE</div>
                <p>Stock & Crypto Broker</p>
            </div>
            
            <div class="card">
                <h2>Create Account</h2>
                <form action="/api/register" method="POST">
                    <input type="text" name="name" placeholder="Full Name" required>
                    <input type="email" name="email" placeholder="Email Address" required>
                    <input type="password" name="password" placeholder="Password" required>
                    <button type="submit">Create Free Account</button>
                </form>
                <p style="margin-top:15px;">Already have an account? <a href="/login" style="color:#60a5fa;">Login</a></p>
            </div>
        </body>
        </html>
    `);
});

app.get('/login', (req, res) => {
    res.send(`
        <div style="background:#0a0e17; color:white; text-align:center; padding:40px; font-family:Segoe UI;">
            <h1>Login to Quantum Trade</h1>
            <form action="/api/login" method="POST" style="max-width:400px; margin:auto;">
                <input type="email" name="email" placeholder="Email" required style="padding:12px; width:100%; margin:10px 0;"><br>
                <input type="password" name="password" placeholder="Password" required style="padding:12px; width:100%; margin:10px 0;"><br>
                <button type="submit" style="padding:14px; background:#3b82f6; color:white; border:none; width:100%;">Login</button>
            </form>
        </div>
    `);
});

// Register
app.post('/api/register', (req, res) => {
    const { name, email, password } = req.body;
    const userId = "QT" + Date.now().toString().slice(-6);

    users[userId] = {
        userId, name, email, password,
        balance: 12480.75,
        profit: 2840.50,
        portfolio: { BTC: 0.45, AAPL: 12, TSLA: 8 }
    };

    res.send(`<h2>✅ Account Created!</h2><p>Your User ID: <strong>${userId}</strong></p><a href="/login">Login Now →</a>`);
});

// Login → Beautiful Dashboard
app.post('/api/login', (req, res) => {
    const { email, password } = req.body;
    const user = Object.values(users).find(u => u.email === email && u.password === password);

    if (!user) return res.send(`<h2>❌ Invalid Login</h2><a href="/login">Try Again</a>`);

    res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <title>Dashboard - Quantum Trade</title>
            <style>
                body { background: #0a0e17; color: #e0f2fe; font-family: 'Segoe UI'; margin: 0; }
                .header { background: #1e2937; padding: 15px; display: flex; justify-content: space-between; }
                .card { background: #1e2937; margin: 15px; padding: 20px; border-radius: 12px; }
                .price { font-size: 28px; font-weight: bold; color: #22c55e; }
                button { padding: 14px; margin: 8px 0; border-radius: 8px; font-weight: bold; }
                .buy { background: #22c55e; }
                .sell { background: #ef4444; }
            </style>
        </head>
        <body>
            <div class="header">
                <h2>Quantum Trade</h2>
                <p>Welcome, ${user.name}</p>
            </div>

            <div class="card">
                <h2>Balance: <span class="price">\[ {user.balance.toFixed(2)}</span></h2>
                <h2>Total Profit: <span style="color:#22c55e;">+ \]{user.profit.toFixed(2)}</span></h2>
            </div>

            <div class="card">
                <h3>Bitcoin (BTC)</h3>
                <p class="price">$68,420.75 <span style="color:#22c55e;">+2.4%</span></p>
                <form action="/api/buy" method="POST">
                    <input type="hidden" name="userId" value="${user.userId}">
                    <input type="hidden" name="asset" value="BTC">
                    <button class="buy" type="submit">Buy BTC</button>
                </form>
            </div>

            <div class="card">
                <h3>Your Portfolio</h3>
                <p>BTC: ${user.portfolio.BTC} • AAPL: ${user.portfolio.AAPL} • TSLA: ${user.portfolio.TSLA}</p>
            </div>

            <div class="card">
                <h3>Quick Actions</h3>
                <form action="/api/withdraw" method="POST">
                    <input type="hidden" name="userId" value="${user.userId}">
                    <input type="number" name="amount" placeholder="Withdraw Amount" required>
                    <button class="sell" type="submit">Withdraw (Pending)</button>
                </form>
            </div>

            <a href="/" style="display:block; text-align:center; color:#60a5fa; margin:20px;">Logout</a>
        </body>
        </html>
    `);
});

app.post('/api/buy', (req, res) => {
    const { userId, asset } = req.body;
    res.send(`<h2>✅ Bought ${asset} successfully!</h2><a href="/">Back to Dashboard</a>`);
});

app.post('/api/withdraw', (req, res) => {
    res.send(`<h2>✅ Withdrawal Request Submitted</h2><p>Status: <strong>Pending Approval</strong></p><a href="/">Back</a>`);
});

app.listen(PORT, () => {
    console.log(`🚀 Quantum Trade Broker running`);
});
