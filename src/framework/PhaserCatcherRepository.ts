import { Catcher } from "@domain/entities/Catcher";
import { CatcherRepository } from "@domain/repositories/CatcherRepository";

export class PhaserCatcherRepository implements CatcherRepository {
    private scoreWorker: Worker;

    constructor() {
        this.scoreWorker = new Worker(new URL("./workers/scoreWorker.ts", import.meta.url));
    }

    increaseScore(catcher: Catcher, increment: number): void {
        this.scoreWorker.postMessage({ catcher: { score: catcher.getScore() }, increment });

        this.scoreWorker.onmessage = (e) => {
            const { newScore } = e.data;
            catcher.setScore(newScore);
        };
    }

    decreaseLives(catcher: Catcher): void {
        catcher.setLives(catcher.getLives() - 1);
    }

    stopWorkers(): void {
        this.scoreWorker.terminate();
    }
}