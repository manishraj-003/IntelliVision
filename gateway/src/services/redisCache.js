import Redis from "ioredis";

/**
 * Redis cache client
 */
const redis = new Redis(process.env.REDIS_URL, {
  maxRetriesPerRequest: null,
});

/**
 * Cache helpers
 */
const RedisCache = {
  async get(key) {
    const value = await redis.get(key);
    return value ? JSON.parse(value) : null;
  },

  async set(key, value, ttlSeconds = 300) {
    await redis.set(key, JSON.stringify(value), "EX", ttlSeconds);
  },

  async del(key) {
    await redis.del(key);
  },
};

export default RedisCache;
