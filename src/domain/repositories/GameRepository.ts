import { Game } from "@domain/entities/Game";

export interface GameRepository {
    startGame(): Promise<Game>;
    endGame(game: Game): Promise<Game>;
    pauseGame(game: Game): Promise<Game>;
    resumeGame(game: Game): Promise<Game>;
}