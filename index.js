const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// In-memory storage
let users = {};

// Beautiful Homepage with Forms
app.get('/', (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Stock Broker</title>
            <style>
                body { font-family: Arial; background: linear-gradient(135deg, #0f172a, #1e2937); color: white; text-align: center; padding: 20px; }
                .logo { font-size: 70px; }
                .card { background: rgba(255,255,255,0.1); padding: 20px; margin: 20px auto; border-radius: 12px; max-width: 500px; }
                input, button { padding: 12px; margin: 8px; width: 90%; border-radius: 8px; border: none; }
                button { background: #3b82f6; color: white; font-weight: bold; cursor: pointer; }
                button:hover { background: #2563eb; }
                .result { margin-top: 15px; padding: 10px; background: rgba(0,0,0,0.3); border-radius: 8px; }
            </style>
        </head>
        <body>
            <div class="logo">📈</div>
            <h1>Stock Broker</h1>
            
            <div class="card">
                <h2>1. Create Account</h2>
                <form action="/api/register" method="POST">
                    <input type="text" name="name" placeholder="Your Name" required><br>
                    <input type="email" name="email" placeholder="Email" required><br>
                    <input type="password" name="password" placeholder="Password" required><br>
                    <button type="submit">Create Account</button>
                </form>
            </div>

            <div class="card">
                <h2>2. Login</h2>
                <form action="/api/login" method="POST">
                    <input type="email" name="email" placeholder="Email" required><br>
                    <input type="password" name="password" placeholder="Password" required><br>
                    <button type="submit">Login</button>
                </form>
            </div>

            <div class="card">
                <h2>3. Deposit</h2>
                <form action="/api/deposit" method="POST">
                    <input type="text" name="userId" placeholder="Your User ID" required><br>
                    <input type="number" name="amount" placeholder="Amount" required><br>
                    <button type="submit">Deposit</button>
                </form>
            </div>

            <div class="card">
                <h2>4. Withdraw</h2>
                <form action="/api/withdraw" method="POST">
                    <input type="text" name="userId" placeholder="Your User ID" required><br>
                    <input type="number" name="amount" placeholder="Amount" required><br>
                    <button type="submit">Withdraw (Pending)</button>
                </form>
            </div>

            <div class="card">
                <h2>5. Check Profile</h2>
                <form action="/api/profile" method="GET">
                    <input type="text" name="userId" placeholder="Enter User ID" required><br>
                    <button type="submit">View Profile</button>
                </form>
            </div>
        </body>
        </html>
    `);
});

// ====================== API ROUTES ======================

app.post('/api/register', (req, res) => {
    const { name, email, password } = req.body;
    const userId = Date.now().toString();
    
    users[userId] = { userId, name, email, password, balance: 0, profit: 0, transactions: [] };
    
    res.send(`<h2>✅ Account Created!</h2><p><strong>Your User ID: ${userId}</strong><br>Save this ID!</p><a href="/">Go Back</a>`);
});

app.post('/api/login', (req, res) => {
    const { email, password } = req.body;
    const user = Object.values(users).find(u => u.email === email && u.password === password);
    
    if (!user) return res.send(`<h2>❌ Invalid Login</h2><a href="/">Go Back</a>`);
    
    res.send(`<h2>✅ Login Successful!</h2><p>Welcome ${user.name}<br><strong>User ID: ${user.userId}</strong></p><a href="/">Go Back</a>`);
});

app.post('/api/deposit', (req, res) => {
    const { userId, amount } = req.body;
    if (!users[userId]) return res.send(`<h2>❌ User not found</h2><a href="/">Go Back</a>`);
    
    users[userId].balance += parseFloat(amount);
    res.send(`<h2>✅ Deposit Successful!</h2><p>New Balance: \[ {users[userId].balance}</p><a href="/">Go Back</a>`);
});

app.post('/api/withdraw', (req, res) => {
    const { userId, amount } = req.body;
    if (!users[userId]) return res.send(`<h2>❌ User not found</h2><a href="/">Go Back</a>`);
    
    if (users[userId].balance < amount) return res.send(`<h2>❌ Insufficient Balance</h2><a href="/">Go Back</a>`);
    
    users[userId].balance -= parseFloat(amount);
    res.send(`<h2>✅ Withdrawal Request Submitted</h2><p>Status: <strong>Pending</strong><br>New Balance: \]{users[userId].balance}</p><a href="/">Go Back</a>`);
});

app.get('/api/profile', (req, res) => {
    const { userId } = req.query;
    if (!users[userId]) return res.send(`<h2>❌ User not found</h2><a href="/">Go Back</a>`);
    
    const user = users[userId];
    res.send(`
        <h2>👤 Profile</h2>
        <p><strong>Name:</strong> ${user.name}</p>
        <p><strong>Balance:</strong> \[ {user.balance}</p>
        <p><strong>Profit:</strong> \]{user.profit}</p>
        <a href="/">Go Back</a>
    `);
});

app.listen(PORT, () => {
    console.log(`🚀 Stock Broker running on port ${PORT}`);
});
