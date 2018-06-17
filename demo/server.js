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

app.post('/api/svg', async (req, res, next) => {
    const params = parseRequestParams(req);
    const svg = await generateSvg(params.letter, params.shapeOpt);

    res.header({
        'content-type': 'text/plain'
    });
    res.send(svg);
});

app.post('/api/png', async (req, res, next) => {
    const params = parseRequestParams(req);
    const png = await generatePng(params.letter, params.shapeOpt, puppeteerOpt);
    const b64 = 'data:/image/png;base64,' + png.toString('base64');

    res.header({
        'content-type': 'text/plain'
    });
    res.send(b64);
});

const parseRequestParams = (req) => ({
    letter: req.query.l,
    shapeOpt: req.body.shapeOpt
});

app.listen(port, () => {
    console.log(`listening to port ${port}...`);
});

