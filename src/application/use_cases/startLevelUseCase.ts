import { Game } from "@domain/entities/Game";
import { GameRepository } from "@domain/repositories/GameRepository";

export class StartLevelUseCase {
    constructor(private gameRepository: GameRepository) {}

    async execute(): Promise<Game> {
        return this.gameRepository.startGame();
    }
}