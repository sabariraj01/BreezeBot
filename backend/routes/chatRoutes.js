const express = require('express');
const { saveChatMessage, getChatMessages } = require('../controllers/chatController');

const router = express.Router();
const apiKeyMiddleware = require('../middleware/apiKeyMiddleware');
router.use(apiKeyMiddleware); 
// Save chat message and response
router.post('/save', saveChatMessage);

// Get chat messages by email
router.get('/', getChatMessages); // Adjusted to handle GET request with query parameters

module.exports = router;
