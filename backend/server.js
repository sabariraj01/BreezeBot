const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
dotenv.config();

const userRoutes = require('./routes/userRoutes');
const chatRoutes = require('./routes/chatRoutes');
const connectDB = require('./config/db');
const { errorHandler } = require('./middleware/errorMiddleware');
const logger = require('./utils/logger');
const app = express();

app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.use(helmet());
connectDB();
app.use('/api/users', userRoutes);
app.use('/api/chats', chatRoutes); 
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => 
{
    logger.info(`Server running on port ${PORT}`);
    console.log(`Server running on port ${PORT}`);
});
