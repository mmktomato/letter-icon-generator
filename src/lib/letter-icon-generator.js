const { convert } = require('convert-svg-to-png');

const svgTemplate = `
<svg width="%SIZE%" height="%SIZE%" viewBox="0 0 %SIZE% %SIZE%" xmlns="http://www.w3.org/2000/svg">
    <circle cx="%RADIUS%" cy="%RADIUS%" r="%RADIUS%" fill="%BACKGROUND%"/>
    <text x="50%"
        y="50%"
        text-anchor="middle"
        dominant-baseline="middle"
        fill="%FOREGROUND%"
        style="font-family: '%FONT_FAMILY%'; font-size: %FONT_SIZE%"
    >
        %LETTER%
    </text>
</svg>
`;

const generateSvgSync = (letter, opt = {}) => svgTemplate
    .replace(/%LETTER%/g, letter)
    .replace(/%SIZE%/g, opt.size || 200)
    .replace(/%RADIUS%/g, opt.size ? opt.size / 2 : 100)
    .replace(/%FONT_FAMILY%/g, opt.fontFamily || 'helvetica')
    .replace(/%FONT_SIZE%/g, opt.fontSize || '86pt')
    .replace(/%BACKGROUND%/g, opt.background || '#cccccc')
    .replace(/%FOREGROUND%/g, opt.foreground || '#000000');

module.exports.generateSvg = async (letter, opt) => generateSvgSync(letter, opt);

module.exports.generatePng = async (letter, opt, puppeteerOpt = {}) => {
    const svg = generateSvgSync(letter, opt);
    const convertOpt = { puppeteer: puppeteerOpt };
    return convert(svg, convertOpt);
};

