import { createClient } from 'redis';
import dotenv from 'dotenv';

dotenv.config();

const redisClient = createClient({
  socket: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    reconnectStrategy: (retries) => {
      if (retries === 0 ) {
        console.log('Initial Redis Connection...');
      }
      return 2000;
    },
    connectTimeout: 10000
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

export default redisClient;