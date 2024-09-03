const express = require('express');
const { saveChatMessage, getChatMessages } = require('../controllers/chatController');

const router = express.Router();
const apiKeyMiddleware = require('../middleware/apiKeyMiddleware');
router.use(apiKeyMiddleware); 
router.post('/save', saveChatMessage);
router.get('/', getChatMessages); 

module.exports = router;
