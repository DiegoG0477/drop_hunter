import { Catcher } from "@domain/entities/Catcher";

export interface CatcherRepository {
    increaseScore(catcher: Catcher, increment: number): void;
    decreaseLives(catcher: Catcher): void;
    stopWorkers(): void;
}