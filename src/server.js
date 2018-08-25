require('dotenv').config({ path: './.env' });

const express = require('express');
const bodyParser = require('body-parser');
const { generateSvg, generatePng } = require('./lib/letter-icon-generator.js');

const port = process.env.PORT || 1337;
const puppeteerOpt = process.env.PUPPETEER && JSON.parse(process.env.PUPPETEER);
const app = express();

app.use(express.static('./src/public'));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.post('/api/svg', async (req, res, next) => {
    const { letter, opt } = parseRequestParams(req);
    const svg = await generateSvg(letter, opt);

    res.header({
        'content-type': 'text/plain'
    });
    res.send(svg);
});

app.post('/api/png', async (req, res, next) => {
    const { letter, opt } = parseRequestParams(req);
    const png = await generatePng(letter, opt, puppeteerOpt);
    const b64 = 'data:/image/png;base64,' + png.toString('base64');

    res.header({
        'content-type': 'text/plain'
    });
    res.send(b64);
});

const parseRequestParams = (req) => ({
    letter: req.query.l,
    opt: req.body.opt
});

app.listen(port, () => {
    console.log(`listening to port ${port}...`);
});

