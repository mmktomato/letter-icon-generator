document.addEventListener('DOMContentLoaded', (e) => {
    init();
});

const init = () => {
    document.querySelector('#goBtn').addEventListener('click', async (e) => {
        clear();
        const letter = document.querySelector('#letterText').value[0];
        const opt = {
            size: document.querySelector('#sizeText').value,
            fontSize: document.querySelector('#fontSizeText').value,
            background: document.querySelector('#backgroundText').value
        };

        // svg
        const svg = await fetchSvg(letter, opt);
        getSvgContainer().innerHTML = svg;

        // png
        const png = await fetchPng(letter, opt);
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

const createBody = (opt) => JSON.stringify({ opt });

const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json'
};

const fetchSvg = async (letter, opt) => {
    try {
        const uri = '/api/svg' + createQueryString(letter);
        const res = await fetch(uri, {
            method: 'POST',
            headers,
            body: createBody(opt)
        });

        return res.text();
    }
    catch (e) {
        console.error(e);
    }
};

const fetchPng = async (letter, opt) => {
    try {
        const uri = '/api/png' + createQueryString(letter);
        const res = await fetch(uri, {
            method: 'POST',
            headers,
            body: createBody(opt)
        });

        return res.text();
    }
    catch (e) {
        console.error(e);
    }
};

