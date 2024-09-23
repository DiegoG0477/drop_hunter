import { GameRepository } from "@domain/repositories/GameRepository";

export class InitFpsCountUseCase {
    constructor(private gameRepository: GameRepository) {}

    execute(callback: (averageFps: number) => void) {
        this.gameRepository.startFpsCounter(callback);
    }
}
