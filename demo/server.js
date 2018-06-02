const express = require('express');
const bodyParser = require('body-parser');
const { generatePng } = require('../lib/letter-icon-generator.js');

const port = 1337;
const app = express();

app.use(express.static('./demo/public'));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.post('/api/png', async (req, res, next) => {
    const svg = req.body.svg;
    const png = await generatePng(svg);
    const b64 = 'data:/image/png;base64,' + png.toString('base64');

    res.header({
        'content-type': 'text/plain'
    });
    res.send(b64);
});

app.listen(port, () => {
    console.log(`listening to port ${port}...`);
});

