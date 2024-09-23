import { Catcher } from "@domain/entities/Catcher";
import { CatcherRepository } from "@domain/repositories/CatcherRepository";

export class IncreaseScoreUseCase {
    constructor(private catcherRepository: CatcherRepository) {}

    execute(catcher: Catcher, increment: number): void {
        this.catcherRepository.increaseScore(catcher, increment);
    }
}