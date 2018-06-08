require('dotenv').config({ path: './demo/.env' });

const express = require('express');
const bodyParser = require('body-parser');
const { generateSvg, generatePng } = require('../lib/letter-icon-generator.js');

const port = process.env.PORT || 8888;
const puppeteerOpt = process.env.PUPPETEER && JSON.parse(process.env.PUPPETEER);
const app = express();

app.use(express.static('./demo/public'));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.get('/api/svg', async (req, res, next) => {
    const query = parseQueryString(req.query);
    const svg = await generateSvg(query.letter, puppeteerOpt);

    res.header({
        'content-type': 'text/plain'
    });
    res.send(svg);
});

app.get('/api/png', async (req, res, next) => {
    const query = parseQueryString(req.query);
    const png = await generatePng(query.letter, puppeteerOpt);
    const b64 = 'data:/image/png;base64,' + png.toString('base64');

    res.header({
        'content-type': 'text/plain'
    });
    res.send(b64);
});

const parseQueryString = (query) => ({
    letter: query.l
});

app.listen(port, () => {
    console.log(`listening to port ${port}...`);
});

