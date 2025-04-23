import { CustomError } from "../errors/custom-error.core.erros.js";
import { LRUCache } from "lru-cache";

export class CacheHandler {
  private static instance: CacheHandler;

  private static runningRequests = new LRUCache<string, Promise<any>>({
    max: 100,
    ttl: 1000 * 30,
  });

  private constructor(private readonly redisClient: any) {}

  public static async getInstance(redisClientFactory: () => Promise<any>): Promise<CacheHandler> {
    if (!this.instance) {
      const redisClient = await redisClientFactory();
      this.instance = new CacheHandler(redisClient);
    }
    return this.instance;
  }

  async cacheRequests(cacheKey: string, callback: () => Promise<any>): Promise<any> {
    const cachedResponse = await this.redisClient.get(cacheKey);

    if (cachedResponse) {
      return JSON.parse(cachedResponse);
    }

    const data = await callback();
    await this.redisClient.set(cacheKey, JSON.stringify(data));

    return data;
  }

  async clearCache(cacheKey: string): Promise<void> {
    await this.redisClient.del(cacheKey);
  }

  batchRequests(
    params: string,
    callback: () => Promise<any>,
    reqTimeOut: number = 5000
  ): Promise<any> {
    if (CacheHandler.runningRequests.has(params)) {
      console.log("Batching request...");
      return CacheHandler.runningRequests.get(params)!;
    }

    let timeoutId: NodeJS.Timeout;
    const mainPromise = callback()
      .then((result) => {
        clearTimeout(timeoutId); // Cancelamos timeout si todo va bien
        return result;
      })
      .catch((error) => {
        CacheHandler.runningRequests.delete(params); // Eliminamos si falla
        throw error;
      });

    const timeoutPromise = new Promise<never>((_, reject) => {
      timeoutId = setTimeout(() => {
        CacheHandler.runningRequests.delete(params);
        reject(CustomError.internalError("Request timed out"));
      }, reqTimeOut);
    });

    const racePromise = Promise.race([mainPromise, timeoutPromise]);
    CacheHandler.runningRequests.set(params, racePromise); // Se eliminará automáticamente tras TTL

    return racePromise;
  }
}
