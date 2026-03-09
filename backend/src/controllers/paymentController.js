const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const { ethers } = require('ethers');
const chainSplitABI = require('../abis/ChainSplit.json');

// Connect to the ChainSplit Contract
const provider = new ethers.JsonRpcProvider(process.env.SEPOLIA_RPC_URL);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
const contract = new ethers.Contract(
    process.env.CHAINSPLIT_CONTRACT_ADDRESS, 
    chainSplitABI.abi, 
    wallet
);

// 1. Create Deal & Lock Funds (The "Entry" point)
exports.processIncomingDeal = async (req, res) => {
    try {
        const { amount, creatorAddress, platformAddress, dealId, deadline, platformShare, creatorShare } = req.body;

        // Validation: Must total 99% because the contract adds your 1% fee automatically
        if (Number(platformShare) + Number(creatorShare) !== 9900) {
            return res.status(400).json({ error: "Shares must total 99% (9900 BPS)" });
        }

        // Create Stripe Intent for Fiat payment tracking
        const paymentIntent = await stripe.paymentIntents.create({
            amount: Math.round(amount * 100),
            currency: 'usd',
            metadata: { dealId }
        });

        // Trigger Blockchain Escrow
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

        res.json({ success: true, txHash: tx.hash, clientSecret: paymentIntent.client_secret });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// 2. Owner-Controlled Approval (The "Release" point)
exports.approveDeal = async (req, res) => {
    try {
        // Updated to match your contract: approve(uint256 _id, bool _approvePlatform, bool _approveCreator)
        const { dealId, approvePlatform, approveCreator } = req.body;

        console.log(`Setting approvals for Deal #${dealId}: Platform(${approvePlatform}), Creator(${approveCreator})`);

        // Trigger the 'approve' function in the contract
        const tx = await contract.approve(dealId, approvePlatform, approveCreator);
        await tx.wait();

        res.json({ 
            success: true, 
            message: "Approval status updated on blockchain",
            txHash: tx.hash 
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};