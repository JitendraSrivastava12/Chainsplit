require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db'); 
const paymentController = require('./controllers/paymentController');
const automation = require('./services/automation');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// 1. Connect to the NEW ChainSplit Database
connectDB(); 

// 2. Start the daily automation relayer
automation.startDailyScanner();

// --- API Endpoints ---

// Health Check
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'active', timestamp: new Date() });
});

// Create & Approve Deals
app.post('/api/payments/create', paymentController.processIncomingDeal);
app.post('/api/payments/approve', paymentController.approveDeal);

// NEW: User Dashboard (Active Money & Contracts)
// This is what the frontend calls after MetaMask signs in
app.get('/api/payments/dashboard/:address', paymentController.getUserDashboard);

// --- Error Handling ---

app.use((req, res) => res.status(404).json({ error: "Route not found" }));

app.use((err, req, res, next) => {
    console.error("🔥 Server Error:", err.stack);
    res.status(500).json({ error: "Internal Server Error", message: err.message });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`-----------------------------------------------`);
    console.log(`🚀 ChainSplit Protocol Online at Port ${PORT}`);
    console.log(`📍 Dashboard: /api/payments/dashboard/:address`);
    console.log(`-----------------------------------------------`);
});