import RedisStore from 'rate-limit-redis';
import Redis from 'ioredis';

export const redisClient = new Redis({
  host: 'localhost', // or your Redis host
  port: 6379,
});

// const redisClient = new Redis(process.env.UPSTASH_REDIS_URL); // rediss://:pass@host:port
// you need the Redis (TCP) endpoint, not the REST one.