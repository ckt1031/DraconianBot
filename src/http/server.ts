import express from 'express';

// Remove line below if you are not prefered auto pinging.
import alwaysOn from './always-on.js';

const server = express();

server.all('/', async (_, response) => {
  response.send('Draconian is alive!');
});

// Remove line below if you are not prefered auto pinging.
alwaysOn();

export default () => {
  server.listen(3000, () => console.log('Server is Ready!'));
};
