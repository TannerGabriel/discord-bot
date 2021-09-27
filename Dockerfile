FROM node:alpine

WORKDIR /usr/src/app

RUN apk update || : && apk add python3
RUN apk add ffmpeg

COPY package*.json ./

RUN npm install

COPY . .

CMD ["npm", "start"]
