const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());

let visitors = 0;

app.get('/', (req, res) => {
    res.send('Visitor counter is running!');
});

app.get('/visit', (req, res) => {
    visitors++;

    console.log(`Visitor count: ${visitors}`);

    res.json({
        count: visitors
    });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});