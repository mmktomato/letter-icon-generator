document.addEventListener('DOMContentLoaded', (e) => {
    init();
});

const init = () => {
    document.querySelector('#goBtn').addEventListener('click', async (e) => {
        clear();
        const letter = document.querySelector('#letterText').value[0];

        // svg
        const svg = await fetchSvg(letter);
        getSvgContainer().innerHTML = svg;

        // png
        const png = await fetchPng(letter);
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

const fetchSvg = async (letter) => {
    try {
        const uri = '/api/svg' + createQueryString(letter);
        const res = await fetch(uri);

        return res.text();
    }
    catch (e) {
        console.error(e);
    }
};

const fetchPng = async (letter) => {
    try {
        const uri = '/api/png' + createQueryString(letter);
        const res = await fetch(uri);

        return res.text();
    }
    catch (e) {
        console.error(e);
    }
};

