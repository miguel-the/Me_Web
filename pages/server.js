const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());

let visitors = 0;

app.get('/visit', (req, res) => {
    visitors++;

    res.json({
        count: visitors
    });
});

app.listen(process.env.PORT || 3000);