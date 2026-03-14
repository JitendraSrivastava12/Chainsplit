const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        // Points to your new ChainSplit_Core database
        const conn = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`🍃 ChainSplit DB Connected: ${conn.connection.name}`);
    } catch (err) {
        console.error(`❌ MongoDB Connection Error: ${err.message}`);
        process.exit(1);
    }
};

module.exports = connectDB;