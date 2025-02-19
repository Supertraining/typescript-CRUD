// src/core/utils/workersPool.ts
import { Worker } from "worker_threads";
import path from "path";

export class WorkerPool {
  private workers: Worker[] = [];
  private queue: any[] = [];
  private activeWorkers: Set<Worker> = new Set();

  constructor(workerFileName: string, private poolSize: number) {
    const workerPath = path.resolve(__dirname, workerFileName);
    for (let i = 0; i < poolSize; i++) {
      this.createWorker(workerPath);
    }
  }

  private createWorker(workerPath: string) {
    const worker = new Worker(workerPath);
    this.workers.push(worker);
    console.log(`👷‍♂️ Worker ${worker.threadId} created`);

    worker.on("message", (message) => {
      console.log(
        `📨 Worker ${worker.threadId} returned message:`,
        message?.success || message.error
      );

      const task = this.queue.shift();
      if (task) {
        if (message.success) {
          console.log(`✅ Worker ${worker.threadId} completed task`);
          task.resolve(message);
        } else {
          task.reject(new Error(message.error));
        }
      }
      this.activeWorkers.delete(worker);
      this.processQueue();
    });

    worker.on("error", (error) => {
      console.error("❌ Worker error:", error);
      this.replaceWorker(workerPath, worker);
    });

    worker.on("exit", (code) => {
      if (code !== 0) {
        console.error(`⚠️ Worker ${worker.threadId} exited with code ${code}, replacing...`);
        this.replaceWorker(workerPath, worker);
      } else {
        console.log(`✅ Worker ${worker.threadId} exited normally.`);
        this.workers = this.workers.filter((w) => w !== worker);
      }
    });
  }

  private replaceWorker(workerPath: string, worker: Worker) {
    console.log(`🔄 Replacing Worker ${worker.threadId}`);
    this.workers = this.workers.filter((w) => w !== worker);
    this.createWorker(workerPath);
  }

  private processQueue() {
    if (this.queue.length > 0) {
      const availableWorker = this.workers.find((worker) => !this.activeWorkers.has(worker));
      if (availableWorker) {
        const task = this.queue[0];
        this.activeWorkers.add(availableWorker);
        task.data.threadId = availableWorker.threadId;
        console.log("2. 📨 Sending task to worker:", availableWorker.threadId);
        availableWorker.postMessage(task.data);
      }
    }
  }

  executeTask(data: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.queue.push({ resolve, reject, data });
      console.log("1. 📨 Adding task to queue:", this.queue);
      this.processQueue();
    });
  }
}
