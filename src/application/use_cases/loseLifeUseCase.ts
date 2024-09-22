import { Catcher } from "@domain/entities/Catcher";
import { CatcherRepository } from "@domain/repositories/CatcherRepository";

export class LoseLifeUseCase {
    constructor(private catcherRepository: CatcherRepository) {}

    async execute(catcher: Catcher): Promise<Catcher> {
        return this.catcherRepository.decreaseLives(catcher);
    }
}