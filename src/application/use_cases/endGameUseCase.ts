import { GameRepository } from "@domain/repositories/GameRepository";

export class EndGameUseCase {
    constructor(private gameRepository: GameRepository) {}

    async execute(): Promise<void> {
        this.gameRepository.endGame();
    }
}