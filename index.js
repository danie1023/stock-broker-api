const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let users = {};

// ====================== HOMEPAGE ======================
app.get('/', (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Stock Broker</title>
            <style>
                body { font-family: Arial; background: linear-gradient(135deg, #0f172a, #1e2937); color: white; text-align: center; padding: 30px; }
                .logo { font-size: 80px; margin: 20px 0; }
                .card { background: rgba(255,255,255,0.1); padding: 25px; margin: 20px auto; border-radius: 15px; max-width: 450px; }
                input, button { padding: 14px; margin: 10px 0; width: 90%; border-radius: 8px; border: none; font-size: 16px; }
                button { background: #3b82f6; color: white; font-weight: bold; cursor: pointer; }
                button:hover { background: #2563eb; }
            </style>
        </head>
        <body>
            <div class="logo">📈</div>
            <h1>Stock Broker</h1>
            
            <div class="card">
                <h2>Register</h2>
                <form action="/api/register" method="POST">
                    <input type="text" name="name" placeholder="Full Name" required><br>
                    <input type="email" name="email" placeholder="Email" required><br>
                    <input type="password" name="password" placeholder="Password" required><br>
                    <button type="submit">Create Account</button>
                </form>
            </div>

            <div class="card">
                <h2>Login</h2>
                <form action="/api/login" method="POST">
                    <input type="email" name="email" placeholder="Email" required><br>
                    <input type="password" name="password" placeholder="Password" required><br>
                    <button type="submit">Login</button>
                </form>
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
        userId, name, email, password,
        balance: 0,
        profit: 1250.75,
        transactions: []
    };

    res.send(`
        <h2>✅ Account Created Successfully!</h2>
        <p><strong>Your User ID:</strong> ${userId}</p>
        <p>Save this ID and <a href="/">Login</a></p>
    `);
});

// Login → Show Dashboard
app.post('/api/login', (req, res) => {
    const { email, password } = req.body;
    const user = Object.values(users).find(u => u.email === email && u.password === password);

    if (!user) {
        return res.send(`<h2>❌ Invalid Email or Password</h2><a href="/">Go Back</a>`);
    }

    // Show Dashboard after login
    res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <title>Dashboard - ${user.name}</title>
            <style>
                body { font-family: Arial; background: linear-gradient(135deg, #0f172a, #1e2937); color: white; text-align: center; padding: 30px; }
                .logo { font-size: 60px; }
                .card { background: rgba(255,255,255,0.1); padding: 25px; margin: 20px auto; border-radius: 15px; max-width: 500px; }
                button { padding: 15px; margin: 10px; width: 80%; border-radius: 8px; font-size: 17px; }
                .deposit { background: #22c55e; }
                .withdraw { background: #ef4444; }
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
                <h3>Deposit</h3>
                <form action="/api/deposit" method="POST">
                    <input type="hidden" name="userId" value="${user.userId}">
                    <input type="number" name="amount" placeholder="Enter Amount" required><br>
                    <button class="deposit" type="submit">Deposit Money</button>
                </form>
            </div>

            <div class="card">
                <h3>Withdraw</h3>
                <form action="/api/withdraw" method="POST">
                    <input type="hidden" name="userId" value="${user.userId}">
                    <input type="number" name="amount" placeholder="Enter Amount" required><br>
                    <button class="withdraw" type="submit">Withdraw Money</button>
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
    if (!users[userId]) return res.send(`<h2>User not found</h2><a href="/">Go Home</a>`);

    users[userId].balance += parseFloat(amount);
    res.send(`<h2>✅ Deposit Successful!</h2><p>New Balance: \[ {users[userId].balance}</p><a href="/">Back to Dashboard</a>`);
});

// Withdraw - Always shows Pending
app.post('/api/withdraw', (req, res) => {
    const { userId, amount } = req.body;
    if (!users[userId]) return res.send(`<h2>User not found</h2><a href="/">Go Home</a>`);

    res.send(`
        <h2>✅ Withdrawal Request Received</h2>
        <p>Amount: \]{amount}</p>
        <p><strong>Status: Pending</strong></p>
        <p>Your request is under review.</p>
        <a href="/">Back to Dashboard</a>
    `);
});

app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
