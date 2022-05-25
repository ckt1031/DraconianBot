FROM node:latest

ENV USER=draconian

USER ${USER}

WORKDIR /${USER}/bot

COPY --chown=${USER}:${USER}  . .

# Install
RUN apt-get update && \
  apt-get install -y python3 build-essential && \
  apt-get purge -y --auto-remove
RUN npm install

# Build and Optimize Disk Space
RUN npm run build
RUN npm prune --omit=dev

CMD [ "npm", "start" ]