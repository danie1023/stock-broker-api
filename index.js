const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let users = {};

// Landing Page
app.get('/', (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>StockPro</title>
            <style>
                body { font-family: 'Segoe UI', sans-serif; background: #0a1428; color: #e0f2fe; margin: 0; }
                .header { background: #0f1f3d; padding: 18px 30px; display: flex; justify-content: space-between; align-items: center; }
                .logo { font-size: 28px; font-weight: bold; color: #60a5fa; }
                .hero { background: linear-gradient(rgba(10,20,40,0.85), rgba(10,20,40,0.9)), url('https://source.unsplash.com/random/1920x1080/?wallstreet'); height: 100vh; display: flex; align-items: center; justify-content: center; text-align: center; background-size: cover; }
                h1 { font-size: 3.5rem; margin-bottom: 15px; }
                p { font-size: 1.3rem; max-width: 700px; margin: 0 auto 40px; }
                .btn { padding: 16px 45px; background: #3b82f6; color: white; border: none; border-radius: 50px; font-size: 1.2rem; cursor: pointer; }
                .btn:hover { background: #2563eb; }
            </style>
        </head>
        <body>
            <div class="header">
                <div class="logo">STOCKPRO</div>
                <div>
                    <a href="/login"><button style="background:#1e40af; padding:10px 20px; border:none; color:white; border-radius:8px;">Login</button></a>
                    <a href="/register"><button style="background:#3b82f6; padding:10px 20px; border:none; color:white; border-radius:8px;">Register</button></a>
                </div>
            </div>

            <section class="hero">
                <div>
                    <h1>Trade Stocks & Crypto</h1>
                    <p>The most advanced platform for stock market trading.</p>
                    <button class="btn" onclick="window.location.href='/register'">Open Free Account</button>
                </div>
            </section>
        </body>
        </html>
    `);
});

// Register Page
app.get('/register', (req, res) => {
    res.send(`
        <div style="background:#0a1428; color:white; min-height:100vh; padding:50px 20px; font-family:Segoe UI; text-align:center;">
            <h1 style="color:#60a5fa;">Create Your Account</h1>
            <form action="/api/register" method="POST" style="max-width:480px; margin:40px auto; background:#1e2937; padding:40px; border-radius:16px;">
                <input type="text" name="name" placeholder="Full Name" required style="width:100%; padding:15px; margin:12px 0; background:#334155; border:none; border-radius:8px; color:white;"><br>
                <input type="email" name="email" placeholder="Email Address" required style="width:100%; padding:15px; margin:12px 0; background:#334155; border:none; border-radius:8px; color:white;"><br>
                <input type="password" name="password" placeholder="Password" required style="width:100%; padding:15px; margin:12px 0; background:#334155; border:none; border-radius:8px; color:white;"><br>
                <button type="submit" style="width:100%; padding:16px; background:#3b82f6; color:white; border:none; border-radius:8px; font-size:18px;">Create Account</button>
            </form>
        </div>
    `);
});

// Login Page
app.get('/login', (req, res) => {
    res.send(`
        <div style="background:#0a1428; color:white; min-height:100vh; padding:50px 20px; font-family:Segoe UI; text-align:center;">
            <h1 style="color:#60a5fa;">Login to StockPro</h1>
            <form action="/api/login" method="POST" style="max-width:480px; margin:40px auto; background:#1e2937; padding:40px; border-radius:16px;">
                <input type="email" name="email" placeholder="Email" required style="width:100%; padding:15px; margin:12px 0; background:#334155; border:none; border-radius:8px; color:white;"><br>
                <input type="password" name="password" placeholder="Password" required style="width:100%; padding:15px; margin:12px 0; background:#334155; border:none; border-radius:8px; color:white;"><br>
                <button type="submit" style="width:100%; padding:16px; background:#3b82f6; color:white; border:none; border-radius:8px; font-size:18px;">Login</button>
            </form>
            <p><a href="/register" style="color:#60a5fa;">Don't have an account? Register</a></p>
        </div>
    `);
});

// Register API
app.post('/api/register', (req, res) => {
    const { name, email, password } = req.body;
    const userId = "SP" + Date.now().toString().slice(-6);

    users[userId] = { userId, name, email, password, balance: 0, profit: 2450.75 };

    res.send(`
        <div style="background:#0a1428; color:white; text-align:center; padding:60px; font-family:Segoe UI;">
            <h1 style="color:#22c55e;">✅ Account Created Successfully!</h1>
            <p>Your User ID: <strong>${userId}</strong></p>
            <p style="margin:20px 0;">Save your User ID and Email</p>
            <a href="/login" style="background:#3b82f6; color:white; padding:15px 30px; text-decoration:none; border-radius:8px;">Go to Login</a>
        </div>
    `);
});

// Login API
app.post('/api/login', (req, res) => {
    const { email, password } = req.body;
    const user = Object.values(users).find(u => u.email === email && u.password === password);

    if (!user) {
        return res.send(`
            <div style="background:#0a1428; color:white; text-align:center; padding:60px;">
                <h2 style="color:#ef4444;">❌ Invalid Email or Password</h2>
                <a href="/login" style="color:#60a5fa; font-size:18px;">← Try Again</a>
            </div>
        `);
    }

    // Successful Login - Dashboard
    res.send(`
        <div style="background:#0a1428; color:white; padding:40px; text-align:center; min-height:100vh; font-family:Segoe UI;">
            <h1>Welcome, ${user.name} 👋</h1>
            <div style="background:#1e2937; max-width:500px; margin:30px auto; padding:30px; border-radius:16px;">
                <h2>Balance: <span style="color:#22c55e;">\[ {user.balance.toFixed(2)}</span></h2>
                <h2>Profit: <span style="color:#22c55e;">+ \]{user.profit.toFixed(2)}</span></h2>
            </div>
            <p>Admin will fund your account soon.</p>
            <a href="/" style="color:#60a5fa;">Logout</a>
        </div>
    `);
});

app.listen(PORT, () => {
    console.log(`🚀 StockPro running`);
});
