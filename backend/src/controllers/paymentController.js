const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const { ethers } = require('ethers');
const chainSplitABI = require('../abis/Chainsplit.json');
const Deal = require('../models/Deal'); // Import the Deal Schema

// Connect to the ChainSplit Contract
const provider = new ethers.JsonRpcProvider(process.env.SEPOLIA_RPC_URL);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
const contract = new ethers.Contract(
    process.env.CHAINSPLIT_CONTRACT_ADDRESS, 
    chainSplitABI.abi, 
    wallet
);

// 1. Create Deal, Save to MongoDB & Lock Funds
exports.processIncomingDeal = async (req, res) => {
    try {
        const { amount, creatorAddress, platformAddress, dealId, deadline, platformShare, creatorShare } = req.body;

        // UPDATED: Validation for 2% protocol fee (9800 BPS)
        if (Number(platformShare) + Number(creatorShare) !== 9800) {
            return res.status(400).json({ error: "Shares must total 98% (9800 BPS)" });
        }

        // STEP A: Save to MongoDB (Active Money Tracking)
        const newDeal = new Deal({
            dealId,
            creatorAddress: creatorAddress.toLowerCase(),
            platformAddress: platformAddress.toLowerCase(),
            amount: Number(amount),
            creatorShare,
            platformShare,
            deadline,
            status: 'active'
        });
        await newDeal.save();

        // STEP B: Create Stripe Intent
        const paymentIntent = await stripe.paymentIntents.create({
            amount: Math.round(amount * 100),
            currency: 'usd',
            metadata: { dealId }
        });

        // STEP C: Trigger Blockchain Escrow
        const tx = await contract.depositCustom(
            dealId, 
            creatorAddress, 
            platformAddress, 
            deadline, 
            platformShare, 
            creatorShare,
            { value: ethers.parseEther(amount.toString()) }
        );
        await tx.wait();

        res.json({ 
            success: true, 
            txHash: tx.hash, 
            clientSecret: paymentIntent.client_secret,
            message: "Deal synchronized with DB and Blockchain"
        });

    } catch (error) {
        // Fallback: If blockchain fails after DB save, remove from DB to keep sync
        await Deal.deleteOne({ dealId: req.body.dealId });
        res.status(500).json({ error: error.message });
    }
};
// 3. NEW: Fetch User Stats & Active Money
exports.getUserDashboard = async (req, res) => {
    try {
        const address = req.params.address.toLowerCase();

        // Find all 'active' deals involving this wallet
        const activeDeals = await Deal.find({
            status: 'active',
            $or: [{ creatorAddress: address }, { platformAddress: address }]
        });

        let totalLockedForUser = 0;

        // Calculate specific user earnings for each deal
        const dealsWithShares = activeDeals.map(deal => {
            let userShareBps = 0;
            
            // Logic: Is this person the creator or the platform?
            if (address === deal.creatorAddress) {
                userShareBps = deal.creatorShare;
            } else {
                userShareBps = deal.platformShare;
            }

            // Calculation: (Total ETH * User Share BPS) / 10000
            const myMoney = (deal.amount * userShareBps) / 10000;
            totalLockedForUser += myMoney;

            return {
                dealId: deal.dealId,
                totalAmount: deal.amount,
                myShareETH: myMoney.toFixed(4),
                deadline: deal.deadline,
                role: address === deal.creatorAddress ? 'Creator' : 'Platform'
            };
        });

        res.json({
            success: true,
            address,
            totalActiveMoneyETH: totalLockedForUser.toFixed(4),
            activeDealsCount: activeDeals.length,
            deals: dealsWithShares
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// 2. Owner-Controlled Approval & Automatic Removal
exports.approveDeal = async (req, res) => {
    try {
        const { dealId, approvePlatform, approveCreator } = req.body;

        // A. Update Approval Flags on Contract
        const tx = await contract.approve(dealId, approvePlatform, approveCreator);
        await tx.wait();

        // B. Check if we should release funds
        // If you passed 'true' for both in the request, or check the contract state
        if (approvePlatform && approveCreator) {
            console.log(`🚀 Mutual Approval reached for #${dealId}. Releasing...`);
            
            const releaseTx = await contract.autoRelease(dealId);
            await releaseTx.wait();

            // C. Update MongoDB Status to 'settled'
            // This removes it from the user's "Active Money" calculation
            await Deal.findOneAndUpdate({ dealId }, { status: 'settled' });

            return res.json({ 
                success: true, 
                message: "Funds released and DB status updated to settled.",
                txHash: releaseTx.hash 
            });
        }

        res.json({ 
            success: true, 
            message: "Approval status updated. Waiting for mutual agreement.",
            txHash: tx.hash 
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};