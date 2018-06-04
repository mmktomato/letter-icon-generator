# letter-icon-generator

**EXPERIMENTAL IMPLEMENTATION**

Generates a svg or png image. A single letter is on center of the image.

![Sample](/sample.png)

## Prerequisite

* Node.js (>= 7.6.0)

## Demo application

```
$ docker build -t my/letterIconGenerator .
$ docker run --rm -p 1337:1337 my/letterIconGenerator
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

