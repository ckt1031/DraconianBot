import fastify from 'fastify';

const server = fastify();

server.get('/', () => 'Draconian Bot');

await server.listen({
  port: Number(process.env.PORT ?? '3000'),
  host: '0.0.0.0',
});
