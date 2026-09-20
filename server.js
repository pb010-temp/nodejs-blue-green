const express = require('express');

const app = express();
const PORT = 3000;
const VERSION = process.env.VERSION || 'Blue';

app.get('/status', (req, res) => {
    res.json({
        status: 'API is running',
        version: VERSION
    });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});