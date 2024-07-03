FROM node:20-alpine

RUN node -v
RUN npm -v
RUN mkdir /usr/app
WORKDIR /usr/app
COPY . /usr/app
RUN npm ci
EXPOSE  9000

CMD ["npm","start"]
