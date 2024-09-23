import { Item } from "@domain/entities/Item";

export interface GameRepository {
    startGame(): void;
    endGame(): void;
    pauseGame(): void;
    resumeGame(): void;
    startClock(callback: any): void;
    stopClock(): void;
    startSpawning(): void;
    getNextSpawnItem(): Promise<Item>;
    stopSpawning(): void;
}