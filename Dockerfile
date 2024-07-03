FROM node:8-alpine

RUN apk add --no-cache -U \
    curl ruby-full ruby-dev alpine-sdk git linux-headers nasm

RUN gem install compass

# confirm installation
RUN node -v
RUN npm -v

RUN mkdir /usr/app

WORKDIR /usr/app
COPY . /usr/app
RUN npm ci
CMD ["node_modules/.bin/bower","install", "--allow-root"]
EXPOSE  9000

CMD ["node_modules/.bin/grunt","server"]
