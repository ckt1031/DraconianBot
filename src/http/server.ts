import express from 'express';

const server = express();

server.all('/', async (_, response) => {
  response.send('Draconian is alive!');
});

export default () => {
  server.listen(3000, () => console.log('Server is Ready!'));
};
