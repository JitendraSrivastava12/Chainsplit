const cron = require('node-cron');
const { ethers } = require('ethers');
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
        console.log('🤖 Daily Relayer: Scanning blockchain for expired escrows...');
        
        try {
            // Get the current highest ID from the contract
            const total = await contract.totalEscrows();
            
            for (let i = 1; i <= total; i++) {
                // Check if the deal is eligible for release (Approved or Deadline passed)
                const isReady = await contract.canRelease(i);
                
                if (isReady) {
                    console.log(`🚀 Automatically settling Deal #${i}...`);
                    
                    // Backend pays gas to push ETH to the users
                    // This will also apply the 5% penalty if the platform didn't approve
                    const tx = await contract.autoRelease(i);
                    await tx.wait();
                    
                    console.log(`✅ Deal #${i} pushed to wallets. Hash: ${tx.hash}`);
                }
            }
            console.log('🏁 Daily scan completed successfully.');
        } catch (error) {
            console.error('❌ Automation Error:', error.message);
        }
    });
};

module.exports = { startDailyScanner };