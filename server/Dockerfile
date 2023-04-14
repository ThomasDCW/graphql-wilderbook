FROM node:lts-alpine

WORKDIR /app

COPY package.json package.json
COPY package-lock.json package-lock.json

RUN npm install 

COPY tsconfig.json tsconfig.json

COPY src src

CMD npm start
