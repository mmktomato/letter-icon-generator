document.addEventListener('DOMContentLoaded', (e) => {
    init();
});

const init = () => {
    document.querySelector('#goBtn').addEventListener('click', async (e) => {
        clear();

        // svg
        const letter = document.querySelector('#letterText').value[0];
        const svg = createSvg(letter);
        getSvgContainer().innerHTML = svg;

        // png
        const png = await fetchPng(svg);
        const img = document.createElement('img');
        img.setAttribute('src', png);
        getPngContainer().appendChild(img);
    });
}

const getSvgContainer = () => {
    return document.querySelector('#svgContainer');
}

const getPngContainer = () => {
    return document.querySelector('#pngContainer');
}

const clear = () => {
    getSvgContainer().innerHTML = '';
    getPngContainer().innerHTML = '';
}

const fetchPng = async (svg) => {
    const data = { svg }
    try {
        const res = await fetch('/api/png', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        return res.text();
    }
    catch (e) {
        console.error(e);
    }
}

const createSvg = (letter) => {
    return `
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
        ${letter}
    </text>
</svg>
`;
}

