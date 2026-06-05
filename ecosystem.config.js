const path = require('path');

module.exports = {
  apps: [
    {
      name: 'zwhnlab',
      script: './bin/server',
      cwd: __dirname,
      interpreter: 'none',
      instances: 1,
      exec_mode: 'fork',
      autorestart: true,
      watch: false,
      max_restarts: 15,
      min_uptime: '10s',
      kill_timeout: 15_000,
      max_memory_restart: '1G',
      time: true,
      env: {
        NODE_ENV: 'production',
      },
    },
    {
      name: 'zwhnlab-ohmyppt',
      script: 'dist/index.js',
      cwd: path.join("/data", 'ohmyppt'),
      interpreter: 'node',
      instances: 1,
      exec_mode: 'fork',
      autorestart: true,
      watch: false,
      max_restarts: 15,
      min_uptime: '10s',
      kill_timeout: 15_000,
      max_memory_restart: '2G',
      time: true,
      env: {
        NODE_ENV: 'production',
        OHMYPPT_PORT: '8130',
      },
    },
  ],
};
