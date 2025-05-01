const redis = require('redis');
require('dotenv').config();


const client = redis.createClient({ 
    socket:{
        host: process.env.WSL2_IP,
        port: process.env.PORT_REDIS,
    }
});

client.on('connect', () => {
    console.log('Connected to Redis server');
})

client.on('error', (err)=>{
    console.error('Redis Client Error', err);
});

(async () => {
    await client.connect();
})();

module.exports = client;