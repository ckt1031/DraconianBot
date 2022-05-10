import fastify from 'fastify';
import rateLimit from '@fastify/rate-limit';

const server = fastify();

server.register(rateLimit, {
  global: true,
  max: 60,
  timeWindow: 60 * 1000 * 5,
});

server.get('/', async () => 'Draconian Bot');

server.listen(process.env.PORT!, '0.0.0.0', (error, address) => {
  if (error) throw error;
  console.log(`HTTP Server Ready!\nServer listening at ${address}`);
});
