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
                .hero { background: linear-gradient(rgba(10,20,40,0.85), rgba(10,20,40,0.9)), url('https://source.unsplash.com/random/1920x1080/?stockmarket'); height: 100vh; display: flex; align-items: center; justify-content: center; text-align: center; background-size: cover; }
                h1 { font-size: 3.5rem; margin-bottom: 15px; }
                .btn { padding: 16px 45px; background: #3b82f6; color: white; border: none; border-radius: 50px; font-size: 1.2rem; cursor: pointer; }
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

// Register & Login Pages (same as before)
app.get('/register', (req, res) => { /* ... same register form */ res.send(`...`); });
app.get('/login', (req, res) => { /* ... same login form */ res.send(`...`); });

// Register API
app.post('/api/register', (req, res) => {
    const { name, email, password } = req.body;
    const userId = "SP" + Date.now().toString().slice(-6);

    users[userId] = {
        userId, name, email, password,
        balance: 0,
        profit: 2450.75,
        kycStatus: "Not Submitted",
        kycDetails: {}
    };

    res.send(`
        <div style="background:#0a1428; color:white; text-align:center; padding:60px;">
            <h1 style="color:#22c55e;">✅ Account Created!</h1>
            <p>Your User ID: <strong>${userId}</strong></p>
            <a href="/login" style="background:#3b82f6; color:white; padding:15px 30px; text-decoration:none; border-radius:8px;">Go to Login</a>
        </div>
    `);
});

// Login + Dashboard with KYC
app.post('/api/login', (req, res) => {
    const { email, password } = req.body;
    const user = Object.values(users).find(u => u.email === email && u.password === password);

    if (!user) {
        return res.send(`<h2 style="color:red; text-align:center;">❌ Invalid Email or Password</h2><a href="/login">Try Again</a>`);
    }

    const kycColor = user.kycStatus === "Verified" ? "#22c55e" : user.kycStatus === "Pending" ? "#eab308" : "#ef4444";

    res.send(`
        <div style="background:#0a1428; color:white; padding:30px; font-family:Segoe UI; min-height:100vh;">
            <h1>Welcome, ${user.name} 👋</h1>
            
            <div style="background:#1e2937; padding:25px; border-radius:16px; max-width:600px; margin:20px auto;">
                <h2>Balance: <span style="color:#22c55e;">\[ {user.balance.toFixed(2)}</span></h2>
                <h2>Profit: <span style="color:#22c55e;">+ \]{user.profit.toFixed(2)}</span></h2>
            </div>

            <div style="background:#1e2937; padding:25px; border-radius:16px; max-width:600px; margin:20px auto;">
                <h2>KYC Verification</h2>
                <p>Status: <strong style="color:\( {kycColor};"> \){user.kycStatus}</strong></p>
                ${user.kycStatus === "Not Submitted" ? `
                <form action="/api/submit-kyc" method="POST" style="margin-top:15px;">
                    <input type="hidden" name="userId" value="${user.userId}">
                    <input type="text" name="idNumber" placeholder="ID Number (e.g. NIN, Passport)" required style="width:100%; padding:12px; margin:8px 0; background:#334155; border:none; border-radius:8px; color:white;"><br>
                    <button type="submit" style="background:#3b82f6; color:white; padding:14px; width:100%; border:none; border-radius:8px;">Submit KYC</button>
                </form>` : ''}
            </div>

            <a href="/" style="display:block; text-align:center; color:#60a5fa; margin-top:30px;">Logout</a>
        </div>
    `);
});

// Submit KYC
app.post('/api/submit-kyc', (req, res) => {
    const { userId, idNumber } = req.body;
    if (users[userId]) {
        users[userId].kycStatus = "Pending";
        users[userId].kycDetails = { idNumber, submittedAt: new Date().toISOString() };
    }
    res.send(`
        <h2 style="color:#eab308; text-align:center;">✅ KYC Submitted Successfully!</h2>
        <p>Your KYC is under review. Status: <strong>Pending</strong></p>
        <a href="/login">Back to Dashboard</a>
    `);
});

app.listen(PORT, () => {
    console.log(`🚀 StockPro running`);
});
