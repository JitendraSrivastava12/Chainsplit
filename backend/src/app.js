require('dotenv').config();
const express = require('express');
const cors = require('cors');
const paymentController = require('./controllers/paymentController');
const automation = require('./services/automation'); // Import the cron service

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Start the daily scanner
automation.startDailyScanner();

// API Endpoints
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'active', timestamp: new Date() });
});
app.post('/api/payments/create', paymentController.processIncomingDeal);
app.post('/api/payments/approve', paymentController.approveDeal);

// Error Handling
app.use((req, res) => res.status(404).json({ error: "Route not found" }));
app.use((err, req, res, next) => {
    console.error("🔥 Server Error:", err.stack);
    res.status(500).json({ error: "Internal Server Error", message: err.message });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 ChainSplit Protocol Online at Port ${PORT}`);
});