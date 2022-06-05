FROM node:latest

WORKDIR /bot

COPY package.json .

RUN npm install

COPY . .

# Build and Optimize Disk Space
RUN npm run build
RUN npm prune --omit=dev

ENV NODE_ENV=production

CMD [ "npm", "start" ]
