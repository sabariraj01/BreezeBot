const mongoose = require('mongoose');
const logger = require('../utils/logger');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {});
        console.log("MongoDB connected")
        logger.info('MongoDB connected');
    } catch (error) {
        logger.error('MongoDB connection failed:', error);
        process.exit(1);
    }
};

module.exports = connectDB;
