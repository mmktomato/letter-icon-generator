# This Dockerfile builds demo app container.

FROM node:10.3.0-alpine

ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD true

RUN mkdir /demoapp
COPY . /demoapp
WORKDIR /demoapp

RUN apk update \
    # Install Chromium (>= 64) which supports Alpine Linux.
    # See. https://github.com/GoogleChrome/puppeteer/blob/master/docs/troubleshooting.md
    && echo @edge http://nl.alpinelinux.org/alpine/edge/community >> /etc/apk/repositories \
    && echo @edge http://nl.alpinelinux.org/alpine/edge/main >> /etc/apk/repositories \
    && apk add --no-cache nss@edge chromium@edge curl fontconfig \
    #
    # Install Japanese Font
    && curl -O https://noto-website.storage.googleapis.com/pkgs/NotoSansCJKjp-hinted.zip \
    && mkdir -p /usr/share/fonts/NotoSansCJKjp \
    && unzip NotoSansCJKjp-hinted.zip -d /usr/share/fonts/NotoSansCJKjp/ \
    && rm NotoSansCJKjp-hinted.zip \
    && fc-cache -vf \
    #
    && npm install \
    && rm -rf /var/cache/apk/*

EXPOSE 1337

ENTRYPOINT ["npm", "start"]
