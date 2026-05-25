<!DOCTYPE html>
<html lang="en" class="dark">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>PrimeTrade • Stock Broker</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/css/all.min.css">
  <style>
    .hero-bg { background: linear-gradient(135deg, #0f172a 0%, #1e2937 100%); }
    .ticker { animation: ticker 30s linear infinite; }
  </style>
</head>
<body class="bg-slate-950 text-white">
  <!-- Navbar -->
  <nav class="bg-black border-b border-slate-800 sticky top-0 z-50">
    <div class="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
      <div class="flex items-center gap-8">
        <h1 class="text-2xl font-bold text-emerald-500">PrimeTrade</h1>
        <div class="flex gap-6 text-sm">
          <a href="#" class="hover:text-emerald-400">Markets</a>
          <a href="#" class="hover:text-emerald-400">Portfolio</a>
          <a href="#" class="hover:text-emerald-400">Trade</a>
          <a href="#" class="hover:text-emerald-400">Learn</a>
        </div>
      </div>
      <div class="flex items-center gap-4">
        <div class="text-xs bg-slate-900 px-3 py-1.5 rounded-full border border-slate-700">
          <span class="text-emerald-400">●</span> Market Open
        </div>
        <button onclick="login()" class="bg-white text-black px-5 py-2 rounded-full font-medium hover:bg-slate-200">
          Sign In
        </button>
        <button onclick="signup()" class="bg-emerald-500 px-5 py-2 rounded-full font-medium hover:bg-emerald-600">
          Open Account
        </button>
      </div>
    </div>
  </nav>

  <!-- Hero -->
  <div class="hero-bg py-24">
    <div class="max-w-7xl mx-auto px-6 text-center">
      <h2 class="text-6xl font-bold mb-6">Trade Smarter.<br>Invest Better.</h2>
      <p class="text-xl text-slate-400 mb-10">Commission-free trading • Real-time data • Advanced tools</p>
      <button onclick="signup()" class="bg-emerald-500 text-lg px-10 py-4 rounded-2xl font-semibold hover:bg-emerald-600 transition">
        Start Trading Free →
      </button>
    </div>
  </div>

  <!-- Live Market Ticker -->
  <div class="bg-slate-900 border-b border-slate-800 py-3 overflow-hidden">
    <div id="ticker" class="ticker whitespace-nowrap flex gap-8 text-sm"></div>
  </div>

  <!-- Main Content -->
  <div class="max-w-7xl mx-auto px-6 py-12">
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
      <!-- Portfolio -->
      <div class="lg:col-span-5 bg-slate-900 rounded-3xl p-8">
        <h3 class="text-xl font-semibold mb-6 flex items-center gap-2">
          <i class="fas fa-wallet"></i> Your Portfolio
        </h3>
        <div class="space-y-6" id="portfolio">
          <!-- JS will fill this -->
        </div>
      </div>

      <!-- Trading Panel -->
      <div class="lg:col-span-7 bg-slate-900 rounded-3xl p-8">
        <h3 class="text-xl font-semibold mb-6">Quick Trade</h3>
        <div class="grid grid-cols-2 gap-6">
          <input id="symbol" type="text" placeholder="AAPL" class="bg-slate-800 border border-slate-700 rounded-2xl px-6 py-4 text-lg focus:outline-none focus:border-emerald-500">
          <input id="quantity" type="number" placeholder="Shares" class="bg-slate-800 border border-slate-700 rounded-2xl px-6 py-4 text-lg">
        </div>
        <button onclick="placeTrade()" class="mt-6 w-full bg-emerald-500 hover:bg-emerald-600 py-5 rounded-2xl text-lg font-semibold">
          Buy Now
        </button>
      </div>
    </div>
  </div>

  <script>
    // Fake live ticker
    const stocks = ["AAPL +1.24%", "TSLA -0.87%", "NVDA +3.45%", "MSFT +0.67%", "AMZN -1.12%", "GOOGL +2.10%"];
    const ticker = document.getElementById('ticker');
    ticker.innerHTML = stocks.map(s => `<span class="inline-block px-6">${s}</span>`).join('');

    // Fake portfolio
    document.getElementById('portfolio').innerHTML = `
      <div class="flex justify-between items-center">
        <div>
          <p class="text-slate-400">Total Value</p>
          <p class="text-4xl font-bold">$28,459.32</p>
        </div>
        <div class="text-right">
          <p class="text-emerald-400">+$1,284.50</p>
          <p class="text-emerald-400 text-sm">(+4.72%)</p>
        </div>
      </div>
    `;

    function placeTrade() {
      const symbol = document.getElementById('symbol').value.toUpperCase() || "AAPL";
      alert(`✅ Order placed: Buy ${document.getElementById('quantity').value || 10} shares of ${symbol}`);
    }

    function login() { alert("Login modal would open here (connect your backend)"); }
    function signup() { alert("Account creation flow - very important for legitimacy"); }
  </script>
</body>
</html>
