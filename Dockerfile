FROM node:alpine

WORKDIR /bot

COPY package*.json .

RUN npm ci

COPY . .

ENV NODE_ENV=production

EXPOSE 3000

CMD [ "npm", "start" ]
