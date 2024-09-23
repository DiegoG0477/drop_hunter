import { Catcher } from "@domain/entities/Catcher";
import { CatcherRepository } from "@domain/repositories/CatcherRepository";

export class LoseLifeUseCase {
    constructor(private catcherRepository: CatcherRepository) {}

    execute(catcher: Catcher): void {
        this.catcherRepository.decreaseLives(catcher);
    }
}