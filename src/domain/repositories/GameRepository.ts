import { Item } from "@domain/entities/Item";

export interface GameRepository {
    startClock(callback: any): void;
    stopClock(): void;
    startSpawning(): void;
    getNextSpawnItem(): Promise<Item>;
    stopSpawning(): void;
    startFpsCounter(callback: any): void;
    stopFpsCounter(): void;
}