const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// In-memory storage
let users = {}; // { userId: { name, email, password, balance, profit, transactions } }

// Beautiful HTML Homepage
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
                .logo { font-size: 70px; margin: 20px 0; }
                h1 { margin: 10px 0; }
                .card { background: rgba(255,255,255,0.1); padding: 20px; margin: 20px auto; border-radius: 12px; max-width: 500px; }
                input, button { padding: 12px; margin: 8px; width: 80%; border-radius: 8px; border: none; }
                button { background: #3b82f6; color: white; font-weight: bold; cursor: pointer; }
                button:hover { background: #2563eb; }
            </style>
        </head>
        <body>
            <div class="logo">📈</div>
            <h1>Stock Broker</h1>
            <p>Trade • Deposit • Withdraw</p>
            
            <div class="card">
                <h3>Test Endpoints</h3>
                <p><strong>Register:</strong> POST /api/register</p>
                <p><strong>Login:</strong> POST /api/login</p>
                <p><strong>Profile:</strong> GET /api/profile?userId=1</p>
            </div>
        </body>
        </html>
    `);
});

// ====================== USER ROUTES ======================

// Register New User
app.post('/api/register', (req, res) => {
    const { name, email, password } = req.body;
    
    if (!name || !email || !password) {
        return res.status(400).json({ error: "All fields required" });
    }

    const userId = Date.now().toString();
    
    users[userId] = {
        userId,
        name,
        email,
        password, // In real app, hash this!
        balance: 0,
        profit: 0,
        transactions: []
    };

    res.json({
        message: "Account created successfully!",
        userId: userId,
        user: { name, email, balance: 0, profit: 0 }
    });
});

// Login
app.post('/api/login', (req, res) => {
    const { email, password } = req.body;
    
    const user = Object.values(users).find(u => u.email === email && u.password === password);
    
    if (!user) {
        return res.status(401).json({ error: "Invalid email or password" });
    }

    res.json({
        message: "Login successful",
        userId: user.userId,
        user: { name: user.name, email: user.email, balance: user.balance, profit: user.profit }
    });
});

// Get Profile
app.get('/api/profile', (req, res) => {
    const { userId } = req.query;
    
    if (!users[userId]) {
        return res.status(404).json({ error: "User not found" });
    }

    const user = users[userId];
    res.json({
        name: user.name,
        email: user.email,
        balance: user.balance,
        profit: user.profit,
        transactions: user.transactions
    });
});

// Deposit
app.post('/api/deposit', (req, res) => {
    const { userId, amount } = req.body;
    
    if (!users[userId]) return res.status(404).json({ error: "User not found" });
    if (!amount || amount <= 0) return res.status(400).json({ error: "Invalid amount" });

    users[userId].balance += parseFloat(amount);
    users[userId].transactions.push({
        type: "Deposit",
        amount: parseFloat(amount),
        date: new Date().toISOString()
    });

    res.json({
        message: "Deposit successful",
        newBalance: users[userId].balance
    });
});

// Withdraw
app.post('/api/withdraw', (req, res) => {
    const { userId, amount } = req.body;
    
    if (!users[userId]) return res.status(404).json({ error: "User not found" });
    if (!amount || amount <= 0) return res.status(400).json({ error: "Invalid amount" });
    if (users[userId].balance < amount) return res.status(400).json({ error: "Insufficient balance" });

    users[userId].balance -= parseFloat(amount);
    
    users[userId].transactions.push({
        type: "Withdraw",
        amount: parseFloat(amount),
        status: "Pending",
        date: new Date().toISOString()
    });

    res.json({
        message: "Withdrawal request submitted successfully",
        status: "Pending",
        newBalance: users[userId].balance
    });
});

app.listen(PORT, () => {
    console.log(`🚀 Stock Broker API running on http://localhost:${PORT}`);
});const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// In-memory storage
let users = {}; // { userId: { name, email, password, balance, profit, transactions } }

// Beautiful HTML Homepage
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
                .logo { font-size: 70px; margin: 20px 0; }
                h1 { margin: 10px 0; }
                .card { background: rgba(255,255,255,0.1); padding: 20px; margin: 20px auto; border-radius: 12px; max-width: 500px; }
                input, button { padding: 12px; margin: 8px; width: 80%; border-radius: 8px; border: none; }
                button { background: #3b82f6; color: white; font-weight: bold; cursor: pointer; }
                button:hover { background: #2563eb; }
            </style>
        </head>
        <body>
            <div class="logo">📈</div>
            <h1>Stock Broker</h1>
            <p>Trade • Deposit • Withdraw</p>
            
            <div class="card">
                <h3>Test Endpoints</h3>
                <p><strong>Register:</strong> POST /api/register</p>
                <p><strong>Login:</strong> POST /api/login</p>
                <p><strong>Profile:</strong> GET /api/profile?userId=1</p>
            </div>
        </body>
        </html>
    `);
});

// ====================== USER ROUTES ======================

// Register New User
app.post('/api/register', (req, res) => {
    const { name, email, password } = req.body;
    
    if (!name || !email || !password) {
        return res.status(400).json({ error: "All fields required" });
    }

    const userId = Date.now().toString();
    
    users[userId] = {
        userId,
        name,
        email,
        password, // In real app, hash this!
        balance: 0,
        profit: 0,
        transactions: []
    };

    res.json({
        message: "Account created successfully!",
        userId: userId,
        user: { name, email, balance: 0, profit: 0 }
    });
});

// Login
app.post('/api/login', (req, res) => {
    const { email, password } = req.body;
    
    const user = Object.values(users).find(u => u.email === email && u.password === password);
    
    if (!user) {
        return res.status(401).json({ error: "Invalid email or password" });
    }

    res.json({
        message: "Login successful",
        userId: user.userId,
        user: { name: user.name, email: user.email, balance: user.balance, profit: user.profit }
    });
});

// Get Profile
app.get('/api/profile', (req, res) => {
    const { userId } = req.query;
    
    if (!users[userId]) {
        return res.status(404).json({ error: "User not found" });
    }

    const user = users[userId];
    res.json({
        name: user.name,
        email: user.email,
        balance: user.balance,
        profit: user.profit,
        transactions: user.transactions
    });
});

// Deposit
app.post('/api/deposit', (req, res) => {
    const { userId, amount } = req.body;
    
    if (!users[userId]) return res.status(404).json({ error: "User not found" });
    if (!amount || amount <= 0) return res.status(400).json({ error: "Invalid amount" });

    users[userId].balance += parseFloat(amount);
    users[userId].transactions.push({
        type: "Deposit",
        amount: parseFloat(amount),
        date: new Date().toISOString()
    });

    res.json({
        message: "Deposit successful",
        newBalance: users[userId].balance
    });
});

// Withdraw
app.post('/api/withdraw', (req, res) => {
    const { userId, amount } = req.body;
    
    if (!users[userId]) return res.status(404).json({ error: "User not found" });
    if (!amount || amount <= 0) return res.status(400).json({ error: "Invalid amount" });
    if (users[userId].balance < amount) return res.status(400).json({ error: "Insufficient balance" });

    users[userId].balance -= parseFloat(amount);
    
    users[userId].transactions.push({
        type: "Withdraw",
        amount: parseFloat(amount),
        status: "Pending",
        date: new Date().toISOString()
    });

    res.json({
        message: "Withdrawal request submitted successfully",
        status: "Pending",
        newBalance: users[userId].balance
    });
});

app.listen(PORT, () => {
    console.log(`🚀 Stock Broker API running on http://localhost:${PORT}`);
});
