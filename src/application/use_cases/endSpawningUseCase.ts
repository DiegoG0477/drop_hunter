import { GameRepository } from "@domain/repositories/GameRepository";

export class EndSpawningUseCase {
    constructor(readonly gameRepository: GameRepository) {}

    async execute(): Promise<void> {
        this.gameRepository.stopSpawning();
    }
}