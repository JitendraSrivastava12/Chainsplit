const mongoose = require('mongoose');

const DealSchema = new mongoose.Schema({
    dealId: { type: Number, required: true, unique: true },
    creatorAddress: { type: String, lowercase: true, index: true },
    platformAddress: { type: String, lowercase: true, index: true },
    amount: Number, // Total ETH
    creatorShare: Number, // BPS
    platformShare: Number, // BPS
    deadline: Number,
    status: { type: String, default: 'active' }
}, { timestamps: true });

module.exports = mongoose.model('Deal', DealSchema);