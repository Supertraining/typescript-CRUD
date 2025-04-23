import { RedisClient } from "./redis-client.core.db.redis.js";
import { config } from "../../../config/config.js";

export const redisClient = new RedisClient({
  ...config.redis,
  port: Number(config.redis.port),
});

export const redisClientPromise = redisClient.connect();
