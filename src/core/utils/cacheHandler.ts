import { CustomError } from "../errors/customError";

export class RAM {
  private static runningRequests: Map<string, Promise<any>> = new Map();

  constructor(private readonly redisClient: any) {}

  static batchRequests(
    params: string,
    callback: () => Promise<any>,
    reqTimeOut: number = 5000
  ): Promise<any> {
    if (this.runningRequests.has(params)) {
      console.log("Batching request...");
      return this.runningRequests.get(params)!;
    }

    let timeoutReject: (reason?: any) => void;
    const timeoutPromise = new Promise<never>((_, reject) => {
      timeoutReject = reject;
      setTimeout(() => reject(CustomError.internalError("Request timed out")), reqTimeOut);
    });

    const resultPromise = Promise.race([callback(), timeoutPromise])
      .catch((error) => {
        this.runningRequests.delete(params);
        return Promise.reject(error);
      })
      .finally(() => {
        this.runningRequests.delete(params);
        timeoutReject();
      });

    this.runningRequests.set(params, resultPromise);
    return resultPromise;
  }

  async cacheRequests(cacheKey: string, callback: () => Promise<any>): Promise<any> {
    
    const cachedResponse = await this.redisClient.get(cacheKey);


    if (cachedResponse) {
      return JSON.parse(cachedResponse);
    }

    this.redisClient.set(cacheKey, JSON.stringify(await callback()));

    return await callback();
  }
}
