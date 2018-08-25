# letter-icon-generator

**EXPERIMENTAL IMPLEMENTATION**

Generates a svg or png image. A single letter is on center of the image.

![Sample](/sample.png)

## Usage

First, run a docker container. It provides an api to generate svg and png data.

```
$ docker run -dp 1337:1337 mmktomato/letter-icon-generator:latest

# or you can build your own docker image. See below.
```

Second, implement to use the api.

| parameter  |       | default value | explanation                          |
| ---        | ---   | ---           | ---                                  |
| l          | query |               | A letter to show in generated image. |
| size       | body  | 200           | Size of image (diameter).            |
| fontFamily | body  | helvetica     | Font family of the letter.           |
| fontSize   | body  | 86pt          | Font size of the letter.             |
| background | body  | #cccccc       | Background color of the image.       |
| foreground | body  | #000000       | Color of the letter.                 |

See `src/public/demo.js` for example.

### Demo application

A demo application is available in the container.

```
$ docker run -dp 1337:1337 mmktomato/letter-icon-generator:latest

# Open `http://localhost:1337/demo.html`.
```

#### Build demo application

You can build youw own demo application. You can install any fonts as you like in your container. So you can use the fonts for generating image.

```
# Open `Dockerfile` and edit it as you like.

$ docker build -t my/letter-icon-generator .
$ docker run -dp 1337:1337 my/letter-icon-generator

# Open `http://localhost:1337/demo.html`.
```

## Development

You need Node.js (>= 8).

Develop with demo application. You can choose two ways about Chrome/Chromium.

### a. If you want to use Chrome/Chromium installed in your machine

1. Run `PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true npm install`
1. Run `cp .env.template .env`
1. Open `.env` and edit `PUPPETEER` line. Change Chrome/Chromium path to correct one.
1. Run `npm start`
1. Open `http://localhost:1337/demo.html`

### b. If you want to use Chrome/Chromium installed in node_modules

1. Run `npm install`
1. Run `cp .env.template .env`
1. Open `.env` and edit `PUPPETEER` line. Follow its comment.
1. Run `npm start`
1. Open `http://localhost:1337/demo.html`

