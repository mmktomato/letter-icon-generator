document.addEventListener('DOMContentLoaded', (e) => {
    init();
});

const init = () => {
    document.querySelector('#goBtn').addEventListener('click', async (e) => {
        clear();
        const letter = document.querySelector('#letterText').value[0];
        const shapeOpt = {
            size: document.querySelector('#sizeText').value
        };

        // svg
        const svg = await fetchSvg(letter, shapeOpt);
        getSvgContainer().innerHTML = svg;

        // png
        const png = await fetchPng(letter, shapeOpt);
        const img = document.createElement('img');
        img.setAttribute('src', png);
        getPngContainer().appendChild(img);
    });
};

const getSvgContainer = () => {
    return document.querySelector('#svgContainer');
};

const getPngContainer = () => {
    return document.querySelector('#pngContainer');
};

const clear = () => {
    getSvgContainer().innerHTML = '';
    getPngContainer().innerHTML = '';
};

const createQueryString = (letter) => `?l=${letter}`;

const createBody = (shapeOpt) => JSON.stringify({ shapeOpt });

const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json'
};

const fetchSvg = async (letter, shapeOpt) => {
    try {
        const uri = '/api/svg' + createQueryString(letter);
        const res = await fetch(uri, {
            method: 'POST',
            headers,
            body: createBody(shapeOpt)
        });

        return res.text();
    }
    catch (e) {
        console.error(e);
    }
};

const fetchPng = async (letter, shapeOpt) => {
    try {
        const uri = '/api/png' + createQueryString(letter);
        const res = await fetch(uri, {
            method: 'POST',
            headers,
            body: createBody(shapeOpt)
        });

        return res.text();
    }
    catch (e) {
        console.error(e);
    }
};

