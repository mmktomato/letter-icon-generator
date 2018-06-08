const { convert } = require('convert-svg-to-png');

const svgTemplate = `
<svg width="100px" height="100px" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
    <circle cx="100" cy="100" r="100" fill="#ccc"/>
    <text x="50%"
        y="50%"
        text-anchor="middle"
        dominant-baseline="middle"
        stroke="#333"
        stroke-width="1px"
        style="font-family: NotoSansCJKjp; font-size: 86px"
    >
        %LETTER%
    </text>
</svg>
`;

const generateSvgSync = (letter) => svgTemplate.replace('%LETTER%', letter);

module.exports.generateSvg = async (letter) => generateSvgSync(letter);

module.exports.generatePng = async (letter, puppeteerOpt) => {
    const svg = generateSvgSync(letter);
    const opt = puppeteerOpt ? { puppeteer: puppeteerOpt } : {};
    return convert(svg, opt);
};

