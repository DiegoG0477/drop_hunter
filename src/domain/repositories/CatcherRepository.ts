import { Catcher } from "@domain/entities/Catcher";

export interface CatcherRepository {
    increaseScore(catcher: Catcher): Promise<Catcher>;
    decreaseLives(catcher: Catcher): Promise<Catcher>;
    resetLives(catcher: Catcher): Promise<Catcher>;
    recoverScore(catcher: Catcher): Promise<Catcher>;
}