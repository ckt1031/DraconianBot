module.exports = {
  apps: [
    {
      name: 'DraconianBot Main',
      script: './dist/index.js',
      watch: false,
      max_memory_restart: '5G',
      max_restarts: 25,
      restart_delay: 35 * 1000,
    },
  ],
};
