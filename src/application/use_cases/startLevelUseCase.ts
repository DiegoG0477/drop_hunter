import { GameRepository } from "@domain/repositories/GameRepository";

export class StartLevelUseCase {
    constructor(private gameRepository: GameRepository) {}

    async execute(): Promise<void> {
        this.gameRepository.startGame();
    }
}