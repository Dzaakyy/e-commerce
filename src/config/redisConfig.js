const { createClient } = require('redis');
require('dotenv').config();

const redisClient = createClient({
  socket: {
    host: process.env.WSL2_IP,
    port: process.env.PORT_REDIS,
  },
});

redisClient.on('connect', () => {
  console.log('Connected to Redis server');
});

redisClient.on('error', (err) => {
  console.error('Error Redis:', err);
});

redisClient.connect().catch((err) => {
  console.error('Error connecting to Redis:', err);
});

module.exports = redisClient;