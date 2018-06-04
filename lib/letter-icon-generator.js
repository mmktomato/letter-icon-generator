const { convert } = require('convert-svg-to-png');

module.exports.generatePng = async (svg, puppeteerOpt) => {
    const opt = puppeteerOpt ? { puppeteer: puppeteerOpt } : {};
    return convert(svg, opt);
};
