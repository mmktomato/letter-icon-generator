FROM alpine:3.8

EXPOSE 1337
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD true

WORKDIR /app
COPY . /app

RUN apk update \
    && apk add --no-cache nodejs npm chromium \
    #
    # Install packages for temporarily needed.
    && apk add --no-cache curl fontconfig msttcorefonts-installer \
    #
    # Install Japanese Font
    && curl -O https://noto-website.storage.googleapis.com/pkgs/NotoSansCJKjp-hinted.zip \
    && mkdir -p /usr/share/fonts/NotoSansCJKjp \
    && unzip NotoSansCJKjp-hinted.zip -d /usr/share/fonts/NotoSansCJKjp/ \
    && rm NotoSansCJKjp-hinted.zip \
    #
    # Install Tangerine
    && curl 'https://fonts.google.com/download?family=Tangerine' > Tangerine.zip \
    && mkdir -p /usr/share/fonts/Tangerine \
    && unzip Tangerine.zip -d /usr/share/fonts/Tangerine/ \
    && rm Tangerine.zip \
    #
    # Install Arial, Courier New, Vardana, etc...
    # https://pkgs.alpinelinux.org/package/v3.8/community/x86/msttcorefonts-installer
    && update-ms-fonts \
    #
    && fc-cache -vf \
    #
    && cp .env.docker .env \
    && npm install \
    && apk del --purge curl fontconfig msttcorefonts-installer

ENTRYPOINT ["npm", "start"]
