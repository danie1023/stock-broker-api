const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let users = {};

// ====================== LANDING PAGE ======================
app.get('/', (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>StockPro - Trade Stocks & Crypto</title>
            <style>
                * { margin:0; padding:0; box-sizing:border-box; }
                body { font-family: 'Segoe UI', Arial, sans-serif; background: #0a1428; color: #e0f2fe; }
                .header { background: #0f1f3d; padding: 18px 40px; display: flex; justify-content: space-between; align-items: center; }
                .logo { font-size: 28px; font-weight: bold; color: #3b82f6; }
                .nav button { padding: 10px 24px; margin-left: 10px; border: none; border-radius: 8px; font-weight: bold; cursor: pointer; }
                .hero { background: linear-gradient(rgba(10,20,40,0.9), rgba(10,20,40,0.95)), url('https://source.unsplash.com/random/1920x1080/?stockmarket'); background-size: cover; height: 100vh; display: flex; align-items: center; justify-content: center; text-align: center; }
                .hero-content { max-width: 800px; }
                .hero h1 { font-size: 3.8rem; margin-bottom: 20px; }
                .hero p { font-size: 1.3rem; margin-bottom: 40px; opacity: 0.9; }
                .btn { padding: 16px 50px; font-size: 1.2rem; background: #3b82f6; color: white; border: none; border-radius: 50px; cursor: pointer; }
                .btn:hover { background: #2563eb; }
            </style>
        </head>
        <body>
            <div class="header">
                <div class="logo">STOCKPRO</div>
                <div>
                    <a href="/login"><button class="nav" style="background:#1e3a8a;">Login</button></a>
                    <a href="/register"><button class="nav" style="background:#3b82f6;">Register</button></a>
                </div>
            </div>

            <section class="hero">
                <div class="hero-content">
                    <h1>Trade Stocks & Crypto</h1>
                    <p>The most advanced platform for stock market trading.<br>Real-time data, powerful tools, and secure investments.</p>
                    <button class="btn" onclick="window.location.href='/register'">Open Free Account</button>
                </div>
            </section>
        </body>
        </html>
    `);
});

// ====================== REGISTER ======================
app.get('/register', (req, res) => {
    res.send(`
        <div style="background:#0a1428; color:white; min-height:100vh; padding:40px; font-family:Segoe UI;">
            <h1 style="text-align:center; color:#3b82f6;">Create Account</h1>
            <form action="/api/register" method="POST" style="max-width:500px; margin:40px auto; background:#1e2937; padding:40px; border-radius:16px;">
                <input type="text" name="name" placeholder="Full Name" required style="width:100%; padding:15px; margin:10px 0; background:#334155; border:none; border-radius:8px; color:white;"><br>
                <input type="email" name="email" placeholder="Email Address" required style="width:100%; padding:15px; margin:10px 0; background:#334155; border:none; border-radius:8px; color:white;"><br>
                <input type="password" name="password" placeholder="Password" required style="width:100%; padding:15px; margin:10px 0; background:#334155; border:none; border-radius:8px; color:white;"><br>
                <button type="submit" style="width:100%; padding:16px; background:#3b82f6; color:white; border:none; border-radius:8px; font-size:18px; margin-top:20px;">Create Account</button>
            </form>
            <p style="text-align:center;"><a href="/login" style="color:#60a5fa;">Already have account? Login</a></p>
        </div>
    `);
});

// ====================== LOGIN ======================
app.get('/login', (req, res) => {
    res.send(`
        <div style="background:#0a1428; color:white; min-height:100vh; padding:40px; font-family:Segoe UI;">
            <h1 style="text-align:center; color:#3b82f6;">Login</h1>
            <form action="/api/login" method="POST" style="max-width:500px; margin:40px auto; background:#1e2937; padding:40px; border-radius:16px;">
                <input type="email" name="email" placeholder="Email" required style="width:100%; padding:15px; margin:10px 0; background:#334155; border:none; border-radius:8px; color:white;"><br>
                <input type="password" name="password" placeholder="Password" required style="width:100%; padding:15px; margin:10px 0; background:#334155; border:none; border-radius:8px; color:white;"><br>
                <button type="submit" style="width:100%; padding:16px; background:#3b82f6; color:white; border:none; border-radius:8px; font-size:18px; margin-top:20px;">Login</button>
            </form>
            <p style="text-align:center;"><a href="/register" style="color:#60a5fa;">Don't have account? Register</a></p>
        </div>
    `);
});

// API Routes
app.post('/api/register', (req, res) => {
    const { name, email, password } = req.body;
    const userId = "SP" + Date.now().toString().slice(-6);

    users[userId] = {
        userId, name, email, password,
        balance: 0,
        profit: 0
    };

    res.send(`
        <h2 style="text-align:center; color:#22c55e;">✅ Account Created Successfully!</h2>
        <p style="text-align:center;">Your User ID: <strong>${userId}</strong></p>
        <p style="text-align:center;"><a href="/login">Go to Login →</a></p>
    `);
});

app.post('/api/login', (req, res) => {
    const { email, password } = req.body;
    const user = Object.values(users).find(u => u.email === email && u.password === password);

    if (!user) {
        return res.send(`<h2 style="color:red; text-align:center;">❌ Invalid Email or Password</h2><a href="/login">Try Again</a>`);
    }

    res.send(`
        <div style="background:#0a1428; color:white; padding:40px; text-align:center; min-height:100vh;">
            <h1>Welcome back, ${user.name}!</h1>
            <div style="background:#1e2937; padding:30px; border-radius:16px; max-width:500px; margin:30px auto;">
                <h2>Balance: <span style="color:#22c55e;">\[ {user.balance}</span></h2>
                <h2>Profit: <span style="color:#22c55e;"> \]{user.profit}</span></h2>
            </div>
            <p>More features coming soon...</p>
            <a href="/">Logout</a>
        </div>
    `);
});

app.listen(PORT, () => {
    console.log(`🚀 StockPro running on port ${PORT}`);
});
