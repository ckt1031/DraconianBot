module.exports = {
  apps: [
    {
      name: 'Bot Main',
      script: './dist/index.js',
      watch: false,
      max_memory_restart: '5G',
      restart_delay: 35 * 1000,
    },
  ],
};
