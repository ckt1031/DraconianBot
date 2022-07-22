FROM node:latest

WORKDIR /bot

COPY package.json .

RUN npm install

COPY . .

# Build and Optimize Disk Space
RUN npm run build

ENV NODE_ENV=production

CMD [ "npm", "start" ]
