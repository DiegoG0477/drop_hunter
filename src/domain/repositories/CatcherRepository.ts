import { Catcher } from "@domain/entities/Catcher";

export interface CatcherRepository {
    increaseScore(catcher: Catcher, increment: number): void;
    decreaseLives(catcher: Catcher): void;
    resetLives(catcher: Catcher): Promise<Catcher>;
    recoverScore(catcher: Catcher): Promise<Catcher>;
    stopWorkers(): void;
}