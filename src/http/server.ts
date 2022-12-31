import fastify from 'fastify';

const server = fastify();

server.get('/', async () => 'Draconian Bot');

server.listen({
  port: Number(process.env.PORT ?? 3000),
});
