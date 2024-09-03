const Chat = require('../models/Chat');

const saveChatMessage = async (req, res) => {
    const { email, content, response } = req.body;

    try {
        let chat = await Chat.findOne({ email });
        if (chat) {
            chat.messages.push({ content, response, timestamp: new Date() });
        } else {
            chat = new Chat({
                email,
                messages: [{ content, response, timestamp: new Date() }],
            });
        }

        await chat.save();
        res.status(200).json({ message: 'Chat message saved successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to save chat message', error });
    }
};

const getChatMessages = async (req, res) => {
    const { email } = req.query;

    try {
        const chat = await Chat.findOne({ email });

        if (!chat) {
            return res.status(404).json({ message: 'No chat found for this email' });
        }

        res.status(200).json(chat);
    } catch (error) {
        res.status(500).json({ message: 'Failed to retrieve chat messages', error });
    }
};


module.exports = { saveChatMessage, getChatMessages };
