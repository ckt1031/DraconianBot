import rateLimit from '@fastify/rate-limit';
import fastify from 'fastify';

const server = fastify();

server.register(rateLimit, {
  global: true,
  max: 60,
  timeWindow: 60 * 1000 * 5,
});

server.get('/', async () => 'Draconian Bot');

server.listen({
  port: Number(process.env.PORT!),
});
