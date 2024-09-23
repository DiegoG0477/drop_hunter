import { Item } from "@domain/entities/Item";
import { GameRepository } from "@domain/repositories/GameRepository";

export class PhaserGameRepository implements GameRepository {
    private spawnWorker: Worker;
    private clockWorker: Worker;
    private itemQueue: Item[] = [];

    constructor() {
        this.spawnWorker = new Worker(new URL("./workers/spawnWorker.ts", import.meta.url));
        this.clockWorker = new Worker(new URL("./workers/clockWorker.ts", import.meta.url));
        
        this.spawnWorker.onmessage = (e) => {
            const item: Item = e.data;
            this.itemQueue.push(item);
        };
    }

    startGame(): void {
        console.log("Game started");
    }

    endGame(): void {
        console.log("Game ended");
    }

    pauseGame(): void {
        console.log("Game paused");
    }

    resumeGame(): void {
        console.log("Game resumed");
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

    // resetClock() {
    //     this.clockWorker.postMessage({ action: "reset" });
    // }

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
