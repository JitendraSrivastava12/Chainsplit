const cron = require('node-cron');
const { ethers } = require('ethers');
const Deal = require('../models/Deal'); // Import your Mongoose model
const chainSplitABI = require('../abis/ChainSplit.json');

// Contract setup
const provider = new ethers.JsonRpcProvider(process.env.SEPOLIA_RPC_URL);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
const contract = new ethers.Contract(
    process.env.CHAINSPLIT_CONTRACT_ADDRESS, 
    chainSplitABI.abi, 
    wallet
);

const startDailyScanner = () => {
    // Runs once every day at 00:00 (Midnight)
    cron.schedule('0 0 * * *', async () => {
        console.log('🤖 Daily Relayer: Scanning MongoDB for active deals due for release...');
        
        try {
            // 1. Only fetch deals from MongoDB that are still marked as 'active'
            // This is much faster than looping through the blockchain
            const activeDeals = await Deal.find({ status: 'active' });

            if (activeDeals.length === 0) {
                console.log('✅ No active deals to process.');
                return;
            }

            for (const dealData of activeDeals) {
                const i = dealData.dealId;
                
                // 2. Double-check on-chain if the deal is actually ready
                const isReady = await contract.canRelease(i);
                
                if (isReady) {
                    console.log(`🚀 Conditions met for Deal #${i}. Executing auto-release...`);
                    
                    // 3. Backend pays gas to push ETH to users and apply 5% penalty if needed
                    const tx = await contract.autoRelease(i);
                    await tx.wait();

                    // 4. Update the database: Mark as settled or delete it
                    // We mark it 'settled' so it no longer shows up in "Active Money" stats
                    await Deal.findOneAndUpdate({ dealId: i }, { status: 'settled' });
                    
                    console.log(`✅ Deal #${i} settled on-chain and updated in DB. Hash: ${tx.hash}`);
                }
            }
            console.log('🏁 Daily scan completed successfully.');
        } catch (error) {
            console.error('❌ Automation Error:', error.message);
        }
    });
};

module.exports = { startDailyScanner };