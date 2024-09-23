import { Item } from "@domain/entities/Item";

export interface GameRepository {
    startGame(): void;
    endGame(): void;
    pauseGame(): void;
    resumeGame(): void;
    startSpawning(): void;
    getNextSpawnItem(): Promise<Item>;
    stopSpawning(): void;
}