export class ActiveRequestManager {
  private static instance: ActiveRequestManager;
  private activeRequests: Map<string, { start: () => Promise<any>; cancel: () => void }>;

  private constructor() {
    this.activeRequests = new Map();
  }

  static getInstance(): ActiveRequestManager {
    if (!this.instance) {
      this.instance = new ActiveRequestManager();
    }
    return this.instance;
  }

  set(id: string, request: { start: () => Promise<any>; cancel: () => void }) {
    if (this.activeRequests.has(id)) {
      this.activeRequests.get(id)?.cancel();
    }
    this.activeRequests.set(id, request);
  }

  get(id: string) {
    return this.activeRequests.get(id);
  }

  delete(id: string) {
    this.activeRequests.delete(id);
  }

  has(id: string): boolean {
    return this.activeRequests.has(id);
  }
}
