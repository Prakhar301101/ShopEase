const {createClient} = require('redis');
const client = createClient({
    password: process.env.REDIS_PASSWORD,
    socket: {
        host: 'redis-15971.c321.us-east-1-2.ec2.redns.redis-cloud.com',
        port: 15971
    }
});

client.on('error', err => console.log('Redis Client Error', err));
client.connect();

module.exports = client;