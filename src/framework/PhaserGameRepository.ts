import { Item } from "@domain/entities/Item";
import { GameRepository } from "@domain/repositories/GameRepository";

export class PhaserGameRepository implements GameRepository {
    private spawnWorker: Worker;
    private clockWorker: Worker;
    private fpsWorker: Worker;
    private itemQueue: Item[] = [];

    constructor() {
        this.spawnWorker = new Worker(new URL("./workers/spawnWorker.ts", import.meta.url));
        this.clockWorker = new Worker(new URL("./workers/clockWorker.ts", import.meta.url));
        this.fpsWorker = new Worker(new URL("./workers/fpsWorker.ts", import.meta.url));
        
        this.spawnWorker.onmessage = (e) => {
            const item: Item = e.data;
            this.itemQueue.push(item);
        };
    }

    startFpsCounter(callback: (averageFps: number) => void) {
        this.fpsWorker.onmessage = (e) => {
            const { averageFps } = e.data;
            callback(averageFps);
        };
    }

    countFrame() {
        this.fpsWorker.postMessage({});
    }

    stopFpsCounter(): void {
        this.fpsWorker.terminate();
    }

    startClock(callback: (minutes: number, seconds: number) => void) {
        this.clockWorker.onmessage = (e: MessageEvent) => {
            const { minutes, seconds } = e.data;
            callback(minutes, seconds);
        };
        this.clockWorker.postMessage({ action: "start" });
    }

    stopClock(): void {
        this.clockWorker.postMessage({ action: "stop" });
    }

    startSpawning(): void {
        this.spawnWorker.postMessage({ action: "start" });
    }

    async getNextSpawnItem(): Promise<Item> {
        return new Promise((resolve) => {
            const checkQueue = () => {
                if (this.itemQueue.length > 0) {
                    resolve(this.itemQueue.shift()!);
                } else {
                    setTimeout(checkQueue, 100);
                }
            };
            checkQueue();
        });
    }

    stopSpawning(): void {
        this.spawnWorker.postMessage({ action: "stop" });
        this.spawnWorker.terminate();
    }
}