# This Dockerfile builds demo app container.

FROM alpine:3.8

EXPOSE 1337
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD true

WORKDIR /app
COPY . /app

RUN apk update \
    && apk add --no-cache nodejs npm chromium curl fontconfig \
    #
    # Install Japanese Font
    && curl -O https://noto-website.storage.googleapis.com/pkgs/NotoSansCJKjp-hinted.zip \
    && mkdir -p /usr/share/fonts/NotoSansCJKjp \
    && unzip NotoSansCJKjp-hinted.zip -d /usr/share/fonts/NotoSansCJKjp/ \
    && rm NotoSansCJKjp-hinted.zip \
    && fc-cache -vf \
    #
    && cp .env.docker .env \
    && npm install \
    && apk del --purge curl fontconfig

ENTRYPOINT ["npm", "start"]
