const { convert } = require('convert-svg-to-png');

const svgTemplate = `
<svg width="%SIZE%" height="%SIZE%" viewBox="0 0 %SIZE% %SIZE%" xmlns="http://www.w3.org/2000/svg">
    <circle cx="%RADIUS%" cy="%RADIUS%" r="%RADIUS%" fill="#ccc"/>
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

const generateSvgSync = (letter, shapeOpt = {}) => svgTemplate
    .replace(/%LETTER%/g, letter)
    .replace(/%SIZE%/g, shapeOpt.size || 200)
    .replace(/%RADIUS%/g, shapeOpt.size ? shapeOpt.size / 2 : 100);

module.exports.generateSvg = async (letter, shapeOpt) => generateSvgSync(letter, shapeOpt);

module.exports.generatePng = async (letter, shapeOpt, puppeteerOpt = {}) => {
    const svg = generateSvgSync(letter, shapeOpt);
    const opt = { puppeteer: puppeteerOpt };
    return convert(svg, opt);
};

