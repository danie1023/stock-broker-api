const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let users = {};

// ====================== HOMEPAGE - ONLY REGISTRATION ======================
app.get('/', (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Stock Broker</title>
            <style>
                body { font-family: Arial; background: linear-gradient(135deg, #0f172a, #1e2937); color: white; text-align: center; padding: 40px; }
                .logo { font-size: 90px; margin: 20px 0; }
                .card { background: rgba(255,255,255,0.1); padding: 30px; margin: 20px auto; border-radius: 15px; max-width: 450px; }
                input, button { padding: 15px; margin: 10px 0; width: 90%; border-radius: 8px; border: none; font-size: 16px; }
                button { background: #3b82f6; color: white; font-weight: bold; cursor: pointer; }
                button:hover { background: #2563eb; }
            </style>
        </head>
        <body>
            <div class="logo">📈</div>
            <h1>Stock Broker</h1>
            <p>Create your trading account</p>
            
            <div class="card">
                <h2>1. Create Account</h2>
                <form action="/api/register" method="POST">
                    <input type="text" name="name" placeholder="Full Name" required><br>
                    <input type="email" name="email" placeholder="Email Address" required><br>
                    <input type="password" name="password" placeholder="Create Password" required><br>
                    <button type="submit">Create Account</button>
                </form>
                <p style="margin-top:20px;">Already have account? <a href="/login" style="color:#60a5fa;">Login here</a></p>
            </div>
        </body>
        </html>
    `);
});

// Login Page
app.get('/login', (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Login - Stock Broker</title>
            <style>
                body { font-family: Arial; background: linear-gradient(135deg, #0f172a, #1e2937); color: white; text-align: center; padding: 40px; }
                .logo { font-size: 70px; }
                .card { background: rgba(255,255,255,0.1); padding: 30px; margin: 20px auto; border-radius: 15px; max-width: 450px; }
                input, button { padding: 15px; margin: 10px 0; width: 90%; border-radius: 8px; border: none; font-size: 16px; }
                button { background: #3b82f6; color: white; font-weight: bold; cursor: pointer; }
            </style>
        </head>
        <body>
            <div class="logo">📈</div>
            <h1>Login</h1>
            <div class="card">
                <form action="/api/login" method="POST">
                    <input type="email" name="email" placeholder="Email" required><br>
                    <input type="password" name="password" placeholder="Password" required><br>
                    <button type="submit">Login</button>
                </form>
                <p><a href="/" style="color:#60a5fa;">← Back to Register</a></p>
            </div>
        </body>
        </html>
    `);
});

// Register
app.post('/api/register', (req, res) => {
    const { name, email, password } = req.body;
    const userId = Date.now().toString();

    users[userId] = {
        userId, 
        name, 
        email, 
        password,
        balance: 0,
        profit: 1240.50,
        transactions: []
    };

    res.send(`
        <h2>✅ Account Created Successfully!</h2>
        <p><strong>Your User ID:</strong> ${userId}</p>
        <p>Save this ID securely.</p>
        <a href="/login">Go to Login →</a>
    `);
});

// Login → Dashboard
app.post('/api/login', (req, res) => {
    const { email, password } = req.body;
    const user = Object.values(users).find(u => u.email === email && u.password === password);

    if (!user) {
        return res.send(`<h2>❌ Invalid credentials</h2><a href="/login">Try Again</a>`);
    }

    // Dashboard after login
    res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <title>Dashboard - ${user.name}</title>
            <style>
                body { font-family: Arial; background: linear-gradient(135deg, #0f172a, #1e2937); color: white; text-align: center; padding: 30px; }
                .logo { font-size: 60px; }
                .card { background: rgba(255,255,255,0.1); padding: 25px; margin: 15px auto; border-radius: 15px; max-width: 500px; }
                button { padding: 16px; margin: 10px; width: 85%; border-radius: 10px; font-size: 17px; font-weight: bold; }
                .deposit-btn { background: #22c55e; }
                .withdraw-btn { background: #ef4444; }
            </style>
        </head>
        <body>
            <div class="logo">📈</div>
            <h1>Welcome, ${user.name}</h1>
            
            <div class="card">
                <h2>Balance: \[ {user.balance.toFixed(2)}</h2>
                <h2>Profit: \]{user.profit.toFixed(2)}</h2>
            </div>

            <div class="card">
                <h3>Deposit Funds</h3>
                <form action="/api/deposit" method="POST">
                    <input type="hidden" name="userId" value="${user.userId}">
                    <input type="number" name="amount" placeholder="Amount to Deposit" required><br>
                    <button class="deposit-btn" type="submit">Deposit</button>
                </form>
            </div>

            <div class="card">
                <h3>Withdraw Funds</h3>
                <form action="/api/withdraw" method="POST">
                    <input type="hidden" name="userId" value="${user.userId}">
                    <input type="number" name="amount" placeholder="Amount to Withdraw" required><br>
                    <button class="withdraw-btn" type="submit">Withdraw (Pending)</button>
                </form>
            </div>

            <a href="/">Logout</a>
        </body>
        </html>
    `);
});

// Deposit
app.post('/api/deposit', (req, res) => {
    const { userId, amount } = req.body;
    if (!users[userId]) return res.send(`<h2>User not found</h2><a href="/">Home</a>`);

    users[userId].balance += parseFloat(amount);
    res.send(`<h2>✅ Deposit Successful!</h2><p>New Balance: \[ {users[userId].balance}</p><a href="/">Back to Dashboard</a>`);
});

// Withdraw - Shows Pending
app.post('/api/withdraw', (req, res) => {
    const { userId, amount } = req.body;
    if (!users[userId]) return res.send(`<h2>User not found</h2><a href="/">Home</a>`);

    res.send(`
        <h2>✅ Withdrawal Request Submitted</h2>
        <p>Amount: \]{amount}</p>
        <p><strong>Status: Pending</strong></p>
        <p>Your withdrawal is being processed.</p>
        <a href="/">Back to Dashboard</a>
    `);
});

app.listen(PORT, () => {
    console.log(`🚀 Stock Broker running`);
});
