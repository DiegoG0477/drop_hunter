import { Game } from "@domain/entities/Game";
import { GameRepository } from "@domain/repositories/GameRepository";

export class EndGameUseCase {
    constructor(private gameRepository: GameRepository) {}

    async execute(game: Game): Promise<Game> {
        return this.gameRepository.endGame(game);
    }
}