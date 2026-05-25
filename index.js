const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let users = {};
let admin = { email: "admin@quantumtrade.com", password: "admin123" };

// ====================== HOMEPAGE ======================
app.get('/', (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Quantum Trade - Premium Broker</title>
            <style>
                * { margin:0; padding:0; box-sizing:border-box; }
                body { font-family: 'Segoe UI', sans-serif; background: #0a0e17; color: #e0f2fe; }
                .header { background: linear-gradient(90deg, #1e40af, #3b82f6); padding: 25px; text-align:center; }
                .logo { font-size: 38px; font-weight: bold; letter-spacing: 2px; }
                .card { background: #1e2937; margin: 25px auto; padding: 30px; border-radius: 16px; max-width: 480px; box-shadow: 0 10px 30px rgba(0,0,0,0.6); }
                input, button { width: 100%; padding: 15px; margin: 10px 0; border-radius: 10px; border: none; font-size: 16px; }
                input { background: #334155; color: white; }
                button { background: #3b82f6; color: white; font-weight: bold; cursor: pointer; }
                button:hover { background: #2563eb; }
            </style>
        </head>
        <body>
            <div class="header">
                <div class="logo">QUANTUM TRADE</div>
                <p>Premium Stock & Crypto Broker</p>
            </div>
            
            <div class="card">
                <h2>Create Account</h2>
                <form action="/api/register" method="POST">
                    <input type="text" name="name" placeholder="Full Name" required>
                    <input type="email" name="email" placeholder="Email" required>
                    <input type="password" name="password" placeholder="Password" required>
                    <button type="submit">Register Now</button>
                </form>
                <p style="text-align:center; margin-top:15px;">
                    <a href="/login" style="color:#60a5fa;">Login</a> | 
                    <a href="/admin/login" style="color:#f59e0b;">Admin Login</a>
                </p>
            </div>
        </body>
        </html>
    `);
});

// User Login Page
app.get('/login', (req, res) => { /* similar to before */ res.send(`...`); }); // I'll complete it below

// ================== ADMIN LOGIN ==================
app.get('/admin/login', (req, res) => {
    res.send(`
        <div style="background:#0a0e17; color:white; padding:40px; text-align:center;">
            <h1>Admin Login</h1>
            <form action="/api/admin/login" method="POST" style="max-width:400px;margin:auto;">
                <input type="email" name="email" placeholder="Admin Email" value="admin@quantumtrade.com" required><br><br>
                <input type="password" name="password" placeholder="Password" value="admin123" required><br><br>
                <button type="submit" style="padding:15px; background:#f59e0b; width:100%;">Login as Admin</button>
            </form>
        </div>
    `);
});

// Register User
app.post('/api/register', (req, res) => {
    const { name, email, password } = req.body;
    const userId = "QT" + Date.now().toString().slice(-6);

    users[userId] = {
        userId, name, email, password,
        balance: 0,
        profit: 0
    };

    res.send(`<h2>✅ Registration Successful!</h2><p>User ID: <b>${userId}</b></p><a href="/login">Login Here</a>`);
});

// User Login + Dashboard (View Only)
app.post('/api/login', (req, res) => {
    const { email, password } = req.body;
    const user = Object.values(users).find(u => u.email === email && u.password === password);

    if (!user) return res.send(`<h2>❌ Invalid Login</h2><a href="/login">Try Again</a>`);

    res.send(`
        <div style="background:#0a0e17; color:white; padding:30px; text-align:center;">
            <h1>Welcome, ${user.name}</h1>
            <div style="background:#1e2937; padding:25px; border-radius:15px; margin:20px auto; max-width:500px;">
                <h2>Balance: <span style="color:#22c55e;">\[ {user.balance.toFixed(2)}</span></h2>
                <h2>Profit: <span style="color:#22c55e;"> \]{user.profit.toFixed(2)}</span></h2>
            </div>
            <p style="color:#94a3b8;">You can only view your account.<br>Admin will fund your investment.</p>
            <a href="/">Logout</a>
        </div>
    `);
});

// Admin Login
app.post('/api/admin/login', (req, res) => {
    const { email, password } = req.body;
    if (email === admin.email && password === admin.password) {
        res.send(`
            <h2>✅ Admin Login Successful</h2>
            <p>Admin Panel Coming Soon...</p>
            <p>You can fund users here (will be added next).</p>
            <a href="/">Back to Home</a>
        `);
    } else {
        res.send(`<h2>❌ Wrong Admin Credentials</h2><a href="/admin/login">Try Again</a>`);
    }
});

app.listen(PORT, () => {
    console.log(`🚀 Quantum Trade running on port ${PORT}`);
});
