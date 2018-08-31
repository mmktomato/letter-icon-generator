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

Second, call the api to generate image.

```
const uri = 'http://localhost:1337/api/svg?l=m';
const res = await fetch(uri, {
    method: 'POST',
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        size: 200,
        fontFamily: 'helvetica',
        fontSize: '86pt',
        background: '#cccccc',
        foreground: '#000000'
    })
});
console.log(await res.text());
```

### Endpoint

| method | endpoint | result                    |
| ---    | ---      | ---                       |
| POST   | /api/svg | svg data                  |
| POST   | /api/png | png data (Base64 encoded) |

### Parameters

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

You can build your own demo application. You can install any fonts as you like in your container. This means you can use them to generate images.

```
# Open `Dockerfile` and edit it as you like.

$ docker build -t my/letter-icon-generator .
$ docker run -dp 1337:1337 my/letter-icon-generator:latest

# Open `http://localhost:1337/demo.html`.
```

### Note

Generating PNG images may take a lot of time fot the first time.

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

