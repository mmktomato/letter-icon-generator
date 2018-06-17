# letter-icon-generator

**EXPERIMENTAL IMPLEMENTATION**

Generates a svg or png image. A single letter is on center of the image.

![Sample](/sample.png)

## Usage

You need Node.js (>= 7.6.0).

```
const { generateSvg, generatePng } = require('./lib/letter-icon-generator.js');
const shapeOpt = {
    size: 200
};
const puppeteerOpt = ...  // `see demo/.env.template` for example.
const svg = await generateSvg('m', shapeOpt);
const png = await generatePng('m', shapeOpt, puppeteerOpt);
```

## Demo application

```
$ docker run -dp 1337:1337 mmktomato/letter-icon-generator-demo:latest

# Open `http://localhost:1337`.
```

## Build demo application

You can,

* change `Dockerfile` as you like.
    * e.g. adding some fonts which is your favorite.
* build your own demo application.

```
# Open `Dockerfile` and edit it as you like.

$ docker build -t my/letter-icon-generator-demo .
$ docker run -dp 1337:1337 my/letter-icon-generator-demo

# Open `http://localhost:1337`.
```

## Development

Develop with demo application. You can choose two ways about Chrome/Chromium.

### 1. If you want to use Chrome/Chromium installed in your machine

1. Run `PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true npm install`
1. Run `cp demo/.env.template demo/.env`
1. Open `demo/.env` and edit `PUPPETEER` line. Change Chrome/Chromium path to correct one.
1. Run `npm start`
1. Open `http://localhost:1337`

### 2. If you want to use Chrome/Chromium installed in node_modules

1. Run `npm install`
1. Run `cp demo/.env.template demo/.env`
1. Open `demo/.env` and edit `PUPPETEER` line. Follow its comment.
1. Run `npm start`
1. Open `http://localhost:1337`

