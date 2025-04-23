import { ActiveRequestManager } from "./active-request-manager.core.utils.js";

export function createCancelableRequest<T>(
  requestId: string,
  generator: () => AsyncGenerator<T>,
  activeRequests: ActiveRequestManager
) {
  const iterator = generator();
  let canceled = false;

  return {
    async start() {
      try {
        let result;
        for await (result of iterator) {
          if (canceled) {
            console.log("Request canceled");
            return;
          }
        }
        return result;
      } catch (error) {
        throw error;
      } finally {
        activeRequests.delete(requestId);
      }
    },
    cancel() {
      canceled = true;
    },
  };
}
