const { convert } = require('convert-svg-to-png');

const opt = {
    puppeteer: {
        executablePath: '/usr/bin/chromium',
        //args: ['--no-sandbox']
    }
};
module.exports.generatePng = async (svg) => convert(svg, opt);
