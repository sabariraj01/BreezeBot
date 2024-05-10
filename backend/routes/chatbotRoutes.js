const express = require('express');
const router = express.Router();
const { exec } = require('child_process');

router.post('/chatbot_response', (req, res) => {
    const message = req.body.message;

    exec('python3 bot_resp.py', (error, stdout, stderr) => {
        if (error) {
            console.error(`exec error: ${error}`);
            return res.status(500).json({ error: 'An error occurred' });
        }
        console.log(`stdout: ${stdout}`);
        console.error(`stderr: ${stderr}`);

        res.json({ response: stdout });
    });
});

module.exports = router;
